<?php
/**
* Get current product details
*
*/
namespace Michael\Finance\Block;
class Product extends \Magento\Framework\View\Element\Template
{
    /**
     * Registry instance
     *
     * @var Registry
     */
    protected $_registry;

    /**
     * Helper instance
     *
     * @var Currency
     */
    protected $_currency;


    /**
     *
     * @param \Magento\Backend\Block\Template\Context $context
     * @param \Magento\Framework\Registry $registry
     * @param \Magento\Framework\Pricing\Helper\Data $currency
     * @param Array $data
     *
     */
    public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Magento\Framework\Registry $registry,
        \Magento\Framework\Pricing\Helper\Data $currency,
        array $data = []
    )
    {
        $this->_registry = $registry;
        $this->_currency = $currency;
        parent::__construct($context, $data);
    }

    /**
     * Prepare _prepareLayout
     *
     * @return _prepareLayout
     */
    public function _prepareLayout()
    {

        return parent::_prepareLayout();
    }

    /**
     * Get current category
     *
     * @return String
     */
    public function getCurrentCategory()
    {

        return $this->_registry->registry('current_category');
    }

    /**
     * Get  current product
     *
     * @return Object
     */
    public function getCurrentProduct()
    {

        return $this->_registry->registry('current_product');
    }

    /**
     * Get formatted price
     *
     * @return String
     */
    public function getFormattedPrice()
    {
        $price = $this->getCurrentProduct->getFinalPrice;
        return $this->_currency->currency(price, true, false);
        unset($price);
    }

}
