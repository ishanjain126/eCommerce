import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

// This is a test comment


const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  showDesc = false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);


  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1 view">View Product</button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1 add">
          +
        </button>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-warning mt-2 mb-2 remove">
          Remove Product
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill hover">In Stock </span>
    ) : (
        <span className="badge badge-primary badge-pill hover">Out of Stock </span>
      );
  };

  const showDescription = showDesc => {
    return showDesc && (
      < p className="card-p  mt-2">{product.description} </p>
    )
  }

  const handleChange = productId => event => {
    setRun(!run)  // this will run useEffect in the parent component
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate &&
      <div className="input-group mb-3">

        <div className="input-group-prepend width-adjust">
          <span className="input-group-text">Adjust Quantity</span>
        </div>

        {/* increment or decrement the product quantity */}
        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />

      </div>
  }

  return (
    // <div className="card ">
    //   <div className="card-header card-header-1 ">{product.name}</div>
    //   <div className="card-body">
    //     {shouldRedirect(redirect)}
    //     <ShowImage item={product} url="product" />
    //     {/* <p className="card-p  mt-2">{product.description.substring(0, 100)} </p> */}
    //     {showDescription(showDesc)}
    //     <p className="card-p black-10">$ {product.price}</p>
    //     <p className="black-9">Category: {product.category && product.category.name}</p>
    //     <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
    //     {showStock(product.quantity)}
    //     <br />

    // //   </div>
    // </div>
    <div class="card">
      {shouldRedirect(redirect)}
      {showStock(product.quantity)}
      <ShowImage item={product} url="product" />
      <div class="card-info">

        <div class="card-text">{product.name}</div>
        {/* {<p>{product.description.substring(0, 100)} </p>} */}

        {/*<p>Category: {product.category && product.category.name}</p>*/}
        {/*<p>Added {moment(product.createdAt).fromNow()}</p>*/}
        <div class="card-actions">
          <div class="card-price">₹{product.price}</div>

          {showDescription(showDesc)}

          {showViewButton(showViewProductButton)}

          {showAddToCartBtn(showAddToCartButton)}

          {showRemoveButton(showRemoveProductButton)}

          {showCartUpdateOptions(cartUpdate)}</div>
      </div>
    </div>
  );
};

export default Card;