<?php
/**
 * Block for payment->Additional Information
 */

namespace Michael\FinancePayment\Block\Info;

class PaymentMethod extends \Magento\Sales\Block\Adminhtml\Order\View
{
    protected $_paymentmethod;

    public function __construct(
        \Magento\Backend\Block\Widget\Context $context,
        \Magento\Framework\Registry $registry,
        \Magento\Sales\Model\Config $salesConfig,
        \Magento\Sales\Helper\Reorder $reorderHelper,
        \Michael\FinancePayment\Model\PaymentMethod $_paymentmethod,
        array $data = []
    ) {
        $this->_reorderHelper = $reorderHelper;
        $this->_coreRegistry = $registry;
        $this->_salesConfig = $salesConfig;
        $this->_paymentmethod = $_paymentmethod;
        parent::__construct($context, $registry, $salesConfig, $reorderHelper, $data);
    }

}
