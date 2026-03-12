import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Payment processing exception
 */
export class PaymentProcessingException extends HttpException {
  constructor(
    message: string,
    public readonly provider?: string,
    public readonly errorCode?: string,
  ) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        error: 'Payment Processing Failed',
        provider,
        errorCode,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

/**
 * Insufficient funds exception
 */
export class InsufficientFundsException extends HttpException {
  constructor(
    message = 'Insufficient funds',
    public readonly currentBalance?: number,
    public readonly requiredAmount?: number,
  ) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        error: 'Insufficient Funds',
        currentBalance,
        requiredAmount,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

/**
 * Payment gateway exception
 */
export class GatewayException extends HttpException {
  constructor(
    message: string,
    public readonly gateway: string,
    public readonly gatewayErrorCode?: string,
  ) {
    super(
      {
        statusCode: HttpStatus.BAD_GATEWAY,
        message,
        error: 'Gateway Error',
        gateway,
        gatewayErrorCode,
      },
      HttpStatus.BAD_GATEWAY,
    );
  }
}

/**
 * Refund exception
 */
export class RefundException extends HttpException {
  constructor(
    message: string,
    public readonly paymentId?: string,
    public readonly refundAmount?: number,
  ) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        error: 'Refund Failed',
        paymentId,
        refundAmount,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

/**
 * Wallet exception
 */
export class WalletException extends HttpException {
  constructor(
    message: string,
    public readonly walletId?: string,
  ) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        error: 'Wallet Error',
        walletId,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

/**
 * Card validation exception
 */
export class CardValidationException extends HttpException {
  constructor(
    message: string,
    public readonly cardLast4?: string,
  ) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        error: 'Card Validation Failed',
        cardLast4,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

/**
 * Fraud detection exception
 */
export class FraudDetectionException extends HttpException {
  constructor(
    message: string,
    public readonly riskScore?: number,
    public readonly riskFactors?: string[],
  ) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message,
        error: 'Fraud Detection',
        riskScore,
        riskFactors,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
