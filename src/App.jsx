import React, { useState, useEffect } from 'react';

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  :root {
    --blue: #2563EB; --blue-dim: #1D4ED8; --blue-lt: #EFF4FF;
    --ink: #111111; --ink2: #444444; --ink3: #888888;
    --line: #EFEFEF; --bg: #F5F1EA; --white: #FFFFFF;
    --f: 'Noto Sans KR', sans-serif;
  }
  body { background: var(--bg); font-family: var(--f); }
  .app-bg { height: 100svh; background: var(--bg); display: flex; justify-content: center; overflow: hidden; }
  .app-shell { width: 100%; max-width: 420px; height: 100svh; background: var(--white); display: flex; flex-direction: column; overflow: hidden; font-family: var(--f); color: var(--ink); }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideRight { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
  .fu { animation: fadeUp .32s cubic-bezier(.22,.68,0,1) both; }
  .sr { animation: slideRight .28s cubic-bezier(.22,.68,0,1) both; }
  .d1{animation-delay:.05s}.d2{animation-delay:.10s}.d3{animation-delay:.15s}.d4{animation-delay:.20s}.d5{animation-delay:.25s}
  .top-bar { display:flex; align-items:center; justify-content:space-between; padding:16px 16px 12px; border-bottom:1px solid var(--line); flex-shrink:0; }
  .logo { font-size:17px; font-weight:900; letter-spacing:-.04em; color:var(--blue); }
  .top-icons { display:flex; gap:4px; }
  .icon-btn { width:38px; height:38px; border:none; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--ink); border-radius:8px; transition:background .14s; }
  .icon-btn:hover { background:var(--line); }
  .tab-bar { display:flex; border-bottom:1px solid var(--line); flex-shrink:0; }
  .tab { flex:1; padding:13px 0; font-size:13px; font-weight:500; color:var(--ink3); text-align:center; cursor:pointer; border:none; border-bottom:2px solid transparent; background:none; font-family:var(--f); transition:color .15s; }
  .tab.on { color:var(--blue); border-bottom-color:var(--blue); font-weight:700; }
  .banner { margin:16px; background:var(--blue); border-radius:16px; padding:22px 20px; color:#fff; }
  .banner-tag { font-size:11px; font-weight:700; letter-spacing:.1em; opacity:.8; margin-bottom:6px; }
  .banner-title { font-size:22px; font-weight:700; line-height:1.22; letter-spacing:-.04em; margin-bottom:5px; }
  .banner-sub { font-size:13px; opacity:.75; margin-bottom:16px; }
  .banner-cta { display:inline-flex; align-items:center; gap:5px; background:#fff; color:var(--blue); border:none; border-radius:20px; padding:9px 16px; font-size:13px; font-weight:700; cursor:pointer; font-family:var(--f); }
  .section-label { padding:20px 16px 10px; font-size:15px; font-weight:700; letter-spacing:-.02em; }
  .service-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; padding:0 16px 20px; }
  .svc-card { background:var(--white); border:1px solid var(--line); border-radius:14px; padding:18px 14px; cursor:pointer; transition:border-color .15s,transform .13s; }
  .svc-card:hover { border-color:var(--blue); }
  .svc-card:active { transform:scale(.975); }
  .svc-icon { width:42px; height:42px; border-radius:10px; background:var(--blue-lt); display:flex; align-items:center; justify-content:center; margin-bottom:12px; color:var(--blue); }
  .svc-title { font-size:14px; font-weight:700; letter-spacing:-.02em; margin-bottom:4px; }
  .svc-sub { font-size:12px; color:var(--ink3); line-height:1.4; }
  .trust-row { display:flex; gap:8px; padding:0 16px 20px; overflow-x:auto; }
  .trust-row::-webkit-scrollbar { display:none; }
  .trust-chip { display:inline-flex; align-items:center; gap:5px; white-space:nowrap; padding:7px 13px; background:var(--white); border:1px solid var(--line); border-radius:20px; font-size:12px; font-weight:500; color:var(--ink2); flex-shrink:0; }
  .trust-dot { width:6px; height:6px; border-radius:50%; background:var(--blue); flex-shrink:0; }
  .bottom-tab { display:flex; align-items:flex-end; border-top:1px solid var(--line); flex-shrink:0; background:var(--white); padding:4px 0 6px; position:relative; }
  .bt-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:5px; padding:8px 0 6px; font-size:11px; font-weight:400; color:#A8A8A8; cursor:pointer; border:none; background:none; font-family:var(--f); letter-spacing:-.01em; transition:color .18s; }
  .bt-item svg { width:22px; height:22px; stroke-width:1.6; transition:transform .18s; }
  .bt-item:active svg { transform:scale(.92); }
  .bt-item.on { color:var(--blue); font-weight:500; }
  .bt-item.on svg { stroke-width:2; }
  .bt-add-wrap { flex:1; display:flex; justify-content:center; align-items:flex-end; }
  .bt-add { width:52px; height:52px; border-radius:50%; background:var(--blue); color:#fff; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 14px rgba(37,99,235,.34); margin-bottom:6px; transition:transform .14s,background .15s; font-family:var(--f); }
  .bt-add:hover { background:var(--blue-dim); }
  .bt-add:active { transform:scale(.92); }
  .bt-add svg { stroke-width:2.2; }
  .bt-add-label { font-size:10px; font-weight:700; color:var(--blue); letter-spacing:-.02em; margin-top:2px; }
  .back-bar { display:flex; align-items:center; gap:8px; padding:12px; border-bottom:1px solid var(--line); flex-shrink:0; }
  .back-btn { width:38px; height:38px; border:none; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--ink); border-radius:8px; transition:background .14s; }
  .back-btn:hover { background:var(--line); }
  .page-title { font-size:15px; font-weight:700; letter-spacing:-.02em; }
  .form-scroll { flex:1; overflow-y:auto; padding:20px 16px 0; }
  .form-scroll::-webkit-scrollbar { width:3px; }
  .form-scroll::-webkit-scrollbar-thumb { background:var(--line); border-radius:3px; }
  .form-heading { font-size:24px; font-weight:900; letter-spacing:-.04em; line-height:1.25; margin-bottom:22px; }
  .form-heading span { color:var(--blue); }
  .field { margin-bottom:18px; }
  .field-label { display:block; font-size:11.5px; font-weight:700; color:var(--ink3); letter-spacing:.05em; text-transform:uppercase; margin-bottom:7px; }
  .field-input { width:100%; border:1.5px solid var(--line); border-radius:10px; padding:14px; font-size:15px; font-family:var(--f); color:var(--ink); background:var(--white); outline:none; transition:border-color .15s; }
  .field-input::placeholder { color:var(--ink3); font-weight:300; }
  .field-input:focus { border-color:var(--blue); }
  .cat-picker { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
  .cat-pick { display:flex; flex-direction:column; align-items:center; gap:6px; padding:14px 8px 12px; border:1.5px solid var(--line); background:#fff; border-radius:12px; cursor:pointer; font-family:var(--f); transition:all .15s; }
  .cat-pick:hover { border-color:#BFDBFE; }
  .cat-pick:active { transform:scale(.97); }
  .cat-pick.on { border-color:var(--blue); background:var(--blue-lt); }
  .cat-pick-ic { width:32px; height:32px; border-radius:8px; background:#F4F4F5; color:var(--ink2); display:flex; align-items:center; justify-content:center; transition:all .15s; }
  .cat-pick.on .cat-pick-ic { background:var(--blue); color:#fff; }
  .cat-pick-label { font-size:12px; font-weight:600; color:var(--ink); letter-spacing:-.02em; }
  .cat-pick.on .cat-pick-label { color:var(--blue); font-weight:700; }
  .period-row { display:flex; gap:7px; flex-wrap:wrap; }
  .period-pill { padding:8px 14px; border:1.5px solid var(--line); background:#fff; border-radius:20px; font-size:12.5px; font-weight:600; cursor:pointer; color:var(--ink2); font-family:var(--f); transition:all .15s; letter-spacing:-.01em; }
  .period-pill:hover { border-color:#BFDBFE; color:var(--blue); }
  .period-pill:active { transform:scale(.96); }
  .period-pill.on { background:var(--blue); color:#fff; border-color:var(--blue); }
  .loc-card { display:flex; align-items:center; gap:12px; padding:14px; border:1.5px solid var(--line); border-radius:12px; background:#fff; }
  .loc-ic { width:38px; height:38px; border-radius:50%; background:var(--blue-lt); color:var(--blue); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .loc-info { flex:1; min-width:0; }
  .loc-label { font-size:10.5px; color:var(--ink3); margin-bottom:2px; font-weight:500; letter-spacing:.04em; text-transform:uppercase; }
  .loc-value { font-size:13.5px; font-weight:700; color:var(--ink); letter-spacing:-.02em; }
  .loc-action { padding:7px 12px; border:1px solid var(--line); background:#fff; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; font-family:var(--f); color:var(--blue); transition:all .14s; flex-shrink:0; display:inline-flex; align-items:center; gap:4px; }
  .loc-action:hover { border-color:var(--blue); background:var(--blue-lt); }
  .loc-action:disabled { color:var(--ink3); cursor:wait; border-color:var(--line); background:#fff; }
  .price-card { padding:18px 18px 14px; border:1.5px solid var(--line); border-radius:12px; background:#fff; text-align:center; }
  .price-value { font-size:30px; font-weight:900; letter-spacing:-.04em; color:var(--ink); line-height:1.1; }
  .price-value small { font-size:14px; font-weight:600; color:var(--ink3); margin-left:4px; }
  .price-period { font-size:11.5px; color:var(--ink3); margin-top:4px; font-weight:500; }
  .price-controls { display:flex; align-items:center; gap:14px; margin-top:16px; justify-content:center; }
  .price-btn { width:42px; height:42px; border:1.5px solid var(--line); background:#fff; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--ink); font-family:var(--f); transition:all .15s; }
  .price-btn:hover { border-color:var(--blue); color:var(--blue); background:var(--blue-lt); }
  .price-btn:active { transform:scale(.9); }
  .price-btn:disabled { opacity:.4; cursor:not-allowed; }
  .price-track { position:relative; height:4px; background:var(--line); border-radius:2px; margin-top:18px; }
  .price-track-fill { position:absolute; left:0; top:0; height:100%; background:var(--blue); border-radius:2px; transition:width .18s; }
  .price-track-thumb { position:absolute; top:50%; width:14px; height:14px; border-radius:50%; background:#fff; border:3px solid var(--blue); transform:translate(-50%,-50%); transition:left .18s; box-shadow:0 2px 6px rgba(37,99,235,.3); }
  .price-ticks { display:flex; justify-content:space-between; margin-top:8px; font-size:10.5px; color:var(--ink3); }
  .pay-scroll { flex:1; overflow-y:auto; }
  .pay-scroll::-webkit-scrollbar { width:3px; }
  .pay-scroll::-webkit-scrollbar-thumb { background:var(--line); border-radius:3px; }
  .pay-section { padding:18px 16px 16px; }
  .pay-section-title { font-size:13px; font-weight:700; letter-spacing:-.02em; color:var(--ink); margin-bottom:12px; }
  .pay-divider { height:8px; background:#FAFAFA; }
  .pay-summary { display:flex; gap:12px; padding:14px; background:#FAFAFA; border-radius:12px; }
  .pay-thumb { width:56px; height:56px; border-radius:10px; object-fit:cover; flex-shrink:0; background:var(--line); }
  .pay-summary-info { flex:1; min-width:0; }
  .pay-summary-name { font-size:13.5px; font-weight:700; letter-spacing:-.02em; color:var(--ink); margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .pay-summary-meta { font-size:11.5px; color:var(--ink3); margin-bottom:2px; }
  .insurance-list { display:flex; flex-direction:column; gap:8px; }
  .insurance-card { display:flex; align-items:center; gap:12px; padding:14px; border:1.5px solid var(--line); background:#fff; border-radius:12px; cursor:pointer; transition:all .15s; font-family:var(--f); text-align:left; width:100%; }
  .insurance-card:hover { border-color:#BFDBFE; }
  .insurance-card:active { transform:scale(.99); }
  .insurance-card.on { border-color:var(--blue); background:var(--blue-lt); }
  .ins-radio { width:20px; height:20px; border-radius:50%; border:2px solid var(--line); position:relative; flex-shrink:0; transition:border-color .15s; }
  .insurance-card.on .ins-radio { border-color:var(--blue); }
  .insurance-card.on .ins-radio::after { content:""; position:absolute; inset:3px; background:var(--blue); border-radius:50%; }
  .ins-info { flex:1; min-width:0; }
  .ins-title { font-size:13.5px; font-weight:700; letter-spacing:-.02em; color:var(--ink); margin-bottom:3px; }
  .ins-title strong { color:var(--blue); font-size:11px; font-weight:700; margin-left:5px; padding:1px 6px; background:var(--blue-lt); border-radius:4px; letter-spacing:.04em; }
  .ins-desc { font-size:11.5px; color:var(--ink3); line-height:1.4; }
  .ins-price { font-size:13px; font-weight:800; color:var(--ink); letter-spacing:-.02em; flex-shrink:0; }
  .insurance-card.on .ins-price { color:var(--blue); }
  .pay-method-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
  .pay-method { padding:12px 8px; border:1.5px solid var(--line); background:#fff; border-radius:10px; cursor:pointer; text-align:center; font-size:12px; font-weight:600; color:var(--ink2); font-family:var(--f); transition:all .15s; }
  .pay-method:hover { border-color:#BFDBFE; }
  .pay-method.on { border-color:var(--blue); background:var(--blue-lt); color:var(--blue); font-weight:700; }
  .pay-row { display:flex; justify-content:space-between; padding:7px 0; font-size:13px; color:var(--ink2); }
  .pay-row.total { font-weight:800; font-size:15.5px; padding-top:13px; margin-top:8px; border-top:1px solid var(--line); color:var(--ink); }
  .pay-row.total strong { color:var(--blue); }
  .pay-bottom { padding:12px 16px 16px; border-top:1px solid var(--line); background:#fff; flex-shrink:0; }
  .pay-cta { width:100%; padding:15px; background:var(--blue); color:#fff; border:none; border-radius:12px; font-size:15px; font-weight:700; cursor:pointer; font-family:var(--f); letter-spacing:-.01em; transition:all .15s; }
  .pay-cta:hover { background:var(--blue-dim); }
  .pay-cta:active { transform:scale(.98); }
  .pay-terms { font-size:11px; color:var(--ink3); line-height:1.5; margin-top:10px; padding:0 16px; }
  .pay-terms a { color:var(--ink2); text-decoration:underline; cursor:pointer; }
  .notice-box { background:var(--blue-lt); border-radius:10px; padding:13px 14px; display:flex; align-items:flex-start; gap:8px; margin-bottom:16px; }
  .notice-icon { color:var(--blue); flex-shrink:0; margin-top:1px; }
  .notice-txt { font-size:12.5px; color:var(--blue-dim); font-weight:500; line-height:1.55; }
  .cta-area { padding:12px 16px 18px; flex-shrink:0; }
  .cta-btn { width:100%; background:var(--ink); color:#fff; border:none; border-radius:12px; padding:17px; font-size:15px; font-weight:700; font-family:var(--f); cursor:pointer; letter-spacing:-.02em; display:flex; align-items:center; justify-content:center; gap:6px; transition:background .14s,transform .13s; }
  .cta-btn:hover { background:#222; }
  .cta-btn:active { transform:scale(.978); }
  .cta-btn.blue { background:var(--blue); }
  .cta-btn.blue:hover { background:var(--blue-dim); }
  .filter-bar { display:flex; gap:8px; padding:12px 16px; overflow-x:auto; flex-shrink:0; border-bottom:1px solid var(--line); }
  .filter-bar::-webkit-scrollbar { display:none; }
  .filter-chip { display:inline-flex; align-items:center; gap:4px; white-space:nowrap; padding:7px 13px; border:1.5px solid var(--line); border-radius:20px; font-size:12.5px; font-weight:500; color:var(--ink2); cursor:pointer; background:var(--white); font-family:var(--f); }
  .filter-chip.on { border-color:var(--ink); background:var(--ink); color:#fff; }
  .result-info { padding:12px 16px 6px; font-size:12.5px; color:var(--ink3); flex-shrink:0; }
  .result-info strong { color:var(--blue); font-weight:700; }
  .space-list { padding:0 16px; }
  .space-item { padding:16px 0; border-bottom:1px solid var(--line); display:flex; gap:12px; cursor:pointer; }
  .space-item:last-child { border-bottom:none; }
  .space-item:active { opacity:.7; }
  .space-thumb { width:84px; height:84px; border-radius:10px; object-fit:cover; flex-shrink:0; background:var(--line); }
  .space-info { flex:1; min-width:0; }
  .space-name { font-size:14px; font-weight:700; letter-spacing:-.02em; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .space-meta { font-size:12px; color:var(--ink3); margin-bottom:7px; }
  .space-price { font-size:16px; font-weight:900; letter-spacing:-.03em; }
  .space-price span { font-size:12px; font-weight:400; color:var(--ink3); margin-left:2px; }
  .badge-row { display:flex; gap:5px; margin-top:6px; }
  .badge { display:inline-block; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:700; }
  .badge.new { background:var(--blue-lt); color:var(--blue); }
  .badge.hot { background:#FEF2F2; color:#DC2626; }
  .badge.safe { background:#F0FDF4; color:#16A34A; }
  .scroll { overflow-y:auto; flex:1; }
  .scroll::-webkit-scrollbar { width:3px; }
  .scroll::-webkit-scrollbar-thumb { background:var(--line); border-radius:3px; }
  .space-item { position:relative; }
  .fav-btn { position:absolute; top:14px; right:0; width:32px; height:32px; border:none; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--ink3); border-radius:50%; transition:color .15s,transform .12s; }
  .fav-btn:hover { color:#DC2626; }
  .fav-btn:active { transform:scale(.88); }
  .fav-btn.on { color:#DC2626; }
  .empty-state { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 24px; text-align:center; color:var(--ink3); }
  .empty-icon { width:64px; height:64px; border-radius:50%; background:var(--blue-lt); display:flex; align-items:center; justify-content:center; color:var(--blue); margin-bottom:16px; }
  .empty-title { font-size:15px; font-weight:700; color:var(--ink); letter-spacing:-.02em; margin-bottom:6px; }
  .empty-sub { font-size:13px; color:var(--ink3); line-height:1.5; }
  .history-list { padding:8px 16px 16px; }
  .history-item { background:var(--white); border:1px solid var(--line); border-radius:14px; padding:14px; margin-bottom:10px; cursor:pointer; transition:border-color .15s; }
  .history-item:hover { border-color:var(--blue); }
  .history-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
  .history-date { font-size:12px; color:var(--ink3); font-weight:500; }
  .status-chip { font-size:11px; font-weight:700; padding:3px 9px; border-radius:20px; letter-spacing:-.01em; }
  .status-chip.ongoing { background:var(--blue-lt); color:var(--blue); }
  .status-chip.done { background:#F4F4F5; color:var(--ink2); }
  .status-chip.cancel { background:#FEF2F2; color:#DC2626; }
  .history-body { display:flex; gap:12px; align-items:center; }
  .history-thumb { width:56px; height:56px; border-radius:10px; object-fit:cover; flex-shrink:0; background:var(--line); }
  .history-info { flex:1; min-width:0; }
  .history-name { font-size:14px; font-weight:700; letter-spacing:-.02em; margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .history-meta { font-size:12px; color:var(--ink3); margin-bottom:4px; }
  .history-price { font-size:14px; font-weight:700; letter-spacing:-.02em; }
  .history-foot { display:flex; gap:6px; margin-top:12px; padding-top:12px; border-top:1px solid var(--line); }
  .history-btn { flex:1; padding:9px; border:1.5px solid var(--line); background:var(--white); border-radius:8px; font-size:12.5px; font-weight:600; color:var(--ink2); cursor:pointer; font-family:var(--f); transition:all .15s; }
  .history-btn:hover { border-color:var(--ink); color:var(--ink); }
  .history-btn.primary { border-color:var(--blue); color:var(--blue); background:var(--blue-lt); }
  .profile-card { margin:16px; padding:20px; background:var(--white); border:1px solid var(--line); border-radius:16px; display:flex; align-items:center; gap:14px; }
  .profile-avatar { width:60px; height:60px; border-radius:50%; background:var(--blue-lt); display:flex; align-items:center; justify-content:center; color:var(--blue); flex-shrink:0; font-size:22px; font-weight:900; letter-spacing:-.04em; }
  .profile-info { flex:1; min-width:0; }
  .profile-name { font-size:17px; font-weight:700; letter-spacing:-.03em; margin-bottom:3px; }
  .profile-email { font-size:12.5px; color:var(--ink3); }
  .profile-edit { padding:7px 12px; border:1.5px solid var(--line); background:var(--white); border-radius:18px; font-size:12px; font-weight:600; color:var(--ink2); cursor:pointer; font-family:var(--f); transition:all .15s; flex-shrink:0; }
  .profile-edit:hover { border-color:var(--ink); color:var(--ink); }
  .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin:0 16px 8px; background:var(--white); border:1px solid var(--line); border-radius:16px; padding:16px 8px; }
  .stat-cell { display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; padding:4px 0; border-radius:8px; transition:background .14s; }
  .stat-cell:hover { background:var(--line); }
  .stat-num { font-size:18px; font-weight:900; letter-spacing:-.03em; color:var(--blue); }
  .stat-label { font-size:11.5px; color:var(--ink3); font-weight:500; }
  .stat-divider { width:1px; background:var(--line); align-self:stretch; }
  .menu-group { margin:16px; background:var(--white); border:1px solid var(--line); border-radius:14px; overflow:hidden; }
  .menu-group-title { padding:14px 16px 6px; font-size:12px; font-weight:700; color:var(--ink3); letter-spacing:.04em; text-transform:uppercase; }
  .menu-item { display:flex; align-items:center; gap:12px; padding:14px 16px; cursor:pointer; border-top:1px solid var(--line); transition:background .14s; }
  .menu-item:first-child { border-top:none; }
  .menu-item:hover { background:#FAFAFA; }
  .menu-icon { width:32px; height:32px; border-radius:8px; background:var(--blue-lt); color:var(--blue); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .menu-label { flex:1; font-size:14px; font-weight:500; color:var(--ink); letter-spacing:-.02em; }
  .menu-value { font-size:12.5px; color:var(--ink3); }
  .menu-chev { color:var(--ink3); flex-shrink:0; }
  .logout-btn { margin:8px 16px 16px; padding:14px; background:var(--white); border:1px solid var(--line); border-radius:14px; font-size:13.5px; font-weight:600; color:var(--ink3); cursor:pointer; font-family:var(--f); width:calc(100% - 32px); transition:all .15s; }
  .logout-btn:hover { color:#DC2626; border-color:#FCA5A5; }
  .cat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; padding:0 16px 20px; }
  .cat-cell { display:flex; flex-direction:column; align-items:center; gap:6px; padding:12px 4px; background:var(--white); border:1px solid var(--line); border-radius:12px; cursor:pointer; transition:border-color .15s,transform .12s; }
  .cat-cell:hover { border-color:var(--blue); }
  .cat-cell:active { transform:scale(.96); }
  .cat-icon { width:36px; height:36px; border-radius:50%; background:var(--blue-lt); color:var(--blue); display:flex; align-items:center; justify-content:center; }
  .cat-label { font-size:11.5px; font-weight:600; color:var(--ink); letter-spacing:-.02em; text-align:center; }
  .banner.alt { background:linear-gradient(135deg,#1D4ED8 0%,#2563EB 100%); }
  .section-row { display:flex; align-items:center; justify-content:space-between; padding:20px 16px 10px; }
  .section-row .section-label { padding:0; }
  .more-link { font-size:12px; color:var(--ink3); cursor:pointer; display:inline-flex; align-items:center; gap:2px; background:none; border:none; font-family:var(--f); padding:4px; }
  .more-link:hover { color:var(--ink); }
  .home-space-list { padding:0 16px 16px; }
  .search-bar { display:flex; align-items:center; gap:8px; padding:10px 12px; border-bottom:1px solid var(--line); flex-shrink:0; }
  .search-input-wrap { flex:1; display:flex; align-items:center; gap:8px; background:#F4F4F5; border-radius:22px; padding:10px 14px; transition:background .15s; }
  .search-input-wrap:focus-within { background:var(--blue-lt); }
  .search-input-wrap .search-ic { color:var(--ink3); flex-shrink:0; }
  .search-input { flex:1; border:none; background:none; outline:none; font-size:14px; font-family:var(--f); color:var(--ink); }
  .search-input::placeholder { color:var(--ink3); font-weight:300; }
  .search-clear { width:18px; height:18px; border:none; border-radius:50%; background:var(--ink3); color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .search-cancel { padding:6px 4px; border:none; background:none; font-size:13px; color:var(--ink2); cursor:pointer; font-family:var(--f); font-weight:500; }
  .search-section { padding:18px 16px 8px; }
  .search-section-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
  .search-section-title { font-size:13px; font-weight:700; color:var(--ink); letter-spacing:-.02em; }
  .search-section-act { font-size:12px; color:var(--ink3); cursor:pointer; background:none; border:none; font-family:var(--f); padding:4px; }
  .search-section-act:hover { color:var(--ink); }
  .recent-list { display:flex; flex-direction:column; }
  .recent-item { display:flex; align-items:center; gap:10px; padding:10px 0; cursor:pointer; border-bottom:1px solid var(--line); }
  .recent-item:last-child { border-bottom:none; }
  .recent-item:hover .recent-text { color:var(--blue); }
  .recent-ic { color:var(--ink3); flex-shrink:0; }
  .recent-text { flex:1; font-size:14px; color:var(--ink); letter-spacing:-.02em; }
  .recent-del { width:20px; height:20px; border:none; background:none; cursor:pointer; color:var(--ink3); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .recent-del:hover { color:var(--ink); }
  .popular-grid { display:flex; flex-wrap:wrap; gap:6px; }
  .popular-chip { display:inline-flex; align-items:center; gap:6px; padding:7px 12px; background:var(--white); border:1.5px solid var(--line); border-radius:18px; font-size:12.5px; font-weight:500; color:var(--ink2); cursor:pointer; font-family:var(--f); transition:all .15s; }
  .popular-chip:hover { border-color:var(--blue); color:var(--blue); }
  .popular-rank { font-size:11px; font-weight:700; color:var(--blue); }
  .map-wrap { position:relative; flex:1; overflow:hidden; background:linear-gradient(135deg,#E8F0FE 0%,#F0F4FF 100%); }
  .map-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(37,99,235,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.08) 1px,transparent 1px); background-size:36px 36px; }
  .map-roads { position:absolute; inset:0; }
  .map-road { position:absolute; background:#fff; opacity:.85; }
  .map-road.h1 { top:38%; left:0; right:0; height:18px; }
  .map-road.h2 { top:72%; left:0; right:0; height:12px; }
  .map-road.v1 { top:0; bottom:0; left:32%; width:14px; }
  .map-road.v2 { top:0; bottom:0; left:68%; width:10px; }
  .map-pin { position:absolute; transform:translate(-50%,-100%); display:flex; flex-direction:column; align-items:center; cursor:pointer; }
  .map-pin-bubble { background:var(--blue); color:#fff; padding:5px 10px; border-radius:14px; font-size:12px; font-weight:700; letter-spacing:-.02em; box-shadow:0 4px 10px rgba(37,99,235,.32); white-space:nowrap; }
  .map-pin-bubble.alt { background:var(--white); color:var(--blue); border:1.5px solid var(--blue); }
  .map-pin-stem { width:2px; height:8px; background:var(--blue); }
  .map-pin-dot { width:8px; height:8px; border-radius:50%; background:var(--blue); border:2px solid #fff; box-shadow:0 0 0 1px var(--blue); }
  .map-overlay { position:absolute; top:12px; left:12px; right:12px; display:flex; gap:8px; }
  .map-search-card { flex:1; display:flex; align-items:center; gap:8px; background:var(--white); border-radius:24px; padding:11px 14px; box-shadow:0 4px 12px rgba(0,0,0,.06); cursor:pointer; }
  .map-search-card span { font-size:13px; color:var(--ink3); }
  .map-fab { position:absolute; right:12px; bottom:160px; display:flex; flex-direction:column; gap:8px; }
  .map-fab-btn { width:42px; height:42px; border-radius:50%; background:var(--white); border:1px solid var(--line); color:var(--ink); cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,.08); transition:transform .12s; }
  .map-fab-btn:active { transform:scale(.92); }
  .map-sheet { position:absolute; left:12px; right:12px; bottom:12px; background:var(--white); border-radius:16px; padding:14px; box-shadow:0 8px 20px rgba(0,0,0,.10); display:flex; gap:12px; align-items:center; }
  .map-sheet-img { width:60px; height:60px; border-radius:10px; object-fit:cover; flex-shrink:0; }
  .map-sheet-info { flex:1; min-width:0; }
  .map-sheet-name { font-size:14px; font-weight:700; letter-spacing:-.02em; margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .map-sheet-meta { font-size:12px; color:var(--ink3); margin-bottom:4px; }
  .map-sheet-price { font-size:14px; font-weight:700; letter-spacing:-.02em; }
  .reg-grid { padding:20px 16px; }
  .reg-type-row { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-bottom:8px; }
  .reg-type { display:flex; flex-direction:column; align-items:flex-start; gap:8px; padding:18px 14px; background:var(--white); border:1.5px solid var(--line); border-radius:14px; cursor:pointer; transition:all .15s; text-align:left; font-family:var(--f); }
  .reg-type.on { border-color:var(--blue); background:var(--blue-lt); }
  .reg-type:hover { border-color:var(--blue); }
  .reg-type-ic { width:36px; height:36px; border-radius:10px; background:var(--blue-lt); color:var(--blue); display:flex; align-items:center; justify-content:center; }
  .reg-type.on .reg-type-ic { background:var(--blue); color:#fff; }
  .reg-type-title { font-size:14px; font-weight:700; letter-spacing:-.02em; color:var(--ink); }
  .reg-type-sub { font-size:11.5px; color:var(--ink3); line-height:1.4; }
  .hero-wrap { flex:1; display:flex; align-items:center; justify-content:center; padding:24px 16px; }
  .hero-banner { width:100%; background:linear-gradient(135deg,#1D4ED8 0%,#3B82F6 100%); border-radius:24px; padding:44px 24px 40px; color:#fff; text-align:center; display:flex; flex-direction:column; align-items:center; gap:14px; box-shadow:0 18px 36px -16px rgba(37,99,235,.55); position:relative; overflow:hidden; }
  .hero-banner::before { content:""; position:absolute; top:-40px; right:-40px; width:160px; height:160px; border-radius:50%; background:rgba(255,255,255,.10); }
  .hero-banner::after { content:""; position:absolute; bottom:-60px; left:-30px; width:140px; height:140px; border-radius:50%; background:rgba(255,255,255,.08); }
  .hero-tag { position:relative; font-size:11px; font-weight:700; letter-spacing:.18em; opacity:.85; }
  .hero-icon { position:relative; width:64px; height:64px; border-radius:20px; background:rgba(255,255,255,.18); display:flex; align-items:center; justify-content:center; backdrop-filter:blur(6px); }
  .hero-title { position:relative; font-size:26px; font-weight:900; letter-spacing:-.04em; line-height:1.22; }
  .hero-sub { position:relative; font-size:14px; opacity:.88; line-height:1.55; max-width:240px; }
  .hero-stats { position:relative; display:flex; gap:0; margin-top:18px; width:100%; background:rgba(255,255,255,.12); border-radius:14px; padding:12px 8px; }
  .hero-stat { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; }
  .hero-stat-num { font-size:16px; font-weight:900; letter-spacing:-.03em; }
  .hero-stat-label { font-size:11px; opacity:.75; }
  .hero-stat-bar { width:1px; background:rgba(255,255,255,.22); align-self:stretch; }
  .hero-hint { position:relative; margin-top:6px; font-size:12px; opacity:.78; display:inline-flex; align-items:center; gap:4px; }
  .home-search-wrap { padding:16px 16px 4px; flex-shrink:0; }
  .home-search { width:100%; display:flex; align-items:center; gap:10px; padding:14px 18px; background:#F4F4F5; border:1.5px solid transparent; border-radius:28px; cursor:pointer; font-family:var(--f); transition:all .18s; }
  .home-search:hover { background:var(--blue-lt); border-color:var(--blue); }
  .home-search:active { transform:scale(.985); }
  .home-search svg { color:var(--ink2); flex-shrink:0; }
  .home-search-text { flex:1; text-align:left; font-size:14px; color:var(--ink3); font-weight:400; letter-spacing:-.02em; }
  .home-search-kbd { font-size:11px; color:var(--ink3); padding:3px 8px; background:#fff; border:1px solid var(--line); border-radius:6px; letter-spacing:.05em; font-weight:600; }
  .ad-wrap { padding:10px 16px 0; }
  .ad-viewport { position:relative; height:152px; border-radius:18px; overflow:hidden; border:1px solid var(--line); background:#fff; box-shadow:0 8px 20px -10px rgba(0,0,0,.10); }
  .ad-track { display:flex; height:100%; transition:transform .5s cubic-bezier(.22,.68,0,1); will-change:transform; }
  .ad-banner { position:relative; flex:0 0 100%; height:100%; color:var(--ink); display:flex; align-items:center; padding:20px 22px; cursor:pointer; overflow:hidden; }
  .ad-banner::after { content:""; position:absolute; right:-28px; bottom:-28px; width:130px; height:130px; border-radius:50%; opacity:.45; }
  .ad-info { position:relative; flex:1; min-width:0; z-index:1; }
  .ad-tag { display:inline-block; font-size:10px; font-weight:700; letter-spacing:.16em; margin-bottom:6px; padding:3px 9px; border-radius:10px; }
  .ad-title { font-size:17px; font-weight:800; letter-spacing:-.03em; line-height:1.25; margin-bottom:4px; color:var(--ink); }
  .ad-sub { font-size:12px; line-height:1.4; color:var(--ink2); }
  .ad-visual { position:relative; width:64px; height:64px; border-radius:16px; display:flex; align-items:center; justify-content:center; z-index:1; flex-shrink:0; }
  .ad-visual svg { width:28px; height:28px; }
  .ad-banner.event { background:linear-gradient(135deg,#FEF3C7 0%,#FFFBEB 50%,#FFFFFF 100%); }
  .ad-banner.event::after { background:#FDE68A; }
  .ad-banner.event .ad-tag { color:#B45309; background:#FDE68A; }
  .ad-banner.event .ad-visual { background:#FBBF24; color:#fff; box-shadow:0 6px 14px -4px rgba(251,191,36,.5); }
  .ad-banner.safety { background:linear-gradient(135deg,#D1FAE5 0%,#ECFDF5 50%,#FFFFFF 100%); }
  .ad-banner.safety::after { background:#A7F3D0; }
  .ad-banner.safety .ad-tag { color:#047857; background:#A7F3D0; }
  .ad-banner.safety .ad-visual { background:#14B8A6; color:#fff; box-shadow:0 6px 14px -4px rgba(20,184,166,.5); }
  .ad-banner.new { background:linear-gradient(135deg,#DBEAFE 0%,#EFF4FF 50%,#FFFFFF 100%); }
  .ad-banner.new::after { background:#BFDBFE; }
  .ad-banner.new .ad-tag { color:#1D4ED8; background:#BFDBFE; }
  .ad-banner.new .ad-visual { background:#3B82F6; color:#fff; box-shadow:0 6px 14px -4px rgba(59,130,246,.5); }
  .ad-counter { position:absolute; right:10px; bottom:10px; z-index:2; font-size:10px; color:var(--ink3); font-weight:600; letter-spacing:.04em; background:#F4F4F5; padding:3px 8px; border-radius:10px; }
  .ad-arrow { position:absolute; top:50%; transform:translateY(-50%); width:28px; height:28px; border-radius:50%; background:#fff; color:var(--ink2); border:1px solid var(--line); cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:3; transition:all .15s; box-shadow:0 2px 8px rgba(0,0,0,.06); }
  .ad-arrow:hover { background:var(--ink); color:#fff; border-color:var(--ink); }
  .ad-arrow:active { transform:translateY(-50%) scale(.9); }
  .ad-arrow.left { left:8px; }
  .ad-arrow.right { right:8px; }
  .ad-dots { display:flex; justify-content:center; gap:5px; padding:4px 0 0; }
  .ad-dot { width:5px; height:5px; border-radius:50%; background:var(--line); transition:all .18s; cursor:pointer; border:none; padding:0; }
  .ad-dot.on { width:16px; background:var(--blue); border-radius:3px; }
  .cat-section { padding:14px 16px 16px; }
  .cat-block-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:10px; }
  .cat-block { display:flex; flex-direction:column; align-items:flex-start; gap:8px; padding:14px 13px 14px; background:var(--white); border:1.5px solid var(--line); border-radius:14px; cursor:pointer; transition:all .15s; text-align:left; font-family:var(--f); }
  .cat-block:hover { border-color:var(--blue); transform:translateY(-1px); }
  .cat-block:active { transform:scale(.97); }
  .cat-block.row1 { grid-column:span 2; }
  .cat-block.row2 { grid-column:span 3; }
  .cat-block-ic { width:34px; height:34px; border-radius:10px; background:var(--blue-lt); color:var(--blue); display:flex; align-items:center; justify-content:center; }
  .cat-block.accent .cat-block-ic { background:var(--blue); color:#fff; }
  .cat-block-label { font-size:13.5px; font-weight:700; letter-spacing:-.02em; color:var(--ink); }
  .cat-block-sub { font-size:11px; color:var(--ink3); letter-spacing:-.01em; line-height:1.35; }
  .cat-group-title { display:flex; align-items:center; gap:6px; padding:6px 16px 4px; font-size:11.5px; font-weight:700; color:var(--ink3); letter-spacing:.04em; text-transform:uppercase; }
  .space-unified { display:flex; align-items:center; gap:14px; margin:4px 16px 12px; padding:18px 18px; background:linear-gradient(135deg,#EFF4FF 0%,#FFFFFF 100%); border:1.5px solid var(--line); border-radius:16px; cursor:pointer; transition:all .18s; font-family:var(--f); width:calc(100% - 32px); text-align:left; }
  .space-unified:hover { border-color:var(--blue); transform:translateY(-1px); box-shadow:0 8px 18px -10px rgba(37,99,235,.30); }
  .space-unified:active { transform:scale(.985); }
  .space-unified-ic { width:44px; height:44px; border-radius:12px; background:var(--blue); color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .space-unified-info { flex:1; min-width:0; display:flex; flex-direction:column; gap:4px; }
  .space-unified-title { font-size:15px; font-weight:800; letter-spacing:-.03em; color:var(--ink); line-height:1.2; }
  .space-unified-sub { font-size:12px; color:var(--ink3); letter-spacing:-.01em; line-height:1.3; }
  .space-unified-chev { color:var(--ink3); flex-shrink:0; }
  .big-cat-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:12px 16px 22px; }
  .big-cat { display:flex; flex-direction:column; align-items:flex-start; gap:10px; padding:22px 18px 20px; border-radius:20px; border:1.5px solid var(--line); cursor:pointer; transition:all .2s; font-family:var(--f); text-align:left; min-height:170px; }
  .big-cat:hover { transform:translateY(-2px); box-shadow:0 12px 24px -14px rgba(0,0,0,.18); }
  .big-cat:active { transform:scale(.98); }
  .big-cat.store { background:linear-gradient(160deg,#DBEAFE 0%,#FFFFFF 65%); border-color:#BFDBFE; }
  .big-cat.share { background:linear-gradient(160deg,#D1FAE5 0%,#FFFFFF 65%); border-color:#A7F3D0; }
  .big-cat-ic { width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; color:#fff; }
  .big-cat.store .big-cat-ic { background:#1D4ED8; box-shadow:0 6px 14px -4px rgba(29,78,216,.45); }
  .big-cat.share .big-cat-ic { background:#14B8A6; box-shadow:0 6px 14px -4px rgba(20,184,166,.45); }
  .big-cat-title { font-size:20px; font-weight:900; letter-spacing:-.04em; color:var(--ink); line-height:1.15; }
  .big-cat-sub { font-size:12.5px; color:var(--ink3); line-height:1.45; }
  .big-cat-go { margin-top:auto; display:inline-flex; align-items:center; gap:3px; font-size:12px; font-weight:700; }
  .big-cat.store .big-cat-go { color:#1D4ED8; }
  .big-cat.share .big-cat-go { color:#0F766E; }
  .choice-scroll { flex:1; overflow-y:auto; padding:30px 18px 24px; }
  .choice-scroll::-webkit-scrollbar { width:3px; }
  .choice-scroll::-webkit-scrollbar-thumb { background:var(--line); border-radius:3px; }
  .choice-heading { margin-bottom:26px; }
  .choice-title { font-size:24px; font-weight:900; letter-spacing:-.04em; line-height:1.25; margin-bottom:8px; }
  .choice-title span { color:#1D4ED8; }
  .choice-title span.teal { color:#0F766E; }
  .choice-sub { font-size:14px; color:var(--ink3); line-height:1.5; }
  .choice-cards { display:flex; flex-direction:column; gap:12px; }
  .choice-card { display:flex; align-items:center; gap:14px; padding:22px 18px; background:var(--white); border:1.5px solid var(--line); border-radius:18px; cursor:pointer; font-family:var(--f); transition:all .18s; text-align:left; width:100%; }
  .choice-card:hover { transform:translateY(-1px); box-shadow:0 12px 22px -14px rgba(0,0,0,.18); }
  .choice-card.user-store:hover { border-color:#1D4ED8; }
  .choice-card.user-host:hover { border-color:#F59E0B; }
  .choice-card.user-borrow:hover { border-color:#14B8A6; }
  .choice-card.user-lend:hover { border-color:#F43F5E; }
  .choice-card:active { transform:scale(.985); }
  .choice-card-ic { width:50px; height:50px; border-radius:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#fff; }
  .choice-card.user-store .choice-card-ic { background:#1D4ED8; box-shadow:0 6px 14px -4px rgba(29,78,216,.45); }
  .choice-card.user-host .choice-card-ic { background:#F59E0B; box-shadow:0 6px 14px -4px rgba(245,158,11,.45); }
  .choice-card.user-borrow .choice-card-ic { background:#14B8A6; box-shadow:0 6px 14px -4px rgba(20,184,166,.45); }
  .choice-card.user-lend .choice-card-ic { background:#F43F5E; box-shadow:0 6px 14px -4px rgba(244,63,94,.45); }
  .choice-card-content { flex:1; min-width:0; display:flex; flex-direction:column; gap:4px; }
  .choice-card-title { font-size:16px; font-weight:800; letter-spacing:-.03em; color:var(--ink); line-height:1.25; }
  .choice-card-sub { font-size:12.5px; color:var(--ink3); line-height:1.45; }
  .choice-card-chev { color:var(--ink3); flex-shrink:0; }
  .featured-head { display:flex; align-items:center; justify-content:space-between; padding:4px 16px 4px; }
  .featured-title { font-size:13.5px; font-weight:700; letter-spacing:-.02em; color:var(--ink); }
  .featured-more { font-size:11px; color:var(--ink3); background:none; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:2px; font-family:var(--f); padding:3px; }
  .featured-more:hover { color:var(--ink); }
  .featured-scroll { display:flex; gap:7px; padding:0 16px 8px; overflow-x:auto; scroll-snap-type:x mandatory; scroll-padding-left:16px; scroll-padding-inline-start:16px; }
  .featured-scroll::-webkit-scrollbar { display:none; }
  .featured-card { flex:0 0 160px; background:var(--white); border:1px solid var(--line); border-radius:12px; overflow:hidden; cursor:pointer; transition:all .18s; scroll-snap-align:start; font-family:var(--f); text-align:left; padding:0; }
  .featured-card:hover { border-color:var(--blue); transform:translateY(-2px); box-shadow:0 10px 22px -14px rgba(0,0,0,.18); }
  .featured-card:active { transform:scale(.985); }
  .featured-more-card { flex:0 0 auto; background:none; border:none; display:flex; align-items:center; justify-content:center; padding:0 8px; }
  .featured-more-card:hover { transform:none; box-shadow:none; border:none; }
  .featured-more-inner { display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--ink3); }
  .featured-more-count { font-size:13px; font-weight:800; letter-spacing:-.02em; color:var(--ink2); }
  .featured-more-label { font-size:11px; font-weight:500; white-space:nowrap; }
  .featured-img { width:100%; height:80px; object-fit:cover; background:var(--line); display:block; }
  .featured-info { padding:6px 9px 8px; }
  .featured-name { font-size:11.5px; font-weight:700; letter-spacing:-.02em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:1px; color:var(--ink); line-height:1.25; }
  .featured-meta { font-size:10px; color:var(--ink3); margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .featured-price { font-size:12px; font-weight:800; letter-spacing:-.03em; color:var(--ink); }
  .featured-price small { font-size:9.5px; font-weight:400; color:var(--ink3); margin-left:2px; }
  .featured-badges { display:flex; gap:3px; margin-top:3px; flex-wrap:wrap; }
  .featured-badges .badge { font-size:9px; padding:1px 4px; }
  .com-write { position:absolute; right:14px; bottom:84px; width:46px; height:46px; border-radius:50%; background:var(--blue); color:#fff; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 18px -6px rgba(37,99,235,.5); z-index:5; transition:transform .14s; }
  .com-write:active { transform:scale(.92); }
  .post-list { padding:12px 16px 24px; display:flex; flex-direction:column; gap:10px; }
  .post-card { padding:16px; background:var(--white); border:1px solid var(--line); border-radius:14px; cursor:pointer; transition:all .15s; }
  .post-card:hover { border-color:var(--blue); transform:translateY(-1px); }
  .post-head { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
  .post-avatar { width:28px; height:28px; border-radius:50%; background:var(--blue-lt); color:var(--blue); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; flex-shrink:0; letter-spacing:-.02em; }
  .post-author { font-size:12.5px; font-weight:600; color:var(--ink); }
  .post-time { font-size:11.5px; color:var(--ink3); margin-left:auto; }
  .post-cat { font-size:10.5px; font-weight:700; padding:3px 8px; border-radius:6px; margin-bottom:8px; display:inline-block; letter-spacing:.02em; }
  .post-cat.review { background:#F0FDF4; color:#16A34A; }
  .post-cat.qna { background:#FAF5FF; color:#9333EA; }
  .post-cat.tip { background:#FFF7ED; color:#EA580C; }
  .post-cat.news { background:var(--blue-lt); color:var(--blue); }
  .post-title { font-size:14.5px; font-weight:700; letter-spacing:-.02em; color:var(--ink); margin-bottom:5px; line-height:1.3; }
  .post-excerpt { font-size:12.5px; color:var(--ink2); line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .post-foot { display:flex; gap:14px; margin-top:11px; font-size:11.5px; color:var(--ink3); }
  .post-foot span { display:inline-flex; align-items:center; gap:4px; }
  .locked-state { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 28px 60px; text-align:center; gap:16px; }
  .locked-icon { width:84px; height:84px; border-radius:50%; background:linear-gradient(135deg,var(--blue-lt) 0%,#DBEAFE 100%); display:flex; align-items:center; justify-content:center; color:var(--blue); box-shadow:0 10px 24px -8px rgba(37,99,235,.28); margin-bottom:4px; }
  .locked-title { font-size:17px; font-weight:800; letter-spacing:-.03em; color:var(--ink); line-height:1.4; }
  .locked-sub { font-size:13.5px; color:var(--ink3); line-height:1.55; max-width:280px; }
  .locked-btn { margin-top:10px; padding:14px 22px; background:var(--blue); color:#fff; border:none; border-radius:14px; font-size:14px; font-weight:700; cursor:pointer; font-family:var(--f); display:inline-flex; align-items:center; gap:6px; box-shadow:0 8px 18px -6px rgba(37,99,235,.45); transition:all .18s; letter-spacing:-.01em; }
  .locked-btn:hover:not(:disabled) { background:var(--blue-dim); transform:translateY(-1px); }
  .locked-btn:active:not(:disabled) { transform:scale(.97); }
  .locked-btn:disabled { background:#9CA3AF; cursor:wait; box-shadow:none; }
  .locked-features { display:flex; gap:6px; margin-top:14px; flex-wrap:wrap; justify-content:center; }
  .locked-chip { font-size:11.5px; padding:5px 11px; background:var(--blue-lt); color:var(--blue); border-radius:14px; font-weight:600; letter-spacing:-.01em; }
  .spin-ring { width:14px; height:14px; border:2px solid rgba(255,255,255,.35); border-top-color:#fff; border-radius:50%; animation:spinRing .7s linear infinite; }
  @keyframes spinRing { to { transform:rotate(360deg); } }
  .detail-scroll { flex:1; overflow-y:auto; }
  .detail-scroll::-webkit-scrollbar { width:3px; }
  .detail-scroll::-webkit-scrollbar-thumb { background:var(--line); border-radius:3px; }
  .detail-img { width:100%; height:240px; object-fit:cover; background:var(--line); display:block; }
  .detail-body { padding:18px 16px; }
  .detail-header { margin-bottom:14px; }
  .detail-title { font-size:20px; font-weight:800; letter-spacing:-.03em; line-height:1.3; margin-bottom:6px; color:var(--ink); }
  .detail-tag-row { display:flex; gap:5px; flex-wrap:wrap; }
  .detail-divider { height:8px; background:#FAFAFA; margin:18px -16px; }
  .detail-section { padding-bottom:4px; }
  .detail-section-title { font-size:14px; font-weight:700; letter-spacing:-.02em; margin-bottom:10px; color:var(--ink); }
  .detail-desc { font-size:13px; color:var(--ink2); line-height:1.65; }
  .detail-spec-row { display:flex; padding:7px 0; font-size:12.5px; }
  .detail-spec-label { width:80px; color:var(--ink3); flex-shrink:0; }
  .detail-spec-value { color:var(--ink); font-weight:500; flex:1; }
  .owner-card { display:flex; align-items:center; gap:12px; padding:14px; background:#FAFAFA; border-radius:14px; }
  .owner-avatar { width:42px; height:42px; border-radius:50%; background:var(--blue-lt); color:var(--blue); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; letter-spacing:-.03em; flex-shrink:0; }
  .owner-info { flex:1; min-width:0; }
  .owner-name { font-size:13.5px; font-weight:700; margin-bottom:2px; color:var(--ink); }
  .owner-meta { font-size:11.5px; color:var(--ink3); }
  .owner-action { padding:7px 14px; border:1px solid var(--line); background:#fff; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; font-family:var(--f); color:var(--ink); transition:all .14s; }
  .owner-action:hover { border-color:var(--blue); color:var(--blue); }
  .review-item { padding:12px 0; border-bottom:1px solid var(--line); }
  .review-item:last-child { border-bottom:none; padding-bottom:0; }
  .review-head { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
  .review-rating { font-size:12px; color:#F59E0B; font-weight:700; letter-spacing:.04em; }
  .review-author { font-size:12.5px; font-weight:600; color:var(--ink); }
  .review-time { font-size:11px; color:var(--ink3); margin-left:auto; }
  .review-text { font-size:12.5px; color:var(--ink2); line-height:1.55; }
  .detail-bottom { padding:12px 16px 14px; border-top:1px solid var(--line); background:#fff; display:flex; align-items:center; gap:10px; flex-shrink:0; }
  .detail-fav { width:44px; height:44px; border:1.5px solid var(--line); background:#fff; border-radius:12px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--ink3); transition:all .15s; flex-shrink:0; }
  .detail-fav:hover { color:#DC2626; border-color:#FCA5A5; }
  .detail-fav.on { color:#DC2626; border-color:#FCA5A5; background:#FEF2F2; }
  .detail-price-area { flex:1; min-width:0; }
  .detail-price-label { font-size:11px; color:var(--ink3); font-weight:500; margin-bottom:1px; }
  .detail-price-value { font-size:17px; font-weight:900; letter-spacing:-.03em; color:var(--ink); }
  .detail-price-value small { font-size:11.5px; font-weight:500; color:var(--ink3); margin-left:2px; }
  .detail-cta { padding:12px 22px; color:#fff; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; font-family:var(--f); display:inline-flex; align-items:center; gap:5px; letter-spacing:-.01em; transition:all .15s; flex-shrink:0; }
  .detail-cta:active { transform:scale(.97); }
  .detail-cta.store { background:#1D4ED8; }
  .detail-cta.store:hover { background:#1E40AF; }
  .detail-cta.share { background:#14B8A6; }
  .detail-cta.share:hover { background:#0F766E; }
  .owner-card.store .owner-avatar { background:#DBEAFE; color:#1D4ED8; }
  .owner-card.share .owner-avatar { background:#D1FAE5; color:#0F766E; }
  .owner-action.store:hover { border-color:#1D4ED8; color:#1D4ED8; }
  .owner-action.share:hover { border-color:#14B8A6; color:#0F766E; }
  .rental-wrap { padding:14px 16px 4px; flex-shrink:0; }
  .rental-status { width:100%; padding:14px 16px 13px; background:linear-gradient(135deg,#FFF7ED 0%,#FFE4E6 100%); border:1.5px solid #FDBA74; border-radius:18px; font-family:var(--f); }
  .rental-main { display:flex; align-items:center; gap:12px; width:100%; }
  .rental-ic { width:38px; height:38px; border-radius:50%; background:#fff; color:#EA580C; display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 2px 8px rgba(234,88,12,.18); }
  .rental-info { flex:1; min-width:0; text-align:left; }
  .rental-name { font-size:13.5px; font-weight:700; letter-spacing:-.02em; color:var(--ink); margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .rental-sub { font-size:11.5px; color:var(--ink3); font-weight:500; }
  .rental-time { font-size:20px; font-weight:900; color:#EA580C; letter-spacing:-.04em; line-height:1; animation:pulseDim 1.6s ease-in-out infinite; flex-shrink:0; }
  .rental-time small { font-size:11.5px; font-weight:600; margin-left:2px; opacity:.85; }
  @keyframes pulseDim { 0%,100%{opacity:1} 50%{opacity:.55} }
  .rental-actions { display:flex; gap:8px; margin-top:11px; padding-top:11px; border-top:1px dashed rgba(234,88,12,.28); }
  .rental-btn { flex:1; padding:10px; border:1.5px solid #FED7AA; background:rgba(255,255,255,.7); border-radius:10px; font-size:12.5px; font-weight:700; color:#C2410C; cursor:pointer; font-family:var(--f); letter-spacing:-.01em; transition:all .15s; display:inline-flex; align-items:center; justify-content:center; gap:4px; }
  .rental-btn:hover { background:#FFFFFF; border-color:#FB923C; }
  .rental-btn:active { transform:scale(.97); }
  .rental-btn.primary { background:#EA580C; color:#fff; border-color:#EA580C; }
  .rental-btn.primary:hover { background:#C2410C; border-color:#C2410C; }
  .dev-btn { width:44px; height:44px; border-radius:12px; color:var(--blue); background:var(--blue-lt); border:1.5px solid #BFDBFE; position:relative; transition:all .14s; cursor:pointer; display:flex; align-items:center; justify-content:center; }
  .dev-btn svg { width:22px; height:22px; stroke-width:2.2; }
  .dev-btn::after { content:"DEV"; position:absolute; top:-4px; right:-4px; font-size:8px; font-weight:900; color:#fff; background:var(--blue); padding:2px 4px; border-radius:5px; letter-spacing:.06em; box-shadow:0 2px 4px rgba(37,99,235,.3); }
  .dev-btn:hover { background:#DBEAFE; border-color:var(--blue); }
  .dev-btn:active { transform:scale(.94); }
  .dev-btn.off { color:#9CA3AF; background:#F3F4F6; border-color:#E5E7EB; }
  .dev-btn.off::after { content:"OFF"; background:#9CA3AF; box-shadow:none; }

  /* Blue rental widget override */
  :root { --teal:#0F766E; --teal-dim:#0D5F58; --teal-lt:#F0FDFA; }
  .rental-status.blue { background:linear-gradient(135deg,#EFF4FF 0%,#DBEAFE 100%); border-color:#93C5FD; }
  .rental-status.blue .rental-ic { color:var(--blue); box-shadow:0 2px 8px rgba(37,99,235,.18); }
  .rental-status.blue .rental-time { color:var(--blue); }
  .rental-status.blue .rental-actions { border-top-color:rgba(37,99,235,.2); }
  .rental-status.blue .rental-btn { border-color:#BFDBFE; color:#1D4ED8; }
  .rental-status.blue .rental-btn:hover { background:#fff; border-color:#60A5FA; }
  .rental-status.blue .rental-btn.primary { background:var(--blue); color:#fff; border-color:var(--blue); }
  .rental-status.blue .rental-btn.primary:hover { background:var(--blue-dim); border-color:var(--blue-dim); }

  /* Overlay / bottom sheet */
  .overlay-bg { position:fixed; inset:0; background:rgba(0,0,0,.45); z-index:50; display:flex; align-items:flex-end; justify-content:center; }
  .bottom-sheet { background:#fff; border-radius:22px 22px 0 0; width:100%; max-width:420px; padding:0 0 28px; max-height:85vh; overflow-y:auto; }
  .bottom-sheet::-webkit-scrollbar { display:none; }
  .sheet-handle { width:36px; height:4px; background:var(--line); border-radius:2px; margin:12px auto 0; }

  /* Extend options */
  .extend-option { display:flex; align-items:center; justify-content:space-between; padding:14px 20px; border-bottom:1px solid var(--line); cursor:pointer; transition:background .14s; }
  .extend-option:last-child { border-bottom:none; }
  .extend-option:hover { background:#F9FAFB; }
  .extend-option-label { font-size:15px; font-weight:600; color:var(--ink); }
  .extend-option-price { font-size:14px; font-weight:700; color:var(--blue); }

  /* Return / message overlays */
  .return-sheet-title { font-size:17px; font-weight:800; letter-spacing:-.03em; padding:18px 20px 4px; }
  .return-sheet-sub { font-size:13px; color:var(--ink3); padding:0 20px 14px; line-height:1.5; }
  .return-location-card { margin:0 16px 14px; padding:14px; background:#F8FAFC; border:1px solid var(--line); border-radius:14px; }
  .return-location-map { height:100px; background:linear-gradient(135deg,#EFF4FF 0%,#F0F4FF 100%); border-radius:10px; margin-bottom:10px; position:relative; overflow:hidden; }
  .return-addr { font-size:13.5px; font-weight:700; color:var(--ink); margin-bottom:3px; }
  .return-addr-detail { font-size:12px; color:var(--ink3); }
  .return-btns { display:flex; gap:8px; padding:0 16px; }
  .return-btn { flex:1; padding:13px; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; font-family:var(--f); transition:all .15s; }
  .return-btn.ghost { background:#fff; border:1.5px solid var(--line); color:var(--ink2); }
  .return-btn.ghost:hover { border-color:var(--ink); color:var(--ink); }
  .return-btn.primary { background:var(--blue); border:none; color:#fff; }
  .return-btn.primary:hover { background:var(--blue-dim); }
  .msg-templates { padding:0 16px 12px; display:flex; flex-direction:column; gap:7px; }
  .msg-tpl { padding:11px 14px; background:#F8FAFC; border:1px solid var(--line); border-radius:10px; font-size:13px; color:var(--ink); cursor:pointer; text-align:left; font-family:var(--f); transition:all .14s; }
  .msg-tpl:hover { border-color:var(--blue); background:var(--blue-lt); }
  .msg-textarea { width:calc(100% - 32px); margin:0 16px 12px; display:block; border:1.5px solid var(--line); border-radius:12px; padding:12px 14px; font-size:14px; font-family:var(--f); color:var(--ink); resize:none; outline:none; transition:border-color .15s; }
  .msg-textarea:focus { border-color:var(--blue); }
  .msg-send-btn { width:calc(100% - 32px); margin:0 16px; padding:14px; background:var(--blue); color:#fff; border:none; border-radius:12px; font-size:15px; font-weight:700; cursor:pointer; font-family:var(--f); transition:all .15s; }
  .msg-send-btn:hover { background:var(--blue-dim); }

  /* Photo gallery */
  .gallery-wrap { position:relative; width:100%; height:240px; overflow:hidden; background:var(--line); }
  .gallery-track { display:flex; height:100%; transition:transform .35s cubic-bezier(.22,.68,0,1); will-change:transform; }
  .gallery-img { flex:0 0 100%; width:100%; height:240px; object-fit:cover; }
  .gallery-dots { position:absolute; bottom:10px; left:50%; transform:translateX(-50%); display:flex; gap:5px; }
  .gallery-dot { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,.55); border:none; cursor:pointer; padding:0; transition:all .18s; }
  .gallery-dot.on { width:18px; background:#fff; border-radius:3px; }
  .gallery-count { position:absolute; top:10px; right:12px; background:rgba(0,0,0,.45); color:#fff; font-size:11px; font-weight:700; padding:3px 9px; border-radius:10px; }

  /* Detail map */
  .detail-map { height:110px; background:linear-gradient(135deg,#EFF4FF 0%,#F0F4FF 100%); border-radius:14px; position:relative; overflow:hidden; margin-bottom:12px; }
  .detail-map-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(37,99,235,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.07) 1px,transparent 1px); background-size:28px 28px; }
  .detail-map-road { position:absolute; background:#fff; opacity:.9; }
  .detail-map-road.h { top:48%; left:0; right:0; height:13px; }
  .detail-map-road.v { top:0; bottom:0; left:40%; width:10px; }
  .detail-map-pin { position:absolute; top:28%; left:38%; transform:translate(-50%,-100%); display:flex; flex-direction:column; align-items:center; }
  .detail-map-bubble { background:var(--blue); color:#fff; padding:4px 9px; border-radius:12px; font-size:11px; font-weight:700; box-shadow:0 3px 8px rgba(37,99,235,.32); white-space:nowrap; }
  .detail-map-stem { width:2px; height:6px; background:var(--blue); }
  .detail-map-dot { width:7px; height:7px; border-radius:50%; background:var(--blue); border:2px solid #fff; box-shadow:0 0 0 1px var(--blue); }
  .detail-map-addr { font-size:12px; color:var(--ink3); }

  /* Dual CTA */
  .detail-dual-cta { display:flex; gap:8px; }
  .detail-cta-chat { flex:1; padding:12px; border:1.5px solid var(--blue); background:#fff; color:var(--blue); border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; font-family:var(--f); transition:all .15s; white-space:nowrap; }
  .detail-cta-chat:hover { background:var(--blue-lt); }
  .detail-cta-pay { flex:1.4; padding:12px 16px; background:var(--blue); color:#fff; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; font-family:var(--f); transition:all .15s; }
  .detail-cta-pay:hover { background:var(--blue-dim); }
  .detail-cta-borrow { flex:1.4; padding:12px 16px; background:var(--teal); color:#fff; border:none; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; font-family:var(--f); transition:all .15s; }
  .detail-cta-borrow:hover { background:var(--teal-dim); }

  /* Chat */
  .chat-msgs { flex:1; overflow-y:auto; padding:14px 16px; display:flex; flex-direction:column; gap:10px; }
  .chat-msgs::-webkit-scrollbar { width:3px; }
  .chat-msgs::-webkit-scrollbar-thumb { background:var(--line); border-radius:3px; }
  .chat-row { display:flex; align-items:flex-end; gap:7px; }
  .chat-row.mine { flex-direction:row-reverse; }
  .chat-avatar { width:32px; height:32px; border-radius:50%; background:var(--blue-lt); color:var(--blue); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:800; flex-shrink:0; }
  .chat-row.mine .chat-avatar { background:var(--teal-lt); color:var(--teal); }
  .chat-bubble { max-width:70%; padding:10px 13px; border-radius:14px; font-size:13.5px; line-height:1.5; }
  .chat-row.theirs .chat-bubble { background:#F4F4F5; color:var(--ink); border-radius:4px 14px 14px 14px; }
  .chat-row.mine .chat-bubble { background:var(--blue); color:#fff; border-radius:14px 4px 14px 14px; }
  .chat-time { font-size:10.5px; color:var(--ink3); }
  .chat-input-row { display:flex; gap:8px; padding:10px 12px 14px; border-top:1px solid var(--line); flex-shrink:0; background:#fff; }
  .chat-input { flex:1; border:1.5px solid var(--line); border-radius:22px; padding:10px 14px; font-size:14px; font-family:var(--f); color:var(--ink); outline:none; transition:border-color .15s; }
  .chat-input:focus { border-color:var(--blue); }
  .chat-send { width:42px; height:42px; border-radius:50%; background:var(--blue); color:#fff; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .14s; }
  .chat-send:hover { background:var(--blue-dim); }

  /* Booking */
  .book-scroll { flex:1; overflow-y:auto; padding:16px; }
  .book-scroll::-webkit-scrollbar { width:3px; }
  .book-scroll::-webkit-scrollbar-thumb { background:var(--line); border-radius:3px; }
  .book-month-nav { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
  .book-month-label { font-size:15px; font-weight:700; color:var(--ink); }
  .book-nav-btn { width:34px; height:34px; border:1.5px solid var(--line); background:#fff; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--ink); transition:all .14s; font-family:var(--f); }
  .book-nav-btn:hover { border-color:var(--blue); color:var(--blue); }
  .book-day-header { display:grid; grid-template-columns:repeat(7,1fr); margin-bottom:4px; }
  .book-day-cell { text-align:center; font-size:11px; font-weight:700; color:var(--ink3); padding:4px 0; }
  .book-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; margin-bottom:20px; }
  .book-cell { aspect-ratio:1; display:flex; align-items:center; justify-content:center; font-size:13px; border-radius:50%; cursor:pointer; transition:all .14s; border:none; background:none; font-family:var(--f); color:var(--ink); }
  .book-cell:hover:not(:disabled) { background:var(--blue-lt); color:var(--blue); }
  .book-cell.on { background:var(--blue); color:#fff; font-weight:700; }
  .book-cell:disabled { color:var(--line); cursor:not-allowed; text-decoration:line-through; }
  .book-cell.empty { pointer-events:none; }
  .book-section-title { font-size:13px; font-weight:700; color:var(--ink); margin-bottom:10px; }
  .book-time-grid { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:20px; }
  .book-time-chip { padding:8px 14px; border:1.5px solid var(--line); background:#fff; border-radius:20px; font-size:12.5px; font-weight:600; cursor:pointer; color:var(--ink2); font-family:var(--f); transition:all .15s; }
  .book-time-chip:hover { border-color:var(--blue); color:var(--blue); }
  .book-time-chip.on { background:var(--blue); color:#fff; border-color:var(--blue); }
  .book-period-grid { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:20px; }
  .book-period-chip { padding:8px 14px; border:1.5px solid var(--line); background:#fff; border-radius:20px; font-size:12.5px; font-weight:600; cursor:pointer; color:var(--ink2); font-family:var(--f); transition:all .15s; }
  .book-period-chip:hover { border-color:var(--blue); color:var(--blue); }
  .book-period-chip.on { background:var(--blue); color:#fff; border-color:var(--blue); }
  .book-teal .book-cell.on { background:var(--teal); }
  .book-teal .book-cell:hover:not(:disabled) { background:var(--teal-lt); color:var(--teal); }
  .book-teal .book-time-chip.on { background:var(--teal); border-color:var(--teal); }
  .book-teal .book-time-chip:hover { border-color:var(--teal); color:var(--teal); }
  .book-teal .book-period-chip.on { background:var(--teal); border-color:var(--teal); }
  .book-teal .book-period-chip:hover { border-color:var(--teal); color:var(--teal); }

  /* Payment v2 */
  .pay2-scroll { flex:1; overflow-y:auto; }
  .pay2-scroll::-webkit-scrollbar { width:3px; }
  .pay2-scroll::-webkit-scrollbar-thumb { background:var(--line); border-radius:3px; }
  .pay2-section { padding:16px 16px 14px; }
  .pay2-label { font-size:13px; font-weight:700; color:var(--ink); margin-bottom:10px; }
  .pay2-booking-card { background:#FAFAFA; border-radius:12px; padding:14px; margin-bottom:2px; }
  .pay2-booking-row { display:flex; justify-content:space-between; padding:4px 0; font-size:13px; }
  .pay2-booking-key { color:var(--ink3); }
  .pay2-booking-val { font-weight:600; color:var(--ink); }
  .pay2-ins-list { display:flex; flex-direction:column; gap:8px; }
  .pay2-ins { display:flex; align-items:center; gap:12px; padding:12px 14px; border:1.5px solid var(--line); background:#fff; border-radius:12px; cursor:pointer; transition:all .15s; font-family:var(--f); text-align:left; width:100%; }
  .pay2-ins:hover { border-color:#BFDBFE; }
  .pay2-ins.on { border-color:var(--blue); background:var(--blue-lt); }
  .pay2-ins-radio { width:20px; height:20px; border-radius:50%; border:2px solid var(--line); position:relative; flex-shrink:0; transition:border-color .15s; }
  .pay2-ins.on .pay2-ins-radio { border-color:var(--blue); }
  .pay2-ins.on .pay2-ins-radio::after { content:""; position:absolute; inset:3px; background:var(--blue); border-radius:50%; }
  .pay2-ins-info { flex:1; min-width:0; }
  .pay2-ins-title { font-size:13.5px; font-weight:700; color:var(--ink); margin-bottom:2px; }
  .pay2-ins-desc { font-size:11.5px; color:var(--ink3); line-height:1.4; }
  .pay2-ins-price { font-size:13px; font-weight:800; color:var(--ink); flex-shrink:0; }
  .pay2-ins.on .pay2-ins-price { color:var(--blue); }
  .pay2-method-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:7px; }
  .pay2-method { padding:12px 6px; border:1.5px solid var(--line); background:#fff; border-radius:10px; cursor:pointer; text-align:center; font-size:11.5px; font-weight:600; color:var(--ink2); font-family:var(--f); transition:all .15s; }
  .pay2-method:hover { border-color:#BFDBFE; }
  .pay2-method.on { border-color:var(--blue); background:var(--blue-lt); color:var(--blue); font-weight:700; }
  .pay2-row { display:flex; justify-content:space-between; padding:6px 0; font-size:13px; color:var(--ink2); }
  .pay2-row.total { font-weight:800; font-size:15px; padding-top:12px; margin-top:7px; border-top:1px solid var(--line); color:var(--ink); }
  .pay2-row.total strong { color:var(--blue); }
  .pay2-bottom { padding:12px 16px 16px; border-top:1px solid var(--line); background:#fff; flex-shrink:0; }
  .pay2-cta { width:100%; padding:15px; background:var(--blue); color:#fff; border:none; border-radius:12px; font-size:15px; font-weight:700; cursor:pointer; font-family:var(--f); letter-spacing:-.01em; transition:all .15s; }
  .pay2-cta:hover { background:var(--blue-dim); }
  .pay2-teal .pay2-ins.on { border-color:var(--teal); background:var(--teal-lt); }
  .pay2-teal .pay2-ins.on .pay2-ins-radio { border-color:var(--teal); }
  .pay2-teal .pay2-ins.on .pay2-ins-radio::after { background:var(--teal); }
  .pay2-teal .pay2-ins.on .pay2-ins-price { color:var(--teal); }
  .pay2-teal .pay2-method.on { border-color:var(--teal); background:var(--teal-lt); color:var(--teal); }
  .pay2-teal .pay2-row.total strong { color:var(--teal); }
  .pay2-teal .pay2-cta { background:var(--teal); }
  .pay2-teal .pay2-cta:hover { background:var(--teal-dim); }
  .pay2-success { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 24px; text-align:center; }
  .pay2-success-icon { width:72px; height:72px; border-radius:50%; background:var(--blue-lt); display:flex; align-items:center; justify-content:center; color:var(--blue); margin-bottom:20px; font-size:32px; }
  .pay2-success-title { font-size:20px; font-weight:800; letter-spacing:-.03em; color:var(--ink); margin-bottom:8px; }
  .pay2-success-sub { font-size:13.5px; color:var(--ink3); line-height:1.6; margin-bottom:28px; }

  /* Host register */
  .hreg-scroll { flex:1; overflow-y:auto; padding:20px 16px 24px; }
  .hreg-scroll::-webkit-scrollbar { width:3px; }
  .hreg-scroll::-webkit-scrollbar-thumb { background:var(--line); border-radius:3px; }
  .hreg-heading { font-size:22px; font-weight:900; letter-spacing:-.04em; line-height:1.25; margin-bottom:22px; }
  .hreg-heading span { color:var(--blue); }
  .hreg-section { margin-bottom:22px; }
  .hreg-label { font-size:11.5px; font-weight:700; color:var(--ink3); letter-spacing:.05em; text-transform:uppercase; margin-bottom:9px; display:block; }
  .hreg-cat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:7px; }
  .hreg-cat { display:flex; flex-direction:column; align-items:center; gap:5px; padding:12px 6px 10px; border:1.5px solid var(--line); background:#fff; border-radius:12px; cursor:pointer; font-family:var(--f); transition:all .15s; }
  .hreg-cat:hover { border-color:#BFDBFE; }
  .hreg-cat.on { border-color:var(--blue); background:var(--blue-lt); }
  .hreg-cat-ic { font-size:20px; line-height:1; }
  .hreg-cat-label { font-size:11px; font-weight:600; color:var(--ink); }
  .hreg-cat.on .hreg-cat-label { color:var(--blue); font-weight:700; }
  .hreg-input { width:100%; border:1.5px solid var(--line); border-radius:10px; padding:13px 14px; font-size:14px; font-family:var(--f); color:var(--ink); outline:none; transition:border-color .15s; }
  .hreg-input:focus { border-color:var(--blue); }
  .hreg-input::placeholder { color:var(--ink3); font-weight:300; }
  .hreg-size-row { display:flex; gap:8px; }
  .hreg-size { flex:1; display:flex; flex-direction:column; gap:4px; padding:14px 10px; border:1.5px solid var(--line); background:#fff; border-radius:12px; cursor:pointer; font-family:var(--f); transition:all .15s; text-align:left; }
  .hreg-size:hover { border-color:#BFDBFE; }
  .hreg-size.on { border-color:var(--blue); background:var(--blue-lt); }
  .hreg-size-title { font-size:14px; font-weight:700; color:var(--ink); }
  .hreg-size-sub { font-size:11px; color:var(--ink3); line-height:1.4; white-space:pre-line; }
  .hreg-price-disp { text-align:center; font-size:28px; font-weight:900; letter-spacing:-.04em; color:var(--ink); margin-bottom:12px; }
  .hreg-price-track { position:relative; height:4px; background:var(--line); border-radius:2px; margin-bottom:6px; }
  .hreg-price-fill { position:absolute; left:0; top:0; height:100%; background:var(--blue); border-radius:2px; transition:width .18s; }
  .hreg-price-thumb { position:absolute; top:50%; width:14px; height:14px; border-radius:50%; background:#fff; border:3px solid var(--blue); transform:translate(-50%,-50%); transition:left .18s; box-shadow:0 2px 6px rgba(37,99,235,.3); }
  .hreg-price-ticks { display:flex; justify-content:space-between; font-size:10.5px; color:var(--ink3); }
  .hreg-days-row { display:flex; gap:7px; }
  .hreg-day { flex:1; padding:10px 4px; border:1.5px solid var(--line); background:#fff; border-radius:10px; font-size:13px; font-weight:600; cursor:pointer; font-family:var(--f); color:var(--ink2); transition:all .15s; text-align:center; }
  .hreg-day:hover { border-color:#BFDBFE; }
  .hreg-day.on { border-color:var(--blue); background:var(--blue); color:#fff; }
  .hreg-time-row { display:flex; align-items:center; gap:8px; }
  .hreg-time-sel { flex:1; border:1.5px solid var(--line); border-radius:10px; padding:12px 14px; font-size:14px; font-family:var(--f); color:var(--ink); outline:none; background:#fff; transition:border-color .15s; }
  .hreg-time-sel:focus { border-color:var(--blue); }
  .hreg-photo-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
  .hreg-photo-slot { aspect-ratio:1; border:2px dashed var(--line); border-radius:12px; display:flex; align-items:center; justify-content:center; color:var(--ink3); font-size:24px; cursor:pointer; transition:all .15s; background:#FAFAFA; }
  .hreg-photo-slot:hover { border-color:var(--blue); color:var(--blue); background:var(--blue-lt); }
  .hreg-textarea { width:100%; border:1.5px solid var(--line); border-radius:12px; padding:13px 14px; font-size:14px; font-family:var(--f); color:var(--ink); resize:none; outline:none; transition:border-color .15s; }
  .hreg-textarea:focus { border-color:var(--blue); }
  .hreg-textarea::placeholder { color:var(--ink3); font-weight:300; }

  /* Item list teal */
  .share-cat-bar { display:flex; gap:7px; padding:10px 16px; overflow-x:auto; border-bottom:1px solid var(--line); flex-shrink:0; }
  .share-cat-bar::-webkit-scrollbar { display:none; }
  .share-cat-chip { white-space:nowrap; padding:7px 14px; border:1.5px solid var(--line); border-radius:20px; font-size:12.5px; font-weight:600; cursor:pointer; background:#fff; font-family:var(--f); color:var(--ink2); transition:all .15s; }
  .share-cat-chip:hover { border-color:var(--teal); color:var(--teal); }
  .share-cat-chip.on { background:var(--teal); color:#fff; border-color:var(--teal); }
  .item-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:12px 12px 20px; }
  .item-card { background:#fff; border:1px solid var(--line); border-radius:14px; overflow:hidden; cursor:pointer; transition:all .18s; position:relative; font-family:var(--f); text-align:left; padding:0; }
  .item-card:hover { border-color:var(--teal); transform:translateY(-2px); box-shadow:0 10px 20px -12px rgba(0,0,0,.15); }
  .item-card:active { transform:scale(.985); }
  .item-card-wrap { display:flex; flex-direction:column; }
  .item-card-img { width:100%; aspect-ratio:1; object-fit:cover; background:var(--line); display:block; }
  .item-card-info { padding:8px 10px 10px; }
  .item-card-name { font-size:13px; font-weight:700; letter-spacing:-.02em; color:var(--ink); margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .item-card-meta { font-size:11px; color:var(--ink3); margin-bottom:4px; }
  .item-card-price { font-size:14px; font-weight:800; letter-spacing:-.02em; color:var(--ink); }
  .item-card-price small { font-size:10px; font-weight:400; color:var(--ink3); margin-left:2px; }
  .item-card-badges { display:flex; gap:3px; margin-top:4px; flex-wrap:wrap; }
  .item-card-fav { position:absolute; top:7px; right:7px; width:28px; height:28px; border-radius:50%; background:rgba(255,255,255,.85); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--ink3); transition:all .14s; }
  .item-card-fav:hover { color:#DC2626; }
  .item-card-fav.on { color:#DC2626; }

  /* Item register */
  .ireg-scroll { flex:1; overflow-y:auto; padding:20px 16px 24px; }
  .ireg-scroll::-webkit-scrollbar { width:3px; }
  .ireg-scroll::-webkit-scrollbar-thumb { background:var(--line); border-radius:3px; }
  .ireg-heading { font-size:22px; font-weight:900; letter-spacing:-.04em; line-height:1.25; margin-bottom:22px; }
  .ireg-heading span { color:var(--teal); }
  .ireg-section { margin-bottom:22px; }
  .ireg-label { font-size:11.5px; font-weight:700; color:var(--ink3); letter-spacing:.05em; text-transform:uppercase; margin-bottom:9px; display:block; }
  .ireg-cat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:7px; }
  .ireg-cat { display:flex; flex-direction:column; align-items:center; gap:5px; padding:12px 6px 10px; border:1.5px solid var(--line); background:#fff; border-radius:12px; cursor:pointer; font-family:var(--f); transition:all .15s; }
  .ireg-cat:hover { border-color:#99F6E4; }
  .ireg-cat.on { border-color:var(--teal); background:var(--teal-lt); }
  .ireg-cat-ic { font-size:20px; line-height:1; }
  .ireg-cat-label { font-size:11px; font-weight:600; color:var(--ink); }
  .ireg-cat.on .ireg-cat-label { color:var(--teal); font-weight:700; }
  .ireg-input { width:100%; border:1.5px solid var(--line); border-radius:10px; padding:13px 14px; font-size:14px; font-family:var(--f); color:var(--ink); outline:none; transition:border-color .15s; }
  .ireg-input:focus { border-color:var(--teal); }
  .ireg-input::placeholder { color:var(--ink3); font-weight:300; }
  .ireg-cond-row { display:flex; gap:7px; flex-wrap:wrap; }
  .ireg-cond { display:flex; flex-direction:column; gap:2px; padding:10px 12px; border:1.5px solid var(--line); background:#fff; border-radius:10px; cursor:pointer; font-family:var(--f); transition:all .15s; flex:1; min-width:calc(50% - 4px); text-align:left; }
  .ireg-cond:hover { border-color:#99F6E4; }
  .ireg-cond.on { border-color:var(--teal); background:var(--teal-lt); }
  .ireg-cond-title { font-size:13px; font-weight:700; color:var(--ink); }
  .ireg-cond.on .ireg-cond-title { color:var(--teal); }
  .ireg-cond-sub { font-size:11px; color:var(--ink3); }
  .ireg-price-disp { text-align:center; font-size:28px; font-weight:900; letter-spacing:-.04em; color:var(--ink); margin-bottom:12px; }
  .ireg-price-track { position:relative; height:4px; background:var(--line); border-radius:2px; margin-bottom:6px; }
  .ireg-price-fill { position:absolute; left:0; top:0; height:100%; background:var(--teal); border-radius:2px; transition:width .18s; }
  .ireg-price-thumb { position:absolute; top:50%; width:14px; height:14px; border-radius:50%; background:#fff; border:3px solid var(--teal); transform:translate(-50%,-50%); transition:left .18s; box-shadow:0 2px 6px rgba(15,118,110,.3); }
  .ireg-price-ticks { display:flex; justify-content:space-between; font-size:10.5px; color:var(--ink3); }
  .ireg-photo-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
  .ireg-photo-slot { aspect-ratio:1; border:2px dashed var(--line); border-radius:12px; display:flex; align-items:center; justify-content:center; color:var(--ink3); font-size:24px; cursor:pointer; transition:all .15s; background:#FAFAFA; }
  .ireg-photo-slot:hover { border-color:var(--teal); color:var(--teal); background:var(--teal-lt); }
  .ireg-textarea { width:100%; border:1.5px solid var(--line); border-radius:12px; padding:13px 14px; font-size:14px; font-family:var(--f); color:var(--ink); resize:none; outline:none; transition:border-color .15s; }
  .ireg-textarea:focus { border-color:var(--teal); }
  .ireg-textarea::placeholder { color:var(--ink3); font-weight:300; }
  .ireg-cta { width:100%; padding:15px; background:var(--teal); color:#fff; border:none; border-radius:12px; font-size:15px; font-weight:700; cursor:pointer; font-family:var(--f); letter-spacing:-.01em; transition:all .15s; }
  .ireg-cta:hover { background:var(--teal-dim); }
`;

const ArrowR = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const ChevL = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>;
const IconSearch = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const IconBell = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const IconHome = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconHeart = ({filled=false}) => <svg width="20" height="20" viewBox="0 0 24 24" fill={filled?'currentColor':'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const IconList = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconPkg = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const IconRoom = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
const IconShield = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconFilter = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>;
const ChevR = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>;
const IconCard = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
const IconCoupon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12a2 2 0 0 1 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 1 0 4v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-2-2z"/><line x1="9" y1="9" x2="9" y2="15"/></svg>;
const IconMap = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
const IconChat = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconCog = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconHelp = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IconDoc = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const IconClock = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconCalendar = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconBox = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/></svg>;
const IconGem = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 18 3 22 9 12 22 2 9"/><line x1="12" y1="22" x2="2" y2="9"/><line x1="12" y1="22" x2="22" y2="9"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="3" x2="8" y2="9"/><line x1="12" y1="3" x2="16" y2="9"/></svg>;
const IconX = ({size=14}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconTime = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconPlus = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconMapTab = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
const IconPin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconShare = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
const IconMega = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
const IconBriefcase = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const IconCar = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1l2-5a3 3 0 0 1 3-2h8a3 3 0 0 1 3 2l2 5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>;
const IconTent = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18L12 4 3 20z"/><path d="M12 4v16M9 20l3-5 3 5"/></svg>;
const IconTool = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
const IconDumbbell = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11"/><rect x="2" y="9" width="3" height="6" rx="1"/><rect x="19" y="9" width="3" height="6" rx="1"/><line x1="6" y1="12" x2="18" y2="12"/></svg>;
const IconBaby = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 13a1 1 0 0 0 2 0M13 13a1 1 0 0 0 2 0M9 17c1 1 4 1 5 0"/></svg>;
const IconCode = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const IconUsers = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconThumbUp = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>;
const IconMsg = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>;
const IconPen = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
const IconLock = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconScreen = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const IconDots = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/><circle cx="5" cy="12" r="1.4"/></svg>;
const IconMinus = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconLocate = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>;

const SPACES = [
  {id:'s1',img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=80',name:'백석대 앞 원룸 빈 방',meta:'400m · 후기 2개 · 즉시 예약 가능',price:'30,000',unit:'원/월',badges:[{cls:'new',label:'NEW'},{cls:'safe',label:'보험적용'}]},
  {id:'s2',img:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&q=80',name:'안서동 인근 안전 창고',meta:'1.5km · 후기 43개 · CCTV 설치',price:'25,000',unit:'원/월',badges:[{cls:'hot',label:'인기'},{cls:'safe',label:'보험적용'}]},
];

const ITEMS = [
  {id:'i1',cat:'camping',img:'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200&q=80',name:'4인용 캠핑 텐트',meta:'1박 · 후기 8개',price:'12,000',unit:'원/일',badges:[{cls:'hot',label:'인기'}]},
  {id:'i2',cat:'tools',img:'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=200&q=80',name:'18V 전동 드릴 세트',meta:'1일 · 후기 3개',price:'5,000',unit:'원/일',badges:[{cls:'new',label:'NEW'}]},
  {id:'i3',cat:'electronics',img:'https://images.unsplash.com/photo-1478144592103-25e218a04891?w=200&q=80',name:'휴대용 빔프로젝터',meta:'1박 · 후기 21개',price:'10,000',unit:'원/일',badges:[{cls:'hot',label:'인기'}]},
  {id:'i4',cat:'transport',img:'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=200&q=80',name:'성인 자전거',meta:'1일 · 후기 5개',price:'8,000',unit:'원/일',badges:[{cls:'safe',label:'보험적용'}]},
  {id:'i5',cat:'camping',img:'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=200&q=80',name:'캠핑 버너 세트',meta:'1일 · 후기 6개',price:'4,000',unit:'원/일',badges:[{cls:'new',label:'NEW'}]},
  {id:'i6',cat:'sports',img:'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=200&q=80',name:'스노우보드 세트',meta:'1일 · 후기 15개',price:'25,000',unit:'원/일',badges:[{cls:'hot',label:'인기'}]},
  {id:'i7',cat:'baby',img:'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&q=80',name:'유아 카시트 (0~4세)',meta:'1일 · 후기 9개',price:'6,000',unit:'원/일',badges:[{cls:'safe',label:'보험적용'}]},
  {id:'i8',cat:'electronics',img:'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&q=80',name:'닌텐도 스위치',meta:'1일 · 후기 30개',price:'12,000',unit:'원/일',badges:[{cls:'hot',label:'인기'}]},
];

const HISTORY = [
  {id:'h1',spaceId:'s1',img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=80',name:'백석대 앞 원룸 빈 방',period:'2026.05.01 - 2026.06.01',meta:'1개월 · 박스 3개',price:'30,000원',date:'2026.05.01 결제',status:'ongoing'},
  {id:'h2',spaceId:'s2',img:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&q=80',name:'안서동 인근 안전 창고',period:'2026.02.10 - 2026.04.10',meta:'2개월 · 캠핑용품',price:'50,000원',date:'2026.02.10 결제',status:'done'},
  {id:'h3',spaceId:'s1',img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=80',name:'백석대 앞 원룸 빈 방',period:'2026.01.15 - 2026.01.20',meta:'5일 · 책 2박스',price:'5,000원',date:'2026.01.14 취소',status:'cancel'},
];

const STATUS_LABEL = { ongoing:'진행중', done:'완료', cancel:'취소' };
const HISTORY_FILTERS = [['전체','all'],['진행중','ongoing'],['완료','done'],['취소','cancel']];

const POPULAR_KEYWORDS = ['원룸 보관','캠핑용품','겨울 옷','책 보관','이사 단기','악기 보관','CCTV 창고','대형 가구'];

const ADS = [
  {tag:'EVENT',title:'첫 보관 5,000원 할인',sub:'지금 가입하면 즉시 적용',cls:'event',icon:<IconMega/>},
  {tag:'SAFETY',title:'에스크로 100% 보호',sub:'결제부터 인수까지 안전하게',cls:'safety',icon:<IconShield/>},
  {tag:'NEW',title:'쉐어 베타 서비스 오픈',sub:'이웃과 물건을 빌려 써요',cls:'new',icon:<IconShare/>},
];

const EXTEND_OPTIONS = [
  {mins:30, label:'30분 연장', price:500},
  {mins:60, label:'1시간 연장', price:1000},
  {mins:120, label:'2시간 연장', price:1800},
  {mins:180, label:'3시간 연장', price:2500},
];
const RETURN_LOCATION = {address:'천안시 동남구 안서동 백석대학교 정문 앞', detail:'정문 경비실 앞 벤치'};
const MSG_TEMPLATES = [
  '죄송합니다, 오늘 제 시간에 반납이 어렵게 됐어요. 내일 오전 중으로 드릴 수 있을까요?',
  '갑자기 일이 생겨서 늦을 것 같아요. 몇 시간 후에 연락드릴게요.',
  '반납 장소를 바꿀 수 있을까요? 편한 곳을 알려주시면 감사하겠습니다.',
];
const SPACE_PHOTOS = {
  s1:['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80','https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80'],
  s2:['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80','https://images.unsplash.com/photo-1553867745-6e3a4deaab2c?w=400&q=80','https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&q=80'],
};
const ITEM_PHOTOS = {
  i1:['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80','https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400&q=80','https://images.unsplash.com/photo-1537565266759-34bf2a3b4b72?w=400&q=80','https://images.unsplash.com/photo-1520987799-96f17ce79673?w=400&q=80'],
  i2:['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80','https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80','https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80','https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80'],
  i3:['https://images.unsplash.com/photo-1478144592103-25e218a04891?w=400&q=80','https://images.unsplash.com/photo-1588274454707-7b4fc0a6b3f8?w=400&q=80','https://images.unsplash.com/photo-1585338447937-7082f8fc763d?w=400&q=80','https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80'],
  i4:['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80','https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=400&q=80','https://images.unsplash.com/photo-1576435728678-68d0fbf94946?w=400&q=80'],
};
const getItemPhotos = (id) => ITEM_PHOTOS[id] || ITEM_PHOTOS.i1;
const getSpacePhotos = (id) => SPACE_PHOTOS[id] || SPACE_PHOTOS.s1;
const SPACE_HOST_DATA = {
  s1:{name:'강석진',avatar:'강',rating:'4.8',years:'1년+',address:'천안시 동남구 안서동 153-2',addressDetail:'301호 (정문에서 도보 2분)',times:['10:00','11:00','14:00','15:00','16:00'],unavail:new Set([3,7,8,14,15,21,22])},
  s2:{name:'방준서',avatar:'방',rating:'4.9',years:'2년+',address:'천안시 동남구 안서동 91',addressDetail:'1층 창고 (주차장 옆)',times:['09:00','10:00','11:00','13:00','14:00','15:00','16:00'],unavail:new Set([1,2,5,12,19,25,26])},
};
const getSpaceHost = (id) => SPACE_HOST_DATA[id] || SPACE_HOST_DATA.s1;
const ITEM_OWNER_DATA = {
  i1:{name:'신동준',avatar:'신',rating:'4.9',trades:12,location:'안서동',times:['10:00','11:00','14:00','15:00'],unavail:new Set([5,6,12,13,19,20])},
  i2:{name:'김윤중',avatar:'김',rating:'4.7',trades:8,location:'쌍용동',times:['09:00','13:00','17:00'],unavail:new Set([3,10,17,24])},
  i3:{name:'강석진',avatar:'강',rating:'4.9',trades:21,location:'두정동',times:['11:00','14:00','15:00','16:00'],unavail:new Set([1,2,7,8])},
  i4:{name:'방준서',avatar:'방',rating:'4.8',trades:5,location:'안서동',times:['09:00','10:00','11:00'],unavail:new Set([4,5,11,18,25])},
};
const getItemOwner = (id) => ITEM_OWNER_DATA[id] || ITEM_OWNER_DATA.i1;
const BOOKING_PERIODS = ['1일','3일','1주일','2주일','1개월','3개월','6개월+'];
const BOOKING_PERIODS_ITEM = ['1일','3일','1주일','2주일','1개월'];
const MONTHS_KR = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
const DAY_LABELS = ['일','월','화','수','목','금','토'];
const HOUR_OPTS = Array.from({length:24},(_,i)=>`${String(i).padStart(2,'0')}:00`);
const HOST_SPACE_CATS = [
  {key:'oneroom',label:'원룸',icon:'🏠'},{key:'officetel',label:'오피스텔',icon:'🏢'},
  {key:'apartment',label:'아파트',icon:'🏗️'},{key:'store',label:'가게/상가',icon:'🏪'},
  {key:'warehouse',label:'창고',icon:'📦'},{key:'office',label:'사무실',icon:'💼'},
  {key:'other',label:'기타',icon:'✨'},
];
const HOST_SIZES = [
  {key:'small',title:'소형',sub:'박스 1~3개\n약 1평 이하'},
  {key:'medium',title:'중형',sub:'박스 4~8개\n약 1~3평'},
  {key:'large',title:'대형',sub:'박스 9개 이상\n약 3평 초과'},
];
const HOST_DAYS = ['일','월','화','수','목','금','토'];
const ITEM_SHARE_CATS = [
  {key:'all',label:'전체'},{key:'camping',label:'캠핑/레저'},{key:'tools',label:'공구/DIY'},
  {key:'electronics',label:'전자기기'},{key:'sports',label:'스포츠'},
  {key:'transport',label:'교통수단'},{key:'baby',label:'유아용품'},{key:'other',label:'기타'},
];
const ITEM_REG_CATS = [
  {key:'camping',label:'캠핑/레저',icon:'⛺'},{key:'tools',label:'공구/DIY',icon:'🔧'},
  {key:'electronics',label:'전자기기',icon:'💻'},{key:'sports',label:'스포츠',icon:'🏋️'},
  {key:'transport',label:'교통수단',icon:'🚲'},{key:'baby',label:'유아용품',icon:'👶'},
  {key:'books',label:'도서/교육',icon:'📚'},{key:'other',label:'기타',icon:'✨'},
];
const ITEM_CONDITIONS = [
  {key:'new',label:'새것 같은',sub:'거의 사용 안함'},{key:'likenew',label:'거의 새것',sub:'미세한 사용흔'},
  {key:'normal',label:'보통',sub:'사용감 있음'},{key:'used',label:'사용감 많음',sub:'기능 문제 없음'},
];
function buildCalendar(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month+1, 0);
  const cells = [];
  for(let i=0;i<first.getDay();i++) cells.push({empty:true});
  for(let d=1;d<=last.getDate();d++) cells.push({day:d,date:new Date(year,month,d)});
  return cells;
}

function BottomTab({ active, onNavigate }) {
  const items = [
    {label:'홈',icon:<IconHome/>,key:'home'},
    {label:'찜',icon:<IconHeart/>,key:'favorites'},
    {label:'커뮤니티',icon:<IconUsers/>,key:'community'},
    {label:'마이',icon:<IconUser/>,key:'mypage'},
  ];
  return (
    <div className="bottom-tab">
      {items.slice(0,2).map(({label,icon,key})=>(
        <button key={key} className={`bt-item${active===key?' on':''}`} onClick={()=>onNavigate(key)}>
          {icon}<span>{label}</span>
        </button>
      ))}
      <div className="bt-add-wrap">
        <button className="bt-add" aria-label="지도" onClick={()=>onNavigate('map')}>
          <IconMapTab/>
        </button>
      </div>
      {items.slice(2).map(({label,icon,key})=>(
        <button key={key} className={`bt-item${active===key?' on':''}`} onClick={()=>onNavigate(key)}>
          {icon}<span>{label}</span>
        </button>
      ))}
    </div>
  );
}

function SpaceCard({ space, index, isFav, onToggleFav, onOpen }) {
  const {id,img,name,meta,price,unit,badges} = space;
  return (
    <div className={`space-item fu d${Math.min(index+1,5)}`} onClick={onOpen} style={{cursor:onOpen?'pointer':undefined}}>
      <img src={img} alt={name} className="space-thumb"/>
      <div className="space-info">
        <div className="space-name">{name}</div>
        <div className="space-meta">{meta}</div>
        <div className="space-price">{price}<span>{unit}</span></div>
        <div className="badge-row">{badges.map(({cls,label})=><span key={label} className={`badge ${cls}`}>{label}</span>)}</div>
      </div>
      <button
        className={`fav-btn${isFav?' on':''}`}
        onClick={(e)=>{e.stopPropagation();onToggleFav(id);}}
        aria-label={isFav?'찜 해제':'찜 하기'}
        aria-pressed={isFav}
      >
        <IconHeart filled={isFav}/>
      </button>
    </div>
  );
}

function AdCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i+1) % ADS.length), 4000);
    return () => clearInterval(t);
  }, [paused]);
  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + ADS.length) % ADS.length); };
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % ADS.length); };
  return (
    <div className="ad-wrap fu d1">
      <div
        className="ad-viewport"
        onMouseEnter={()=>setPaused(true)}
        onMouseLeave={()=>setPaused(false)}
        onTouchStart={()=>setPaused(true)}
        onTouchEnd={()=>setPaused(false)}
      >
        <div className="ad-track" style={{transform:`translateX(-${idx*100}%)`}}>
          {ADS.map((ad,i)=>(
            <div key={i} className={`ad-banner ${ad.cls}`}>
              <div className="ad-info">
                <span className="ad-tag">{ad.tag}</span>
                <div className="ad-title">{ad.title}</div>
                <div className="ad-sub">{ad.sub}</div>
              </div>
              <div className="ad-visual">{ad.icon}</div>
            </div>
          ))}
        </div>
        <button className="ad-arrow left" onClick={prev} aria-label="이전 광고"><ChevL/></button>
        <button className="ad-arrow right" onClick={next} aria-label="다음 광고"><ChevR/></button>
        <div className="ad-counter">{idx+1} / {ADS.length}</div>
      </div>
      <div className="ad-dots">
        {ADS.map((_,i)=>(
          <button key={i} className={`ad-dot${idx===i?' on':''}`} onClick={()=>setIdx(i)} aria-label={`${i+1}번 광고`}/>
        ))}
      </div>
    </div>
  );
}

const DEV_RENTAL_ITEMS = ['전동 드릴','캠핑 텐트','자전거 펌프','아이 카시트','4인용 그릴','휴대용 빔프로젝터'];

function HomeView({ onNavigate, onOpenItem, onOpenSpace }) {
  const [devEnabled, setDevEnabled] = useState(false);
  const [untilMs, setUntilMs] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [showExtend, setShowExtend] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgText, setMsgText] = useState('');
  const devItem = DEV_RENTAL_ITEMS[0];
  useEffect(() => {
    if (!devEnabled) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [devEnabled]);
  const toggleDev = () => {
    if (!devEnabled) {
      const ms = Date.now() + 30 * 60 * 1000;
      setUntilMs(ms);
      setNow(Date.now());
    }
    setDevEnabled(v => !v);
  };
  const extendRental = (mins) => {
    setUntilMs(prev => Math.max(prev, Date.now()) + mins * 60 * 1000);
    setShowExtend(false);
  };
  const returnRental = () => { setDevEnabled(false); setShowReturn(false); };
  const remainingMin = devEnabled ? Math.max(0, Math.ceil((untilMs - now) / 60000)) : 0;
  const searchBar = (
    <button className="home-search" onClick={()=>onNavigate('search')} aria-label="검색">
      <IconSearch/>
      <span className="home-search-text">어떤 공간을 찾으시나요?</span>
    </button>
  );
  return (
    <>
      <div className="top-bar fu">
        <span className="logo">도와주오</span>
        <div className="top-icons">
          <button className={`dev-btn${devEnabled?'':' off'}`} onClick={toggleDev} aria-label="dev mode 토글">
            <IconCode/>
          </button>
          <button className="icon-btn" aria-label="알림"><IconBell/></button>
        </div>
      </div>
      {devEnabled ? (
        <div className="rental-wrap fu">
          <div className="rental-status blue">
            <div className="rental-main">
              <span className="rental-ic"><IconClock/></span>
              <div className="rental-info">
                <div className="rental-name">{devItem}</div>
                <div className="rental-sub">대여 중</div>
              </div>
              <span className="rental-time">{remainingMin}<small>분 남음</small></span>
            </div>
            <div className="rental-actions">
              <button className="rental-btn" onClick={()=>setShowExtend(true)}>연장하기</button>
              <button className="rental-btn primary" onClick={()=>setShowReturn(true)}>반납하기</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="home-search-wrap fu">{searchBar}</div>
      )}
      <div className="scroll">
        <AdCarousel/>
        {devEnabled && (
          <div className="home-search-wrap fu" style={{padding:'8px 16px 4px'}}>{searchBar}</div>
        )}
        <div className="big-cat-row fu d2">
          <button className="big-cat store" onClick={()=>onNavigate('store-choice')}>
            <span className="big-cat-ic"><IconPkg/></span>
            <span className="big-cat-title">보관</span>
            <span className="big-cat-sub">이웃 공간에<br/>짐을 안전하게</span>
            <span className="big-cat-go">시작하기 <ChevR/></span>
          </button>
          <button className="big-cat share" onClick={()=>onNavigate('share-choice')}>
            <span className="big-cat-ic"><IconShare/></span>
            <span className="big-cat-title">쉐어</span>
            <span className="big-cat-sub">이웃과 물건을<br/>빌리고 빌려줘요</span>
            <span className="big-cat-go">둘러보기 <ChevR/></span>
          </button>
        </div>
        <div className="featured-head fu d3">
          <span className="featured-title">이런 공간 어때요?</span>
          <button className="featured-more" onClick={()=>onNavigate('list')}>전체보기 <ChevR/></button>
        </div>
        <div className="featured-scroll fu d3">
          {SPACES.map((space) => (
            <button key={space.id} className="featured-card" onClick={()=>onOpenSpace(space)}>
              <img src={space.img} alt={space.name} className="featured-img"/>
              <div className="featured-info">
                <div className="featured-name">{space.name}</div>
                <div className="featured-meta">{space.meta.split(' · ').slice(0,2).join(' · ')}</div>
                <div className="featured-price">{space.price}<small>{space.unit}</small></div>
                <div className="featured-badges">
                  {space.badges.map(({cls,label}) => <span key={label} className={`badge ${cls}`}>{label}</span>)}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="featured-head fu d4">
          <span className="featured-title">이런 물건 어때요?</span>
          <button className="featured-more" onClick={()=>onNavigate('share-list')}>전체보기 <ChevR/></button>
        </div>
        <div className="featured-scroll fu d4">
          {ITEMS.slice(0,2).map((item) => (
            <button key={item.id} className="featured-card" onClick={()=>onOpenItem(item)}>
              <img src={item.img} alt={item.name} className="featured-img"/>
              <div className="featured-info">
                <div className="featured-name">{item.name}</div>
                <div className="featured-meta">{item.meta.split(' · ').slice(0,2).join(' · ')}</div>
                <div className="featured-price">{item.price}<small>{item.unit}</small></div>
                <div className="featured-badges">
                  {item.badges.map(({cls,label}) => <span key={label} className={`badge ${cls}`}>{label}</span>)}
                </div>
              </div>
            </button>
          ))}
          <button className="featured-card featured-more-card" onClick={()=>onNavigate('share-list')}>
            <div className="featured-more-inner">
              <span className="featured-more-count">+{ITEMS.length - 2}</span>
              <span className="featured-more-label">더보기</span>
            </div>
          </button>
        </div>
      </div>
      <BottomTab active="home" onNavigate={onNavigate}/>

      {/* Extend modal */}
      {showExtend && (
        <div className="overlay-bg" onClick={()=>setShowExtend(false)}>
          <div className="bottom-sheet" onClick={e=>e.stopPropagation()}>
            <div className="sheet-handle"/>
            <div className="return-sheet-title">연장하기</div>
            <div className="return-sheet-sub">연장할 시간을 선택하세요</div>
            {EXTEND_OPTIONS.map(opt=>(
              <div key={opt.mins} className="extend-option" onClick={()=>extendRental(opt.mins)}>
                <span className="extend-option-label">{opt.label}</span>
                <span className="extend-option-price">+{opt.price.toLocaleString()}원</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Return location modal */}
      {showReturn && !showMsg && (
        <div className="overlay-bg" onClick={()=>setShowReturn(false)}>
          <div className="bottom-sheet" onClick={e=>e.stopPropagation()}>
            <div className="sheet-handle"/>
            <div className="return-sheet-title">반납 장소</div>
            <div className="return-sheet-sub">아래 장소에서 반납해 주세요</div>
            <div className="return-location-card">
              <div className="return-location-map">
                <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(37,99,235,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.07) 1px,transparent 1px)',backgroundSize:'24px 24px'}}/>
                <div style={{position:'absolute',top:'45%',left:0,right:0,height:'12px',background:'#fff',opacity:.9}}/>
                <div style={{position:'absolute',top:0,bottom:0,left:'38%',width:'10px',background:'#fff',opacity:.9}}/>
                <div style={{position:'absolute',top:'20%',left:'35%',transform:'translate(-50%,-100%)',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div style={{background:'var(--blue)',color:'#fff',padding:'3px 8px',borderRadius:'10px',fontSize:'10px',fontWeight:700,boxShadow:'0 2px 6px rgba(37,99,235,.3)',whiteSpace:'nowrap'}}>반납 장소</div>
                  <div style={{width:2,height:5,background:'var(--blue)'}}/>
                  <div style={{width:6,height:6,borderRadius:'50%',background:'var(--blue)',border:'2px solid #fff',boxShadow:'0 0 0 1px var(--blue)'}}/>
                </div>
              </div>
              <div className="return-addr">{RETURN_LOCATION.address}</div>
              <div className="return-addr-detail">{RETURN_LOCATION.detail}</div>
            </div>
            <div className="return-btns">
              <button className="return-btn ghost" onClick={()=>setShowMsg(true)}>못 가겠어요</button>
              <button className="return-btn primary" onClick={returnRental}>반납 완료</button>
            </div>
          </div>
        </div>
      )}

      {/* Message modal */}
      {showReturn && showMsg && (
        <div className="overlay-bg" onClick={()=>{setShowReturn(false);setShowMsg(false);}}>
          <div className="bottom-sheet" onClick={e=>e.stopPropagation()}>
            <div className="sheet-handle"/>
            <div className="return-sheet-title">호스트에게 메시지</div>
            <div className="return-sheet-sub">반납이 어려운 상황을 호스트에게 알려주세요</div>
            <div className="msg-templates">
              {MSG_TEMPLATES.map((tpl,i)=>(
                <button key={i} className="msg-tpl" onClick={()=>setMsgText(tpl)}>{tpl}</button>
              ))}
            </div>
            <textarea
              className="msg-textarea"
              rows={3}
              placeholder="직접 메시지를 입력하세요..."
              value={msgText}
              onChange={e=>setMsgText(e.target.value)}
            />
            <button className="msg-send-btn" onClick={()=>{setShowReturn(false);setShowMsg(false);setMsgText('');}}>
              메시지 보내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const ITEM_CATS = [
  {key:'small',label:'소형',icon:<IconBox/>},
  {key:'medium',label:'중형',icon:<IconPkg/>},
  {key:'large',label:'대형',icon:<IconRoom/>},
  {key:'valuable',label:'고가',icon:<IconGem/>},
  {key:'electronics',label:'전자제품',icon:<IconScreen/>},
  {key:'other',label:'기타',icon:<IconDots/>},
];
const PERIODS = ['1일','3일','1주일','1개월','3개월','6개월+'];
const PRICE_MIN = 5000;
const PRICE_MAX = 100000;
const PRICE_STEP = 5000;

function FormView({ onBack, onNext }) {
  const [category, setCategory] = useState('small');
  const [period, setPeriod] = useState('1개월');
  const [location, setLocation] = useState('천안시 동남구 안서동');
  const [locating, setLocating] = useState(false);
  const [price, setPrice] = useState(20000);
  const detectLocation = () => {
    setLocating(true);
    setTimeout(() => {
      setLocation('천안시 동남구 안서동 백석대 인근');
      setLocating(false);
    }, 900);
  };
  const fillPct = ((price - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">짐 맡기기</span>
      </div>
      <div className="form-scroll">
        <h2 className="form-heading fu">어떤 짐을<br/><span>맡기시나요?</span></h2>
        <div className="field fu d1">
          <label className="field-label">맡길 물건</label>
          <div className="cat-picker">
            {ITEM_CATS.map(({key,label,icon}) => (
              <button key={key} type="button" className={`cat-pick${category===key?' on':''}`} onClick={()=>setCategory(key)}>
                <span className="cat-pick-ic">{icon}</span>
                <span className="cat-pick-label">{label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="field fu d2">
          <label className="field-label">보관 기간</label>
          <div className="period-row">
            {PERIODS.map(p => (
              <button key={p} type="button" className={`period-pill${period===p?' on':''}`} onClick={()=>setPeriod(p)}>{p}</button>
            ))}
          </div>
        </div>
        <div className="field fu d3">
          <label className="field-label">희망 지역</label>
          <div className="loc-card">
            <span className="loc-ic"><IconPin/></span>
            <div className="loc-info">
              <div className="loc-label">현재 위치</div>
              <div className="loc-value">{location}</div>
            </div>
            <button type="button" className="loc-action" onClick={detectLocation} disabled={locating}>
              {locating ? '탐색...' : <><IconLocate/>현재 위치</>}
            </button>
          </div>
        </div>
        <div className="field fu d4">
          <label className="field-label">희망 가격</label>
          <div className="price-card">
            <div className="price-value">{price.toLocaleString()}<small>원</small></div>
            <div className="price-period">{period} 기준</div>
            <div className="price-controls">
              <button type="button" className="price-btn" onClick={()=>setPrice(Math.max(PRICE_MIN, price - PRICE_STEP))} disabled={price<=PRICE_MIN} aria-label="가격 내리기"><IconMinus/></button>
              <button type="button" className="price-btn" onClick={()=>setPrice(Math.min(PRICE_MAX, price + PRICE_STEP))} disabled={price>=PRICE_MAX} aria-label="가격 올리기"><IconPlus/></button>
            </div>
            <div className="price-track">
              <div className="price-track-fill" style={{width:`${fillPct}%`}}/>
              <div className="price-track-thumb" style={{left:`${fillPct}%`}}/>
            </div>
            <div className="price-ticks">
              <span>5천</span>
              <span>5만</span>
              <span>10만</span>
            </div>
          </div>
        </div>
        <div className="notice-box fu d5">
          <span className="notice-icon"><IconShield/></span>
          <span className="notice-txt">모든 거래는 에스크로로 보호되며, AI 사진 검증으로 분쟁을 방지합니다.</span>
        </div>
      </div>
      <div className="cta-area">
        <button className="cta-btn blue" onClick={onNext}>근처 공간 찾기 <ArrowR/></button>
      </div>
    </>
  );
}

function ListView({ onBack, favorites, onToggleFav, onOpenSpace, onNavigate }) {
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">근처 공간</span>
      </div>
      <div className="filter-bar">
        {[['전체',true],['거리순',false],['가격순',false],['후기 많은 순',false]].map(([l,on])=>(
          <div key={l} className={`filter-chip${on?' on':''}`}>{on&&<IconFilter/>}{l}</div>
        ))}
      </div>
      <p className="result-info fu"><strong>{SPACES.length}개</strong>의 공간을 찾았어요</p>
      <div className="scroll">
        <div className="space-list">
          {SPACES.map((space,i)=>(
            <SpaceCard key={space.id} space={space} index={i} isFav={favorites.has(space.id)} onToggleFav={onToggleFav} onOpen={()=>onOpenSpace(space)}/>
          ))}
        </div>
      </div>
    </>
  );
}

function FavoritesView({ onNavigate, favorites, onToggleFav, onOpenSpace }) {
  const favSpaces = SPACES.filter(s=>favorites.has(s.id));
  return (
    <>
      <div className="top-bar fu">
        <span className="logo">찜 목록</span>
        <div className="top-icons">
          <button className="icon-btn" aria-label="검색" onClick={()=>onNavigate('search')}><IconSearch/></button>
        </div>
      </div>
      {favSpaces.length===0 ? (
        <div className="empty-state fu">
          <div className="empty-icon"><IconHeart/></div>
          <div className="empty-title">아직 찜한 공간이 없어요</div>
          <div className="empty-sub">관심 있는 공간의 하트를 눌러<br/>찜 목록에 담아보세요</div>
        </div>
      ) : (
        <>
          <p className="result-info fu"><strong>{favSpaces.length}개</strong>의 공간을 찜했어요</p>
          <div className="scroll">
            <div className="space-list">
              {favSpaces.map((space,i)=>(
                <SpaceCard key={space.id} space={space} index={i} isFav={true} onToggleFav={onToggleFav} onOpen={()=>onOpenSpace(space)}/>
              ))}
            </div>
          </div>
        </>
      )}
      <BottomTab active="favorites" onNavigate={onNavigate}/>
    </>
  );
}

function SearchView({ onBack, favorites, onToggleFav, onOpenSpace }) {
  const [query, setQuery] = useState('');
  const [recents, setRecents] = useState(['원룸 보관','안서동','캠핑용품']);
  const q = query.trim().toLowerCase();
  const results = q ? SPACES.filter(s=>
    s.name.toLowerCase().includes(q) || s.meta.toLowerCase().includes(q)
  ) : [];
  const commit = (term) => {
    const t = term.trim();
    if (!t) return;
    setQuery(t);
    setRecents(prev => [t, ...prev.filter(x=>x!==t)].slice(0,10));
  };
  return (
    <>
      <div className="search-bar sr">
        <div className="search-input-wrap">
          <span className="search-ic"><IconSearch/></span>
          <input
            type="text"
            className="search-input"
            placeholder="공간이나 지역을 검색해보세요"
            value={query}
            autoFocus
            onChange={e=>setQuery(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter') commit(query); }}
          />
          {query && (
            <button className="search-clear" onClick={()=>setQuery('')} aria-label="입력 지우기">
              <IconX size={10}/>
            </button>
          )}
        </div>
        <button className="search-cancel" onClick={onBack}>취소</button>
      </div>
      <div className="scroll">
        {!q && (
          <>
            <div className="search-section fu d1">
              <div className="search-section-head">
                <span className="search-section-title">최근 검색어</span>
                {recents.length>0 && (
                  <button className="search-section-act" onClick={()=>setRecents([])}>전체 삭제</button>
                )}
              </div>
              {recents.length===0 ? (
                <div className="recent-text" style={{color:'var(--ink3)',fontSize:13,padding:'8px 0'}}>최근 검색어가 없어요</div>
              ) : (
                <div className="recent-list">
                  {recents.map(term=>(
                    <div key={term} className="recent-item" onClick={()=>commit(term)}>
                      <span className="recent-ic"><IconTime/></span>
                      <span className="recent-text">{term}</span>
                      <button className="recent-del" onClick={(e)=>{e.stopPropagation();setRecents(prev=>prev.filter(x=>x!==term));}} aria-label="삭제">
                        <IconX size={14}/>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="search-section fu d2">
              <div className="search-section-head">
                <span className="search-section-title">인기 검색어</span>
              </div>
              <div className="popular-grid">
                {POPULAR_KEYWORDS.map((kw,i)=>(
                  <button key={kw} className="popular-chip" onClick={()=>commit(kw)}>
                    <span className="popular-rank">{i+1}</span>{kw}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        {q && (
          results.length===0 ? (
            <div className="empty-state fu">
              <div className="empty-icon"><IconSearch/></div>
              <div className="empty-title">'{query}'에 대한 결과가 없어요</div>
              <div className="empty-sub">다른 검색어를 입력해보세요</div>
            </div>
          ) : (
            <>
              <p className="result-info fu"><strong>{results.length}개</strong>의 공간을 찾았어요</p>
              <div className="space-list">
                {results.map((space,i)=>(
                  <SpaceCard key={space.id} space={space} index={i} isFav={favorites.has(space.id)} onToggleFav={onToggleFav} onOpen={()=>onOpenSpace(space)}/>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </>
  );
}

const SPACE_HOSTS = ['강석진','방준서','신동준','김윤중'];
const SPACE_DESCRIPTIONS = {
  s1: '깨끗하게 관리되고 있는 원룸의 빈 방으로, 박스 5~6개 정도 보관 가능합니다. 도어락 보안과 자유로운 출입으로 안심하고 맡기실 수 있어요.',
  s2: '24시간 CCTV가 설치된 안전한 창고 공간입니다. 대형 짐도 충분히 보관 가능하며, 소액 보험이 자동 적용되어 분쟁 발생 시에도 보호됩니다.',
};

function SpaceDetailView({ space, onBack, isFav, onToggleFav, onNavigate }) {
  if (!space) return null;
  const host = getSpaceHost(space.id);
  const desc = SPACE_DESCRIPTIONS[space.id] || '이웃과 안전하게 이용할 수 있는 검증된 보관 공간입니다.';
  const reviewCount = (space.meta.match(/후기 (\d+)/) || [,'2'])[1];
  const tokens = space.meta.split(' · ');
  const distance = tokens[0] || '';
  const features = tokens[2] || '즉시 예약 가능';
  const photos = getSpacePhotos(space.id);
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">공간 상세</span>
      </div>
      <div className="detail-scroll">
        <PhotoGallery photos={photos}/>
        <div className="detail-body">
          <div className="detail-header">
            <h2 className="detail-title">{space.name}</h2>
            <div className="detail-tag-row">
              {space.badges.map(({cls,label}) => <span key={label} className={`badge ${cls}`}>{label}</span>)}
            </div>
          </div>
          <div className="owner-card store">
            <div className="owner-avatar">{host.avatar}</div>
            <div className="owner-info">
              <div className="owner-name">{host.name}</div>
              <div className="owner-meta">★ {host.rating} · 운영 {host.years} · 호스트</div>
            </div>
            <button className="owner-action store" onClick={()=>onNavigate('store-chat')}>채팅</button>
          </div>
          <div className="detail-divider"/>
          <div className="detail-section">
            <h3 className="detail-section-title">공간 소개</h3>
            <p className="detail-desc">{desc}</p>
          </div>
          <div className="detail-divider"/>
          <div className="detail-section">
            <h3 className="detail-section-title">위치</h3>
            <div className="detail-map">
              <div className="detail-map-grid"/>
              <div className="detail-map-road h"/>
              <div className="detail-map-road v"/>
              <div className="detail-map-pin">
                <div className="detail-map-bubble">{distance}</div>
                <div className="detail-map-stem"/>
                <div className="detail-map-dot"/>
              </div>
            </div>
            <div className="detail-map-addr">{host.address} · {host.addressDetail}</div>
          </div>
          <div className="detail-divider"/>
          <div className="detail-section">
            <h3 className="detail-section-title">상세 정보</h3>
            <div className="detail-spec-row"><span className="detail-spec-label">거리</span><span className="detail-spec-value">{distance}</span></div>
            <div className="detail-spec-row"><span className="detail-spec-label">위치</span><span className="detail-spec-value">{host.address}</span></div>
            <div className="detail-spec-row"><span className="detail-spec-label">규모</span><span className="detail-spec-value">약 3평 · 박스 5개 수용</span></div>
            <div className="detail-spec-row"><span className="detail-spec-label">출입</span><span className="detail-spec-value">24시간 자유 출입</span></div>
            <div className="detail-spec-row"><span className="detail-spec-label">보안</span><span className="detail-spec-value">{features}</span></div>
            <div className="detail-spec-row"><span className="detail-spec-label">결제</span><span className="detail-spec-value">에스크로 보호 · 보험 적용</span></div>
          </div>
          <div className="detail-divider"/>
          <div className="detail-section">
            <h3 className="detail-section-title">최근 후기 · {reviewCount}개</h3>
            <div className="review-item">
              <div className="review-head">
                <span className="review-rating">★★★★★</span>
                <span className="review-author">김다은</span>
                <span className="review-time">5일 전</span>
              </div>
              <p className="review-text">호스트분 친절하시고 공간도 깨끗했어요. 짐 인수받을 때 사진 검증이 잘 되어 안심됐습니다.</p>
            </div>
            <div className="review-item">
              <div className="review-head">
                <span className="review-rating">★★★★★</span>
                <span className="review-author">신동준</span>
                <span className="review-time">2주 전</span>
              </div>
              <p className="review-text">위치도 좋고 가격도 합리적입니다. 다음에 또 이용할게요.</p>
            </div>
            <div className="review-item">
              <div className="review-head">
                <span className="review-rating">★★★★☆</span>
                <span className="review-author">김윤중</span>
                <span className="review-time">3주 전</span>
              </div>
              <p className="review-text">공간 자체는 만족스러웠어요. 다만 처음 찾을 때 길 안내가 조금 헷갈렸어요.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-bottom">
        <button className={`detail-fav${isFav?' on':''}`} onClick={()=>onToggleFav(space.id)} aria-label={isFav?'찜 해제':'찜'}>
          <IconHeart filled={isFav}/>
        </button>
        <div className="detail-price-area">
          <div className="detail-price-label">월 이용료</div>
          <div className="detail-price-value">{space.price}<small>{space.unit}</small></div>
        </div>
        <div className="detail-dual-cta">
          <button className="detail-cta-chat" onClick={()=>onNavigate('store-chat')}>문의하기</button>
          <button className="detail-cta-pay" onClick={()=>onNavigate('store-booking')}>즉시결제</button>
        </div>
      </div>
    </>
  );
}

const ITEM_OWNERS = ['신동준','김윤중','강석진','방준서','김다은'];
const ITEM_DESC = {
  i1: '주말 캠핑이나 여행에 적합한 4인용 텐트입니다. 설치가 간단하고 방수 처리되어 우천 시에도 사용할 수 있어요. 폴, 페그, 수납 가방이 모두 포함됩니다.',
  i2: '18V 무선 전동 드릴 세트입니다. 가구 조립, 벽걸이 설치 등 가벼운 DIY에 충분한 성능. 다양한 비트와 충전기 포함.',
  i3: 'Full HD 휴대용 빔프로젝터로 영화의 밤, 야외 캠핑에서 분위기 만들기 좋아요. HDMI/USB/무선 미러링 지원합니다.',
  i4: '시내 라이딩에 적합한 성인용 자전거입니다. 안장 높이 조절 가능, 잠금장치와 헬멧 무료 대여.',
  i5:'여행이나 캠핑에서 간편하게 쓸 수 있는 버너 세트. 가스통 2개, 냄비 포함.',
  i6:'중급자용 스노우보드 세트. 바인딩 포함, 크기 155cm. 왁스 처리 완료.',
  i7:'0~4세 유아용 안전 카시트. ISOFIX 장착 가능. 사용 전 세척 완료.',
  i8:'닌텐도 스위치 본체 + 조이콘. 게임 타이틀 3개 포함. 마리오카트, 젤다, 스플래툰.',
};

function ItemDetailView({ item, onBack, isFav, onToggleFav, onNavigate }) {
  if (!item) return null;
  const owner = getItemOwner(item.id);
  const desc = ITEM_DESC[item.id] || '이웃과 안전하게 거래할 수 있는 검증된 물품입니다.';
  const reviewCount = (item.meta.match(/후기 (\d+)/) || [,'8'])[1];
  const unit = item.meta.split(' · ')[0];
  const photos = getItemPhotos(item.id);
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">상세 정보</span>
      </div>
      <div className="detail-scroll">
        <PhotoGallery photos={photos}/>
        <div className="detail-body">
          <div className="detail-header">
            <h2 className="detail-title">{item.name}</h2>
            <div className="detail-tag-row">
              {item.badges.map(({cls,label}) => <span key={label} className={`badge ${cls}`}>{label}</span>)}
            </div>
          </div>
          <div className="owner-card share">
            <div className="owner-avatar">{owner.avatar}</div>
            <div className="owner-info">
              <div className="owner-name">{owner.name}</div>
              <div className="owner-meta">★ {owner.rating} · 거래 {owner.trades}회 · 천안 {owner.location}</div>
            </div>
            <button className="owner-action share" onClick={()=>onNavigate('item-chat')}>채팅</button>
          </div>
          <div className="detail-divider"/>
          <div className="detail-section">
            <h3 className="detail-section-title">상품 설명</h3>
            <p className="detail-desc">{desc}</p>
          </div>
          <div className="detail-divider"/>
          <div className="detail-section">
            <h3 className="detail-section-title">픽업 위치</h3>
            <div className="detail-map">
              <div className="detail-map-grid"/>
              <div className="detail-map-road h"/>
              <div className="detail-map-road v"/>
              <div className="detail-map-pin">
                <div className="detail-map-bubble" style={{background:'var(--teal)'}}>픽업 장소</div>
                <div className="detail-map-stem" style={{background:'var(--teal)'}}/>
                <div className="detail-map-dot" style={{background:'var(--teal)',boxShadow:'0 0 0 1px var(--teal)'}}/>
              </div>
            </div>
            <div className="detail-map-addr">천안시 동남구 {owner.location} 인근 협의</div>
          </div>
          <div className="detail-divider"/>
          <div className="detail-section">
            <h3 className="detail-section-title">상세 정보</h3>
            <div className="detail-spec-row"><span className="detail-spec-label">대여 단위</span><span className="detail-spec-value">{unit}</span></div>
            <div className="detail-spec-row"><span className="detail-spec-label">픽업 위치</span><span className="detail-spec-value">천안시 동남구 {owner.location}</span></div>
            <div className="detail-spec-row"><span className="detail-spec-label">보증금</span><span className="detail-spec-value">10,000원 (반납 시 환급)</span></div>
            <div className="detail-spec-row"><span className="detail-spec-label">결제</span><span className="detail-spec-value">에스크로 보호</span></div>
          </div>
          <div className="detail-divider"/>
          <div className="detail-section">
            <h3 className="detail-section-title">최근 후기 · {reviewCount}개</h3>
            <div className="review-item">
              <div className="review-head">
                <span className="review-rating">★★★★★</span>
                <span className="review-author">김다은</span>
                <span className="review-time">3일 전</span>
              </div>
              <p className="review-text">상태도 깔끔하고 약속 시간 정확해서 너무 좋았어요. 다음에 또 빌릴 예정입니다!</p>
            </div>
            <div className="review-item">
              <div className="review-head">
                <span className="review-rating">★★★★★</span>
                <span className="review-author">강석진</span>
                <span className="review-time">1주 전</span>
              </div>
              <p className="review-text">설명대로 잘 작동하고 사용법도 친절히 알려주셨어요. 추천합니다.</p>
            </div>
            <div className="review-item">
              <div className="review-head">
                <span className="review-rating">★★★★☆</span>
                <span className="review-author">방준서</span>
                <span className="review-time">2주 전</span>
              </div>
              <p className="review-text">가격 대비 만족도가 높아요. 다만 보증금 환급이 살짝 늦었네요.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-bottom">
        <button className={`detail-fav${isFav?' on':''}`} onClick={()=>onToggleFav(item.id)} aria-label={isFav?'찜 해제':'찜'}>
          <IconHeart filled={isFav}/>
        </button>
        <div className="detail-price-area">
          <div className="detail-price-label">대여료</div>
          <div className="detail-price-value">{item.price}<small>{item.unit}</small></div>
        </div>
        <div className="detail-dual-cta">
          <button className="detail-cta-chat" style={{borderColor:'var(--teal)',color:'var(--teal)'}} onClick={()=>onNavigate('item-chat')}>문의하기</button>
          <button className="detail-cta-borrow" onClick={()=>onNavigate('item-booking')}>빌리기</button>
        </div>
      </div>
    </>
  );
}

function MapView({ onNavigate }) {
  const [selected, setSelected] = useState('s1');
  const pins = [
    {id:'s1',top:'34%',left:'30%',label:'30,000원'},
    {id:'s2',top:'60%',left:'62%',label:'25,000원'},
  ];
  const cur = SPACES.find(s=>s.id===selected) || SPACES[0];
  return (
    <>
      <div className="map-wrap">
        <div className="map-grid"/>
        <div className="map-roads">
          <div className="map-road h1"/>
          <div className="map-road h2"/>
          <div className="map-road v1"/>
          <div className="map-road v2"/>
        </div>
        {pins.map(p=>(
          <div key={p.id} className="map-pin" style={{top:p.top,left:p.left}} onClick={()=>setSelected(p.id)}>
            <div className={`map-pin-bubble${selected===p.id?'':' alt'}`}>{p.label}</div>
            <div className="map-pin-stem"/>
            <div className="map-pin-dot"/>
          </div>
        ))}
        <div className="map-overlay">
          <div className="map-search-card" onClick={()=>onNavigate('search')}>
            <IconSearch/>
            <span>지역, 공간명으로 검색</span>
          </div>
        </div>
        <div className="map-fab">
          <button className="map-fab-btn" aria-label="내 위치"><IconPin/></button>
          <button className="map-fab-btn" aria-label="목록 보기" onClick={()=>onNavigate('list')}><IconList/></button>
        </div>
        <div className="map-sheet" onClick={()=>onNavigate('list')}>
          <img src={cur.img} alt={cur.name} className="map-sheet-img"/>
          <div className="map-sheet-info">
            <div className="map-sheet-name">{cur.name}</div>
            <div className="map-sheet-meta">{cur.meta}</div>
            <div className="map-sheet-price">{cur.price}<span style={{fontSize:12,fontWeight:400,color:'var(--ink3)',marginLeft:2}}>{cur.unit}</span></div>
          </div>
        </div>
      </div>
      <BottomTab active="map" onNavigate={onNavigate}/>
    </>
  );
}

function RegisterView({ onBack, initialType = 'space' }) {
  const [type, setType] = useState(initialType);
  const types = [
    {key:'space',icon:<IconRoom/>,title:'공간 제공',sub:'유휴 공간으로 수익 창출'},
    {key:'item',icon:<IconBox/>,title:'물품 등록',sub:'안 쓰는 물건 대여 등록'},
  ];
  const fields = type==='space'
    ? [
        {label:'공간 이름',placeholder:'예) 안서동 안전 창고'},
        {label:'주소',placeholder:'예) 천안시 동남구 안서동'},
        {label:'면적',placeholder:'예) 3평 / 큰 박스 5개'},
        {label:'월 이용료',placeholder:'예) 25,000원'},
      ]
    : [
        {label:'물품 이름',placeholder:'예) 4인용 텐트'},
        {label:'카테고리',placeholder:'예) 캠핑/레저'},
        {label:'대여 단위',placeholder:'예) 1박 / 1주일'},
        {label:'대여료',placeholder:'예) 10,000원'},
      ];
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">개인 등록</span>
      </div>
      <div className="form-scroll">
        <h2 className="form-heading fu">무엇을<br/><span>등록하시나요?</span></h2>
        <div className="reg-type-row fu d1">
          {types.map(({key,icon,title,sub})=>(
            <button key={key} className={`reg-type${type===key?' on':''}`} onClick={()=>setType(key)}>
              <span className="reg-type-ic">{icon}</span>
              <span className="reg-type-title">{title}</span>
              <span className="reg-type-sub">{sub}</span>
            </button>
          ))}
        </div>
        {fields.map(({label,placeholder},i)=>(
          <div key={label} className={`field fu d${Math.min(i+2,5)}`}>
            <label className="field-label">{label}</label>
            <input type="text" placeholder={placeholder} className="field-input"/>
          </div>
        ))}
        <div className="notice-box fu d5">
          <span className="notice-icon"><IconShield/></span>
          <span className="notice-txt">등록 후 관리자 검수를 거쳐 24시간 이내 게시됩니다.</span>
        </div>
      </div>
      <div className="cta-area">
        <button className="cta-btn blue" onClick={onBack}>등록하기 <ArrowR/></button>
      </div>
    </>
  );
}

const COMMUNITY_POSTS = [
  {id:'p1', author:'김다은', avatar:'김', time:'2시간 전', cat:'review', catLabel:'후기', title:'백석대 앞 원룸 보관 후기', excerpt:'겨울 옷 3박스를 한 달 맡겼는데 사진 검증 덕분에 깔끔하게 받았어요. 호스트님도 친절하셔서 강추합니다!', likes:12, comments:3},
  {id:'p2', author:'강석진', avatar:'강', time:'5시간 전', cat:'qna', catLabel:'질문', title:'캐리어 1박만 맡길 곳 있을까요?', excerpt:'다음 주 출장인데 짧게 하루만 캐리어 보관할 수 있는 곳을 찾고 있어요. 천안 지역이면 좋을 것 같습니다.', likes:5, comments:8},
  {id:'p3', author:'방준서', avatar:'방', time:'어제', cat:'tip', catLabel:'팁', title:'분쟁 없이 인수받는 5가지 팁', excerpt:'AI 사진 검증을 잘 활용하는 방법, 사전 협의 체크리스트, 인수 시 꼭 확인해야 할 것들을 정리해봤어요.', likes:42, comments:11},
  {id:'p4', author:'신동준', avatar:'신', time:'2일 전', cat:'news', catLabel:'소식', title:'천안 안서동 신규 공간 5곳 오픈', excerpt:'대학가 중심으로 새로운 보관 공간들이 늘어나고 있어요. 모두 보험 적용 가능합니다.', likes:18, comments:2},
];

const COMMUNITY_FILTERS = [['전체','all'],['후기','review'],['질문','qna'],['팁','tip'],['소식','news']];

function CommunityView({ onNavigate, verified, onVerify }) {
  const [filter, setFilter] = useState('all');
  const [verifying, setVerifying] = useState(false);
  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => { onVerify(); setVerifying(false); }, 1200);
  };
  if (!verified) {
    return (
      <>
        <div className="top-bar fu">
          <span className="logo">커뮤니티</span>
        </div>
        <div className="locked-state fu">
          <div className="locked-icon"><IconLock/></div>
          <div className="locked-title">동네 인증을 한 사용자만<br/>볼 수 있어요</div>
          <div className="locked-sub">내 동네 이웃들의 진짜 이야기와<br/>실시간 정보를 받아보세요</div>
          <button className="locked-btn" onClick={handleVerify} disabled={verifying}>
            {verifying ? <><span className="spin-ring"/>인증 중...</> : <>동네 인증 하러가기 <ArrowR/></>}
          </button>
          <div className="locked-features">
            <span className="locked-chip">위치 기반</span>
            <span className="locked-chip">안전 검증</span>
            <span className="locked-chip">1분 완료</span>
          </div>
        </div>
        <BottomTab active="community" onNavigate={onNavigate}/>
      </>
    );
  }
  const posts = filter==='all' ? COMMUNITY_POSTS : COMMUNITY_POSTS.filter(p=>p.cat===filter);
  return (
    <>
      <div className="top-bar fu">
        <span className="logo">커뮤니티</span>
        <div className="top-icons">
          <button className="icon-btn" aria-label="검색" onClick={()=>onNavigate('search')}><IconSearch/></button>
          <button className="icon-btn" aria-label="알림"><IconBell/></button>
        </div>
      </div>
      <div className="filter-bar">
        {COMMUNITY_FILTERS.map(([l,k])=>(
          <button key={k} className={`filter-chip${filter===k?' on':''}`} onClick={()=>setFilter(k)}>{l}</button>
        ))}
      </div>
      {posts.length===0 ? (
        <div className="empty-state fu">
          <div className="empty-icon"><IconUsers/></div>
          <div className="empty-title">아직 글이 없어요</div>
          <div className="empty-sub">첫 글을 작성해보세요</div>
        </div>
      ) : (
        <div className="scroll" style={{position:'relative'}}>
          <div className="post-list">
            {posts.map((p,i)=>(
              <div key={p.id} className={`post-card fu d${Math.min(i+1,5)}`}>
                <div className="post-head">
                  <span className="post-avatar">{p.avatar}</span>
                  <span className="post-author">{p.author}</span>
                  <span className="post-time">{p.time}</span>
                </div>
                <span className={`post-cat ${p.cat}`}>{p.catLabel}</span>
                <div className="post-title">{p.title}</div>
                <div className="post-excerpt">{p.excerpt}</div>
                <div className="post-foot">
                  <span><IconThumbUp/> {p.likes}</span>
                  <span><IconMsg/> {p.comments}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="com-write" aria-label="글쓰기"><IconPen/></button>
        </div>
      )}
      <BottomTab active="community" onNavigate={onNavigate}/>
    </>
  );
}

function StoreChoiceView({ onBack, onNavigate }) {
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">보관</span>
      </div>
      <div className="choice-scroll">
        <div className="choice-heading fu">
          <div className="choice-title">어떤 분<span>이신가요?</span></div>
          <div className="choice-sub">보관 서비스를 어떻게 이용하실지<br/>알려주세요</div>
        </div>
        <div className="choice-cards fu d1">
          <button className="choice-card user-store" onClick={()=>onNavigate('form')}>
            <span className="choice-card-ic"><IconPkg/></span>
            <div className="choice-card-content">
              <span className="choice-card-title">보관을 하려는 사용자</span>
              <span className="choice-card-sub">내 짐을 이웃 공간에<br/>안전하게 맡기고 싶어요</span>
            </div>
            <span className="choice-card-chev"><ChevR/></span>
          </button>
          <button className="choice-card user-host" onClick={()=>onNavigate('register-space')}>
            <span className="choice-card-ic"><IconRoom/></span>
            <div className="choice-card-content">
              <span className="choice-card-title">보관을 해주려는 사용자</span>
              <span className="choice-card-sub">유휴 공간을 제공하고<br/>수익을 만들고 싶어요</span>
            </div>
            <span className="choice-card-chev"><ChevR/></span>
          </button>
        </div>
      </div>
    </>
  );
}

function ShareChoiceView({ onBack, onNavigate }) {
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">쉐어</span>
      </div>
      <div className="choice-scroll">
        <div className="choice-heading fu">
          <div className="choice-title">어떤 분<span className="teal">이신가요?</span></div>
          <div className="choice-sub">쉐어 서비스를 어떻게 이용하실지<br/>알려주세요</div>
        </div>
        <div className="choice-cards fu d1">
          <button className="choice-card user-borrow" onClick={()=>onNavigate('share-list')}>
            <span className="choice-card-ic"><IconShare/></span>
            <div className="choice-card-content">
              <span className="choice-card-title">쉐어를 받으려는 사용자</span>
              <span className="choice-card-sub">이웃의 물건을<br/>빌려서 사용하고 싶어요</span>
            </div>
            <span className="choice-card-chev"><ChevR/></span>
          </button>
          <button className="choice-card user-lend" onClick={()=>onNavigate('item-register')}>
            <span className="choice-card-ic"><IconBox/></span>
            <div className="choice-card-content">
              <span className="choice-card-title">쉐어를 해주려는 사용자</span>
              <span className="choice-card-sub">안 쓰는 물건을 등록해<br/>이웃과 공유하고 싶어요</span>
            </div>
            <span className="choice-card-chev"><ChevR/></span>
          </button>
        </div>
      </div>
    </>
  );
}

function HistoryView({ onNavigate, onBack }) {
  const [filter, setFilter] = useState('all');
  const items = filter==='all' ? HISTORY : HISTORY.filter(h=>h.status===filter);
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">이용 내역</span>
      </div>
      <div className="filter-bar">
        {HISTORY_FILTERS.map(([l,k])=>(
          <button key={k} className={`filter-chip${filter===k?' on':''}`} onClick={()=>setFilter(k)}>{l}</button>
        ))}
      </div>
      {items.length===0 ? (
        <div className="empty-state fu">
          <div className="empty-icon"><IconList/></div>
          <div className="empty-title">내역이 없어요</div>
          <div className="empty-sub">선택한 상태의 이용 내역이 없습니다</div>
        </div>
      ) : (
        <div className="scroll">
          <div className="history-list">
            {items.map((h,i)=>(
              <div key={h.id} className={`history-item fu d${Math.min(i+1,5)}`}>
                <div className="history-head">
                  <span className="history-date">{h.date}</span>
                  <span className={`status-chip ${h.status}`}>{STATUS_LABEL[h.status]}</span>
                </div>
                <div className="history-body">
                  <img src={h.img} alt={h.name} className="history-thumb"/>
                  <div className="history-info">
                    <div className="history-name">{h.name}</div>
                    <div className="history-meta">{h.period}</div>
                    <div className="history-meta">{h.meta}</div>
                    <div className="history-price">{h.price}</div>
                  </div>
                </div>
                <div className="history-foot">
                  {h.status==='ongoing' && <>
                    <button className="history-btn">연장 요청</button>
                    <button className="history-btn primary">상세 보기</button>
                  </>}
                  {h.status==='done' && <>
                    <button className="history-btn">후기 작성</button>
                    <button className="history-btn primary">다시 예약</button>
                  </>}
                  {h.status==='cancel' && <>
                    <button className="history-btn">환불 내역</button>
                    <button className="history-btn primary">다시 예약</button>
                  </>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function MyPageView({ onNavigate, favorites }) {
  const ongoingCount = HISTORY.filter(h=>h.status==='ongoing').length;
  const doneCount = HISTORY.filter(h=>h.status==='done').length;
  const accountMenu = [
    {icon:<IconCard/>,label:'결제 수단',value:'KB국민 ****'},
    {icon:<IconCoupon/>,label:'쿠폰함',value:'3장'},
    {icon:<IconMap/>,label:'주소 관리',value:'2개'},
  ];
  const activityMenu = [
    {icon:<IconRoom/>,label:'내가 등록한 공간',to:'register'},
    {icon:<IconChat/>,label:'문의 내역'},
    {icon:<IconDoc/>,label:'후기 관리'},
  ];
  const settingMenu = [
    {icon:<IconBell/>,label:'알림 설정'},
    {icon:<IconCog/>,label:'환경 설정'},
    {icon:<IconHelp/>,label:'고객센터'},
  ];
  return (
    <>
      <div className="top-bar fu">
        <span className="logo">마이페이지</span>
        <div className="top-icons">
          <button className="icon-btn" aria-label="알림"><IconBell/></button>
        </div>
      </div>
      <div className="scroll">
        <div className="profile-card fu d1">
          <div className="profile-avatar">김</div>
          <div className="profile-info">
            <div className="profile-name">김다은</div>
            <div className="profile-email">rlekdm@bu.ac.kr</div>
          </div>
          <button className="profile-edit">편집</button>
        </div>
        <div className="stat-row fu d2">
          <div className="stat-cell" onClick={()=>onNavigate('favorites')}>
            <span className="stat-num">{favorites.size}</span>
            <span className="stat-label">찜한 공간</span>
          </div>
          <div className="stat-divider"/>
          <div className="stat-cell" onClick={()=>onNavigate('history')}>
            <span className="stat-num">{ongoingCount}</span>
            <span className="stat-label">진행중</span>
          </div>
          <div className="stat-divider"/>
          <div className="stat-cell" onClick={()=>onNavigate('history')}>
            <span className="stat-num">{doneCount}</span>
            <span className="stat-label">완료</span>
          </div>
        </div>
        <div className="menu-group-title fu d3">계정</div>
        <div className="menu-group fu d3">
          {accountMenu.map(({icon,label,value})=>(
            <div key={label} className="menu-item">
              <span className="menu-icon">{icon}</span>
              <span className="menu-label">{label}</span>
              {value && <span className="menu-value">{value}</span>}
              <span className="menu-chev"><ChevR/></span>
            </div>
          ))}
        </div>
        <div className="menu-group-title fu d4">활동</div>
        <div className="menu-group fu d4">
          {activityMenu.map(({icon,label,to})=>(
            <div key={label} className="menu-item" onClick={()=>to&&onNavigate(to)}>
              <span className="menu-icon">{icon}</span>
              <span className="menu-label">{label}</span>
              <span className="menu-chev"><ChevR/></span>
            </div>
          ))}
        </div>
        <div className="menu-group-title fu d5">설정</div>
        <div className="menu-group fu d5">
          {settingMenu.map(({icon,label})=>(
            <div key={label} className="menu-item">
              <span className="menu-icon">{icon}</span>
              <span className="menu-label">{label}</span>
              <span className="menu-chev"><ChevR/></span>
            </div>
          ))}
        </div>
        <button className="logout-btn">로그아웃</button>
      </div>
      <BottomTab active="mypage" onNavigate={onNavigate}/>
    </>
  );
}

function PhotoGallery({photos}) {
  const [idx,setIdx]=useState(0);
  return (
    <div className="gallery-wrap">
      <div className="gallery-track" style={{transform:`translateX(-${idx*100}%)`}}>
        {photos.map((src,i)=><img key={i} src={src} alt={`사진 ${i+1}`} className="gallery-img"/>)}
      </div>
      <div className="gallery-dots">
        {photos.map((_,i)=><button key={i} className={`gallery-dot${idx===i?' on':''}`} onClick={()=>setIdx(i)}/>)}
      </div>
      <span className="gallery-count">{idx+1}/{photos.length}</span>
    </div>
  );
}

function StoreChatView({ space, onBack }) {
  const host = space ? getSpaceHost(space.id) : {name:'호스트',avatar:'호'};
  const [msgs, setMsgs] = useState([
    {id:1, from:'host', text:'안녕하세요! 공간 이용 문의 주셨군요. 무엇이 궁금하신가요?', time:'방금'}
  ]);
  const [input, setInput] = useState('');
  const addDevReply = () => {
    setMsgs(prev => [...prev, {id:Date.now(), from:'host', text:'네, 해당 날짜에 이용 가능합니다! 예약 진행해드릴게요.', time:'방금'}]);
  };
  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMsgs(prev => [...prev, {id:Date.now(), from:'me', text:t, time:'방금'}]);
    setInput('');
  };
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">{host.name} · 호스트</span>
        <button className="icon-btn dev-btn" onClick={addDevReply} title="DEV: 호스트 답장 시뮬레이션"><IconCode/></button>
      </div>
      <div className="chat-msgs">
        {msgs.map(m=>(
          <div key={m.id} className={`chat-row ${m.from==='me'?'mine':'theirs'}`}>
            {m.from==='host' && <div className="chat-avatar">{host.avatar}</div>}
            <div className="chat-bubble">{m.text}</div>
            <span className="chat-time">{m.time}</span>
          </div>
        ))}
      </div>
      <div className="chat-input-row">
        <input
          className="chat-input"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{ if(e.key==='Enter') send(); }}
        />
        <button className="chat-send" onClick={send} aria-label="전송">
          <ArrowR/>
        </button>
      </div>
    </>
  );
}

function StoreBookingView({ space, onBack, onNext }) {
  const host = space ? getSpaceHost(space.id) : getSpaceHost('s1');
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selDay, setSelDay] = useState(null);
  const [selTime, setSelTime] = useState(null);
  const [selPeriod, setSelPeriod] = useState(null);
  const cells = buildCalendar(year, month);
  const prevMonth = () => { if(month===0){setYear(y=>y-1);setMonth(11);}else setMonth(m=>m-1); };
  const nextMonth = () => { if(month===11){setYear(y=>y+1);setMonth(0);}else setMonth(m=>m+1); };
  const canNext = selDay && selTime && selPeriod;
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">날짜 · 시간 선택</span>
      </div>
      <div className="book-scroll">
        <div className="book-month-nav">
          <button className="book-nav-btn" onClick={prevMonth}><ChevL/></button>
          <span className="book-month-label">{year}년 {MONTHS_KR[month]}</span>
          <button className="book-nav-btn" onClick={nextMonth}><ChevR/></button>
        </div>
        <div className="book-day-header">
          {DAY_LABELS.map(d=><div key={d} className="book-day-cell">{d}</div>)}
        </div>
        <div className="book-grid">
          {cells.map((c,i)=>
            c.empty ? <div key={i} className="book-cell empty"/> :
            <button
              key={i}
              className={`book-cell${selDay===c.day?' on':''}`}
              disabled={host.unavail.has(c.day)}
              onClick={()=>setSelDay(c.day)}
            >{c.day}</button>
          )}
        </div>
        <div className="book-section-title">시작 시간</div>
        <div className="book-time-grid">
          {host.times.map(t=>(
            <button key={t} className={`book-time-chip${selTime===t?' on':''}`} onClick={()=>setSelTime(t)}>{t}</button>
          ))}
        </div>
        <div className="book-section-title">보관 기간</div>
        <div className="book-period-grid">
          {BOOKING_PERIODS.map(p=>(
            <button key={p} className={`book-period-chip${selPeriod===p?' on':''}`} onClick={()=>setSelPeriod(p)}>{p}</button>
          ))}
        </div>
      </div>
      <div className="pay2-bottom">
        <button
          className="pay2-cta"
          disabled={!canNext}
          style={!canNext?{background:'#9CA3AF'}:{}}
          onClick={()=>onNext({day:selDay, time:selTime, period:selPeriod, month:MONTHS_KR[month], year})}
        >다음 단계</button>
      </div>
    </>
  );
}

function StorePaymentView({ space, booking, onBack, onDone }) {
  const [ins, setIns] = useState('none');
  const [method, setMethod] = useState('카드');
  const [paid, setPaid] = useState(false);
  const insList = [
    {key:'none', label:'없음', desc:'보험 미적용', price:'무료'},
    {key:'basic', label:'기본 보험', desc:'파손/분실 최대 5만원 보장', price:'2,000원/월'},
    {key:'full', label:'풀커버', desc:'파손/분실 최대 50만원 + 분쟁 지원', price:'5,000원/월'},
  ];
  const methods = ['카드','카카오페이','토스','계좌이체'];
  const basePrice = space ? parseInt((space.price||'0').replace(/,/g,'')) : 0;
  const insPrice = ins==='basic' ? 2000 : ins==='full' ? 5000 : 0;
  const total = basePrice + insPrice;
  if (paid) return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onDone} aria-label="홈으로"><ChevL/></button>
        <span className="page-title">결제 완료</span>
      </div>
      <div className="pay2-success">
        <div className="pay2-success-icon">✓</div>
        <div className="pay2-success-title">결제가 완료됐어요!</div>
        <div className="pay2-success-sub">
          {booking ? `${booking.year}년 ${booking.month} ${booking.day}일 ${booking.time} 시작` : ''}<br/>
          에스크로로 안전하게 보호됩니다
        </div>
        <button className="pay2-cta" onClick={onDone}>홈으로</button>
      </div>
    </>
  );
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">결제</span>
      </div>
      <div className="pay2-scroll">
        <div className="pay2-section">
          <div className="pay2-label">예약 정보</div>
          <div className="pay2-booking-card">
            {space && <div className="pay2-booking-row"><span className="pay2-booking-key">공간</span><span className="pay2-booking-val">{space.name}</span></div>}
            {booking && <>
              <div className="pay2-booking-row"><span className="pay2-booking-key">날짜</span><span className="pay2-booking-val">{booking.year}년 {booking.month} {booking.day}일</span></div>
              <div className="pay2-booking-row"><span className="pay2-booking-key">시간</span><span className="pay2-booking-val">{booking.time}</span></div>
              <div className="pay2-booking-row"><span className="pay2-booking-key">기간</span><span className="pay2-booking-val">{booking.period}</span></div>
            </>}
          </div>
        </div>
        <div style={{height:8,background:'#FAFAFA'}}/>
        <div className="pay2-section">
          <div className="pay2-label">보험 선택</div>
          <div className="pay2-ins-list">
            {insList.map(o=>(
              <button key={o.key} className={`pay2-ins${ins===o.key?' on':''}`} onClick={()=>setIns(o.key)}>
                <div className="pay2-ins-radio"/>
                <div className="pay2-ins-info">
                  <div className="pay2-ins-title">{o.label}</div>
                  <div className="pay2-ins-desc">{o.desc}</div>
                </div>
                <div className="pay2-ins-price">{o.price}</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{height:8,background:'#FAFAFA'}}/>
        <div className="pay2-section">
          <div className="pay2-label">결제 수단</div>
          <div className="pay2-method-grid">
            {methods.map(m=>(
              <button key={m} className={`pay2-method${method===m?' on':''}`} onClick={()=>setMethod(m)}>{m}</button>
            ))}
          </div>
        </div>
        <div style={{height:8,background:'#FAFAFA'}}/>
        <div className="pay2-section">
          <div className="pay2-label">결제 금액</div>
          <div className="pay2-row"><span>이용료</span><span>{basePrice.toLocaleString()}원</span></div>
          {insPrice>0 && <div className="pay2-row"><span>보험료</span><span>{insPrice.toLocaleString()}원</span></div>}
          <div className="pay2-row total"><span>합계</span><strong>{total.toLocaleString()}원</strong></div>
        </div>
      </div>
      <div className="pay2-bottom">
        <button className="pay2-cta" onClick={()=>setPaid(true)}>{total.toLocaleString()}원 결제하기</button>
      </div>
    </>
  );
}

function HostRegisterView({ onBack, onDone }) {
  const [done, setDone] = useState(false);
  const [cat, setCat] = useState('');
  const [name, setName] = useState('');
  const [addr, setAddr] = useState('');
  const [locating, setLocating] = useState(false);
  const [size, setSize] = useState('');
  const [price, setPrice] = useState(50000);
  const [days, setDays] = useState(new Set(['월','화','수','목','금']));
  const [fromTime, setFromTime] = useState('09:00');
  const [toTime, setToTime] = useState('22:00');
  const [desc, setDesc] = useState('');
  const PMIN=10000, PMAX=200000, PSTEP=10000;
  const pct = ((price-PMIN)/(PMAX-PMIN))*100;
  const detectAddr = () => {
    setLocating(true);
    setTimeout(()=>{ setAddr('천안시 동남구 안서동 153-2'); setLocating(false); }, 800);
  };
  const toggleDay = (d) => setDays(prev => {
    const n = new Set(prev);
    if(n.has(d)) n.delete(d); else n.add(d);
    return n;
  });
  if (done) return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onDone} aria-label="홈으로"><ChevL/></button>
        <span className="page-title">등록 완료</span>
      </div>
      <div className="pay2-success">
        <div className="pay2-success-icon">✓</div>
        <div className="pay2-success-title">공간 등록이 완료됐어요!</div>
        <div className="pay2-success-sub">관리자 검수 후 24시간 이내 게시됩니다.<br/>이웃들이 곧 내 공간을 만날 거예요.</div>
        <button className="pay2-cta" onClick={onDone}>홈으로</button>
      </div>
    </>
  );
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">공간 등록</span>
      </div>
      <div className="hreg-scroll">
        <h2 className="hreg-heading">유휴 공간을<br/><span>등록해보세요</span></h2>
        <div className="hreg-section">
          <label className="hreg-label">공간 유형</label>
          <div className="hreg-cat-grid">
            {HOST_SPACE_CATS.map(c=>(
              <button key={c.key} className={`hreg-cat${cat===c.key?' on':''}`} onClick={()=>setCat(c.key)}>
                <span className="hreg-cat-ic">{c.icon}</span>
                <span className="hreg-cat-label">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="hreg-section">
          <label className="hreg-label">공간 이름</label>
          <input className="hreg-input" placeholder="예) 안서동 안전 창고" value={name} onChange={e=>setName(e.target.value)}/>
        </div>
        <div className="hreg-section">
          <label className="hreg-label">주소</label>
          <div style={{display:'flex',gap:8}}>
            <input className="hreg-input" style={{flex:1}} placeholder="주소 입력" value={addr} onChange={e=>setAddr(e.target.value)}/>
            <button className="loc-action" onClick={detectAddr} disabled={locating} style={{flexShrink:0,whiteSpace:'nowrap'}}>
              {locating ? '탐색...' : <><IconLocate/>GPS</>}
            </button>
          </div>
        </div>
        <div className="hreg-section">
          <label className="hreg-label">공간 크기</label>
          <div className="hreg-size-row">
            {HOST_SIZES.map(s=>(
              <button key={s.key} className={`hreg-size${size===s.key?' on':''}`} onClick={()=>setSize(s.key)}>
                <span className="hreg-size-title">{s.title}</span>
                <span className="hreg-size-sub">{s.sub}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="hreg-section">
          <label className="hreg-label">월 이용료</label>
          <div className="hreg-price-disp">{price.toLocaleString()}<span style={{fontSize:16,fontWeight:500,color:'var(--ink3)',marginLeft:4}}>원/월</span></div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <button className="price-btn" onClick={()=>setPrice(p=>Math.max(PMIN,p-PSTEP))} disabled={price<=PMIN}><IconMinus/></button>
            <div style={{flex:1}}>
              <div className="hreg-price-track">
                <div className="hreg-price-fill" style={{width:`${pct}%`}}/>
                <div className="hreg-price-thumb" style={{left:`${pct}%`}}/>
              </div>
              <div className="hreg-price-ticks"><span>1만</span><span>10만</span><span>20만</span></div>
            </div>
            <button className="price-btn" onClick={()=>setPrice(p=>Math.min(PMAX,p+PSTEP))} disabled={price>=PMAX}><IconPlus/></button>
          </div>
        </div>
        <div className="hreg-section">
          <label className="hreg-label">이용 가능 요일</label>
          <div className="hreg-days-row">
            {HOST_DAYS.map(d=>(
              <button key={d} className={`hreg-day${days.has(d)?' on':''}`} onClick={()=>toggleDay(d)}>{d}</button>
            ))}
          </div>
        </div>
        <div className="hreg-section">
          <label className="hreg-label">이용 가능 시간</label>
          <div className="hreg-time-row">
            <select className="hreg-time-sel" value={fromTime} onChange={e=>setFromTime(e.target.value)}>
              {HOUR_OPTS.map(h=><option key={h}>{h}</option>)}
            </select>
            <span style={{color:'var(--ink3)',fontSize:14}}>~</span>
            <select className="hreg-time-sel" value={toTime} onChange={e=>setToTime(e.target.value)}>
              {HOUR_OPTS.map(h=><option key={h}>{h}</option>)}
            </select>
          </div>
        </div>
        <div className="hreg-section">
          <label className="hreg-label">공간 사진</label>
          <div className="hreg-photo-grid">
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} className="hreg-photo-slot">+</div>
            ))}
          </div>
        </div>
        <div className="hreg-section">
          <label className="hreg-label">공간 설명</label>
          <textarea className="hreg-textarea" rows={4} placeholder="공간에 대해 자세히 설명해주세요..." value={desc} onChange={e=>setDesc(e.target.value)}/>
        </div>
        <div className="notice-box">
          <span className="notice-icon"><IconShield/></span>
          <span className="notice-txt">등록 후 관리자 검수를 거쳐 24시간 이내 게시됩니다.</span>
        </div>
      </div>
      <div className="pay2-bottom">
        <button className="pay2-cta" onClick={()=>setDone(true)}>공간 등록하기</button>
      </div>
    </>
  );
}

function ItemListView({ onBack, onOpenItem, favorites, onToggleFav }) {
  const [cat, setCat] = useState('all');
  const filtered = cat==='all' ? ITEMS : ITEMS.filter(it=>it.cat===cat);
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">물건 빌리기</span>
      </div>
      <div className="share-cat-bar">
        {ITEM_SHARE_CATS.map(c=>(
          <button key={c.key} className={`share-cat-chip${cat===c.key?' on':''}`} onClick={()=>setCat(c.key)}>{c.label}</button>
        ))}
      </div>
      <p className="result-info fu"><strong>{filtered.length}개</strong>의 물건이 있어요</p>
      <div className="scroll">
        <div className="item-grid">
          {filtered.map(item=>(
            <div key={item.id} className="item-card" onClick={()=>onOpenItem(item)}>
              <div className="item-card-wrap">
                <img src={item.img} alt={item.name} className="item-card-img"/>
                <div className="item-card-info">
                  <div className="item-card-name">{item.name}</div>
                  <div className="item-card-meta">{item.meta}</div>
                  <div className="item-card-price">{item.price}<small>{item.unit}</small></div>
                  <div className="item-card-badges">
                    {item.badges.map(({cls,label})=><span key={label} className={`badge ${cls}`}>{label}</span>)}
                  </div>
                </div>
              </div>
              <button
                className={`item-card-fav${favorites && favorites.has(item.id)?' on':''}`}
                onClick={e=>{e.stopPropagation();onToggleFav&&onToggleFav(item.id);}}
                aria-label="찜"
              >
                <IconHeart filled={favorites && favorites.has(item.id)}/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ItemChatView({ item, onBack }) {
  const owner = item ? getItemOwner(item.id) : {name:'판매자',avatar:'판'};
  const [msgs, setMsgs] = useState([
    {id:1, from:'host', text:'안녕하세요! 물건 대여 문의 주셨군요. 무엇이 궁금하신가요?', time:'방금'}
  ]);
  const [input, setInput] = useState('');
  const addDevReply = () => {
    setMsgs(prev => [...prev, {id:Date.now(), from:'host', text:'네, 해당 날짜에 대여 가능합니다! 픽업 장소는 안서동입니다.', time:'방금'}]);
  };
  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMsgs(prev => [...prev, {id:Date.now(), from:'me', text:t, time:'방금'}]);
    setInput('');
  };
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">{owner.name} · 대여자</span>
        <button className="icon-btn dev-btn" onClick={addDevReply} title="DEV: 답장 시뮬레이션"><IconCode/></button>
      </div>
      <div className="chat-msgs">
        {msgs.map(m=>(
          <div key={m.id} className={`chat-row ${m.from==='me'?'mine':'theirs'}`}>
            {m.from==='host' && <div className="chat-avatar" style={{background:'var(--teal-lt)',color:'var(--teal)'}}>{owner.avatar}</div>}
            <div className="chat-bubble" style={m.from==='me'?{background:'var(--teal)'}:{}}>{m.text}</div>
            <span className="chat-time">{m.time}</span>
          </div>
        ))}
      </div>
      <div className="chat-input-row">
        <input
          className="chat-input"
          style={{borderColor:'var(--line)'}}
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{ if(e.key==='Enter') send(); }}
        />
        <button className="chat-send" style={{background:'var(--teal)'}} onClick={send} aria-label="전송">
          <ArrowR/>
        </button>
      </div>
    </>
  );
}

function ItemBookingView({ item, onBack, onNext }) {
  const owner = item ? getItemOwner(item.id) : getItemOwner('i1');
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selDay, setSelDay] = useState(null);
  const [selTime, setSelTime] = useState(null);
  const [selPeriod, setSelPeriod] = useState(null);
  const cells = buildCalendar(year, month);
  const prevMonth = () => { if(month===0){setYear(y=>y-1);setMonth(11);}else setMonth(m=>m-1); };
  const nextMonth = () => { if(month===11){setYear(y=>y+1);setMonth(0);}else setMonth(m=>m+1); };
  const canNext = selDay && selTime && selPeriod;
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">날짜 · 시간 선택</span>
      </div>
      <div className="book-scroll book-teal">
        <div className="book-month-nav">
          <button className="book-nav-btn" onClick={prevMonth}><ChevL/></button>
          <span className="book-month-label">{year}년 {MONTHS_KR[month]}</span>
          <button className="book-nav-btn" onClick={nextMonth}><ChevR/></button>
        </div>
        <div className="book-day-header">
          {DAY_LABELS.map(d=><div key={d} className="book-day-cell">{d}</div>)}
        </div>
        <div className="book-grid">
          {cells.map((c,i)=>
            c.empty ? <div key={i} className="book-cell empty"/> :
            <button
              key={i}
              className={`book-cell${selDay===c.day?' on':''}`}
              disabled={owner.unavail.has(c.day)}
              onClick={()=>setSelDay(c.day)}
            >{c.day}</button>
          )}
        </div>
        <div className="book-section-title">픽업 시간</div>
        <div className="book-time-grid">
          {owner.times.map(t=>(
            <button key={t} className={`book-time-chip${selTime===t?' on':''}`} onClick={()=>setSelTime(t)}>{t}</button>
          ))}
        </div>
        <div className="book-section-title">대여 기간</div>
        <div className="book-period-grid">
          {BOOKING_PERIODS_ITEM.map(p=>(
            <button key={p} className={`book-period-chip${selPeriod===p?' on':''}`} onClick={()=>setSelPeriod(p)}>{p}</button>
          ))}
        </div>
      </div>
      <div className="pay2-bottom" style={{borderTop:'1px solid var(--line)',background:'#fff'}}>
        <button
          className="pay2-cta"
          style={canNext?{background:'var(--teal)'}:{background:'#9CA3AF'}}
          disabled={!canNext}
          onClick={()=>onNext({day:selDay, time:selTime, period:selPeriod, month:MONTHS_KR[month], year})}
        >다음 단계</button>
      </div>
    </>
  );
}

function ItemPaymentView({ item, booking, onBack, onDone }) {
  const [ins, setIns] = useState('none');
  const [method, setMethod] = useState('카드');
  const [paid, setPaid] = useState(false);
  const insList = [
    {key:'none', label:'없음', desc:'보험 미적용', price:'무료'},
    {key:'basic', label:'기본 보험', desc:'파손/분실 최대 3만원 보장', price:'1,000원/일'},
    {key:'full', label:'풀커버', desc:'파손/분실 전액 보장', price:'2,000원/일'},
  ];
  const methods = ['카드','카카오페이','토스','계좌이체'];
  const basePrice = item ? parseInt((item.price||'0').replace(/,/g,'')) : 0;
  const deposit = 10000;
  const insPrice = ins==='basic' ? 1000 : ins==='full' ? 2000 : 0;
  const total = basePrice + deposit + insPrice;
  if (paid) return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onDone} aria-label="홈으로"><ChevL/></button>
        <span className="page-title">결제 완료</span>
      </div>
      <div className="pay2-success pay2-teal">
        <div className="pay2-success-icon" style={{background:'var(--teal-lt)',color:'var(--teal)'}}>✓</div>
        <div className="pay2-success-title">대여 신청 완료!</div>
        <div className="pay2-success-sub">
          {booking ? `${booking.year}년 ${booking.month} ${booking.day}일 ${booking.time} 픽업` : ''}<br/>
          에스크로로 안전하게 보호됩니다
        </div>
        <button className="pay2-cta" style={{background:'var(--teal)'}} onClick={onDone}>홈으로</button>
      </div>
    </>
  );
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">결제</span>
      </div>
      <div className="pay2-scroll pay2-teal">
        <div className="pay2-section">
          <div className="pay2-label">대여 정보</div>
          <div className="pay2-booking-card">
            {item && <div className="pay2-booking-row"><span className="pay2-booking-key">물건</span><span className="pay2-booking-val">{item.name}</span></div>}
            {booking && <>
              <div className="pay2-booking-row"><span className="pay2-booking-key">날짜</span><span className="pay2-booking-val">{booking.year}년 {booking.month} {booking.day}일</span></div>
              <div className="pay2-booking-row"><span className="pay2-booking-key">시간</span><span className="pay2-booking-val">{booking.time}</span></div>
              <div className="pay2-booking-row"><span className="pay2-booking-key">기간</span><span className="pay2-booking-val">{booking.period}</span></div>
            </>}
          </div>
        </div>
        <div style={{height:8,background:'#FAFAFA'}}/>
        <div className="pay2-section">
          <div className="pay2-label">보험 선택</div>
          <div className="pay2-ins-list">
            {insList.map(o=>(
              <button key={o.key} className={`pay2-ins${ins===o.key?' on':''}`} onClick={()=>setIns(o.key)}>
                <div className="pay2-ins-radio"/>
                <div className="pay2-ins-info">
                  <div className="pay2-ins-title">{o.label}</div>
                  <div className="pay2-ins-desc">{o.desc}</div>
                </div>
                <div className="pay2-ins-price">{o.price}</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{height:8,background:'#FAFAFA'}}/>
        <div className="pay2-section">
          <div className="pay2-label">결제 수단</div>
          <div className="pay2-method-grid">
            {methods.map(m=>(
              <button key={m} className={`pay2-method${method===m?' on':''}`} onClick={()=>setMethod(m)}>{m}</button>
            ))}
          </div>
        </div>
        <div style={{height:8,background:'#FAFAFA'}}/>
        <div className="pay2-section">
          <div className="pay2-label">결제 금액</div>
          <div className="pay2-row"><span>대여료</span><span>{basePrice.toLocaleString()}원</span></div>
          <div className="pay2-row"><span>보증금 (반납 시 환급)</span><span>{deposit.toLocaleString()}원</span></div>
          {insPrice>0 && <div className="pay2-row"><span>보험료</span><span>{insPrice.toLocaleString()}원</span></div>}
          <div className="pay2-row total"><span>합계</span><strong style={{color:'var(--teal)'}}>{total.toLocaleString()}원</strong></div>
        </div>
      </div>
      <div className="pay2-bottom">
        <button className="pay2-cta" style={{background:'var(--teal)'}} onClick={()=>setPaid(true)}>{total.toLocaleString()}원 결제하기</button>
      </div>
    </>
  );
}

function ItemRegisterView({ onBack, onDone }) {
  const [done, setDone] = useState(false);
  const [cat, setCat] = useState('');
  const [name, setName] = useState('');
  const [cond, setCond] = useState('');
  const [price, setPrice] = useState(5000);
  const [desc, setDesc] = useState('');
  const PMIN=1000, PMAX=50000, PSTEP=1000;
  const pct = ((price-PMIN)/(PMAX-PMIN))*100;
  if (done) return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onDone} aria-label="홈으로"><ChevL/></button>
        <span className="page-title">등록 완료</span>
      </div>
      <div className="pay2-success pay2-teal">
        <div className="pay2-success-icon" style={{background:'var(--teal-lt)',color:'var(--teal)'}}>✓</div>
        <div className="pay2-success-title">물건 등록이 완료됐어요!</div>
        <div className="pay2-success-sub">관리자 검수 후 24시간 이내 게시됩니다.<br/>이웃들이 곧 내 물건을 만날 거예요.</div>
        <button className="pay2-cta" style={{background:'var(--teal)'}} onClick={onDone}>홈으로</button>
      </div>
    </>
  );
  return (
    <>
      <div className="back-bar sr">
        <button className="back-btn" onClick={onBack} aria-label="뒤로"><ChevL/></button>
        <span className="page-title">물건 등록</span>
      </div>
      <div className="ireg-scroll">
        <h2 className="ireg-heading">어떤 물건을<br/><span>등록하시나요?</span></h2>
        <div className="ireg-section">
          <label className="ireg-label">카테고리</label>
          <div className="ireg-cat-grid">
            {ITEM_REG_CATS.map(c=>(
              <button key={c.key} className={`ireg-cat${cat===c.key?' on':''}`} onClick={()=>setCat(c.key)}>
                <span className="ireg-cat-ic">{c.icon}</span>
                <span className="ireg-cat-label">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="ireg-section">
          <label className="ireg-label">물건 이름</label>
          <input className="ireg-input" placeholder="예) 4인용 캠핑 텐트" value={name} onChange={e=>setName(e.target.value)}/>
        </div>
        <div className="ireg-section">
          <label className="ireg-label">상태</label>
          <div className="ireg-cond-row">
            {ITEM_CONDITIONS.map(c=>(
              <button key={c.key} className={`ireg-cond${cond===c.key?' on':''}`} onClick={()=>setCond(c.key)}>
                <span className="ireg-cond-title">{c.label}</span>
                <span className="ireg-cond-sub">{c.sub}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="ireg-section">
          <label className="ireg-label">일일 대여료</label>
          <div className="ireg-price-disp">{price.toLocaleString()}<span style={{fontSize:16,fontWeight:500,color:'var(--ink3)',marginLeft:4}}>원/일</span></div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <button className="price-btn" style={{borderColor:'var(--line)'}} onClick={()=>setPrice(p=>Math.max(PMIN,p-PSTEP))} disabled={price<=PMIN}><IconMinus/></button>
            <div style={{flex:1}}>
              <div className="ireg-price-track">
                <div className="ireg-price-fill" style={{width:`${pct}%`}}/>
                <div className="ireg-price-thumb" style={{left:`${pct}%`}}/>
              </div>
              <div className="ireg-price-ticks"><span>1천</span><span>2.5만</span><span>5만</span></div>
            </div>
            <button className="price-btn" style={{borderColor:'var(--line)'}} onClick={()=>setPrice(p=>Math.min(PMAX,p+PSTEP))} disabled={price>=PMAX}><IconPlus/></button>
          </div>
        </div>
        <div className="ireg-section">
          <label className="ireg-label">사진</label>
          <div className="ireg-photo-grid">
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} className="ireg-photo-slot">+</div>
            ))}
          </div>
        </div>
        <div className="ireg-section">
          <label className="ireg-label">설명</label>
          <textarea className="ireg-textarea" rows={4} placeholder="물건에 대해 자세히 설명해주세요..." value={desc} onChange={e=>setDesc(e.target.value)}/>
        </div>
        <div className="notice-box">
          <span className="notice-icon"><IconShield/></span>
          <span className="notice-txt">등록 후 관리자 검수를 거쳐 24시간 이내 게시됩니다.</span>
        </div>
      </div>
      <div className="pay2-bottom" style={{borderTop:'1px solid var(--line)',background:'#fff'}}>
        <button className="ireg-cta" onClick={()=>setDone(true)}>물건 등록하기</button>
      </div>
    </>
  );
}

const ROOT_TABS = new Set(['home','favorites','map','community','mypage']);

export default function App() {
  const [history, setHistory] = useState(['home']);
  const view = history[history.length - 1];
  const [favorites, setFavorites] = useState(()=>new Set());
  const [neighborhoodVerified, setNeighborhoodVerified] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [itemBookingInfo, setItemBookingInfo] = useState(null);
  const navigate = (next) => setHistory(prev => {
    if (prev[prev.length - 1] === next) return prev;
    if (ROOT_TABS.has(next)) return [next];
    return [...prev, next];
  });
  const openItem = (item) => { setSelectedItem(item); navigate('item-detail'); };
  const openSpace = (space) => { setSelectedSpace(space); navigate('space-detail'); };
  const toggleFav = (id) => setFavorites(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const goBack = () => setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  return (
    <div className="app-bg">
      <style>{STYLE}</style>
      <div className="app-shell">
        {view==='home' && <HomeView onNavigate={navigate} onOpenItem={openItem} onOpenSpace={openSpace}/>}
        {view==='item-detail' && <ItemDetailView item={selectedItem} onBack={goBack} isFav={selectedItem ? favorites.has(selectedItem.id) : false} onToggleFav={toggleFav} onNavigate={navigate}/>}
        {view==='space-detail' && <SpaceDetailView space={selectedSpace} onBack={goBack} isFav={selectedSpace ? favorites.has(selectedSpace.id) : false} onToggleFav={toggleFav} onNavigate={navigate}/>}
        {view==='form' && <FormView onBack={goBack} onNext={()=>navigate('list')}/>}
        {view==='list' && <ListView onBack={goBack} favorites={favorites} onToggleFav={toggleFav} onOpenSpace={openSpace} onNavigate={navigate}/>}
        {view==='favorites' && <FavoritesView onNavigate={navigate} favorites={favorites} onToggleFav={toggleFav} onOpenSpace={openSpace}/>}
        {view==='history' && <HistoryView onNavigate={navigate} onBack={goBack}/>}
        {view==='mypage' && <MyPageView onNavigate={navigate} favorites={favorites}/>}
        {view==='search' && <SearchView onBack={goBack} favorites={favorites} onToggleFav={toggleFav} onOpenSpace={openSpace}/>}
        {view==='map' && <MapView onNavigate={navigate}/>}
        {view==='community' && <CommunityView onNavigate={navigate} verified={neighborhoodVerified} onVerify={()=>setNeighborhoodVerified(true)}/>}
        {view==='register' && <RegisterView onBack={goBack}/>}
        {view==='register-space' && <HostRegisterView onBack={goBack} onDone={()=>navigate('home')}/>}
        {view==='register-item' && <RegisterView onBack={goBack} initialType="item"/>}
        {view==='store-choice' && <StoreChoiceView onBack={goBack} onNavigate={navigate}/>}
        {view==='share-choice' && <ShareChoiceView onBack={goBack} onNavigate={navigate}/>}
        {view==='store-chat' && <StoreChatView space={selectedSpace} onBack={goBack}/>}
        {view==='store-booking' && <StoreBookingView space={selectedSpace} onBack={goBack} onNext={info=>{setBookingInfo(info);navigate('store-payment');}}/>}
        {view==='store-payment' && <StorePaymentView space={selectedSpace} booking={bookingInfo} onBack={goBack} onDone={()=>navigate('home')}/>}
        {view==='share-list' && <ItemListView onBack={goBack} onOpenItem={openItem} favorites={favorites} onToggleFav={toggleFav}/>}
        {view==='item-chat' && <ItemChatView item={selectedItem} onBack={goBack}/>}
        {view==='item-booking' && <ItemBookingView item={selectedItem} onBack={goBack} onNext={info=>{setItemBookingInfo(info);navigate('item-payment');}}/>}
        {view==='item-payment' && <ItemPaymentView item={selectedItem} booking={itemBookingInfo} onBack={goBack} onDone={()=>navigate('home')}/>}
        {view==='item-register' && <ItemRegisterView onBack={goBack} onDone={()=>navigate('home')}/>}
      </div>
    </div>
  );
}
