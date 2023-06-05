import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import AddToCartBtn from '../action_buttons/add_to_cart_btn/add_to_cart_btn';
import axios from 'axios';
import Cart from '../ cart/cart'
import PaymentModule from '../../payments/payments'
import { Row, Col } from 'react-bootstrap'

const SearchAndAddToCart = ({ onAddToCart, cartItems }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const fetchAllMaterials = async () => {
    let res = await axios.post('http://82.180.136.230:3005/fetchallshopinventory', {
      token: localStorage.getItem('token')
    });

    if (Array.isArray(res.data)) {
      const transformedOptions = res.data.map((item) => ({
        value: item.productId.toString(),
        label: item.productName,
        productData: item // Include the whole item object as productData
      }));
      setOptions(transformedOptions);
    }
  };

  useEffect(() => {
    fetchAllMaterials();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleAddToCart = () => {
    if (selectedOption && selectedOption.productData) {
      const itemToAdd = {
        id: selectedOption.productData.productId,
        name: selectedOption.productData.productName,
        quantity: 1,
        unitCost: selectedOption.productData.unitPrice,
        totalCost: selectedOption.productData.unitPrice
      };
      onAddToCart(itemToAdd);
    }
  };
  return (
    <>
        <div>
          <h2>Search And Add Product To Cart</h2>
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={options}
            isSearchable
            placeholder="Select a product"
          /> 
          <span>
            <AddToCartBtn onClick={onAddToCart}/>
          </span>
      </div>
      <Row>
          <Col sm='12' md='9' lg='9' xl='9'>
              <Cart items={cartItems}/>
            </Col>
            <Col sm='12' md='3' lg='3' xl='3'>
               <PaymentModule />  
            </Col>
      </Row>  
    </>
  );
}

export default SearchAndAddToCart