import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { boardTypes } from '../../data/constants'
import { DayDescriptor, FormState, SelectionsState } from '../../App.types'
import { calculateSum } from '../calculations/calculateSum'
import { formatDate } from '../dates/formatDate'
// @ts-ignore
if (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
  // @ts-ignore
  pdfMake.vfs = pdfFonts.pdfMake.vfs
}

export function exportBookingToPdf(
  form: FormState,
  days: DayDescriptor[],
  selections: SelectionsState,
) {
  const boardTypeLookup = boardTypes.reduce<Record<string, string>>((acc, board) => {
    acc[board.code] = board.name
    return acc
  }, {})

  const { priceRows, grandTotal } = calculateSum(form, days, selections)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
    }).format(value)

  const formatDateForTable = (subtitle: string) => {
    if (subtitle === 'Date TBD') return subtitle
    const parts = subtitle.split(', ')
    if (parts.length >= 2) {
      return parts[1]
    }
    return subtitle
  }

  const docDefinition: any = {
    content: [
      {
        text: 'Hotel Booking Summary',
        style: 'header',
        margin: [0, 0, 0, 20],
      },
      {
        text: 'Configuration',
        style: 'sectionHeader',
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          {
            width: 'auto',
            text: [
              { text: 'Citizenship: ', bold: true },
              { text: form.citizenship || '—' },
            ],
          },
        ],
        margin: [0, 0, 0, 5],
      },
      {
        columns: [
          {
            width: 'auto',
            text: [
              { text: 'Start date: ', bold: true },
              { text: formatDate(form.startDate) },
            ],
          },
        ],
        margin: [0, 0, 0, 5],
      },
      {
        columns: [
          {
            width: 'auto',
            text: [
              { text: 'Trip length: ', bold: true },
              { text: `${form.days} days` },
            ],
          },
        ],
        margin: [0, 0, 0, 5],
      },
      {
        columns: [
          {
            width: 'auto',
            text: [
              { text: 'Destination: ', bold: true },
              { text: form.destination || '—' },
            ],
          },
        ],
        margin: [0, 0, 0, 5],
      },
      {
        columns: [
          {
            width: 'auto',
            text: [
              { text: 'Board type: ', bold: true },
              { text: boardTypeLookup[form.boardType] || '—' },
            ],
          },
        ],
        margin: [0, 0, 0, 20],
      },
      {
        text: 'Price',
        style: 'sectionHeader',
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          headerRows: 0,
          widths: ['*', '*', 'auto'],
          body: [
            ...priceRows.map((row) => [
              { text: formatDateForTable(row.day.subtitle), style: 'tableCell' },
              {
                text:
                  [
                    row.hotel ? `${row.hotel.name} (${formatCurrency(row.hotel.price)})` : null,
                    row.lunch ? `${row.lunch.name} (${formatCurrency(row.lunch.price)})` : null,
                    row.dinner ? `${row.dinner.name} (${formatCurrency(row.dinner.price)})` : null,
                  ]
                    .filter(Boolean)
                    .join(' + ') || 'No selections',
                style: 'tableCell',
                color: '#666',
              },
              { text: formatCurrency(row.total), style: 'tableCell', alignment: 'right', bold: true },
            ]),
            [
              { text: 'Grand Total', style: 'tableCell', bold: true, fontSize: 14 },
              { text: '', style: 'tableCell' },
              { text: formatCurrency(grandTotal), style: 'tableCell', alignment: 'right', bold: true, fontSize: 14 },
            ],
          ],
        },
        margin: [0, 0, 0, 20],
      },
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        alignment: 'center',
      },
      sectionHeader: {
        fontSize: 18,
        bold: true,
      },
      tableCell: {
        fontSize: 11,
        margin: [5, 5, 5, 5],
      },
    },
    defaultStyle: {
      fontSize: 11,
    },
  }

  try {
    const pdfDoc = pdfMake.createPdf(docDefinition)
    pdfDoc.download('booking.pdf')
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}