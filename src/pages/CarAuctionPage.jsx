import { useEffect, useState } from "react";
import ImageCarousel from "../ui/carousel/ImageCarousel";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import CarApiService from "../api/CarApiService";
import { useParams } from "react-router-dom";
import { TbCoins } from "react-icons/tb";
import NumberInputField from "../ui/input/NumberInputField";
import { RiArrowUpBoxLine } from "react-icons/ri";
import { MdOutlineBrightnessAuto, MdOutlineOutbox } from "react-icons/md";
import CarSpecifications from "../ui/auction/CarSpecifications";
import AuctionPanel from "../ui/auction/AuctionPanel";
import AuctionApiService from "../api/AuctionApiService";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const CarAuctionPage = () => {
  const params = useParams();

  const [carData, setCarData] = useState(null);
  const [auctionData, setAuctionData] = useState(null);

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [stompClient, setStompClient] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadCar(params.id);
    loadAuction(params.id);
    setupWebSocket();

    if (!params.id) return;

    return () => {
      if (stompClient) {
        stompClient.deactivate();
        console.log("Stomp desactivated");
      }
    };
  }, []);

  const loadCar = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await CarApiService.getCarById(id);
      setCarData(response.data);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAuction = async (carId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuctionApiService.getAuctionByCarId(carId);
      setAuctionData(response.data);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const setupWebSocket = () => {
    const url = process.env.REACT_APP_BACKEND_URL + "/ws-auction";
    const socket = new SockJS(url);

    const token = sessionStorage.getItem("token");

    const client = new Client({
      webSocketFactory: () => socket,

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      reconnectDelay: 5000,

      onConnect: (frame) => {
        console.log("Connected: ", frame);
        client.subscribe("/topic/auction/" + params.id, (message) => {
          const updatedAuctionData = JSON.parse(message.body);
          setAuctionData(updatedAuctionData);
        });

        client.subscribe("/user/queue/errors", (message) => {
          const error = JSON.parse(message.body);
          console.error("WebSocket error:", error);
          setError(error);
          setIsErrorOpen(true);
        });
      },

      onStompError: (frame) => {
        console.error("Broker error: ", frame);
        setError({
          message: "Connection was interrupted. Please refresh page",
        });
      },

      onWebSocketClose: (event) => {
        console.error("WebSocket closed", event);
        setError({
          message: "Connection lost. Please refresh the page.",
          statusCode: 500,
        });
        //setIsErrorOpen(true);
      },
    });

    client.activate();
    setStompClient(client);
  };

  const placeNewBid = (amount) => {
    if (!stompClient) {
      console.error("WebSocket client is not initialized.");
      return;
    }

    setError(null);
    try {
      const bidMessage = {
        auctionId: auctionData.id,
        amount: amount,
      };

      stompClient.publish({
        destination: "/app/place-bid",
        body: JSON.stringify(bidMessage),
      });
    } catch (error) {
      setError({
        message: "Connection is not up-to-date. Please refresh page",
        statusCode: 409,
      });
      setIsErrorOpen(true);
      console.error("Error placing bid: ", error);
    }
  };

  const placeNewAutoBid = (limitAmount) => {
    if (!stompClient) {
      console.error("WebSocket client is not initialized.");
      return;
    }

    setError(null);
    try {
      const autoBidMessage = {
        auctionId: auctionData.id,
        limitAmount: limitAmount,
      };

      stompClient.publish({
        destination: "/app/place-auto-bid",
        body: JSON.stringify(autoBidMessage),
      });
    } catch (error) {
      setError({
        message: "Connection was interrupted. Please refresh page",
        statusCode: 409,
      });
      setIsErrorOpen(true);
      console.error("Error placing auto bid: ", error);
    }
  };

  return (
    <>
      {isLoading && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          Loading...
        </p>
      )}
      {error && isErrorOpen && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
      {!isLoading && carData && auctionData && (
        <AuctionPanel
          auctionData={auctionData}
          carData={carData}
          placeBid={placeNewBid}
          placeAutoBid={placeNewAutoBid}
          error={error}
        />
      )}
    </>
  );
};

export default CarAuctionPage;
