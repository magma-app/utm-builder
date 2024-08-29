'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Link, QrCode } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import QRCode from 'qrcode'
import { format } from 'date-fns'

export default function UTMBuilder() {
  const [pageUrl, setPageUrl] = useState('')
  const [source, setSource] = useState('')
  const [finalUrl, setFinalUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  useEffect(() => {
    if (pageUrl) {
      try {
        const url = new URL(pageUrl)
        url.searchParams.set('utm_source', source)
        setFinalUrl(url.toString())
      } catch (e) {
        setFinalUrl('')
      }
    } else {
      setFinalUrl('')
    }
  }, [pageUrl, source])

  useEffect(() => {
    if (finalUrl) {
      QRCode.toDataURL(finalUrl, { width: 300, margin: 2 })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error(err))
    } else {
      setQrCodeUrl('')
    }
  }, [finalUrl])

  const handleCopy = () => {
    if (finalUrl) {
      navigator.clipboard.writeText(finalUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownloadQR = () => {
    if (qrCodeUrl) {
      const currentDate = format(new Date(), 'yyyy-MM-dd')
      const fileName = `${currentDate}-Magma link-${source || 'unknown'}.png`
      
      const link = document.createElement('a')
      link.href = qrCodeUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] p-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8">
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-100 p-4 flex items-center justify-between border-b">
            <h1 className="text-center font-semibold text-gray-700">Magma relation source builder</h1>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <Label htmlFor="pageUrl" className="block text-base">Provide campaign link</Label>
              </div>
              <Input
                id="pageUrl"
                placeholder="https://magma.am/"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
                className="w-full mt-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <Label htmlFor="source" className="block text-base">Indicate the source you want to be displayed</Label>
              </div>
              <Input
                id="source"
                placeholder="newsletter-juin"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full mt-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <Label htmlFor="finalUrl" className="block text-base">That's it, here is the link you can use</Label>
              </div>
              <Textarea
                id="finalUrl"
                value={finalUrl}
                readOnly
                className="w-full h-32 bg-gray-50 text-sm mt-2"
                placeholder="Your link will appear here..."
              />
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-end space-x-2">
            <Button
              onClick={handleCopy}
              className={`flex items-center ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            <Button
              onClick={handleDownloadQR}
              className="flex items-center bg-purple-500 hover:bg-purple-600"
              disabled={!finalUrl}
            >
              <QrCode className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        </div>

        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="p-6 space-y-4">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-800">Relations Table Preview</h2>
              <p className="text-gray-600">This is how source will look like in your Relations table</p>
            </div>
            <div className="shadow-lg rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Prospect</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ambassador</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div>Albus Dumbledore</div>
                      <div className="text-sm text-gray-500">albus@hogwarts.com</div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        In progress
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/joris-square-profil-4AzQ1uTcRMIRcQBbgkxW4fBrdvhRMb.png" alt="Joris Renaud" className="w-8 h-8 rounded-full mr-2 object-cover" />
                        <span>Joris Renaud</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Link className="h-4 w-4 mr-2" />
                        <span>{source || 'newsletter-juin'}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}