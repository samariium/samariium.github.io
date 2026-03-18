import { useEffect, useState, useRef, useCallback } from 'react'
import './InfraDefenseGame.css'

const GAME_CONFIG = {
  width: 800,
  height: 500,
  towerCost: 100,
  initialHealth: 100,
  initialMoney: 250,
}

const TOWER_TYPES = {
  FIREWALL: { name: 'Firewall', cost: 100, range: 120, damage: 15, rate: 1.5, color: '#FF6B6B', emoji: '🧱' },
  LOAD_BALANCER: { name: 'Load Balancer', cost: 150, range: 150, damage: 10, rate: 1, color: '#4ECDC4', emoji: '⚖️' },
  MONITOR: { name: 'Monitor', cost: 80, range: 180, damage: 5, rate: 2, color: '#95E1D3', emoji: '📊' },
  CACHE: { name: 'Cache', cost: 120, range: 100, damage: 20, rate: 1.2, color: '#FFD93D', emoji: '⚡' },
}

const THREAT_TYPES = {
  BUG: { health: 20, speed: 1.5, value: 50, emoji: '🐛', color: '#8CFF6A' },
  OUTAGE: { health: 40, speed: 1, value: 100, emoji: '💥', color: '#FFC300' },
  SECURITY: { health: 30, speed: 1.8, value: 75, emoji: '🔓', color: '#FF5555' },
  SLOW: { health: 25, speed: 0.8, value: 60, emoji: '🐢', color: '#B19CD9' },
}

