/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        PrinterName:process.env.PrinterName,
        ThermalMethod:process.env.ThermalMethod,
        Host:process.env.Host,
        CbUser:process.env.CbUser,
        CbPass:process.env.CbPass
    },
    
}

module.exports = nextConfig
