"use client"

import { type SetStateAction, useEffect, useRef, useState } from "react"
import { Button } from "./buttonChat"
import { Input } from "./InputChat"
import { ZoomIn, ZoomOut, Search, Download, RotateCw, BookOpen, Loader2 } from "lucide-react"
import { eventBus } from "../lib/event-bus"

export interface CitationBox {
  id: string
  tag: string
  filename: string
  page: number
  snippet?: string
  bbox?: { x: number; y: number; width: number; height: number } // percent coords
}

export function PdfViewerDemo() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(15)
  const [zoom, setZoom] = useState(100)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)
  const [citations, setCitations] = useState<CitationBox[]>([])
  const [focusedCitation, setFocusedCitation] = useState<string | null>(null)

  const viewerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (data: any) => {
      if (data && data.filename) {
        // If the event contains bbox/tag info we add it to citations if not present
        if (data.tag) {
          setCitations((prev) => {
            if (prev.find((c) => c.tag === data.tag)) return prev
            return [
              ...prev,
              {
                id: `c_${Date.now()}`,
                tag: data.tag,
                filename: data.filename,
                page: data.page,
                snippet: data.highlight,
                bbox: data.bbox,
              },
            ]
          })
        }

        // focus the page and optionally a tag
        setCurrentPage(data.page || 1)
        if (data.tag) {
          setFocusedCitation(data.tag)
          setTimeout(() => setFocusedCitation(null), 3000)
        }
      }
    }

    eventBus.on("pdf:goToCitation", handler)
    return () => {
      eventBus.off("pdf:goToCitation", handler)
    }
  }, [])

  const documents = [
    { id: "1", name: "Performance_Ventes_Q2.pdf", pages: 15, active: true },
    { id: "2", name: "Rapport_Financier_Q4.pdf", pages: 23, active: false },
    { id: "3", name: "Specifications_Techniques.pdf", pages: 8, active: false },
  ]

  // helper to map percent bbox to style (assuming the white page container)
  const bboxToStyle = (bbox: CitationBox["bbox"]) => {
    if (!bbox) return {}
    return {
      left: `${bbox.x}%`,
      top: `${bbox.y}%`,
      width: `${bbox.width}%`,
      height: `${bbox.height}%`,
    } as React.CSSProperties
  }

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Document Tabs */}
      <div className="border-b border-border bg-muted/30">
        <div className="flex overflow-x-auto ">
          {documents.map((doc) => (
            <button
              key={doc.id}
              className={`px-4 py-2 text-sm whitespace-nowrap border-b-2 transition-colors ${
                doc.active
                  ? "border-accent text-orange-500 bg-transparent"
                  : "border-transparent text-muted-foreground text-black hover:text-foreground hover:bg-orange-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-3 w-3" />
                {doc.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
            <ZoomOut className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
            <ZoomIn className="h-3 w-3" />
          </Button>
          <div className="w-px h-4 bg-border mx-2" />
          <Button variant="outline" size="sm">
            <RotateCw className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsDownloading(true)
              setTimeout(() => setIsDownloading(false), 1200)
            }}
            disabled={isDownloading}
            title={isDownloading ? 'Téléchargement…' : 'Télécharger'}
          >
            {isDownloading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
              className="pl-8 h-8 w-40 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            Précédent
          </Button>
          <span className="text-sm">
            Page {currentPage} sur {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          >
            Suivant
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-muted/20 p-4">
        <div className="max-w-full mx-auto">
          {/* Simulated PDF Page */}
          <div
            ref={viewerRef}
            className="bg-white shadow-lg mx-auto border relative"
            style={{
              width: `${(595 * zoom) / 100}px`,
              height: `${(842 * zoom) / 100}px`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
         <div className="p-8 h-full">

              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">Guide d'intégration des Agents.pdf</h1>
                <div className="h-px bg-gray-300" />
                <div className="space-y-3 text-gray-700">
                  <p className="text-sm leading-relaxed">
                    Chapitre 3 : Utilisation des outils Marketing
                  </p>
                  <p className="text-sm leading-relaxed">
                    <span className="bg-yellow-200"> Le 'Manuel du Nouvel Agent' a été conçu pour vous guider à travers nos outils. La base de données partagée est votre premier point de contact, vous y trouverez tous les actifs de communication de l'agence, y compris les plans de communication et les templates.</span> Vous pouvez y télécharger nos modèles de fiches techniques, utiliser nos scripts de storytelling et contacter nos partenaires pour des shootings photo professionnels ou des visites 3D.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Pour chaque nouveau mandat, il est impératif de suivre le processus de communication défini, en s'assurant que tous les contenus sont en adéquation avec l'image de marque de l'agence. L'accès à ces ressources est conçu pour vous permettre de promouvoir vos biens de manière autonome tout en bénéficiant de la visibilité et de la réputation de l'agence Kretz.
                  </p>
                </div>
              </div>
            </div>

            {/* Overlay bounding boxes */}
            {citations
              .filter((c) => c.page === currentPage && c.bbox)
              .map((c) => (
                <div
                  key={c.tag}
                  className={`absolute border-2 ${focusedCitation === c.tag ? "border-primary shadow-lg" : "border-accent/60"} bg-transparent pointer-events-none`}
                  style={{ ...bboxToStyle(c.bbox), zIndex: focusedCitation === c.tag ? 40 : 30 }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
