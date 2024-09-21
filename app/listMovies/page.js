const ListPopup = ({ userLists, onCreateNewList, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-4 w-80">
          <h2 className="text-lg font-semibold mb-2">Add to List</h2>
          <button className="text-blue-500 mb-4" onClick={onCreateNewList}>
            + Create New List
          </button>
          {userLists.length > 0 ? (
            <ul>
              {userLists.map((list, index) => (
                <li
                  key={index}
                  className="mb-2 p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                >
                  {list.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No lists available.</p>
          )}
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default ListPopup;
  