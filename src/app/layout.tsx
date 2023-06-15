import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Gautama-rpm937',
  description: 'Static Site - Tool',
  icons:{
    icon:'alien.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
 
      <body>
        <main className="container">
          <nav className='homeNav'>
              <Link href={'/'} className="navItem">
                  Inicio
              </Link>
              {/* <Link href={'/config'} className="navItem">
                  Config
              </Link> */}
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}
