const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    item_type: {
      type: String,
      required: true,
      enum: ["product", "service"],
      default: "product",
    },
    item_name: String,
    item_code: String,
    item_description: String,
    item_images: [String],
    item_category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
    item_category_name: String,
    from_inventory: {
      type: Boolean,
      default: false,
    },

    unit: {
      type: String,
      enum: ["feet", "inches", "units", "numbers"],
    },
    opening_stock: Number,
    as_of_date: Date,
    low_stock_warning: Boolean,

    pricing_purchase_price: Number,
    gst_tax_rate: {
      type: String,
      enum: ["exempted", "0", "0.1", "0.25", "3", "5"],
    },
    inclusive_of_tax: Boolean,
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
