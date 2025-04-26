const CompanyUserPage = () => {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center px-4 pt-20`}
    >
      {error && !isErrorOpen && !userData ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <UserDataPanel
            userData={userData}
            setUserData={setUserData}
            updateUser={updateUser}
          />
          {userData.role == "BUYER_COMPANY" && (
            <BuyerRepresentativesList reps={userData.representatives} />
          )}
        </>
      )}
      {userData.role == "SELLER" && <SellerCarList />}
    </div>
  );
};

export default CompanyUserPage;
