import './globals.css';
import {
  Roboto_Flex as RobotoFlex,
  Bai_Jamjuree as BaiJamjuree
} from 'next/font/google';
import Link from 'next/link';

import Header from './components/Header';

const robotoFlex = RobotoFlex({
  subsets: ['latin'],
  variable: '--font-roboto'
});
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree'
});

export const metadata = {
  title: 'Predição de Cargas de Treinamento',
  description: 'App para calcular intensidade de exercícios resistidos'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning={true}
        className={`${robotoFlex.variable} ${baiJamjuree.variable} mx-auto flex h-full w-full flex-col gap-2 bg-blue-800 p-4 font-sans sm:w-3/5 sm:p-4`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
