Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `            
    <div class="product">
      
        <div class="product-image">
            <img :src="image" />
        </div>
        
        <div class="product-info">
            <h1>{{ title }}</h1>

            <span v-if="inStock">On Sale!</span>
            <p v-else
                :class="{outOfStock: !inStock}">Out of Stock</p>

            <p>Shipping: {{shipping}}</p>

            <product-details :details="details"></product-details>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor:variant.variantColor}"
                @mouseover= "updateProduct(index)">
            </div>

            <ul v-for="size in sizes" :key="sizes.sizesId">
                <li>{{size.size}}</li>
            </ul>

            <button v-on:click="addToCart" 
                :disabled = "!inStock" 
                :class = "{disabledButton:!inStock}">
                Add to Cart</button>
            <button @click="removeFromCart" 
                :disabled = "!inStock"
                :class = "{disabledButton:!inStock}"
                >Remove From Cart</button>

            

            <div v-show="onSale">
                <p>{{print}}</p>
            </div>

        </div>
        
      </div>
    
  `,
  data() {
    return {
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
      
    }
    },
    methods: {
      addToCart: function() {
        this.$emit("add-to-cart",this.variants[this.selectedVariant].variantId)
      },
      updateProduct: function(index){
        this.selectedVariant = index
        console.log(index)
      },
      removeFromCart: function () {
        this.$emit("add-to-cart2",this.variants[this.selectedVariant].variantId)
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
      },
      shipping() {
        if (this.premium) {
          return "Free"
        }
        return 2.99
      }
    }
})
Vue.component('product-details', {
  props:{
    details:{
      type:Array,
      required:true
    }
  },

  template: `
    <ul>
      <li v-for="detail in details">{{detail}}</li>
    </ul>
  `,
    
})

const app = new Vue({
    el: '#app',
    data:{
      premium:false,
      cart:[],
    },
    methods: {
      updateCart(id) {
        this.cart.push(id)
      },
      updateCart2(id) {
        if (this.cart.length > 0){
          for ( let i = 0; i < this.cart.length; i++){ 
            if ( this.cart[i] === id) {
              this.cart.splice(i, 1); 
            }
         }
        }
      }
    }
  })