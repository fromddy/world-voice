'use client';
import { Button, LiveFeedback } from '@worldcoin/mini-apps-ui-kit-react';
import { MiniKit, Tokens, tokenToDecimals } from '@worldcoin/minikit-js';
import { useState } from 'react';

/**
 * This component is used to pay a user
 * The payment command simply does an ERC20 transfer
 * But, it also includes a reference field that you can search for on-chain
 */
export const Pay = () => {
  const [buttonState, setButtonState] = useState<
    'pending' | 'success' | 'failed' | undefined
  >(undefined);
  const [amount, setAmount] = useState<number>(0.5);

  const onClickPay = async () => {
    setButtonState('pending');

    const res = await fetch('/api/initiate-payment', {
      method: 'POST',
    });
    const { id } = await res.json();

    const result = await MiniKit.commandsAsync.pay({
      reference: id,
      to: '0x4b3E4A3544F3Efa8A2A9b41bB5f0BEB6D0CA14d8',// this is the default address
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(amount, Tokens.WLD).toString(),
        },
      ],
      description: `Tip ${amount} WLD`,
    });

    console.log(result.finalPayload);
    if (result.finalPayload.status === 'success') {
      setButtonState('success');
      // It's important to actually check the transaction result on-chain
      // You should confirm the reference id matches for security
      // Read more here: https://docs.world.org/mini-apps/commands/pay#verifying-the-payment
    } else {
      setButtonState('failed');
      setTimeout(() => {
        setButtonState(undefined);
      }, 3000);
    }
  };

  return (
    <div className="grid w-full gap-4 p-4 rounded-xl border border-white/20 bg-transparent">
      <p className="text-lg font-semibold text-white">Support Creator</p>

      <div className="flex gap-2 w-full">
        {[0.5, 5, 50].map((val) => (
          <button
            key={val}
            onClick={() => setAmount(val)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 relative overflow-hidden ${amount === val
              ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-105 font-bold border-2 border-white'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/30 hover:border-white/50'
              }`}
          >
            {amount === val && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-[shimmer_2s_infinite]" />
            )}
            {val} WLD
          </button>
        ))}
      </div>

      <LiveFeedback
        label={{
          failed: 'Payment failed',
          pending: 'Payment pending',
          success: 'Payment successful',
        }}
        state={buttonState}
        className="w-full"
      >
        <Button
          onClick={onClickPay}
          disabled={buttonState === 'pending'}
          size="lg"
          variant="primary"
          className="w-full"
        >
          Tip {amount} WLD
        </Button>
      </LiveFeedback>
    </div>
  );
};
