export const environmentVariables = {
  port: Number(process.env.PORT) || 5566,
  JWT_SECRET: process.env.JWT_SECRET ?? 'devSuperSecret'
}
