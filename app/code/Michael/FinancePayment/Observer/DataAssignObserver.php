<?php
/**
*
* Observer: set additional data in payment information
* 
**/

namespace Michael\FinancePayment\Observer;

use Magento\Framework\Event\Observer;
use Magento\Payment\Observer\AbstractDataAssignObserver;
use Magento\Quote\Api\Data\PaymentInterface;

class DataAssignObserver extends AbstractDataAssignObserver
{
    /**
    * @var array
    */
    protected $additionalInformationList = [
        'addDob',
        'incom'
    ];

    /**
    * @param Observer $observer
    * @return void
    */
    public function execute(Observer $observer)
    {
        $data = $this->readDataArgument($observer);
        $additionalData = $data->getData(PaymentInterface::KEY_ADDITIONAL_DATA);
        if (!is_array($additionalData)) {

          return;
        }

        $paymentInfo = $this->readPaymentModelArgument($observer);
        $paymentInfo->setAdditionalInformation(
          $additionalData
        );
    }
}
