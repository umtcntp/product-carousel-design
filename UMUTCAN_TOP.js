(() => {
    const init = () => {
        buildCSS();
        buildHTML();
        loadProducts();
        setEvents();
    };

    const loadProducts = () => {
        const cachedProducts = JSON.parse(localStorage.getItem('products'));
        const favoriteProducts = JSON.parse(localStorage.getItem('favorites')) || [];

        if (cachedProducts) {
            displayProducts(cachedProducts, favoriteProducts);
        } else {
            fetch('https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json')
                .then(response => response.json())
                .then(products => {
                    localStorage.setItem('products', JSON.stringify(products));
                    displayProducts(products, favoriteProducts);
                })
                .catch(error => {
                    console.error("An error occurred while fetching the products:", error);
                });
        }
    };

    const displayProducts = (products, favoriteProducts) => {
        const allProductsContainer = $('.my-custom-carousel');

        products.forEach(product => {
            const isFavorite = favoriteProducts.includes(product.id);
            const heartClass = isFavorite ? 'heart-filled' : 'heart-empty';
            const productCard = `
                    <div class="product-card">
                        <a href="${product.url}" target="_blank" class="product-image-container">
                            <img src="${product.img}" alt="${product.name}" class="product-image"/>
                        </a>       
                        <div class="product-info">
                        <div class="heart-icon ${heartClass}" data-product-id="${product.id}"></div>
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-price">$${product.price}</p>               
                        </div>
                    <div>
                `;
            allProductsContainer.append(productCard);
        });

        $('.heart-icon').on('click', function () {
            const productId = $(this).data('product-id');
            const isAlreadyFavorite = favoriteProducts.includes(productId);

            if (isAlreadyFavorite) {
                const updatedFavorites = favoriteProducts.filter(id => id !== productId);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                $(this).removeClass('heart-filled').addClass('heart-empty');
            } else {
                favoriteProducts.push(productId);
                localStorage.setItem('favorites', JSON.stringify(favoriteProducts));
                $(this).removeClass('heart-empty').addClass('heart-filled');
            }
        });

    };

    const buildHTML = () => {
        const recommendationCarouselHTML = `
        <div class="container">
             <p class="combine-products-title">You Might Also Like</p>
             <button class="arrow-left">◀</button>
             <div class="my-custom-carousel"><!-- Product Cards will append here --></div>
             <button class="arrow-right">▶</button>     
        </div>
        `;

        $('.product-detail').append(recommendationCarouselHTML);

    };

    const buildCSS = () => {
        const css = `
            .container {
                position: relative;
                width: 100%;
                max-width: 1200px;
                margin: auto;
                padding: 20px;
                text-align: center;
            }
            
            .combine-products-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 15px;
                color: #333;
                text-align: left;
            }
            
            .my-custom-carousel {
                display: flex;
                gap: 15px;
                overflow-x: auto;
                padding-bottom: 10px;
                scroll-behavior: smooth;
            }
            
            .product-card {
                position: relative;
                width: 180px;
                border-radius: 10px;
                overflow: hidden;
                background: #fff;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
                padding: 10px;
                text-align: center;
                flex-shrink: 0;
            }
            
            .product-image-container {
                display: block;
                width: 100%;
                height: 200px;
                overflow: hidden;
                border-radius: 8px;
            }
            
            .product-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }
            
            .product-image:hover {
                transform: scale(1.05);
            }
            
            .product-info {
                padding-top: 10px;
            }
            
            .product-name {
                font-size: 14px;
                font-weight: bold;
                color: #333;
                margin-bottom: 5px;
            }
            
            .product-price {
                font-size: 14px;
                color: #007bff;
                font-weight: bold;
            }
            
            .heart-icon {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 20px;
                cursor: pointer;
            }
            
            .heart-empty::before {
                content: "♡";
                font-size: 22px;
                color: #ccc;
                transition: color 0.3s ease;
            }
            
            .heart-filled::before {
                content: "♥";
                font-size: 22px;
                color: blue;
            }   
            .arrow-left, .arrow-right {
                background-color: rgba(0, 0, 0, 0.5);
                position: absolute;
                top: 50%;           
                color: white;
                font-size: 20px;
                border: none;
                cursor: pointer;
                padding: 10px;
                border-radius: 50%;     
            }
            
            .arrow-left { 
                left: -30px;
            }
            .arrow-right { 
                right: -30px; 
            }
        `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');

    };

    const setEvents = () => {
        $('.arrow-left').on('click', () => {
            $('.my-custom-carousel').scrollLeft($('.my-custom-carousel').scrollLeft() - 200);
        });

        $('.arrow-right').on('click', () => {
            $('.my-custom-carousel').scrollLeft($('.my-custom-carousel').scrollLeft() + 200);
        });
    };

    init();

})();