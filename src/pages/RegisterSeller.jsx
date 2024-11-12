const RegisterSeller = () => {
  return (
    <div className="mb:auto flex flex-col items-center justify-center px-4 pt-24 md:pt-32">
      <h1 className="inline-block w-4/5 bg-gradient-to-b from-gunmental to-swamp-light bg-clip-text text-center text-2xl font-bold text-transparent md:text-3xl">
        Vennligst fyll ut skjemaet
      </h1>
      <section className="mb-12 mt-6 flex w-full max-w-lg md:min-w-[400px]">
        <form class="flex w-full flex-col items-center">
          <section className="relative mx-auto mb-4 mt-4 w-full flex-col items-center rounded-xl border border-light-gray bg-distant-cloud p-6">
            <div className="absolute left-6 top-6 flex h-[40px] min-w-[40px] items-center justify-center rounded-md bg-gradient-to-r from-mirage to-swamp-light text-xl font-bold text-distant-cloud md:pb-1">
              1
            </div>
            <h1 className="text-center text-2xl font-bold text-medium-gray md:text-3xl">
              PERSONALIA
            </h1>
            <div class="mb-4 mt-8">
              <input
                type="text"
                id="name"
                class="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 text-base font-medium text-medium-gray md:text-lg"
                placeholder="Fult Navn"
                required
              />
            </div>
            <div class="mb-4">
              <input
                type="email"
                id="email"
                class="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 text-base font-medium text-medium-gray md:text-lg"
                placeholder="Email"
                required
              />
            </div>
            <div class="mb-4">
              <input
                type="number"
                id="telephone"
                class="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 text-base font-medium text-medium-gray md:text-lg"
                placeholder="Mobilnummer"
                required
              />
            </div>
            <div className="flex flex-row space-x-2">
              <div class="mb-4">
                <input
                  type="text"
                  id="place"
                  class="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 text-base font-medium text-medium-gray md:text-lg"
                  placeholder="Sted"
                  required
                />
              </div>
              <div class="mb-4">
                <input
                  type="number"
                  id="post_num"
                  class="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 text-base font-medium text-medium-gray md:text-lg"
                  placeholder="Postnr."
                  required
                />
              </div>
            </div>
          </section>
          <section className="relative mx-auto mb-4 w-full flex-col items-center rounded-xl border border-light-gray bg-distant-cloud p-6">
            <div className="absolute left-6 top-6 flex h-[40px] min-w-[40px] items-center justify-center rounded-md bg-gradient-to-r from-mirage to-swamp-light text-xl font-bold text-distant-cloud md:pb-1">
              2
            </div>
            <h1 className="text-center text-2xl font-bold text-medium-gray md:text-3xl">
              BIL INFO
            </h1>
            <div class="mb-4 mt-8">
              <input
                type="text"
                id="reg_num"
                class="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 text-base font-medium text-medium-gray md:text-lg"
                placeholder="Registrasjonsnr."
                required
              />
            </div>
            <div class="mb-4">
              <input
                type="number"
                id="kms"
                class="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 text-base font-medium text-medium-gray md:text-lg"
                placeholder="Kilometerstand"
                required
              />
            </div>
          </section>
          <section className="relative mx-auto mb-4 w-full flex-col items-center rounded-xl border border-light-gray bg-distant-cloud p-6">
            <div className="absolute left-6 top-6 flex h-[40px] min-w-[40px] items-center justify-center rounded-md bg-gradient-to-r from-mirage to-swamp-light text-xl font-bold text-distant-cloud md:pb-1">
              3
            </div>
            <h1 className="text-center text-2xl font-bold text-medium-gray md:text-3xl">
              ANNEN INFO
            </h1>
            <div class="mb-4 mt-4">
              <label
                for="known_damages"
                class="mb-2 block text-center text-lg font-semibold leading-5 text-medium-gray"
              >
                Noen kjente skader? <br />
                <span className="text-base font-normal text-light-gray">
                  Hvis nei, la feltet stå tomt
                </span>
              </label>
              <textarea
                id="known_damages"
                rows="4"
                class="block w-full rounded-lg border border-medium-gray bg-white px-5 py-2.5 text-base font-medium text-medium-gray md:text-lg"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <div class="mb-4 mt-4">
              <label
                for="previous_repairs"
                class="mb-2 block text-center text-lg font-semibold leading-5 text-medium-gray"
              >
                Forrige reparasjoner? <br />
                <span className="text-base font-normal text-light-gray">
                  Hvis nei, la feltet stå tomt
                </span>
              </label>
              <textarea
                id="known_damages"
                rows="4"
                class="block w-full rounded-lg border border-medium-gray bg-white px-5 py-2.5 text-base font-medium text-medium-gray md:text-lg"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
          </section>
          <button
            type="submit"
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group mt-4 flex flex-row items-center space-x-2 rounded-full bg-gradient-to-br from-mirage to-swamp-light px-6 pb-4 pt-4 hover:from-mirage hover:to-gunmental md:space-x-3 md:px-7 md:pb-5"
          >
            <span className="text-2xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-3xl">
              SEND SØKNAD
            </span>
            <div className="h-[18px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[24px]"></div>
            <img
              src="../icons/send.png"
              alt="Dollar sign"
              className="h-5 w-5 md:h-6 md:w-6"
            />
          </button>
        </form>
      </section>
    </div>
  );
};

export default RegisterSeller;