export default function InfraDefenseGame() {
  const canvasRef = useRef(null)
  const [gameState, setGameState] = useState('menu') // menu, playing, gameOver, victory
  const [stats, setStats] = useState({
    health: GAME_CONFIG.initialHealth,
    money: GAME_CONFIG.initialMoney,
    kills: 0,
    wave: 1,
    score: 0,
  })
  const [gameData, setGameData] = useState({
    towers: [],
    threats: [],
    projectiles: [],
    spawnCount: 0,
  })
  const lastSpawnRef = useRef(0)
  const gameLoopRef = useRef(null)
  const [selectedTower, setSelectedTower] = useState(null)
  const [gameSpeed, setGameSpeed] = useState(1)

  const startGame = useCallback(() => {
    setGameState('playing')
    setStats({
      health: GAME_CONFIG.initialHealth,
      money: GAME_CONFIG.initialMoney,
      kills: 0,
      wave: 1,
      score: 0,
    })
    setGameData({ towers: [], threats: [], projectiles: [], spawnCount: 0 })
    lastSpawnRef.current = 0
  }, [])

  // Spawn threats over time
  useEffect(() => {
    if (gameState !== 'playing') return

    const spawnInterval = setInterval(() => {
      setGameData((prev) => {
        const newSpawnCount = prev.spawnCount + 1
        const waveSize = 3 + stats.wave * 2
        const threatTypes = Object.keys(THREAT_TYPES)

        if (newSpawnCount >= waveSize) {
          // Wave complete
          if (newSpawnCount >= waveSize + 30) {
            setStats((s) => ({ ...s, wave: s.wave + 1 }))
            return { ...prev, spawnCount: 0 }
          }
        }

        if (newSpawnCount < waveSize) {
          const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)]
          const threat = {
            id: Math.random(),
            type: threatType,
            x: 20,
            y: 50 + Math.random() * (GAME_CONFIG.height - 100),
            health: THREAT_TYPES[threatType].health,
            maxHealth: THREAT_TYPES[threatType].health,
          }
          return { ...prev, threats: [...prev.threats, threat], spawnCount: newSpawnCount }
        }

        return { ...prev, spawnCount: newSpawnCount }
      })
    }, 800)

    return () => clearInterval(spawnInterval)
  }, [gameState, stats.wave])

  // Main game loop
  useEffect(() => {
    if (gameState !== 'playing') return

    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'rgba(10, 20, 40, 0.9)'
      ctx.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height)

      // Grid background
      ctx.strokeStyle = 'rgba(89, 243, 255, 0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i < GAME_CONFIG.width; i += 40) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, GAME_CONFIG.height)
        ctx.stroke()
      }

      setGameData((prev) => {
        let newData = {
          towers: prev.towers,
          threats: [...prev.threats],
          projectiles: [...prev.projectiles],
          spawnCount: prev.spawnCount,
        }

        // Update threats
        newData.threats = newData.threats.map((threat) => ({
          ...threat,
          x: threat.x + (THREAT_TYPES[threat.type].speed * gameSpeed) / 10,
        }))

        // Remove threats that reached end
        let damageDealt = 0
        newData.threats = newData.threats.filter((threat) => {
          if (threat.x > GAME_CONFIG.width) {
            damageDealt += 10
            return false
          }
          return true
        })

        if (damageDealt > 0) {
          setStats((s) => {
            const newHealth = Math.max(0, s.health - damageDealt)
            if (newHealth <= 0) setGameState('gameOver')
            return { ...s, health: newHealth }
          })
        }

        // Update projectiles and check collisions
        newData.projectiles = newData.projectiles.filter((proj) => {
          const dx = proj.targetX - proj.x
          const dy = proj.targetY - proj.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 10) {
            // Hit target
            newData.threats = newData.threats.map((threat) => {
              if (threat.id === proj.targetId) {
                return { ...threat, health: threat.health - proj.damage }
              }
              return threat
            })
            return false
          }

          proj.x += (dx / dist) * 3 * gameSpeed
          proj.y += (dy / dist) * 3 * gameSpeed
          return true
        })

        // Remove dead threats
        newData.threats = newData.threats.filter((threat) => threat.health > 0)

        // Award points for kills
        const deadThreats = prev.threats.length - newData.threats.length - (prev.projectiles.length - newData.projectiles.length + 1)
        prev.threats.forEach((threat) => {
          if (!newData.threats.find((t) => t.id === threat.id) && threat.health > 0) {
            setStats((s) => ({
              ...s,
              kills: s.kills + 1,
              money: s.money + THREAT_TYPES[threat.type].value,
              score: s.score + THREAT_TYPES[threat.type].value * 2,
            }))
          }
        })

        // Tower targeting and shooting
        newData.towers.forEach((tower) => {
          tower.cooldown = Math.max(0, tower.cooldown - gameSpeed)

          const target = newData.threats.find((threat) => {
            const dx = threat.x - tower.x
            const dy = threat.y - tower.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            return dist < tower.range
          })

          if (target && tower.cooldown <= 0) {
            newData.projectiles.push({
              x: tower.x,
              y: tower.y,
              targetX: target.x,
              targetY: target.y,
              targetId: target.id,
              damage: tower.damage,
            })
            tower.cooldown = tower.rate
          }
        })

        // Draw towers
        newData.towers.forEach((tower) => {
          ctx.font = '20px Arial'
          ctx.fillText(tower.emoji, tower.x - 10, tower.y + 8)

          // Draw range preview on hover
          if (selectedTower === tower.id) {
            ctx.strokeStyle = 'rgba(89, 243, 255, 0.3)'
            ctx.beginPath()
            ctx.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2)
            ctx.stroke()
          }
        })

        // Draw threats
        newData.threats.forEach((threat) => {
          ctx.font = '16px Arial'
          ctx.fillText(THREAT_TYPES[threat.type].emoji, threat.x - 8, threat.y + 6)

          // Health bar
          const barWidth = 20
          ctx.fillStyle = 'rgba(255, 85, 85, 0.5)'
          ctx.fillRect(threat.x - barWidth / 2, threat.y - 15, barWidth, 3)
          ctx.fillStyle = '#8CFF6A'
          ctx.fillRect(threat.x - barWidth / 2, threat.y - 15, (threat.health / threat.maxHealth) * barWidth, 3)
        })

        // Draw projectiles
        newData.projectiles.forEach((proj) => {
          ctx.fillStyle = '#FFD93D'
          ctx.fillRect(proj.x - 2, proj.y - 2, 4, 4)
        })

        return newData
      })

      gameLoopRef.current = requestAnimationFrame(animate)
    }

    gameLoopRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(gameLoopRef.current)
  }, [gameState, gameSpeed])

  // Canvas click to place towers
  const handleCanvasClick = (e) => {
    if (gameState !== 'playing' || !selectedTower) return
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x < 0 || x > GAME_CONFIG.width || y < 0 || y > GAME_CONFIG.height) return

    const towerConfig = TOWER_TYPES[selectedTower]
    if (stats.money >= towerConfig.cost) {
      const newTower = {
        id: Math.random(),
        type: selectedTower,
        x,
        y,
        damage: towerConfig.damage,
        range: towerConfig.range,
        cooldown: 0,
        rate: towerConfig.rate,
        emoji: towerConfig.emoji,
      }
      setGameData((prev) => ({ ...prev, towers: [...prev.towers, newTower] }))
      setStats((s) => ({ ...s, money: s.money - towerConfig.cost }))
    }
  }

  if (gameState === 'menu') {
    return (
      <section id="infra-defense-game" className="infra-defense-game">
        <div className="terminal-header">
          <div className="traffic-lights">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="filename">defense-game.exe</div>
          <div className="spacer"></div>
        </div>

        <div className="game-menu">
          <div className="menu-title">&gt; INFRASTRUCTURE DEFENSE GAME</div>
          <div className="menu-subtitle">Protect your infrastructure from threats!</div>

          <div className="menu-instructions">
            <h3>═══════════════════════════════════════</h3>
            <p>🎮 <strong>OBJECTIVE:</strong> Defend your infrastructure by placing towers to stop incoming threats.</p>
            <p>💰 <strong>CURRENCY:</strong> Earn money from defeated threats to build more towers.</p>
            <p>❤️ <strong>HEALTH:</strong> You have 100 HP. When threats reach the end, you lose health.</p>
            <p>🌊 <strong>WAVES:</strong> Each wave adds more threats. Survive as long as possible!</p>

            <h4>TOWERS:</h4>
            <div className="towers-info">
              {Object.entries(TOWER_TYPES).map(([key, tower]) => (
                <div key={key} className="tower-info">
                  <span className="tower-icon">{tower.emoji}</span>
                  <span className="tower-name">{tower.name}</span>
                  <span className="tower-cost">${tower.cost}</span>
                  <span className="tower-stats">DMG:{tower.damage} RNG:{tower.range}</span>
                </div>
              ))}
            </div>

            <h4>THREATS:</h4>
            <div className="threats-info">
              {Object.entries(THREAT_TYPES).map(([key, threat]) => (
                <div key={key} className="threat-info">
                  <span className="threat-icon">{threat.emoji}</span>
                  <span className="threat-name">{key}</span>
                  <span className="threat-value">+${threat.value}</span>
                </div>
              ))}
            </div>

            <h3>═══════════════════════════════════════</h3>
            <p>🖱️ <strong>HOW TO PLAY:</strong></p>
            <p>1. Select a tower type</p>
            <p>2. Click on the game board to place it</p>
            <p>3. Towers automatically shoot threatening enemies</p>
            <p>4. Earn money from destroyed threats</p>
            <p>5. Survive all waves to WIN!</p>
          </div>

          <button className="start-btn" onClick={startGame}>
            ▶ START GAME
          </button>
        </div>
      </section>
    )
  }

  if (gameState === 'gameOver') {
    return (
      <section id="infra-defense-game" className="infra-defense-game">
        <div className="terminal-header">
          <div className="traffic-lights">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="filename">defense-game.exe</div>
          <div className="spacer"></div>
        </div>

        <div className="game-over">
          <div className="game-over-title">💥 INFRASTRUCTURE FAILED!</div>
          <div className="game-over-stats">
            <div className="stat">Wave: {stats.wave}</div>
            <div className="stat">Threats Stopped: {stats.kills}</div>
            <div className="stat">Final Score: {stats.score}</div>
            <div className="stat">Towers Built: {gameData.towers.length}</div>
          </div>
          <button className="restart-btn" onClick={() => startGame()}>
            🔄 RETRY
          </button>
          <button className="menu-btn" onClick={() => setGameState('menu')}>
            📍 RETURN TO MENU
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="infra-defense-game" className="infra-defense-game">
      <div className="terminal-header">
        <div className="traffic-lights">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="filename">defense-game.exe</div>
        <div className="spacer"></div>
      </div>

      <div className="game-container">
        <div className="game-hud">
          <div className="hud-stat">
            <span className="label">❤️ HEALTH:</span>
            <span className={`value ${stats.health < 30 ? 'critical' : ''}`}>{stats.health}</span>
          </div>
          <div className="hud-stat">
            <span className="label">💰 MONEY:</span>
            <span className="value">${stats.money}</span>
          </div>
          <div className="hud-stat">
            <span className="label">🌊 WAVE:</span>
            <span className="value">{stats.wave}</span>
          </div>
          <div className="hud-stat">
            <span className="label">⚔️ KILLS:</span>
            <span className="value">{stats.kills}</span>
          </div>
          <div className="hud-stat">
            <span className="label">📊 SCORE:</span>
            <span className="value">{stats.score}</span>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={GAME_CONFIG.width}
          height={GAME_CONFIG.height}
          className="game-canvas"
          onClick={handleCanvasClick}
        />

        <div className="tower-selector">
          <div className="selector-title">SELECT TOWER</div>
          <div className="tower-buttons">
            {Object.entries(TOWER_TYPES).map(([key, tower]) => (
              <button
                key={key}
                className={`tower-btn ${selectedTower === key ? 'selected' : ''} ${stats.money < tower.cost ? 'disabled' : ''}`}
                onClick={() => setSelectedTower(selectedTower === key ? null : key)}
                disabled={stats.money < tower.cost}
              >
                <span className="emoji">{tower.emoji}</span>
                <span className="name">{tower.name}</span>
                <span className="cost">${tower.cost}</span>
              </button>
            ))}
          </div>

          <div className="game-controls">
            <label>
              Speed:
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.5"
                value={gameSpeed}
                onChange={(e) => setGameSpeed(parseFloat(e.target.value))}
              />
              <span>{gameSpeed}x</span>
            </label>
            <button onClick={() => setGameState('menu')} className="menu-link">
              📍 MENU
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
