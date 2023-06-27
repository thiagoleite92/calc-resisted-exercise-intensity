import './globals.css';
import {
  Roboto_Flex as RobotoFlex,
  Bai_Jamjuree as BaiJamjuree
} from 'next/font/google';

import Header from '../components/Header';
import AppProvider from '../context/AppAprovider';

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
    <html lang='en' className='h-screen w-screen'>
      <body
        suppressHydrationWarning={true}
        className={`${robotoFlex.variable} ${baiJamjuree.variable} mx-auto flex h-full w-full flex-col gap-2 bg-blue-900 p-4 font-sans sm:w-3/5 sm:p-4`}
      >
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
