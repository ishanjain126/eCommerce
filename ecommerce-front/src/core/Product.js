import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);

                // only after getting the single product we can fetch the related products

                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    }
                    else {
                        setRelatedProduct(data);
                    }
                }).catch((err) => { console.error(err) });
            }
        }).catch((err) => { console.error(err) });
    };

    // First argument to useEffect
    // effect is executed when the component is mounted (on first render) and whether it is executed in 
    // subsequent updates is determined by the array of dependencies passed as the second argument.
    // second argument of useEffect takes the object which React uses in order to see if the component gets updated or not.

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div class="menu-background"></div>

            <div className="row">

                <div className="col-8">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div>

                <div className="col-4">
                    <h6>You might also be interested in...</h6>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Product;