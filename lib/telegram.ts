import crypto from 'crypto';

export function verifyTelegramInitData(
  initData: string,
  botToken: string
): boolean {
  const secret = crypto
    .createHash('sha256')
    .update(botToken)
    .digest();

  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) return false;

  params.delete('hash');

  const dataCheckString = [...params.entries()]
    .sort()
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');

  const calculatedHash = crypto
    .createHmac('sha256', secret)
    .update(dataCheckString)
    .digest('hex');

  return calculatedHash === hash;
}
