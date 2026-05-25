import { useEffect, useRef, useCallback } from 'react'

/* ============================================================
   FlowSymbol — 多层粒子系统 Canvas 动画
   光带曲线 + 鼠标吸引 + 点击爆发 + 阴影光晕 + 环境漂浮
   ============================================================ */

export function FlowSymbol() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -999, y: -999, active: false })
  const clicksRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let rafId, time = 0

    const mouse = mouseRef.current
    const clicks = clicksRef.current

    /* ---- 尺寸 ---- */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => canvas.parentElement.getBoundingClientRect().width
    const H = () => canvas.parentElement.getBoundingClientRect().height

    /* ---- 鼠标事件 ---- */
    const onMove = (e) => {
      const rect = canvas.parentElement.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onLeave = () => { mouse.active = false }
    const onClick = (e) => {
      const rect = canvas.parentElement.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      clicks.push({ x, y, life: 1, time: time })
    }

    canvas.parentElement.addEventListener('mousemove', onMove, { passive: true })
    canvas.parentElement.addEventListener('mouseleave', onLeave)
    canvas.parentElement.addEventListener('click', onClick)

    /* ==================== 粒子类 ==================== */
    class Particle {
      constructor(x, y, opts = {}) {
        this.x = x
        this.y = y
        this.vx = opts.vx ?? (Math.random() - 0.5) * 0.6
        this.vy = opts.vy ?? (Math.random() - 0.5) * 0.6
        this.life = opts.life ?? 1
        this.maxLife = this.life
        this.decay = opts.decay ?? (0.0015 + Math.random() * 0.004)
        this.size = opts.size ?? (1 + Math.random() * 3)
        this.color = opts.color ?? '206,126,83'
        this.glow = opts.glow ?? 0
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= this.decay
        this.vx *= 0.998
        this.vy *= 0.998
      }

      draw(ctx) {
        if (this.life <= 0) return
        const alpha = this.life * (this.maxLife > 0.5 ? 0.8 : 0.5)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * (0.5 + this.life * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color},${alpha})`
        ctx.fill()

        if (this.glow > 0) {
          ctx.save()
          ctx.shadowColor = `rgba(${this.color},${alpha * 0.6})`
          ctx.shadowBlur = this.glow * this.life
          ctx.fill()
          ctx.restore()
        }
      }

      get alive() { return this.life > 0 }
    }

    /* ==================== 粒子池 ==================== */
    const ambientParticles = []
    const trailParticles = []
    const burstParticles = []
    const MAX_AMBIENT = 60
    const MAX_TRAIL = 120
    const MAX_BURST = 300

    /* ---- 环境漂浮粒子（深背景里缓慢浮动） ---- */
    function spawnAmbient() {
      const w = W(), h = H()
      if (ambientParticles.length < MAX_AMBIENT) {
        const p = new Particle(
          Math.random() * w,
          Math.random() * h,
          {
            vx: (Math.random() - 0.5) * 0.2,
            vy: -0.1 - Math.random() * 0.3,
            life: 2 + Math.random() * 4,
            decay: 0.0008 + Math.random() * 0.002,
            size: 0.6 + Math.random() * 1.4,
            color: '160,150,140',
            glow: 8,
          }
        )
        ambientParticles.push(p)
      }
    }

    /* ---- 曲线轨道粒子（沿光带发射） ---- */
    function spawnTrail() {
      const w = W(), h = H()
      if (trailParticles.length > MAX_TRAIL) return

      const cx = w / 2, cy = h / 2
      const t = time * 0.0006

      // 三条光带上的采样点
      const curves = [
        // 左V弧
        (s) => {
          const sx = cx - 200 + Math.sin(t * 1.3 + s * 3) * 90
          const sy = cy - 120 + Math.cos(t * 0.7 + s * 2.5) * 60
          return {
            x: cx - 200 * (1 - s) + (cx - 80) * s + Math.sin(t * 1.1 + s * 4) * 40,
            y: cy - 120 * (1 - s) + (cy + 100) * s + Math.cos(t * 0.8 + s * 3) * 30,
          }
        },
        // 右V弧
        (s) => {
          return {
            x: cx + 200 * (1 - s) + (cx + 80) * s + Math.cos(t * 1.0 + s * 4) * 40,
            y: cy - 120 * (1 - s) + (cy + 100) * s + Math.sin(t * 0.75 + s * 3) * 30,
          }
        },
        // 中心横向
        (s) => {
          return {
            x: cx - 160 + (320 * s) + Math.sin(t * 0.5 + s * 5) * 50,
            y: cy + Math.cos(t * 0.6 + s * 4) * 35,
          }
        },
      ]

      for (let i = 0; i < 2; i++) {
        const curve = curves[Math.floor(Math.random() * 3)]
        const s = Math.random()
        const pos = curve(s)
        const p = new Particle(pos.x, pos.y, {
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.4,
          life: 1.5 + Math.random() * 2,
          decay: 0.002 + Math.random() * 0.005,
          size: 1.5 + Math.random() * 2.5,
          color: '206,126,83',
          glow: 14,
        })
        trailParticles.push(p)
      }
    }

    /* ---- 点击爆发粒子 ---- */
    function spawnBurst(x, y) {
      const count = 30 + Math.floor(Math.random() * 20)
      const colors = ['206,126,83', '232,255,82', '241,237,226']
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3
        const speed = 1.5 + Math.random() * 4
        const p = new Particle(x, y, {
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.8 + Math.random() * 1.5,
          decay: 0.015 + Math.random() * 0.03,
          size: 1.8 + Math.random() * 3.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          glow: 20,
        })
        burstParticles.push(p)
      }

      // 第二波延迟环
      setTimeout(() => {
        const colors2 = ['206,126,83', '232,255,82', '241,237,226']
        for (let i = 0; i < 15; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = 1 + Math.random() * 2.5
          burstParticles.push(new Particle(x, y, {
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1 + Math.random(),
            decay: 0.01 + Math.random() * 0.02,
            size: 0.8 + Math.random() * 2,
            color: colors2[Math.floor(Math.random() * colors2.length)],
            glow: 10,
          }))
        }
      }, 80)
    }

    /* ---- 鼠标吸引：粒子轻微偏向鼠标 ---- */
    function applyMouseAttraction(particles) {
      if (!mouse.active) return
      const mx = mouse.x, my = mouse.y
      const attractRadius = 200
      for (const p of particles) {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < attractRadius && dist > 1) {
          const force = (1 - dist / attractRadius) * 0.03
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }
      }
    }

    /* ==================== 绘制光带 ==================== */
    function drawRibbons() {
      const w = W(), h = H()
      const cx = w / 2, cy = h / 2
      const t = time * 0.0005

      ctx.save()

      // 光带 1 — 左侧
      ctx.beginPath()
      ctx.moveTo(cx - 210, cy - 130)
      ctx.bezierCurveTo(
        cx - 110 + Math.sin(t * 1.4) * 35,
        cy - 90 + Math.cos(t * 0.85) * 22,
        cx - 130 + Math.cos(t * 1.15) * 28,
        cy + 25 + Math.sin(t * 0.95) * 28,
        cx - 85,
        cy + 110 + Math.cos(t * 0.72) * 18
      )
      const alpha1 = 0.25 + Math.sin(t * 0.7) * 0.08
      ctx.strokeStyle = `rgba(206,126,83,${alpha1})`
      ctx.lineWidth = 2.8
      ctx.shadowColor = `rgba(206,126,83,${alpha1 * 1.2})`
      ctx.shadowBlur = 35
      ctx.stroke()

      // 光带 2 — 右侧
      ctx.beginPath()
      ctx.moveTo(cx + 210, cy - 130)
      ctx.bezierCurveTo(
        cx + 110 + Math.cos(t * 1.25) * 35,
        cy - 90 + Math.sin(t * 0.9) * 22,
        cx + 130 + Math.sin(t * 1.05) * 28,
        cy + 25 + Math.cos(t * 0.98) * 28,
        cx + 85,
        cy + 110 + Math.sin(t * 0.78) * 18
      )
      const alpha2 = 0.22 + Math.cos(t * 1.15) * 0.07
      ctx.strokeStyle = `rgba(206,126,83,${alpha2})`
      ctx.lineWidth = 2.5
      ctx.shadowColor = `rgba(206,126,83,${alpha2})`
      ctx.shadowBlur = 30
      ctx.stroke()

      // 光带 3 — 中心横向
      ctx.beginPath()
      ctx.moveTo(cx - 170 + Math.sin(t * 0.55) * 45, cy)
      ctx.bezierCurveTo(
        cx - 65 + Math.cos(t * 0.65) * 35,
        cy - 45 + Math.sin(t * 0.75) * 22,
        cx + 65 + Math.sin(t * 0.6) * 35,
        cy + 45 + Math.cos(t * 0.7) * 22,
        cx + 170 + Math.cos(t * 0.55) * 45,
        cy
      )
      const alpha3 = 0.12 + Math.cos(t * 0.85) * 0.05
      ctx.strokeStyle = `rgba(232,255,82,${alpha3})`
      ctx.lineWidth = 2.0
      ctx.shadowColor = `rgba(232,255,82,${alpha3 * 1.5})`
      ctx.shadowBlur = 25
      ctx.stroke()

      // 中央光点
      ctx.beginPath()
      ctx.arc(cx, cy, 4, 0, Math.PI * 2)
      const coreAlpha = 0.45 + Math.sin(t * 1.6) * 0.15
      ctx.fillStyle = `rgba(206,126,83,${coreAlpha})`
      ctx.shadowColor = `rgba(206,126,83,${coreAlpha * 1.3})`
      ctx.shadowBlur = 50
      ctx.fill()

      // 次级光点 — 左右弦上的脉动点
      for (let i = 0; i < 2; i++) {
        const sx = i === 0 ? cx - 80 + Math.sin(t * 1.2) * 30 : cx + 80 + Math.cos(t * 1.1) * 30
        const sy = cy - 20 + Math.cos(t * 0.8 + i * 2) * 40
        ctx.beginPath()
        ctx.arc(sx, sy, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232,255,82,${0.15 + Math.sin(t * 2 + i) * 0.08})`
        ctx.shadowColor = 'rgba(232,255,82,0.2)'
        ctx.shadowBlur = 18
        ctx.fill()
      }

      ctx.restore()
    }

    /* ---- 鼠标光晕 ---- */
    function drawMouseGlow() {
      if (!mouse.active) return
      const mx = mouse.x, my = mouse.y
      ctx.save()
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 120)
      grad.addColorStop(0, 'rgba(206,126,83,0.06)')
      grad.addColorStop(0.5, 'rgba(206,126,83,0.02)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(mx - 150, my - 150, 300, 300)
      ctx.restore()
    }

    /* ---- 点击波纹 ---- */
    function drawClickRipples() {
      for (let i = clicks.length - 1; i >= 0; i--) {
        const c = clicks[i]
        const elapsed = (time - c.time) * 0.001
        c.life -= 0.015
        if (c.life <= 0) { clicks.splice(i, 1); continue }
        const r = elapsed * 200
        const alpha = c.life * 0.3
        ctx.beginPath()
        ctx.arc(c.x, c.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(206,126,83,${alpha})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }
    }

    /* ---- 处理爆发粒子注册 ---- */
    for (let i = clicksRef.current.length - 1; i >= 0; i--) {
      const c = clicksRef.current[i]
      if (!c.triggered) {
        spawnBurst(c.x, c.y)
        c.triggered = true
      }
    }

    /* ==================== 主循环 ==================== */
    const animate = () => {
      const w = W(), h = H()
      ctx.clearRect(0, 0, w, h)

      time += 16.67

      // 1. 背景光带
      drawRibbons()

      // 2. 点击波纹
      drawClickRipples()

      // 3. 环境粒子
      if (Math.random() < 0.4) spawnAmbient()
      applyMouseAttraction(ambientParticles)

      // 4. 轨道粒子
      if (Math.random() < 0.7) spawnTrail()
      applyMouseAttraction(trailParticles)

      // 5. 绘图
      ;[ambientParticles, trailParticles, burstParticles].forEach(list => {
        for (let i = list.length - 1; i >= 0; i--) {
          list[i].update()
          list[i].draw(ctx)
          if (!list[i].alive) list.splice(i, 1)
        }
      })

      // 6. 爆发粒子上限
      while (burstParticles.length > MAX_BURST) burstParticles.shift()

      // 7. 鼠标光晕
      drawMouseGlow()

      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      canvas.parentElement?.removeEventListener('mousemove', onMove)
      canvas.parentElement?.removeEventListener('mouseleave', onLeave)
      canvas.parentElement?.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="flow-canvas"
      aria-hidden="true"
    />
  )
}
