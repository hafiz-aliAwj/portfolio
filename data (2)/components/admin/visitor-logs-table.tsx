"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Search, Calendar, Globe, Monitor } from "lucide-react"
import { format } from "date-fns"

type VisitorLog = {
  _id: string
  ipAddress: string
  userAgent: string
  referrer: string
  page: string
  email?: string
  name?: string
  location?: string
  visitDate: string
  createdAt: string
}

type PaginationData = {
  total: number
  page: number
  limit: number
  pages: number
}

export function VisitorLogsTable() {
  const [logs, setLogs] = useState<VisitorLog[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchLogs = async (page = 1, limit = 10, search = "") => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })

      if (search) {
        queryParams.append("search", search)
      }

      const response = await fetch(`/api/visitor-log?${queryParams.toString()}`)
      const data = await response.json()

      if (response.ok) {
        setLogs(data.logs)
        setPagination(data.pagination)
      } else {
        console.error("Failed to fetch logs:", data.error)
      }
    } catch (error) {
      console.error("Error fetching visitor logs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs(pagination.page, pagination.limit, searchTerm)
  }, [pagination.page, pagination.limit])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLogs(1, pagination.limit, searchTerm)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.pages) {
      setPagination((prev) => ({ ...prev, page: newPage }))
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm:ss")
    } catch (error) {
      return "Invalid date"
    }
  }

  const truncateUserAgent = (userAgent: string) => {
    return userAgent.length > 50 ? `${userAgent.substring(0, 50)}...` : userAgent
  }

  if (loading && logs.length === 0) {
    return <div className="text-center py-8">Loading visitor logs...</div>
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by IP, page, or referrer..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Date & Time</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Page</TableHead>
              <TableHead className="hidden md:table-cell">Referrer</TableHead>
              <TableHead className="hidden lg:table-cell">User Agent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No visitor logs found
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(log.visitDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      {log.ipAddress}
                      {log.location && <span className="text-xs text-muted-foreground">({log.location})</span>}
                    </div>
                  </TableCell>
                  <TableCell>{log.page}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {log.referrer === "direct" ? (
                      <span className="text-muted-foreground">Direct visit</span>
                    ) : (
                      <a
                        href={log.referrer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {new URL(log.referrer).hostname}
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <span title={log.userAgent}>{truncateUserAgent(log.userAgent)}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1}-
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {pagination.page} of {pagination.pages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
