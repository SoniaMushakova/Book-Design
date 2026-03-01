import React from 'react'
import A_CardText from './A_CardText.jsx'
import cards from '../data/cardsData'

export default function M_Card({ variant = 0 }) {
  const item = cards[variant] || cards[0]

  return (
    <a className="M_Card" href={item.href} aria-label={item.title}>
      <img className="A_CardImage" src={item.image} alt={item.title} loading="lazy" />
      <div>
        <A_CardText variant={variant} />
      </div>
    </a>
  )
}