import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useVirtualList } from '@reactuses/core'
import { useNavigate } from 'react-router-dom'
import photo from '@/assets/images/fallback/chat-icon.png'

const allItems = Array.from(Array(6000).keys()).map(i => ({
  height: 64,
  text: 'Родитель ' + i,
}))

export const ChatList = () => {
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [defaultHeight, setDefaultHeight] = useState(0)
  const container = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  const updateDefaultHeight = () => {
    setDefaultHeight(container.current?.getBoundingClientRect().height ?? 0)
  }

  useLayoutEffect(() => {
    if (!container || !container.current) return
    updateDefaultHeight()
  }, [container])

  const filteredItems = useMemo(() => {
    return allItems.filter(i => i.text.startsWith(search.toLowerCase()))
  }, [search])

  const useVirtualListOptions = useMemo(() => {
    return {
      itemHeight: (i: number) => filteredItems[i].height + 8,
      overscan: 10,
      defaultHeight: defaultHeight,
    }
  }, [filteredItems, defaultHeight])

  const {
    list,
    containerProps: { style, ...containerProps },
    wrapperProps,
    scrollTo,
  } = useVirtualList(filteredItems, useVirtualListOptions)

  const handleScrollTo = () => {
    scrollTo(index)
  }

  const openChat = (userId: string | number) => {
    navigate(`/messenger/${userId}`)
  }

  return (
    <div className='fullscreen flex flex-col overflow-y-hidden' ref={container}>
      {/*<div>
        <div> Jump to index</div>
        <input
          value={index}
          onChange={v => setIndex(v.currentTarget.valueAsNumber)}
          placeholder='Index'
          type='number'
        />
        <button onClick={handleScrollTo} style={{ marginLeft: 20 }}>
          Go
        </button>
      </div>
      <div style={{ marginTop: 20 }}>
        <div>Filter list by size</div>
        <input
          value={search}
          placeholder='e.g. small, medium, large'
          onChange={v => setSearch(v.currentTarget.value)}
          type='search'
          style={{ minWidth: '20rem' }}
        />
      </div>*/}
      <div
        {...containerProps}
        style={{ height: defaultHeight }}
        className='overflow-y-scroll h-min'
      >
        <div style={wrapperProps.style} className='divide-y divide-zinc-600'>
          {list.map(item => {
            const { index, data } = item
            return (
              <div
                key={index}
                data-item={index}
                className='group flex items-center h-8 mb-1'
                style={{
                  height: `${data.height}px`,
                }}
                onClick={() => openChat(index)}
              >
                <img
                  src={photo}
                  className='w-10 h-10 rounded-full group-first:[view-transition-name:chat-image]'
                />
                {data.text}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
