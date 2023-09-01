import './globals.css'
import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Inter, Racing_Sans_One, Roboto } from 'next/font/google'
import { ReactQueryProvider } from './ReactQueryProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto',
})
const racingSansOne = Racing_Sans_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-racing-sans-one',
})

export const metadata: Metadata = {
  title: 'CheckMate',
  description:
    'Descubra a eficiência e a organização elevada com CheckMate, a ferramenta definitiva de gestão de tarefas e listas. Projetado com a última tecnologia Next.js, nosso aplicativo oferece uma experiência perfeita e responsiva para ajudar você a conquistar suas metas diárias. Com recursos intuitivos de arrastar e soltar, colaboração em tempo real e personalização completa, CheckMate simplifica a maneira como você planeja, executa e realiza. Aumente sua produtividade e alcance o próximo nível de organização com CheckMate.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`font-body ${inter.variable} ${racingSansOne.variable} ${roboto.variable} 
        bg-zinc-900`}
      >
        <ReactQueryProvider>
          {children}
          <ToastContainer />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
