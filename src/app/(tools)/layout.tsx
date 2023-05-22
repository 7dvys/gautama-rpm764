import Link from "next/link"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
          <div>
              <Link href={'#'} className="inicio">
                  Inicio
              </Link>
          </div>
          {children}
          <div></div>
      </>
    )
  }