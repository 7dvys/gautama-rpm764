/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        PrinterName:process.env.PrinterName,
        ThermalMethod:process.env.ThermalMethod,
        Host:process.env.Host
    },
    
}

module.exports = nextConfig
