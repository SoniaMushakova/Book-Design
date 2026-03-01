import React, { Component } from 'react'

export default class A_Chips extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: false,
      isLocked: false
    }

    this.redirectTimer = null
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillUnmount() {
    if (this.redirectTimer) clearTimeout(this.redirectTimer)
  }

  handleClick(e) {
    const { href } = this.props
    const { isLocked } = this.state

    if (isLocked) return

    e.preventDefault()
    this.setState({ isActive: true, isLocked: true })

    this.redirectTimer = setTimeout(() => {
      if (href) window.location.assign(href)
      else this.setState({ isActive: false, isLocked: false })
    }, 200)
  }

  render() {
    const { text = 'Чипс', className = '', href = '#' } = this.props
    const { isActive } = this.state

    return (
      <a
        href={href}
        className={`A_Chips ${isActive ? 'A_Chips--active' : ''} ${className}`.trim()}
        onClick={this.handleClick}
        aria-pressed={isActive}
        tabIndex={0}
      >
        {text}
      </a>
    )
  }
}