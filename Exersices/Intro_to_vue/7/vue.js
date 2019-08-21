const app = new Vue({
    el: '#app',
    data: {
      product: 'Socks',
      brand:"Vue Mastery",
      selectedVariant:0,
      onSale:false,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId:11,
          variantColor:"Green",
          variantImage:'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
          variantStock:10
        },
        {
          variantId:12,
          variantColor:"Blue",
          variantImage:'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
          variantStock:0
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
        updateProduct: function(index){
          this.selectedVariant = index
          console.log(index)
        },
        removeFromCart: function () {
          if (this.cart > 0){
            this.cart -= 1
          }
        }
      },
      computed: {
        title() {
          return this.brand + " " + this.product
        },
        image() {
          return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
          return this.variants[this.selectedVariant].variantStock
        },
        print() {
          return this.brand + " " + this.product
        }
      }
  })