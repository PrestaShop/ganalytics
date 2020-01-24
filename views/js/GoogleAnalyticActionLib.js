/**
 * 2007-2015 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author    PrestaShop SA <contact@prestashop.com>
 *  @copyright 2007-2015 PrestaShop SA
 *  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 **/

/* globals $, gtag, jQuery */

const GoogleAnalyticEnhancedECommerce = {

    setCurrency: function (Currency, gaMeasurementId) {
        gtag('config', gaMeasurementId, {'&cu': Currency});
    },

    setCampaign: function (Name, Source, Medium, gaMeasurementId) {
        gtag('config', gaMeasurementId, {'campaignName': Name});
        gtag('config', gaMeasurementId, {'campaignSource': Source});
        gtag('config', gaMeasurementId, {'campaignMedium': Medium});
    },

    toProductItem: function (product, impression) {
        const ProductFieldObject = ['id', 'name', 'brand', 'category', 'variant', 'price', 'quantity', 'coupon', 'list_name', 'list_position', 'price'];
        let productItem = {};
        if (product != null) {
            if (impression && product.quantity !== undefined) {
                delete product.quantity;
            }

            for (const [key, value] of Object.entries(product)) {
                for (let i = 0; i < ProductFieldObject.length; i++) {
                    if (key.toLowerCase() == ProductFieldObject[i]) {
                        if (value != null) {
                            productItem[ProductFieldObject[i]] = value;
                        }
                    }
                }
            }
        }
        return productItem;
    },

    toOrderItem: function (order) {
        const orderFieldObject = ['transaction_id', 'affiliation', 'value', 'tax', 'shipping', 'coupon', 'items', 'checkout_step', 'checkout_option'];
        let orderItem = {};

        if (order != null) {
            for (const [key, value] of Object.entries(order)) {
                for (let j = 0; j < orderFieldObject.length; j++) {
                    if (key.toLowerCase() == orderFieldObject[j]) {
                        orderItem[orderFieldObject[j]] = value;
                    }
                }
            }
        }
        return orderItem;
    },

    viewItemList: function (products) {
        let productItems = [];
        for (let product of products)
            productItems.push(this.toProductItem(product));
        gtag('event', 'view_item_list', {'items': productItems});
    },

    addProductDetailView: function (product) {
        let productItems = [this.toProductItem(product)];
        gtag('event', 'view_item', {'items': productItems, 'non_interaction': true});
    },

    addToCart: function (product) {
        let productItems = [this.toProductItem(product)];
        gtag('event', 'add_to_cart', {'items': productItems});
    },

    removeFromCart: function (product) {
        let productItems = [this.toProductItem(product)];
        gtag('event', 'remove_from_cart', {'items': productItems});
    },

    refundByOrderId: function (orderId) {
        gtag('event', 'refund', {"transaction_id": orderId, 'non_interaction': true})
    },

    addProductClick: function (product) {
        let clickPoint = $('a[href$="' + product.url + '"].quick-view');
        clickPoint.on("click", function () {
            const productItems = [GoogleAnalyticEnhancedECommerce.toProductItem(product)];
            gtag('event', 'select_content', {
                'items': productItems,
                'event_callback': function () {
                    return !gtag.loaded;
                }
            });
        });
    },

    addProductClickByHttpReferal: function (product) {
        let productItems = [this.toProductItem(product)];
        gtag('event', 'select_content', {
            'items': productItems,
            'event_callback': function () {
                return !gtag.loaded;
            },
            'non_interaction': true
        });
    },

    addTransaction: function (order,products) {
        let purchase = this.toOrderItem(order);
        purchase.event_callback = function () {
            $.get(order.url, {
                orderid: order.id,
                customer: order.customer
            })
        };
        gtag('event', 'purchase', purchase);
    },

    addCheckout: function (step, products) {
        let productItems = [];
        for (let product of products)
            productItems.push(this.toProductItem(product));

        if (step == 0) {
            gtag('event', 'begin_checkout', {'items': productItems});
        } else {
            gtag('event', 'checkout_progress', {'items': productItems});
        }
    },

    addCheckoutOption: function (step, option, value) {
        gtag('event', 'set_checkout_option', {
            "checkout_step": step,
            "checkout_option": option,
            "value": value
        });

    }
};
