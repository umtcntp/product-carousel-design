# Product Recommendation Carousel

This project adds a product recommendation carousel to the **product detail page** of the LC Waikiki website. When viewing a product on the site, the carousel suggests other products that the user might like.

## How to Use

1. Open the [LC Waikiki website](https://www.lcwaikiki.com/) in your browser.
2. Navigate to any **product detail page** by clicking on a product.
3. Open **Chrome DevTools**:
   - Right-click on the page and select **Inspect**.
   - Go to the **Console** tab.
4. Copy and paste the entire JavaScript code into the console.
5. Hit **Enter** to run the code.

The product recommendation carousel will appear on the product detail page, displaying a list of products you might like, with the ability to mark products as favorites.

## Features

- **Product Display**: Displays product cards with images, names, and prices.
- **Favorite Products**: Mark products as favorites. Favorite products are stored in the browser's localStorage.
- **Carousel Navigation**: Scroll through recommended products using left and right arrows.
- **Automatic Data Loading**: Product data is either fetched from a local cache or loaded from a remote JSON file if not available.

## Technologies Used

- **JavaScript**
- **jQuery**
- **CSS**
- **LocalStorage**

## Limitations

- The carousel only works on the **product detail page** of the LC Waikiki website.
- To use this, you must paste the code into the Chrome DevTools console after opening a product page.
