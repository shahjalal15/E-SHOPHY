import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      let data = {
        userId: auth?.user._id,
        productId: product._id,
        review: review,
      };

      await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-review`,
        data
      );
      setReview("");
    } catch (error) {
      console.log(error);
    }
  };

  const getReview = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-review-get/${product?._id}`
      );
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReview();
  }, [product?._id]);
  console.log(review);
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button
            class="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
            }}
          >
            ADD TO CART
          </button>
          <div className="review">
            <form onSubmit={handleReview}>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="write a review"
                name="review"
                id="review"
                cols="60"
                rows="5"
                className="area"
              />
              <br />
              <button type="submit" className="btn btn-info ms-1">
                Submit Review
              </button>
            </form>
          </div>
        </div>
        <div className="reviews">
          <h3>Reviews</h3>
          {reviews?.map((review) => (
            <div className="review-info">
              <h6>{review.userId.name.toUpperCase()}</h6>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
