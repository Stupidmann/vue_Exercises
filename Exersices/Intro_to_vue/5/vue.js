const app = new Vue({
    el: '#app',
    data: {
      product: 'Socks',
      image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
      onSale:true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId:11,
          variantColor:"Green",
          variantImage:'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg'
        },
        {
          variantId:12,
          variantColor:"Blue",
          variantImage:'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg'
        }
      ],
      sizes: [
        {
          sizeId:1,
          size:9
        },
        {
          sizeId:2,
          size:10
        },
        {
          sizeId:3,
          size:11
        },
      ],
      cart:0,
      },
      methods: {
        addToCart: function() {
          this.cart = this.cart + 1
        },
        updateProduct: function(img){
          this.image = img
        },
        removeFromCart: function () {
          if (this.cart > 0){
            this.cart -= 1
          }
        }
      }
  })