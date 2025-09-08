const UserCard = ({ user, handleSendRequest, hideActionButton = false }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        {!hideActionButton && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}>
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}>
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
