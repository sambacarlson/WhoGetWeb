import React from 'react'

const Alerts = (props: { type: 'error' | 'info', message: string }) => {
  return (
    <div className="absolute top-1/3 z-50 text-lg w-full text-center text-white bg-opacity-40 flex item-center justify-center">
      {
        props.type === 'error' &&
        <p className="bg-tertiary w-2/3 md:w-1/3 p-5 rounded-md">{props.message}</p>
      }
      {
        props.type === 'info' &&
        <p className="bg-secondary w-2/3 md:w-1/3 p-5 rounded-md">{props.message}</p>
      }
    </div>
  )
}

export default Alerts
