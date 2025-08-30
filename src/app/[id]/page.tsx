"use client"

import DetailedView from "@/components/DetailedView"
import { useParams } from "next/navigation"
import React from "react"

const Page = () => {
  const { id } = useParams()
  return <DetailedView id={id} />
}

export default Page
