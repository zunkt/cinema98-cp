import Tabulator from 'tabulator-tables'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

export default function useTabulator(tabulator, tabulatorRef) {
  const store = useStore()
  const router = useRouter()

  const initTabulator = (apiUrl, data, columns, filter, rowClick, layout = 'fitColumns') => {
    const token = localStorage.getItem('token')
    // console.log(token)

    tabulator.value = new Tabulator(tabulatorRef.value, {
      ajaxURL: process.env.VUE_APP_API_URL + apiUrl,
      ajaxConfig: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      },
      ajaxFiltering: true,
      ajaxSorting: true,
      printAsHtml: true,
      printStyled: true,
      pagination: 'remote',
      paginationSize: 20,
      paginationSizeSelector: [20, 30, 40],
      layout: layout,
      // responsiveLayout: "collapse",
      placeholder: 'Nothing To Show',
      ajaxResponse: function(url, params, response) {
        console.log('data: ', response.data)
        if (typeof (filter) == 'undefined' || filter.field == null) {
          if (typeof (response.data.deals) !== 'undefined') {
            const rs = response.data.deals

            if (rs && rs.meta) {
              Object.entries(rs.meta).forEach(x => {
                rs[x[0]] = x[1]
              })
              delete rs.meta
            }
            return rs
          } else {
            const rs = response.data[data]
            // console.log(rs)
            if (rs && rs.meta) {
              Object.entries(rs.meta).forEach(x => {
                rs[x[0]] = x[1]
              })
              delete rs.meta
            }
            return rs
          }
        }

        if (filter) {
          const filterTmp = filter
          if (filterTmp.field && filterTmp.submitted) {
            const rs = response.data[data]

            if (rs && rs.meta) {
              Object.entries(rs.meta).forEach(x => {
                rs[x[0]] = x[1]
              })
              delete rs.meta
            }

            return rs
          }
        } else {
          const rs = response.data[data]
          console.log('rs', rs)
          if (rs && rs.meta) {
            Object.entries(rs.meta).forEach(x => {
              rs[x[0]] = x[1]
            })
            delete rs.meta
          }

          return rs
        }
      },
      columns: columns,
      ajaxError: function (xhr) {
        if (xhr.status === 401) {
          store.dispatch('auth/logoutSuccess', false)
        }
      },
      rowClick: function (e, row) {
        if (rowClick) {
          router.push(`/${rowClick}/${row.getData().id}`)
        }
      },
      rowFormatter: function() {
      },
      // locale: true,
      langs: {
        ko: {
          pagination: {
            page_size: '페이지 크기'
          }
        },
        en: {
          pagination: {
            page_size: 'Size Page'
          }
        },
        vi: {
          pagination: {
            page_size: '페이지 크기'
          }
        }
      }
    })

    tabulator.value.setLocale('en')
  }

  const reInitOnResizeWindow = () => {
    window.addEventListener('resize', () => {
      tabulator.value.redraw()
    })
  }

  return {
    reInitOnResizeWindow,
    initTabulator
  }
}
