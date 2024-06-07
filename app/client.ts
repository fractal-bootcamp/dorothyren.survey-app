//used to interface with database

import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export default client