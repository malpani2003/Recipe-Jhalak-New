import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
function SimilarFoodItem(props) {
    const [similarFood, setSimilarFood] = useState([]);
  
    useEffect(() => {
      setSimilarFood(props.similarFood || []);
    }, [props.similarFood]);
  
    return (
      <div>
        <h2 className="fw-bold">You may also like this</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            marginTop: "15px",
          }}
        >
          {similarFood.map((item, index) => (
            <Link
              to={`/foods/${item._id}`}
              key={index}
              style={{
                paddingRight: "2px",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              <img
                src={item.foodImg}
                alt={item.foodName}
                style={{ borderRadius: "3%" }}
              />
              <h4
                style={{
                  padding: "5px",
                  position: "relative",
                  top: "-10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  backgroundColor: "gold",
                }}
              >
                {item.foodName}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  

export default SimilarFoodItem