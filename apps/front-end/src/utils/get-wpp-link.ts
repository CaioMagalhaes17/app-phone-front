export function getWppLink(buttonCase: 'storeProfile' | 'product', number: string) {

  return `https://api.whatsapp.com/send/?phone=${number}&text=${getWppText(buttonCase)}&type=phone_number&app_absent=0`
}

function getWppText(buttonCase: 'storeProfile' | 'product') {
  if (buttonCase === 'storeProfile') return 'Olá, vi sua loja pelo Ponto dos Celulares e gostaria de tirar algumas dúvidas.'
}