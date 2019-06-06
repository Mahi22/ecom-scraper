var amazonIn = {
  productTitle: '#productTitle',
  size: '#variation_size_name .selection',
  reviews: '#acrCustomerReviewText',
  mrp: '#price .priceBlockStrikePriceString',
  productPrice: '#priceblock_ourprice',
  buyBox: '#sellerProfileTriggerId',
  features: {
    selector: '#feature-bullets .a-unordered-list',
    replace:{
    regex: /\s\s+/g,
    replacement: ' '
    }
  },
  productDescription: {
    selector: '#productDescription',
    replace: {
     regex: /\s\s+/g,
     replacement: ' '
    }
  },
  variants: {
    listItem: '#variation_size_name .a-size-base'
  },
  prodDetails: {
    listItem: '#prodDetails table tbody tr',
    data: {
      label: '.label',
      value: {
        selector: '.value',
        replace: {
          regex: /\s\s+/g,
          replacement: ' '
        }
      }
    }
  },
  productDetails:{
    selector: '#detail_bullets_id table tbody tr',
    replace:{
      regex:/\s\s+/g,
      replacement:' '
    }
  },
  ratings: {
    selector: '#averageCustomerReviews',
    data: {
      total: '#acrPopover',
    }
  },
  ratingsTable: {
    listItem: 'table#histogramTable tbody tr',
    data: {
      label: {
        selector: 'td',
        eq: 0
      },
      value: {
        selector: 'td',
        eq: 2
      }
    }
  },
  featureRatings: {
    listItem: '#cr-dp-summarization-attributes > #cr-summarization-attributes-list > div > div > div',
    data: {
      label: {
        selector: 'span',
        texteq: 0
      },
      value: {
        selector: 'span',
        texteq: 1
      }
    }
  }
};

var flipkart = {
  productTitle: '._35KyD6',
  productPriceDetails: {
    listItem: '._2i1QSc < div',
      data:{
      productPrice: {
          selector: 'div',
          texteq: 0
      },
      productMrp: {
          selector: 'div',
          texteq: 1
      }
    }
  },
  sellerName: '#sellerName',
  reviewsAndRatings: {
    listItem: '._38sUEc > span',
    data:{
      ratings:{
        selector: 'span',
        texteq:0
      },
      reviews: {
        selector: 'span',
        texteq: 2
      }
    }
  },
  detailsReviewsAndRatings: {
    listItem: '._58ZIbs',
    data: {
      rate: '._3ApwOG',
      totalReviews: '.CamDho'
    }
  },
  productDescription: '._3cpW1u > div',
  productSpecifications: {
    listItem: '._2RngUh table tbody tr',
    data: {
      label: {
        selector: 'td',
        eq: 0
      },
      value: {
        selector: 'td',
        eq: 1
      }
    }
  },
  mostSearchedProducts: {
    listItem: '._1XtOOW > div'
  }
};

module.exports = {
  amazonIn,
  flipkart
};
