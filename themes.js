window.THEMES={
clasico:{n:'Clásico (azul)',a:'★',b:'■'},
panaderia:{n:'Panadería / pastelería',a:'🥐',b:'🍞',bg:'#fbf1e4',ink:'#3b2414',sky:'#f2c27b',hd:'#3b2414',navy:'#8a4b1f',gold:'#c97a10',line:'#e0c8a6',mute:'#8b6d52'},
cbd:{n:'CBD / cannabis',a:'🌿',b:'🍃',bg:'#e3f1e5',ink:'#12331c',sky:'#4cae67',hd:'#062611',navy:'#1f7a3a',gold:'#b8921f',line:'#a9cdb1',mute:'#4f7058'},
manicura:{n:'Manicura / coquette',a:'💅',b:'🎀',bg:'#fdeef2',ink:'#5a2a3a',sky:'#f6b8cb',hd:'#6b2340',navy:'#c2456f',gold:'#e0527e',line:'#f0c9d5',mute:'#a0687c'},
floreria:{n:'Florería',a:'🌸',b:'🌷',bg:'#f3f8ec',ink:'#2d3b22',sky:'#f4a6b8',hd:'#5b1f33',navy:'#3f7a3a',gold:'#d9487a',line:'#cfe0bd',mute:'#6c7f5c'},
carniceria:{n:'Carnicería',a:'🥩',b:'🔥',bg:'#f7ece8',ink:'#3a1613',sky:'#b3262e',hd:'#ffffff',navy:'#7a1d1d',gold:'#b8860b',line:'#e2c4bd',mute:'#8a5a52'},
peluqueria:{n:'Peluquería / barbería',a:'✂️',b:'💈',bg:'#f1eeea',ink:'#1a1a1a',sky:'#1a1a1a',hd:'#e7c46a',navy:'#1a1a1a',gold:'#b8902f',line:'#cfc8bc',mute:'#6b655b'},
autolavado:{n:'Autolavado',a:'💧',b:'🚗',bg:'#e8f3fb',ink:'#0e2a44',sky:'#2f9ae0',hd:'#ffffff',navy:'#0d5fa8',gold:'#e0a100',line:'#b5d3ea',mute:'#4f6f8a'},
cafeteria:{n:'Cafetería',a:'☕',b:'🍪',bg:'#f3ebe2',ink:'#2e1d12',sky:'#6f4e37',hd:'#ffffff',navy:'#5a3a24',gold:'#b5832f',line:'#d9c7b4',mute:'#86705c'},
heladeria:{n:'Heladería',a:'🍦',b:'🍨',bg:'#fff1f6',ink:'#4a2540',sky:'#7fd6d0',hd:'#1c4a47',navy:'#d6578f',gold:'#f08a3c',line:'#f3cadd',mute:'#9a6b8a'},
pizzeria:{n:'Pizzería / restaurante',a:'🍕',b:'🍅',bg:'#fbefe6',ink:'#3b1a12',sky:'#d6402a',hd:'#ffffff',navy:'#a42a18',gold:'#e0a100',line:'#ecc9b8',mute:'#8e5b4b'},
bar:{n:'Bar / cervecería',a:'🍺',b:'🥂',bg:'#f6efe2',ink:'#2b2111',sky:'#e2a31b',hd:'#2b2111',navy:'#8a5a0c',gold:'#c27a00',line:'#dfd0b0',mute:'#82724f'},
gimnasio:{n:'Gimnasio / fitness',a:'💪',b:'🏋️',bg:'#eef0f3',ink:'#14181f',sky:'#ff5a1f',hd:'#ffffff',navy:'#1c2430',gold:'#ff5a1f',line:'#cfd4db',mute:'#5f6b7a'},
spa:{n:'Spa / estética / masajes',a:'🧖',b:'🕯️',bg:'#f1f6f3',ink:'#2a3a34',sky:'#b9d8cc',hd:'#24443a',navy:'#4f8a78',gold:'#b9975b',line:'#cfe0d8',mute:'#6f857c'},
mascotas:{n:'Mascotas / veterinaria',a:'🐾',b:'🦴',bg:'#fff6e8',ink:'#3a2a14',sky:'#f4b860',hd:'#3a2a14',navy:'#b06a1a',gold:'#e0742a',line:'#efd9b5',mute:'#8d7550'},
libreria:{n:'Librería / papelería',a:'📚',b:'🔖',bg:'#f4efe6',ink:'#2a2118',sky:'#7a2e2e',hd:'#ffffff',navy:'#5b2020',gold:'#b8862f',line:'#dcd0bb',mute:'#85775f'},
lavanderia:{n:'Lavandería / tintorería',a:'🧺',b:'👕',bg:'#eaf6fb',ink:'#10303f',sky:'#53c0e0',hd:'#0c3a4a',navy:'#1f7fa3',gold:'#e8a317',line:'#bfe0ec',mute:'#55818f'},
moda:{n:'Moda / accesorios',a:'👗',b:'👜',bg:'#f7f1f3',ink:'#261c22',sky:'#6b2f5a',hd:'#ffffff',navy:'#6b2f5a',gold:'#c98a3e',line:'#dccfd3',mute:'#7a6b72'},
casino:{n:'Casino',a:'🎰',b:'🃏',bg:'#f3efe6',ink:'#1b1410',sky:'#7a1020',hd:'#f0d58a',navy:'#7a1020',gold:'#c9a227',line:'#d8cdb4',mute:'#7d6f58'},
bingo:{n:'Bingo / salón de juegos',a:'🎲',b:'🎯',bg:'#efeaf7',ink:'#231a3a',sky:'#5b2fa0',hd:'#ffffff',navy:'#4a2488',gold:'#e0a100',line:'#d3c9ea',mute:'#6f6490'}
};
function applyTheme(k){const t=THEMES[k]||THEMES.clasico,r=document.documentElement.style;['bg','ink','sky','navy','gold','line','mute','hd'].forEach(p=>t[p]?r.setProperty('--'+p,t[p]):r.removeProperty('--'+p))}
