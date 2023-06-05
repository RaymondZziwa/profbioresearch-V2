import { useState } from "react";

const Cart = ({items}) => {
  const [cartItems, setCartItems] = useState(items);

  const deleteHandler = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
  };

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value);
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const totalCost = newQuantity * item.unitCost;
        return { ...item, quantity: newQuantity, totalCost };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.quantity * item.unitCost;
    }
    return total;
  };

  return (
    <>
    <h3 style={{ textAlign: "center" }}>Cart</h3>
    <table className="table table-light">
      <thead>
        <tr>
          <th>Item Id</th>
          <th>Item Name</th>
          <th>Quantity per Unit</th>
          <th>Unit Cost (UGX)</th>
          <th>Total Quantity</th>
          <th>Total Cost (UGX)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
              There are no items in the cart.
            </td>
          </tr>
        ) : (
          cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => handleQuantityChange(item.id, event)}
                />
              </td>
              <td>{item.unitCost}</td>
              <td>{item.quantity}</td>
              <td>{item.totalCost}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHandler(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
      {cartItems.length > 0 && (
        <tfoot>
          <tr>
            <td colSpan="5" style={{ textAlign: "right" }}>
              Grand Total:
            </td>
            <td>{calculateTotal()}</td>
            <td></td>
          </tr>
        </tfoot>
      )}
    </table>
  </>         
    )
}

export default Cart