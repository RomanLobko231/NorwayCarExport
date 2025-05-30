import React, { useEffect, useState } from "react";
import { getTimeLeftUntil } from "../../utils/dateTimeUtils";
import { useTranslation } from "react-i18next";

const AuctionCountdown = ({ utcEndTime }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(getTimeLeftUntil(utcEndTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeftUntil(utcEndTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [utcEndTime]);

  if (timeLeft.totalSeconds === 0) {
    return <p>{t("auction_ended")}</p>;
  }

  return (
    <p className="text-lg font-bold text-medium-gray">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </p>
  );
};

export default AuctionCountdown;
