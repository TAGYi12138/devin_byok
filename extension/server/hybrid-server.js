var bc = Object.create;
var Xr = Object.defineProperty;
var Rc = Object.getOwnPropertyDescriptor;
var Nc = Object.getOwnPropertyNames;
var wc = Object.getPrototypeOf;
var $c = Object.prototype.hasOwnProperty;
var qr = (_0x40966c, _0x592fc4) => () => {
  if (!_0x592fc4) {
    _0x40966c((_0x592fc4 = {
      exports: {}
    }).exports, _0x592fc4);
  }
  return _0x592fc4.exports;
};
var vc = (_0x3d360e, _0x33163e, _0x4d2774, _0x5d6ed4) => {
  if (_0x33163e && typeof _0x33163e == "object" || typeof _0x33163e == "function") {
    for (let _0x1a1449 of Nc(_0x33163e)) {
      if (!$c.call(_0x3d360e, _0x1a1449) && _0x1a1449 !== _0x4d2774) {
        Xr(_0x3d360e, _0x1a1449, {
          get: () => _0x33163e[_0x1a1449],
          enumerable: !(_0x5d6ed4 = Rc(_0x33163e, _0x1a1449)) || _0x5d6ed4.enumerable
        });
      }
    }
  }
  return _0x3d360e;
};
var Pc = (_0x2c385d, _0x52c0fa, _0x596cea) => {
  _0x596cea = _0x2c385d != null ? bc(wc(_0x2c385d)) : {};
  return vc(_0x52c0fa || !_0x2c385d || !_0x2c385d.__esModule ? Xr(_0x596cea, "default", {
    value: _0x2c385d,
    enumerable: true
  }) : _0x596cea, _0x2c385d);
};
var Gi = qr((_0x4a33df, _0x38e80f) => {
  'use strict';

  var _0x59651d = new Set(["low", "medium", "high", "xhigh", "max", "minimal", "none", "fast", "priority", "lightning", "slow", "thinking", "1m"]);
  var _0x944b82 = /\s+(?:No\s+Thinking|Thinking|Medium|Low|High|XHigh|Max|Minimal|Fast|Priority|Lightning|Slow|1M(?:\s+Context)?)$/i;
  function _0x32772b(_0x24e7f6) {
    let _0x1364ed = String(_0x24e7f6 || "").trim().toLowerCase();
    if (!_0x1364ed) {
      return "";
    }
    _0x1364ed = _0x1364ed.replace(/_/g, "-").replace(/^model-/, "");
    let _0x13b344 = _0x1364ed.split("-").filter(Boolean);
    while (_0x13b344.length > 1 && _0x59651d.has(_0x13b344[_0x13b344.length - 1])) {
      _0x13b344.pop();
    }
    if (_0x13b344.length === 3 && _0x13b344[0] === "claude" && /^\d+$/.test(_0x13b344[1]) && /^(opus|sonnet|haiku|fable)$/.test(_0x13b344[2])) {
      let _0x2e7c51 = _0x13b344[1];
      _0x13b344.splice(1, 1);
      _0x13b344.push(_0x2e7c51);
    }
    // Fable 5 is a distinct Devin family; never alias it to Opus.
    return _0x13b344.join("-") || _0x1364ed;
  }
  function _0x2eee28(_0x3d53c9) {
    let _0x9c1ec9 = String(_0x3d53c9 || "").trim();
    if (!_0x9c1ec9) {
      return false;
    }
    let _0x275bdc = _0x32772b(_0x9c1ec9);
    if (_0x275bdc === "adaptive" || _0x275bdc === "adaptivevvv") {
      return true;
    }
    let _0xd661e9 = _0x9c1ec9.toLowerCase().replace(/_/g, "-").replace(/\s+/g, "");
    return _0xd661e9 === "adaptive" || _0xd661e9 === "adaptivevvv";
  }
  function _0x316eda(_0x1782c6, _0x533454) {
    let _0x41bba1 = String(_0x1782c6 || "").trim();
    _0x41bba1 ||= String(_0x533454 || "").trim();
    if (!_0x41bba1) {
      return "";
    }
    let _0x21d9a3;
    do {
      _0x21d9a3 = _0x41bba1;
      _0x41bba1 = _0x41bba1.replace(_0x944b82, "").trim();
    } while (_0x41bba1 !== _0x21d9a3 && _0x41bba1);
    return _0x41bba1 || String(_0x1782c6 || _0x533454 || "").trim();
  }
  function _0x4da5b9(_0x532d36) {
    return (Array.isArray(_0x532d36) ? _0x532d36 : []).map(_0x543933 => {
      if (!_0x543933 || typeof _0x543933 != "object") {
        return _0x543933;
      }
      let _0x5d6bb8 = String(_0x543933.uid || "").trim();
      let _0xdd7ecb = String(_0x543933.label || _0x5d6bb8);
      let _0x4e7b79 = _0x32772b(_0x5d6bb8);
      let _0x353817 = _0x316eda(_0xdd7ecb, _0x5d6bb8);
      return {
        ..._0x543933,
        uid: _0x5d6bb8,
        label: _0xdd7ecb,
        familyKey: _0x4e7b79,
        familyLabel: _0x353817
      };
    });
  }
  function _0x370667(_0x1ff81d) {
    let _0x1fd022 = (Array.isArray(_0x1ff81d) ? _0x1ff81d : []).map(_0xa540b5 => String(_0xa540b5 || "").trim()).filter(Boolean);
    if (!_0x1fd022.length) {
      return "";
    }
    let _0x2ff142 = _0x10fd57 => {
      let _0x223a28 = _0x10fd57.toLowerCase();
      let _0x3a3c2c = 10;
      if (/(?:^|-)medium$/.test(_0x223a28) || /(?:^|-)medium-/.test(_0x223a28)) {
        _0x3a3c2c = 100;
      } else if (/(?:^|-)medium-fast$/.test(_0x223a28)) {
        _0x3a3c2c = 90;
      } else if (/(?:^|-)high$/.test(_0x223a28)) {
        _0x3a3c2c = 50;
      } else if (/(?:^|-)low$/.test(_0x223a28)) {
        _0x3a3c2c = 40;
      }
      if (/thinking/i.test(_0x10fd57)) {
        _0x3a3c2c -= 20;
      }
      return _0x3a3c2c;
    };
    return _0x1fd022.slice().sort((_0x355281, _0x3a9927) => {
      let _0x1a8cd2 = _0x2ff142(_0x3a9927) - _0x2ff142(_0x355281);
      return _0x1a8cd2 || _0x355281.localeCompare(_0x3a9927);
    })[0];
  }
  function _0x45ec3c(_0x302bb3) {
    let _0x2ffb61 = new Map();
    for (let _0x33fb97 of _0x4da5b9(_0x302bb3)) {
      if (!_0x33fb97 || !_0x33fb97.uid) {
        continue;
      }
      let _0x5ec703 = _0x33fb97.familyKey || _0x32772b(_0x33fb97.uid);
      if (!_0x5ec703) {
        continue;
      }
      let _0x57625d = _0x2ffb61.get(_0x5ec703);
      if (!_0x57625d) {
        _0x57625d = {
          familyKey: _0x5ec703,
          label: _0x33fb97.familyLabel || _0x33fb97.label || _0x5ec703,
          uids: []
        };
        _0x2ffb61.set(_0x5ec703, _0x57625d);
      }
      if (!_0x57625d.uids.includes(_0x33fb97.uid)) {
        _0x57625d.uids.push(_0x33fb97.uid);
      }
      if (_0x33fb97.familyLabel && (!_0x57625d.label || _0x57625d.label === _0x5ec703)) {
        _0x57625d.label = _0x33fb97.familyLabel;
      }
    }
    let _0x2b08e5 = [];
    for (let _0x4983c6 of _0x2ffb61.values()) {
      _0x4983c6.uids.sort();
      _0x4983c6.representativeUid = _0x370667(_0x4983c6.uids);
      _0x2b08e5.push(_0x4983c6);
    }
    _0x2b08e5.sort((_0x19ca43, _0x214728) => String(_0x19ca43.label).localeCompare(String(_0x214728.label)));
    return _0x2b08e5;
  }
  function _0x26e4c1(_0x199ffb, _0x14a03b) {
    let _0xc826e2 = String(_0x199ffb || "").trim();
    if (!_0xc826e2) {
      return [];
    }
    let _0xa606cf = _0x32772b(_0xc826e2) || _0xc826e2.toLowerCase();
    let _0x39df46 = [];
    for (let _0x25ebcd of _0x4da5b9(_0x14a03b || [])) {
      if (!!_0x25ebcd && !!_0x25ebcd.uid) {
        if ((_0x25ebcd.familyKey || _0x32772b(_0x25ebcd.uid)) === _0xa606cf) {
          _0x39df46.push(_0x25ebcd.uid);
        }
      }
    }
    if (_0x39df46.length) {
      let _0x5f238d = Array.from(new Set(_0x39df46));
      if (!_0x5f238d.includes(_0xc826e2) && _0x32772b(_0xc826e2) === _0xa606cf) {
        _0x5f238d.push(_0xc826e2);
      }
      return _0x5f238d.sort();
    }
    return [_0xc826e2];
  }
  _0x38e80f.exports = {
    VARIANT_TOKENS: _0x59651d,
    familyKeyFromUid: _0x32772b,
    familyLabelFromLabel: _0x316eda,
    attachFamilyMeta: _0x4da5b9,
    aggregateFamilies: _0x45ec3c,
    siblingUidsFor: _0x26e4c1,
    preferRepresentativeUid: _0x370667,
    isBlockedLocalBindEntry: _0x2eee28
  };
});
var Wi = qr((_0x35587f, _0x569e60) => {
  'use strict';

  var {
    familyKeyFromUid: _0x2ec09d
  } = Gi();
  var _0x5b6c26 = {
    MODEL_CLAUDE_4_OPUS_BYOK: "MODEL_CLAUDE_4_OPUS",
    MODEL_CLAUDE_4_OPUS_THINKING_BYOK: "MODEL_CLAUDE_4_OPUS_THINKING",
    MODEL_CLAUDE_4_SONNET_BYOK: "MODEL_CLAUDE_4_SONNET",
    MODEL_CLAUDE_4_SONNET_THINKING_BYOK: "MODEL_CLAUDE_4_SONNET_THINKING",
    CLAUDE_4_OPUS_BYOK: "MODEL_CLAUDE_4_OPUS",
    CLAUDE_4_OPUS_THINKING_BYOK: "MODEL_CLAUDE_4_OPUS_THINKING",
    CLAUDE_4_SONNET_BYOK: "MODEL_CLAUDE_4_SONNET",
    CLAUDE_4_SONNET_THINKING_BYOK: "MODEL_CLAUDE_4_SONNET_THINKING"
  };
  function _0x271ac4(_0x55b768) {
    let _0x34495f = String(_0x55b768 || "").trim();
    if (!_0x34495f) {
      return "";
    }
    if (_0x5b6c26[_0x34495f]) {
      return _0x5b6c26[_0x34495f];
    }
    if (/_BYOK$/i.test(_0x34495f)) {
      let _0x214d80 = _0x34495f.replace(/_BYOK$/i, "");
      if (_0x214d80) {
        if (/^MODEL_/i.test(_0x214d80)) {
          return _0x214d80;
        } else {
          return "MODEL_" + _0x214d80;
        }
      } else {
        return "";
      }
    }
    return "";
  }
  function _0x1e3d90(_0x302704) {
    let _0xb55939 = String(_0x302704 || "").trim();
    let _0xcd58d = _0xb55939.toLowerCase().replace(/_/g, "-");
    let _0xb3bcd3 = /(?:^|-)thinking(?:-|$)/i.test(_0xcd58d) || /thinking/i.test(_0xb55939);
    let _0x4b752b = /(?:^|-)1m(?:-|$)/i.test(_0xcd58d);
    let _0x30da1b = _0xcd58d.split("-").filter(Boolean);
    let _0x2bfc17 = "";
    for (let _0x22e7a2 = _0x30da1b.length - 1; _0x22e7a2 >= 0; _0x22e7a2--) {
      if (["low", "medium", "high", "xhigh", "max"].includes(_0x30da1b[_0x22e7a2])) {
        _0x2bfc17 = _0x30da1b[_0x22e7a2];
        break;
      }
    }
    if (!_0x2bfc17 && _0xb3bcd3) {
      _0x2bfc17 = "max";
    }
    return {
      thinking: !!_0xb3bcd3,
      thinkingBudget: 0,
      effort: _0x2bfc17 || "",
      context1m: !!_0x4b752b
    };
  }
  _0x569e60.exports = {
    LEGACY_BYOK_TO_OFFICIAL: _0x5b6c26,
    officialUidFromLegacyByok: _0x271ac4,
    deriveVariantOptsFromUid: _0x1e3d90,
    familyKeyFromUid: _0x2ec09d
  };
});
import _0x2e06de from "node:http";
import _0x163c7a from "node:https";
import _0x262233 from "node:net";
import _0x57ad80 from "node:tls";
import _0x366fdf from "node:fs";
import _0x18e153 from "node:https";
import _0x309087 from "node:http";
import _0x3664ef from "node:crypto";
import { StringDecoder as _0x58f914 } from "node:string_decoder";
import _0x293eab from "node:fs";
import _0x7c21e2 from "node:path";
function Oo(_0x5c8545) {
  let _0x11a5f7 = [];
  let _0x544962 = typeof _0x5c8545 == "bigint" ? _0x5c8545 : BigInt(_0x5c8545);
  if (_0x544962 < 0x0n) {
    _0x544962 = _0x544962 + (0x1n << 0x40n);
  }
  do {
    let _0x3d5acc = Number(_0x544962 & 0x7fn);
    _0x544962 >>= 0x7n;
    if (_0x544962 > 0x0n) {
      _0x3d5acc |= 128;
    }
    _0x11a5f7.push(_0x3d5acc);
  } while (_0x544962 > 0x0n);
  return Buffer.from(_0x11a5f7);
}
function Eo(_0x20408d, _0x50004a) {
  let _0x739fa5 = 0x0n;
  let _0xd43c05 = 0x0n;
  let _0x2724a9 = _0x50004a;
  while (_0x2724a9 < _0x20408d.length) {
    let _0x13a2a4 = _0x20408d[_0x2724a9++];
    _0x739fa5 |= BigInt(_0x13a2a4 & 127) << _0xd43c05;
    if ((_0x13a2a4 & 128) === 0) {
      break;
    }
    _0xd43c05 += 0x7n;
  }
  return {
    value: _0x739fa5,
    bytesRead: _0x2724a9 - _0x50004a
  };
}
function $n(_0x455b6c, _0x461162) {
  return Oo(_0x455b6c << 3 | _0x461162);
}
function me(_0x522588, _0x5578ef) {
  return Buffer.concat([$n(_0x522588, 0), Oo(_0x5578ef)]);
}
function Oe(_0x1da204, _0x289608) {
  let _0x526d81 = Buffer.isBuffer(_0x289608) ? _0x289608 : Buffer.from(_0x289608);
  return Buffer.concat([$n(_0x1da204, 2), Oo(_0x526d81.length), _0x526d81]);
}
function te(_0x2712dd, _0xc1dad6) {
  return Oe(_0x2712dd, Buffer.from(_0xc1dad6, "utf8"));
}
function Ie(_0x383df6, _0x1b7ae4) {
  return Oe(_0x383df6, _0x1b7ae4);
}
function rn(_0x198d86, _0x4b157e) {
  return Buffer.concat([$n(_0x198d86, 1), _0x4b157e]);
}
function sn(_0xd0e99b, _0x4ba53c) {
  return Buffer.concat([$n(_0xd0e99b, 5), _0x4ba53c]);
}
function V(_0x193916) {
  let _0x290971 = [];
  let _0x299dfd = 0;
  while (_0x299dfd < _0x193916.length) {
    let _0x42892d = Eo(_0x193916, _0x299dfd);
    _0x299dfd += _0x42892d.bytesRead;
    let _0x5ad5b7 = _0x42892d.value;
    let _0x29e9bb = Number(_0x5ad5b7 >> 0x3n);
    let _0x3cbe58 = Number(_0x5ad5b7 & 0x7n);
    if (_0x29e9bb === 0) {
      break;
    }
    switch (_0x3cbe58) {
      case 0:
        {
          let _0x529fd4 = Eo(_0x193916, _0x299dfd);
          _0x299dfd += _0x529fd4.bytesRead;
          _0x290971.push({
            field: _0x29e9bb,
            wireType: 0,
            value: Number(_0x529fd4.value)
          });
          break;
        }
      case 1:
        {
          _0x290971.push({
            field: _0x29e9bb,
            wireType: 1,
            value: _0x193916.slice(_0x299dfd, _0x299dfd + 8)
          });
          _0x299dfd += 8;
          break;
        }
      case 2:
        {
          let _0x4c38e6 = Eo(_0x193916, _0x299dfd);
          _0x299dfd += _0x4c38e6.bytesRead;
          let _0x5af106 = Number(_0x4c38e6.value);
          _0x290971.push({
            field: _0x29e9bb,
            wireType: 2,
            value: _0x193916.slice(_0x299dfd, _0x299dfd + _0x5af106)
          });
          _0x299dfd += _0x5af106;
          break;
        }
      case 5:
        {
          _0x290971.push({
            field: _0x29e9bb,
            wireType: 5,
            value: _0x193916.slice(_0x299dfd, _0x299dfd + 4)
          });
          _0x299dfd += 4;
          break;
        }
      default:
        console.warn("[proto] Unknown wire type " + _0x3cbe58 + " at field " + _0x29e9bb + ", offset " + _0x299dfd + " — skipping remaining bytes");
        return _0x290971;
    }
  }
  return _0x290971;
}
function $e(_0x50cbee) {
  if (_0x50cbee.wireType === 0) {
    return me(_0x50cbee.field, _0x50cbee.value);
  } else if (_0x50cbee.wireType === 2) {
    return Oe(_0x50cbee.field, _0x50cbee.value);
  } else if (_0x50cbee.wireType === 1) {
    return rn(_0x50cbee.field, _0x50cbee.value);
  } else if (_0x50cbee.wireType === 5) {
    return sn(_0x50cbee.field, _0x50cbee.value);
  } else {
    return null;
  }
}
function j(_0x1c6c66, _0x5ac0cb, _0x2b3419) {
  return _0x1c6c66.find(_0x11c98a => _0x11c98a.field === _0x5ac0cb && (_0x2b3419 === undefined || _0x11c98a.wireType === _0x2b3419));
}
function ut(_0x231b73, _0x567df8) {
  return _0x231b73.filter(_0x4990cf => _0x4990cf.field === _0x567df8);
}
import _0x426237 from "node:zlib";
function $t(_0x4108d3) {
  return _0x426237.gzipSync(_0x4108d3);
}
function We(_0x149f75) {
  try {
    return _0x426237.gunzipSync(_0x149f75);
  } catch {
    return null;
  }
}
function ge(_0x3efc75, _0x6c0b22 = true) {
  if (_0x6c0b22) {
    let _0x14a69c = $t(_0x3efc75);
    let _0x5e021f = Buffer.alloc(5);
    _0x5e021f[0] = 1;
    _0x5e021f.writeUInt32BE(_0x14a69c.length, 1);
    return Buffer.concat([_0x5e021f, _0x14a69c]);
  }
  let _0x27273d = Buffer.alloc(5);
  _0x27273d[0] = 0;
  _0x27273d.writeUInt32BE(_0x3efc75.length, 1);
  return Buffer.concat([_0x27273d, _0x3efc75]);
}
function et() {
  let _0x119f12 = $t(Buffer.from("{}"));
  let _0x3ba5ad = Buffer.alloc(5);
  _0x3ba5ad[0] = 3;
  _0x3ba5ad.writeUInt32BE(_0x119f12.length, 1);
  return Buffer.concat([_0x3ba5ad, _0x119f12]);
}
function ve(_0x126ab3, _0x890cb2) {
  let _0x4a39fc = (_0x890cb2["connect-content-encoding"] || _0x890cb2["content-encoding"] || "").includes("gzip");
  let _0x58b733 = _0x126ab3;
  if (_0x4a39fc) {
    let _0x1ea330 = We(_0x58b733);
    if (_0x1ea330) {
      _0x58b733 = _0x1ea330;
    }
  }
  if (_0x58b733.length > 5) {
    let _0x1dc81f = _0x58b733[0];
    if (_0x58b733.readUInt32BE(1) === _0x58b733.length - 5 && _0x1dc81f <= 1) {
      let _0x27f332 = _0x58b733.slice(5);
      if (_0x1dc81f === 1) {
        let _0x5f5643 = We(_0x27f332);
        if (_0x5f5643) {
          _0x27f332 = _0x5f5643;
        }
      }
      return _0x27f332;
    }
  }
  return _0x58b733;
}
function vt(_0x2cab94) {
  return $t(_0x2cab94);
}
function Pt() {
  return {
    "content-type": "application/proto",
    "content-encoding": "gzip"
  };
}
function dt() {
  return {
    "content-type": "application/connect+proto",
    "connect-content-encoding": "gzip",
    "transfer-encoding": "chunked"
  };
}
var Zr = new Set(["read_file", "edit", "multi_edit", "write_to_file", "run_command", "grep_search", "find_by_name", "list_dir", "code_search", "command_status", "browser_preview", "todo_list", "ask_user_question", "deploy_web_app", "read_deployment_config", "check_deploy_status", "create_memory", "search_web", "read_url_content", "view_content_chunk", "skill", "edit_notebook", "read_notebook", "trajectory_search", "read_resource", "list_resources", "read_terminal"]);
function xo(_0x1ea551) {
  return typeof _0x1ea551 == "string" && /^mcp\d+_/i.test(_0x1ea551);
}
function He(_0x2c4b90, _0x4fbfad) {
  if (xo(_0x2c4b90)) {
    return {
      toolName: _0x2c4b90,
      params: Ae(_0x4fbfad)
    };
  }
  let _0x543148 = _0x2c4b90;
  let _0x28f9eb = Ae(_0x4fbfad);
  _0x543148 = {
    view_file: "read_file",
    open_file: "read_file",
    readFile: "read_file",
    read: "read_file",
    cat_file: "read_file",
    ls: "list_dir",
    dir: "list_dir",
    list_directory: "list_dir",
    list_files: "list_dir",
    search_code: "code_search",
    search_repo: "code_search",
    search_in_codebase: "code_search",
    grep: "grep_search",
    rg: "grep_search",
    search_text: "grep_search",
    run_terminal_command: "run_command",
    execute_command: "run_command",
    run_command_line: "run_command",
    shell_command: "run_command",
    askUserQuestion: "ask_user_question",
    ask_user: "ask_user_question",
    ask_human: "ask_user_question",
    ask_followup_question: "ask_user_question",
    update_todo_list: "todo_list",
    todo_list_create: "todo_list",
    create_todo_list: "todo_list",
    update_todos: "todo_list",
    manage_todos: "todo_list",
    write_file: "write_to_file",
    create_file: "write_to_file",
    save_file: "write_to_file",
    writeFile: "write_to_file",
    find_file: "find_by_name",
    find_files: "find_by_name",
    search_files: "find_by_name",
    edit_file: "edit",
    replace_in_file: "edit",
    web_search: "search_web",
    browser: "browser_preview"
  }[_0x543148] || _0x543148;
  if (_0x543148 === "read_file") {
    N(_0x28f9eb, "target_file", "file_path");
    N(_0x28f9eb, "path", "file_path");
    N(_0x28f9eb, "TargetFile", "file_path");
  }
  if (_0x543148 === "list_dir") {
    N(_0x28f9eb, "directory", "DirectoryPath");
    N(_0x28f9eb, "path", "DirectoryPath");
  }
  if (_0x543148 === "code_search") {
    N(_0x28f9eb, "query", "search_term");
    N(_0x28f9eb, "prompt", "search_term");
    N(_0x28f9eb, "path", "search_folder_absolute_uri");
    N(_0x28f9eb, "directory", "search_folder_absolute_uri");
    N(_0x28f9eb, "SearchPath", "search_folder_absolute_uri");
  }
  if (_0x543148 === "grep_search") {
    N(_0x28f9eb, "path", "SearchPath");
    N(_0x28f9eb, "directory", "SearchPath");
    N(_0x28f9eb, "query", "Query");
    N(_0x28f9eb, "pattern", "Query");
    Qr(_0x28f9eb, "include", "Includes");
    Qr(_0x28f9eb, "includes", "Includes");
  }
  if (_0x543148 === "run_command") {
    N(_0x28f9eb, "command", "CommandLine");
    N(_0x28f9eb, "cmd", "CommandLine");
    N(_0x28f9eb, "cwd", "Cwd");
    N(_0x28f9eb, "working_directory", "Cwd");
    N(_0x28f9eb, "blocking", "Blocking");
    N(_0x28f9eb, "safe", "SafeToAutoRun");
  }
  if (_0x543148 === "todo_list") {
    if (_0x28f9eb.items !== undefined && _0x28f9eb.todos === undefined) {
      let _0x313c9f = Array.isArray(_0x28f9eb.items) ? _0x28f9eb.items : String(_0x28f9eb.items).split(/[,，]/).map(_0x3c96c8 => _0x3c96c8.trim()).filter(Boolean);
      _0x28f9eb.todos = _0x313c9f.map((_0x2f859a, _0x29bc42) => ({
        id: String(_0x29bc42 + 1),
        content: typeof _0x2f859a == "string" ? _0x2f859a : _0x2f859a.content || _0x2f859a.text || String(_0x2f859a),
        priority: "medium",
        status: "pending"
      }));
      delete _0x28f9eb.items;
    }
    if (_0x28f9eb.tasks !== undefined && _0x28f9eb.todos === undefined) {
      _0x28f9eb.todos = Array.isArray(_0x28f9eb.tasks) ? _0x28f9eb.tasks : [];
      delete _0x28f9eb.tasks;
    }
    if (Array.isArray(_0x28f9eb.todos)) {
      _0x28f9eb.todos = _0x28f9eb.todos.map((_0x4ce3b7, _0x53d2d3) => typeof _0x4ce3b7 == "string" ? {
        id: String(_0x53d2d3 + 1),
        content: _0x4ce3b7,
        priority: "medium",
        status: "pending"
      } : typeof _0x4ce3b7 == "object" && _0x4ce3b7 !== null ? {
        id: _0x4ce3b7.id || String(_0x53d2d3 + 1),
        content: _0x4ce3b7.content || _0x4ce3b7.text || _0x4ce3b7.title || String(_0x4ce3b7),
        priority: _0x4ce3b7.priority || "medium",
        status: _0x4ce3b7.status || "pending"
      } : {
        id: String(_0x53d2d3 + 1),
        content: String(_0x4ce3b7),
        priority: "medium",
        status: "pending"
      });
    }
    delete _0x28f9eb.operation;
  }
  if (_0x543148 === "write_to_file") {
    N(_0x28f9eb, "file_path", "TargetFile");
    N(_0x28f9eb, "path", "TargetFile");
    N(_0x28f9eb, "target_file", "TargetFile");
    N(_0x28f9eb, "content", "CodeContent");
    N(_0x28f9eb, "code", "CodeContent");
    N(_0x28f9eb, "text", "CodeContent");
    if (_0x28f9eb.EmptyFile === undefined) {
      _0x28f9eb.EmptyFile = false;
    }
  }
  if (_0x543148 === "ask_user_question") {
    N(_0x28f9eb, "question_text", "question");
    N(_0x28f9eb, "prompt", "question");
    N(_0x28f9eb, "message", "question");
    N(_0x28f9eb, "choices", "options");
    N(_0x28f9eb, "allow_multiple", "allowMultiple");
    N(_0x28f9eb, "multi", "allowMultiple");
    N(_0x28f9eb, "multiple", "allowMultiple");
  }
  if (_0x543148 === "edit") {
    N(_0x28f9eb, "path", "file_path");
    N(_0x28f9eb, "target_file", "file_path");
    N(_0x28f9eb, "search", "old_string");
    N(_0x28f9eb, "replace", "new_string");
    N(_0x28f9eb, "description", "explanation");
  }
  if (_0x543148 === "multi_edit") {
    N(_0x28f9eb, "path", "file_path");
    N(_0x28f9eb, "target_file", "file_path");
    N(_0x28f9eb, "description", "explanation");
  }
  if (_0x543148 === "find_by_name") {
    N(_0x28f9eb, "path", "SearchDirectory");
    N(_0x28f9eb, "directory", "SearchDirectory");
    N(_0x28f9eb, "pattern", "Pattern");
    N(_0x28f9eb, "type", "Type");
  }
  if (_0x543148 === "browser_preview") {
    N(_0x28f9eb, "title", "Name");
    N(_0x28f9eb, "name", "Name");
    N(_0x28f9eb, "url", "Url");
  }
  if (_0x543148 === "search_web") {
    N(_0x28f9eb, "q", "query");
    N(_0x28f9eb, "term", "query");
    N(_0x28f9eb, "site", "domain");
  }
  let _0x335895 = Lc(_0x543148, _0x28f9eb);
  return {
    toolName: _0x543148,
    params: _0x335895
  };
}
function Ae(_0x3f7e51) {
  if (_0x3f7e51 == null) {
    return {};
  }
  if (typeof _0x3f7e51 == "string") {
    let _0x2ee17a = _0x3f7e51.trim();
    if (_0x2ee17a.startsWith("{") && _0x2ee17a.endsWith("}") || _0x2ee17a.startsWith("[") && _0x2ee17a.endsWith("]")) {
      try {
        return Ae(JSON.parse(_0x2ee17a));
      } catch {
        return _0x3f7e51;
      }
    }
    return _0x3f7e51;
  }
  if (Array.isArray(_0x3f7e51)) {
    return _0x3f7e51.map(_0x45a685 => Ae(_0x45a685));
  }
  if (typeof _0x3f7e51 == "object") {
    let _0x17dee4 = {};
    for (let [_0x583416, _0x2fdd2a] of Object.entries(_0x3f7e51)) {
      _0x17dee4[_0x583416] = Ae(_0x2fdd2a);
    }
    return _0x17dee4;
  }
  return _0x3f7e51;
}
function Lc(_0x48d31e, _0x25949f) {
  if (!_0x25949f || typeof _0x25949f != "object" || Array.isArray(_0x25949f)) {
    return _0x25949f;
  }
  let _0x28e063 = {};
  for (let [_0x5a8095, _0x606b8e] of Object.entries(_0x25949f)) {
    let _0x349742 = _0x606b8e;
    if (typeof _0x349742 != "string") {
      _0x28e063[_0x5a8095] = Ae(_0x349742);
      continue;
    }
    let _0x5eca7c = _0x349742.trim();
    if (_0x5eca7c === "true") {
      _0x28e063[_0x5a8095] = true;
      continue;
    }
    if (_0x5eca7c === "false") {
      _0x28e063[_0x5a8095] = false;
      continue;
    }
    if (_0x5eca7c.startsWith("[") && _0x5eca7c.endsWith("]") || _0x5eca7c.startsWith("{") && _0x5eca7c.endsWith("}")) {
      try {
        _0x28e063[_0x5a8095] = Ae(JSON.parse(_0x5eca7c));
        continue;
      } catch {}
    }
    _0x28e063[_0x5a8095] = _0x349742;
  }
  if (_0x48d31e === "ask_user_question" && _0x28e063.options !== undefined) {
    _0x28e063.options = Bc(_0x28e063.options);
    if (_0x28e063.allowMultiple === undefined) {
      _0x28e063.allowMultiple = false;
    }
  }
  return _0x28e063;
}
function Bc(_0x10af80) {
  if (Array.isArray(_0x10af80)) {
    return _0x10af80.map(_0x2678b4 => {
      if (typeof _0x2678b4 == "string") {
        let _0x3761ec = _0x2678b4.trim();
        if (_0x3761ec) {
          return {
            label: _0x3761ec,
            description: _0x3761ec
          };
        } else {
          return null;
        }
      }
      if (_0x2678b4 && typeof _0x2678b4 == "object") {
        let _0x1d17d9 = String(_0x2678b4.label || _0x2678b4.name || _0x2678b4.title || "").trim();
        let _0xc931da = String(_0x2678b4.description || _0x2678b4.detail || _0x1d17d9).trim();
        if (_0x1d17d9) {
          return {
            label: _0x1d17d9,
            description: _0xc931da || _0x1d17d9
          };
        } else {
          return null;
        }
      }
      return null;
    }).filter(Boolean);
  } else if (typeof _0x10af80 == "string") {
    return _0x10af80.split(/[|,，\n]/).map(_0x2b4f2a => _0x2b4f2a.trim()).filter(Boolean).map(_0x444d12 => ({
      label: _0x444d12,
      description: _0x444d12
    }));
  } else {
    return [];
  }
}
function N(_0x2f75ef, _0x3aa7d5, _0x1e9a66) {
  if (_0x2f75ef[_0x3aa7d5] !== undefined && _0x2f75ef[_0x1e9a66] === undefined) {
    _0x2f75ef[_0x1e9a66] = _0x2f75ef[_0x3aa7d5];
    delete _0x2f75ef[_0x3aa7d5];
  }
}
function Qr(_0x458ff0, _0x3254ac, _0x40224b) {
  if (_0x458ff0[_0x3254ac] !== undefined && _0x458ff0[_0x40224b] === undefined) {
    _0x458ff0[_0x40224b] = Array.isArray(_0x458ff0[_0x3254ac]) ? _0x458ff0[_0x3254ac] : [_0x458ff0[_0x3254ac]];
    delete _0x458ff0[_0x3254ac];
  }
}
function Lt(_0x48b6a2) {
  if (typeof _0x48b6a2 == "string") {
    return [{
      type: "text",
      text: _0x48b6a2
    }];
  } else if (Array.isArray(_0x48b6a2)) {
    return _0x48b6a2;
  } else {
    return [];
  }
}
function Bt(_0x3ec6e7) {
  if (!_0x3ec6e7 || _0x3ec6e7.length <= 1) {
    if (!_0x3ec6e7 || _0x3ec6e7.length === 0) {
      return _0x3ec6e7 || [];
    }
    let _0x213114 = _0x3ec6e7[0];
    if (!_0x213114 || !Array.isArray(_0x213114.content)) {
      return _0x3ec6e7;
    } else if (_0x213114.content.length === 1 && _0x213114.content[0]?.type === "text") {
      return [{
        ..._0x213114,
        content: _0x213114.content[0].text
      }];
    } else {
      return [{
        ..._0x213114,
        content: _0x213114.content.slice()
      }];
    }
  }
  let _0x4894c6 = [{
    ..._0x3ec6e7[0],
    content: _0x3ec6e7[0].content
  }];
  for (let _0xaafe99 = 1; _0xaafe99 < _0x3ec6e7.length; _0xaafe99++) {
    let _0xe8e29f = _0x4894c6[_0x4894c6.length - 1];
    let _0x19a029 = _0x3ec6e7[_0xaafe99];
    if (_0xe8e29f.role === _0x19a029.role) {
      _0xe8e29f.content = [...Lt(_0xe8e29f.content), ...Lt(_0x19a029.content)];
    } else {
      _0x4894c6.push({
        ..._0x19a029,
        content: _0x19a029.content
      });
    }
  }
  for (let _0x5be109 of _0x4894c6) {
    if (!Array.isArray(_0x5be109.content) && typeof _0x5be109.content != "string") {
      continue;
    }
    let _0x2dc3c2 = Lt(_0x5be109.content);
    if (_0x2dc3c2.length === 1 && _0x2dc3c2[0]?.type === "text") {
      _0x5be109.content = _0x2dc3c2[0].text;
    } else {
      _0x5be109.content = _0x2dc3c2;
    }
  }
  return _0x4894c6;
}
var Dc = "[tool output unavailable: dropped during history compression/trim]";
function Uc(_0x48ee00, _0x580b83, _0x442ceb) {
  for (let _0x441b6b = _0x580b83; _0x441b6b < _0x48ee00.length; _0x441b6b++) {
    let _0x1f80d1 = _0x48ee00[_0x441b6b]?.content;
    if (Array.isArray(_0x1f80d1)) {
      for (let _0x2b9ed6 = 0; _0x2b9ed6 < _0x1f80d1.length; _0x2b9ed6++) {
        let _0x222a51 = _0x1f80d1[_0x2b9ed6];
        if (!_0x222a51 || _0x222a51.type !== "tool_result") {
          continue;
        }
        if ((_0x222a51.tool_use_id != null ? String(_0x222a51.tool_use_id).trim() : "") === _0x442ceb) {
          _0x1f80d1.splice(_0x2b9ed6, 1);
          return _0x222a51;
        }
      }
    }
  }
  return null;
}
function es(_0x49ed69, _0x2b1344) {
  let _0x500ae7 = new Map();
  let _0x57c39a = _0x38b4e7 => {
    if (_0x38b4e7) {
      _0x500ae7.set(_0x38b4e7, (_0x500ae7.get(_0x38b4e7) || 0) + 1);
    }
  };
  let _0x58c5a7 = _0x49ed69[_0x2b1344 + 1];
  if (_0x58c5a7?.role === "user" && Array.isArray(_0x58c5a7.content)) {
    for (let _0x1bf821 of _0x58c5a7.content) {
      if (!!_0x1bf821 && _0x1bf821.type === "tool_result") {
        _0x57c39a(_0x1bf821.tool_use_id != null ? String(_0x1bf821.tool_use_id).trim() : "");
      }
    }
  }
  for (let _0x5c0853 = _0x2b1344 + 2; _0x5c0853 < _0x49ed69.length; _0x5c0853++) {
    let _0x207616 = _0x49ed69[_0x5c0853]?.content;
    if (Array.isArray(_0x207616)) {
      for (let _0x701699 of _0x207616) {
        if (!!_0x701699 && _0x701699.type === "tool_result") {
          _0x57c39a(_0x701699.tool_use_id != null ? String(_0x701699.tool_use_id).trim() : "");
        }
      }
    }
  }
  return _0x500ae7;
}
function vn(_0x134d09, _0x3d74ee) {
  if (!_0x3d74ee) {
    return false;
  }
  let _0x4730d4 = _0x134d09.get(_0x3d74ee) || 0;
  if (_0x4730d4 <= 0) {
    return false;
  } else {
    _0x134d09.set(_0x3d74ee, _0x4730d4 - 1);
    return true;
  }
}
function ts(_0x12e60c) {
  if (!Array.isArray(_0x12e60c) || _0x12e60c.length === 0) {
    return {
      messages: _0x12e60c || [],
      filledOrphans: 0,
      droppedResults: 0,
      assignedIds: 0,
      reorderedResults: 0,
      dedupedResults: 0
    };
  }
  let _0xa37820 = _0x12e60c.map(_0x21738e => ({
    role: _0x21738e?.role,
    content: Lt(_0x21738e?.content).map(_0x55b456 => _0x55b456 && typeof _0x55b456 == "object" ? {
      ..._0x55b456
    } : _0x55b456),
    wasString: typeof _0x21738e?.content == "string",
    orig: _0x21738e
  }));
  let _0x494537 = 0;
  let _0x3a7808 = 0;
  let _0x16e87c = 0;
  let _0x22784f = 0;
  let _0x1c076f = 0;
  let _0x4951e0 = 0;
  let _0x45cf4a = new Set();
  let _0x3d6164 = new Set();
  let _0x5d0669 = [];
  let _0xf478e5 = () => {
    let _0x5ca1a9;
    do {
      _0x5ca1a9 = "byok-synth-toolcall-" + _0x4951e0++;
    } while (_0x45cf4a.has(_0x5ca1a9));
    _0x45cf4a.add(_0x5ca1a9);
    return _0x5ca1a9;
  };
  let _0x3dd406 = _0x47d054 => {
    let _0x4ee5e4 = _0x47d054.content;
    if (!!Array.isArray(_0x4ee5e4) && _0x4ee5e4.length !== 0) {
      if (_0x47d054.wasString && _0x4ee5e4.length === 1 && _0x4ee5e4[0]?.type === "text") {
        _0x4ee5e4 = _0x4ee5e4[0].text;
      }
      _0x5d0669.push(_0x47d054.orig ? {
        ..._0x47d054.orig,
        role: _0x47d054.role,
        content: _0x4ee5e4
      } : {
        role: _0x47d054.role,
        content: _0x4ee5e4
      });
    }
  };
  for (let _0x44cac2 = 0; _0x44cac2 < _0xa37820.length; _0x44cac2++) {
    let _0x579223 = _0xa37820[_0x44cac2];
    let _0x1ed855 = [];
    let _0x5daa91 = null;
    if (_0x579223.role === "assistant") {
      let _0x1a501d = es(_0xa37820, _0x44cac2);
      _0x5daa91 = [];
      for (let _0x3b01c5 of _0x579223.content) {
        if (!_0x3b01c5 || _0x3b01c5.type !== "tool_use") {
          _0x5daa91.push(_0x3b01c5);
          continue;
        }
        let _0x503b1d = _0x3b01c5.id != null ? String(_0x3b01c5.id) : "";
        let _0x2159d2 = _0x503b1d.trim();
        if (_0x2159d2 && _0x3d6164.has(_0x2159d2)) {
          if (!vn(_0x1a501d, _0x2159d2)) {
            _0x1c076f += 1;
            continue;
          }
          let _0xa09e70 = _0xf478e5();
          _0x494537 += 1;
          _0x3b01c5.id = _0xa09e70;
          _0x5daa91.push(_0x3b01c5);
          _0x1ed855.push({
            id: _0xa09e70,
            originalId: _0x2159d2
          });
          continue;
        }
        let _0x532100 = _0x2159d2;
        if (_0x532100) {
          _0x45cf4a.add(_0x532100);
          _0x3d6164.add(_0x2159d2);
          vn(_0x1a501d, _0x2159d2);
          if (_0x503b1d !== _0x532100) {
            _0x494537 += 1;
          }
        } else {
          _0x532100 = _0xf478e5();
          _0x494537 += 1;
        }
        _0x3b01c5.id = _0x532100;
        _0x5daa91.push(_0x3b01c5);
        _0x1ed855.push({
          id: _0x532100,
          originalId: _0x2159d2
        });
      }
    }
    if (_0x1ed855.length === 0) {
      let _0xa2b05d = (_0x5daa91 || _0x579223.content).filter(_0x260c67 => _0x260c67 && _0x260c67.type === "tool_result" ? (_0x16e87c += 1, false) : true);
      _0x3dd406({
        ..._0x579223,
        content: _0xa2b05d
      });
      continue;
    }
    _0x3dd406({
      ..._0x579223,
      content: _0x5daa91
    });
    let _0x39dadb = _0xa37820[_0x44cac2 + 1];
    let _0x447307 = _0x39dadb?.role === "user";
    let _0x55718a = _0x447307 ? _0x39dadb.content : [];
    let _0x1435b3 = new Set();
    let _0x326817 = [];
    for (let _0x2ba41d of _0x1ed855) {
      let _0x3530ff = -1;
      for (let _0x472356 = 0; _0x472356 < _0x55718a.length; _0x472356++) {
        if (_0x1435b3.has(_0x472356)) {
          continue;
        }
        let _0x1195da = _0x55718a[_0x472356];
        if (!_0x1195da || _0x1195da.type !== "tool_result") {
          continue;
        }
        if ((_0x1195da.tool_use_id != null ? String(_0x1195da.tool_use_id).trim() : "") === _0x2ba41d.originalId) {
          _0x3530ff = _0x472356;
          break;
        }
      }
      if (_0x3530ff >= 0) {
        _0x1435b3.add(_0x3530ff);
        _0x326817.push({
          ..._0x55718a[_0x3530ff],
          tool_use_id: _0x2ba41d.id
        });
        continue;
      }
      if (_0x2ba41d.originalId) {
        let _0x13ad95 = Uc(_0xa37820, _0x44cac2 + 2, _0x2ba41d.originalId);
        if (_0x13ad95) {
          _0x326817.push({
            ..._0x13ad95,
            tool_use_id: _0x2ba41d.id
          });
          _0x22784f += 1;
          continue;
        }
      }
      _0x326817.push({
        type: "tool_result",
        tool_use_id: _0x2ba41d.id,
        content: Dc
      });
      _0x3a7808 += 1;
    }
    if (_0x447307) {
      let _0x5b3ea = [];
      for (let _0x4f8d93 = 0; _0x4f8d93 < _0x55718a.length; _0x4f8d93++) {
        let _0x468c2a = _0x55718a[_0x4f8d93];
        if (_0x468c2a && _0x468c2a.type === "tool_result") {
          if (!_0x1435b3.has(_0x4f8d93)) {
            _0x16e87c += 1;
          }
          continue;
        }
        _0x5b3ea.push(_0x468c2a);
      }
      _0x3dd406({
        ..._0x39dadb,
        content: [..._0x326817, ..._0x5b3ea],
        wasString: false
      });
      _0x44cac2 += 1;
    } else {
      _0x3dd406({
        role: "user",
        content: _0x326817,
        wasString: false,
        orig: null
      });
    }
  }
  return {
    messages: _0x5d0669,
    filledOrphans: _0x3a7808,
    droppedResults: _0x16e87c,
    assignedIds: _0x494537,
    reorderedResults: _0x22784f,
    dedupedResults: _0x1c076f
  };
}
function ns(_0x3e28b2) {
  if (!Array.isArray(_0x3e28b2) || _0x3e28b2.length === 0) {
    return {
      messages: _0x3e28b2 || [],
      droppedUses: 0,
      droppedResults: 0,
      dedupedUses: 0
    };
  }
  let _0x470a12 = _0x3e28b2.map(_0x4d1f44 => ({
    role: _0x4d1f44?.role,
    content: Lt(_0x4d1f44?.content).map(_0x1a99aa => _0x1a99aa && typeof _0x1a99aa == "object" ? {
      ..._0x1a99aa
    } : _0x1a99aa),
    wasString: typeof _0x4d1f44?.content == "string",
    orig: _0x4d1f44
  }));
  let _0x5f3226 = -1;
  for (let _0x19cc27 = 0; _0x19cc27 < _0x470a12.length; _0x19cc27++) {
    if (_0x470a12[_0x19cc27].role === "assistant" && _0x470a12[_0x19cc27].content.some(_0x125341 => _0x125341 && _0x125341.type === "tool_use")) {
      _0x5f3226 = _0x19cc27;
    }
  }
  let _0x3db870 = 0;
  let _0x303dd3 = 0;
  let _0x473071 = 0;
  let _0x57a8d4 = new Set();
  let _0xda7b9b = new Array(_0x470a12.length).fill(null);
  let _0x36b359 = _0x3d2b11 => {
    let _0x3760bc = _0x3d2b11.content;
    if (!Array.isArray(_0x3760bc) || _0x3760bc.length === 0) {
      return null;
    } else {
      if (_0x3d2b11.wasString && _0x3760bc.length === 1 && _0x3760bc[0]?.type === "text") {
        _0x3760bc = _0x3760bc[0].text;
      }
      if (_0x3d2b11.orig) {
        return {
          ..._0x3d2b11.orig,
          role: _0x3d2b11.role,
          content: _0x3760bc
        };
      } else {
        return {
          role: _0x3d2b11.role,
          content: _0x3760bc
        };
      }
    }
  };
  for (let _0x2a9779 = 0; _0x2a9779 < _0x470a12.length; _0x2a9779++) {
    let _0x449a87 = _0x470a12[_0x2a9779];
    if (_0x449a87.role !== "assistant") {
      let _0x54ffd4 = _0x449a87.content.filter(_0x19960f => {
        if (_0x19960f && _0x19960f.type === "tool_result") {
          let _0x3b7c11 = _0x19960f.tool_use_id != null ? String(_0x19960f.tool_use_id).trim() : "";
          if (_0x3b7c11 && _0x57a8d4.has(_0x3b7c11)) {
            return true;
          } else {
            _0x303dd3 += 1;
            return false;
          }
        }
        return true;
      });
      _0xda7b9b[_0x2a9779] = _0x36b359({
        ..._0x449a87,
        content: _0x54ffd4
      });
      continue;
    }
    let _0x5824f4 = es(_0x470a12, _0x2a9779);
    let _0x5f04ea = _0x2a9779 === _0x5f3226 && _0x2a9779 === _0x470a12.length - 1;
    let _0x3731fc = [];
    for (let _0x5f2aaf of _0x449a87.content) {
      if (!_0x5f2aaf || _0x5f2aaf.type !== "tool_use") {
        _0x3731fc.push(_0x5f2aaf);
        continue;
      }
      let _0x172a05 = _0x5f2aaf.id != null ? String(_0x5f2aaf.id).trim() : "";
      if (_0x172a05 && _0x57a8d4.has(_0x172a05)) {
        if (vn(_0x5824f4, _0x172a05)) {
          _0x3731fc.push(_0x5f2aaf);
        } else {
          _0x473071 += 1;
        }
        continue;
      }
      if (_0x172a05) {
        if (vn(_0x5824f4, _0x172a05) || _0x5f04ea) {
          _0x57a8d4.add(_0x172a05);
          _0x3731fc.push(_0x5f2aaf);
        } else {
          _0x3db870 += 1;
        }
        continue;
      }
      if (_0x5f04ea) {
        _0x3731fc.push(_0x5f2aaf);
      } else {
        _0x3db870 += 1;
      }
    }
    _0xda7b9b[_0x2a9779] = _0x36b359({
      ..._0x449a87,
      content: _0x3731fc
    });
  }
  return {
    messages: _0xda7b9b,
    droppedUses: _0x3db870,
    droppedResults: _0x303dd3,
    dedupedUses: _0x473071
  };
}
function os(_0x586739) {
  if (!Array.isArray(_0x586739) || _0x586739.length === 0) {
    return {
      messages: _0x586739 || [],
      stripped: 0
    };
  }
  let _0x53bfd9 = _0x586739.slice();
  let _0x3f3c89 = 0;
  while (_0x53bfd9.length > 0) {
    let _0x447657 = _0x53bfd9[_0x53bfd9.length - 1];
    if (!_0x447657 || _0x447657.role !== "assistant" || Lt(_0x447657.content).some(_0x11bab3 => _0x11bab3 && _0x11bab3.type === "tool_use")) {
      break;
    }
    _0x53bfd9.pop();
    _0x3f3c89++;
  }
  if (_0x53bfd9.length === 0) {
    return {
      messages: _0x586739,
      stripped: 0
    };
  } else {
    return {
      messages: _0x53bfd9,
      stripped: _0x3f3c89
    };
  }
}
var tt = ["<tool_call>", "<tool>", "<minimax:tool_call", "<tool_calls_section_begin>", "{\"action\":\"tool_call\"", "{\"action\": \"tool_call\""];
var an = Math.max(...tt.map(_0x5b043e => _0x5b043e.length));
var Pn = ["user Tool results:", "<function_results>", "</function_results>", "<function_calls>", "</function_calls>", "<parameter", "</parameter>", "<invoke", "</invoke>", "<additional_metadata>", "<user_request>", "</user_request>"];
var Hc = /(?:^|\n)user(?=请|继续)/;
function Ln(_0x4071bc) {
  if (!_0x4071bc || typeof _0x4071bc != "string") {
    return -1;
  }
  let _0x4dcf6b = -1;
  for (let _0x399eed of Pn) {
    let _0x203bd6 = _0x4071bc.indexOf(_0x399eed);
    if (_0x203bd6 !== -1 && (_0x4dcf6b === -1 || _0x203bd6 < _0x4dcf6b)) {
      _0x4dcf6b = _0x203bd6;
    }
  }
  let _0x461b40 = Hc.exec(_0x4071bc);
  if (_0x461b40) {
    let _0x257499 = _0x461b40[0].startsWith("\n") ? _0x461b40.index + 1 : _0x461b40.index;
    if (_0x4dcf6b === -1 || _0x257499 < _0x4dcf6b) {
      _0x4dcf6b = _0x257499;
    }
  }
  return _0x4dcf6b;
}
function cn(_0x503a1d) {
  let _0x53e31d = new Map();
  for (let _0x4013af of _0x503a1d) {
    if (!_0x4013af || typeof _0x4013af.name != "string") {
      continue;
    }
    let _0x5de394 = He(_0x4013af.name, _0x4013af.input ?? _0x4013af.arguments ?? _0x4013af.params ?? {});
    if (!_0x5de394.toolName) {
      continue;
    }
    let _0x52366f = _0x5de394.params ?? {};
    if (typeof _0x52366f != "object" || _0x52366f == null || Array.isArray(_0x52366f)) {
      continue;
    }
    let _0x2a6e75 = _0x5de394.toolName + ":" + JSON.stringify(_0x52366f);
    if (!_0x53e31d.has(_0x2a6e75)) {
      _0x53e31d.set(_0x2a6e75, {
        name: _0x5de394.toolName,
        input: _0x52366f
      });
    }
  }
  return [..._0x53e31d.values()];
}
function Fc(_0x483c36, _0x55cfd7) {
  if (!_0x483c36 || _0x55cfd7 < 0 || _0x55cfd7 >= _0x483c36.length || _0x483c36[_0x55cfd7] !== "{") {
    return null;
  }
  let _0x5d5c3e = 0;
  let _0x3b5145 = false;
  let _0x496f03 = false;
  for (let _0xfbe191 = _0x55cfd7; _0xfbe191 < _0x483c36.length; _0xfbe191++) {
    let _0x55ca1b = _0x483c36[_0xfbe191];
    if (_0x3b5145) {
      if (_0x496f03) {
        _0x496f03 = false;
      } else if (_0x55ca1b === "\\") {
        _0x496f03 = true;
      } else if (_0x55ca1b === "\"") {
        _0x3b5145 = false;
      }
      continue;
    }
    if (_0x55ca1b === "\"") {
      _0x3b5145 = true;
      continue;
    }
    if (_0x55ca1b === "{") {
      _0x5d5c3e++;
    }
    if (_0x55ca1b === "}" && (_0x5d5c3e--, _0x5d5c3e === 0)) {
      return _0x483c36.slice(_0x55cfd7, _0xfbe191 + 1);
    }
  }
  return null;
}
function Fe(_0x1e5d7e) {
  if (!_0x1e5d7e || typeof _0x1e5d7e != "string") {
    return -1;
  }
  let _0x71aefa = -1;
  for (let _0x535944 of tt) {
    let _0x10b701 = _0x1e5d7e.indexOf(_0x535944);
    if (_0x10b701 !== -1 && (_0x71aefa === -1 || _0x10b701 < _0x71aefa)) {
      _0x71aefa = _0x10b701;
    }
  }
  return _0x71aefa;
}
function Kc(_0x3eb8ef) {
  if (!_0x3eb8ef || typeof _0x3eb8ef != "string") {
    return [];
  }
  let _0x75b622 = [];
  let _0x38dcc8 = ["{\"action\":\"tool_call\"", "{\"action\": \"tool_call\""];
  for (let _0xff0e of _0x38dcc8) {
    let _0x55f810 = 0;
    while (_0x55f810 < _0x3eb8ef.length) {
      let _0x4ec6a6 = _0x3eb8ef.indexOf(_0xff0e, _0x55f810);
      if (_0x4ec6a6 === -1) {
        break;
      }
      let _0x4c5532 = Fc(_0x3eb8ef, _0x4ec6a6);
      if (!_0x4c5532) {
        break;
      }
      try {
        let _0xc8fc7c = JSON.parse(_0x4c5532);
        if (_0xc8fc7c && _0xc8fc7c.action === "tool_call" && Array.isArray(_0xc8fc7c.tool_calls)) {
          _0x75b622.push(..._0xc8fc7c.tool_calls.map(_0xf1f758 => ({
            name: _0xf1f758?.name,
            input: Ae(_0xf1f758?.arguments ?? {})
          })));
        }
      } catch {}
      _0x55f810 = _0x4ec6a6 + _0xff0e.length;
    }
  }
  return cn(_0x75b622);
}
function Yc(_0xd2a37) {
  if (!_0xd2a37 || typeof _0xd2a37 != "string") {
    return [];
  }
  let _0x56adf4 = [..._0xd2a37.matchAll(/<tool(?:_call)?>\s*([\w.-]+)\s*(\{[\s\S]*?\})(?=\s*(?:<\/tool(?:_call)?>|$))/g)];
  if (_0x56adf4.length === 0) {
    return [];
  }
  let _0x2e986c = [];
  for (let _0x47e1c3 of _0x56adf4) {
    let _0xf0a9e3 = _0x47e1c3[1];
    let _0x382b51 = _0x47e1c3[2];
    try {
      _0x2e986c.push({
        name: _0xf0a9e3,
        input: Ae(JSON.parse(_0x382b51))
      });
    } catch {}
  }
  return cn(_0x2e986c);
}
function Gc(_0x419909) {
  if (!_0x419909 || typeof _0x419909 != "string") {
    return [];
  }
  let _0x408790 = [];
  let _0xa54c7c = /<minimax:tool_call[^>]*>([\s\S]*?)<\/minimax:tool_call>/g;
  let _0x5903b0;
  while ((_0x5903b0 = _0xa54c7c.exec(_0x419909)) !== null) {
    let _0x564443 = _0x5903b0[1].trim();
    if (!_0x564443) {
      continue;
    }
    try {
      let _0x3bb203 = JSON.parse(_0x564443);
      let _0x185714 = _0x3bb203.name || _0x3bb203.tool_name || _0x3bb203.function || "";
      let _0x353ef3 = _0x3bb203.arguments || _0x3bb203.parameters || _0x3bb203.input || _0x3bb203.params || {};
      if (!_0x185714) {
        continue;
      }
      _0x408790.push({
        name: _0x185714,
        input: Ae(typeof _0x353ef3 == "string" ? JSON.parse(_0x353ef3) : _0x353ef3)
      });
      continue;
    } catch {}
    let _0x43c0c5 = _0x564443.split("\n").map(_0x2e827c => _0x2e827c.trim()).filter(Boolean);
    if (_0x43c0c5.length >= 2) {
      let _0x2dca5a = _0x43c0c5[0].replace(/^functions\./, "").replace(/:\d+$/, "");
      try {
        _0x408790.push({
          name: _0x2dca5a,
          input: Ae(JSON.parse(_0x43c0c5.slice(1).join("")))
        });
      } catch {}
    }
  }
  return cn(_0x408790);
}
function jc(_0xfe7e47) {
  if (!_0xfe7e47 || typeof _0xfe7e47 != "string") {
    return [];
  }
  let _0x50ad16 = [];
  let _0xd44dc3 = _0xfe7e47.indexOf("<tool_calls_section_begin>");
  let _0x54e3ea = _0xfe7e47.indexOf("<tool_calls_section_end>");
  if (_0xd44dc3 === -1) {
    return _0x50ad16;
  }
  let _0x5e8e5d = _0xfe7e47.substring(_0xd44dc3, _0x54e3ea !== -1 ? _0x54e3ea : undefined);
  let _0x1e2058 = /<tool_call_begin>\s*([\s\S]*?)<tool_call_end>/g;
  let _0x5b6c32;
  while ((_0x5b6c32 = _0x1e2058.exec(_0x5e8e5d)) !== null) {
    let _0x2ccab0 = _0x5b6c32[1];
    let _0x5aded4 = _0x2ccab0.match(/^\s*(?:functions\.)?([\w.-]+?)(?::\d+)?\s*<tool_call_argument_begin>/s);
    if (!_0x5aded4) {
      continue;
    }
    let _0x21743b = _0x5aded4[1];
    let _0x51920e = _0x2ccab0.indexOf("<tool_call_argument_begin>");
    if (_0x51920e === -1) {
      continue;
    }
    let _0x34181f = _0x2ccab0.substring(_0x51920e + 26).trim();
    try {
      _0x50ad16.push({
        name: _0x21743b,
        input: Ae(JSON.parse(_0x34181f))
      });
    } catch {}
  }
  return cn(_0x50ad16);
}
function Bn(_0x31537d) {
  if (!_0x31537d || typeof _0x31537d != "string") {
    return [];
  }
  let _0x5b0582 = [Kc, Yc, Gc, jc];
  let _0x176b9a = [];
  for (let _0x533bdb of _0x5b0582) {
    let _0x50037f = _0x533bdb(_0x31537d);
    if (_0x50037f.length > 0) {
      _0x176b9a.push(..._0x50037f);
    }
  }
  return cn(_0x176b9a);
}
import _0x365286 from "node:fs";
import _0x395767 from "node:path";
import { format as _0x5164ac } from "node:util";
try {
  if (process.stdout && process.stdout._handle && typeof process.stdout._handle.setBlocking == "function") {
    process.stdout._handle.setBlocking(true);
  }
  if (process.stderr && process.stderr._handle && typeof process.stderr._handle.setBlocking == "function") {
    process.stderr._handle.setBlocking(true);
  }
} catch {}
for (let e of [process.stdout, process.stderr]) {
  if (!!e && typeof e.on == "function") {
    e.on("error", _0x521d86 => {
      if (!_0x521d86 || _0x521d86.code !== "EPIPE") {
        throw _0x521d86;
      }
    });
  }
}
var ft = String(process.env.BYOK_PROXY_LOG_PATH || "").trim();
var Vc = 5242880;
var Xc = 0;
function qc() {
  if (ft) {
    try {
      if (_0x365286.statSync(ft).size < Vc) {
        return;
      }
      let _0x57b151 = ft + ".1";
      try {
        _0x365286.rmSync(_0x57b151, {
          force: true
        });
      } catch {}
      _0x365286.renameSync(ft, _0x57b151);
    } catch {}
  }
}
function Jc(_0x4e1970) {
  if (ft) {
    try {
      if (Xc++ % 200 === 0) {
        qc();
      }
      _0x365286.mkdirSync(_0x395767.dirname(ft), {
        recursive: true
      });
      _0x365286.appendFileSync(ft, _0x5164ac(..._0x4e1970) + "\n", "utf8");
    } catch {}
  }
}
for (let e of ["log", "info", "warn", "error"]) {
  let t = console[e].bind(console);
  console[e] = (..._0x38c0aa) => {
    Jc(_0x38c0aa);
    t(..._0x38c0aa);
  };
}
var pt = process.env.VERBOSE_PROXY === "1" || process.env.VERBOSE_LOG === "1";
var Dt = process.env.VERBOSE_CHAT === "1" || pt;
var _ = {
  REQUEST: "请求",
  RESPONSE: "响应",
  BYOK: "BYOK",
  OFFICIAL: "官方",
  ROUTE: "路由",
  UPSTREAM: "上游",
  TOOL: "工具",
  DONE: "完成",
  CHAT: "对话",
  MODEL_CAPTURE: "模型捕获",
  ERR: "错误",
  QUOTA: "额度耗尽",
  INJECT: "注入",
  DETAIL: "详情"
};
function S(_0x3230db, _0x59b1ee, {
  id: _0x18ff28,
  err: _0x1a62bb = false
} = {}) {
  let _0x16d578 = "  " + (_0x18ff28 != null ? "[#" + _0x18ff28 + "] " : "") + "[" + _0x3230db + "] " + _0x59b1ee;
  if (_0x1a62bb) {
    console.error(_0x16d578);
  } else {
    console.log(_0x16d578);
  }
}
function Pe(_0x3cd72e, _0x580ddd, _0x55b40e, _0x30cf5b, {
  err: _0x410706 = false
} = {}) {
  let _0x394ec5 = "[" + _0x3cd72e + "] #" + _0x580ddd + " [" + _0x55b40e + "] " + _0x30cf5b;
  if (_0x410706) {
    console.error(_0x394ec5);
  } else {
    console.log(_0x394ec5);
  }
}
function fe(_0xf379c3, _0xf29346 = {}) {
  S(_.ERR, _0xf379c3, {
    ..._0xf29346,
    err: true
  });
}
function rs(_0x32cafb) {
  let _0x96b8f6 = [];
  let _0x13ba36 = String(_0x32cafb?.defaultModel ?? "").trim();
  if (_0x13ba36) {
    _0x96b8f6.push("model=" + _0x13ba36);
  }
  let _0x432e82 = _0x32cafb?.maxTokens;
  if (Number.isInteger(_0x432e82) && _0x432e82 >= 0) {
    _0x96b8f6.push("maxTokens=" + _0x432e82);
  }
  return _0x96b8f6.join(", ");
}
var Qc = new Set(["Ping", "GetUserStatus", "GetModelStatuses", "GetUserSettings", "GetWorkspaceSettings", "RecordAnalyticsEvent", "RecordCortexTrajectoryStep", "RecordCortexGeneratorMetadata", "RecordTrajectorySegmentAnalytics", "RecordCortexTrajectorySegment", "RecordStateUpdate", "RecordAsyncTelemetry", "RecordFeedback", "RecordBugReport", "Heartbeat", "GetStatus", "GetCommandModelConfigs", "GetAllAcpRegistries", "GetProfileData", "GetDefaultWorkflowTemplates", "GetMcpClientInfos", "GetUserJwt", "CheckUserMessageRateLimit"]);
function Dn(_0x1523df) {
  if (!_0x1523df || pt) {
    return false;
  } else {
    return !!Qc.has(_0x1523df) || !!_0x1523df.startsWith("Record");
  }
}
function ss(_0x2e96b2) {
  return pt || process.env.LOG_MODEL_CAPTURE === "1" || !!_0x2e96b2;
}
function is(_0x371816, _0x5779e1, _0x457d32) {
  if (!pt) {
    return;
  }
  let _0x136f85 = typeof _0x457d32 == "function" ? _0x457d32 : () => new Date().toISOString().slice(11, 23);
  let _0x17dc6e = String(_0x5779e1 || "GET").toUpperCase();
  console.log("[" + _0x136f85() + "] #" + _0x371816 + " /api/config (" + _0x17dc6e + ")");
}
function as(_0x12aa34, _0xfc263, _0x67cf4a, _0x57bb0d) {
  let _0x52b8b0 = typeof _0x57bb0d == "function" ? _0x57bb0d : () => new Date().toISOString().slice(11, 23);
  let _0x617915 = String(_0xfc263 || "GET").toUpperCase();
  let _0x4299a4 = _0x67cf4a != null && _0x67cf4a !== "" ? " " + _0x67cf4a : "";
  console.log("[" + _0x52b8b0() + "] #" + _0x12aa34 + " /api/config (" + _0x617915 + ") fail" + _0x4299a4);
}
var cs = process.env.SYSTEM_PROMPT_OVERRIDE === "true";
var un = process.env.SYSTEM_PROMPT_PATH || "";
var Zc = process.env.DEBUG_UNKNOWN_FIELDS === "1";
var el = process.env.DEBUG_EXPORT_SYSTEM_PROMPT === "1";
var Ao = process.env.DEBUG_SYSTEM_PROMPT_DUMP_PATH || "./debug/original-system-prompt.txt";
var tl = process.env.DEBUG_EXPORT_TURNS === "1";
var Un = {
  content: "",
  mtime: 0,
  path: ""
};
var Co = {
  content: "",
  path: ""
};
function nl() {
  if (!cs || !un) {
    return "";
  }
  try {
    let _0x56a3c6 = _0x293eab.statSync(un);
    if (Un.path === un && Un.mtime === _0x56a3c6.mtimeMs) {
      return Un.content;
    }
    let _0x35387c = _0x293eab.readFileSync(un, "utf8").trim();
    Un = {
      content: _0x35387c,
      mtime: _0x56a3c6.mtimeMs,
      path: un
    };
    console.log("  Custom system prompt loaded (" + _0x35387c.length + " chars)");
    return _0x35387c;
  } catch (_0x5e06c1) {
    console.error("  ❌ Failed to load custom system prompt: " + _0x5e06c1.message);
    return "";
  }
}
function ol(_0x12bfe3) {
  if (!el || !_0x12bfe3) {
    return;
  }
  let _0x4abf58 = _0x7c21e2.isAbsolute(Ao) ? Ao : _0x7c21e2.resolve(process.cwd(), Ao);
  if (Co.path !== _0x4abf58 || Co.content !== _0x12bfe3) {
    try {
      _0x293eab.mkdirSync(_0x7c21e2.dirname(_0x4abf58), {
        recursive: true
      });
      let _0x289514 = _0x12bfe3.split("\n").map(_0x10535f => /(?:key|token|secret|password|credential)\s*[:=]\s*\S/i.test(_0x10535f) ? "[REDACTED]" : _0x10535f).join("\n");
      _0x293eab.writeFileSync(_0x4abf58, _0x289514.trim() + "\n", {
        encoding: "utf8",
        mode: 384
      });
      Co = {
        content: _0x12bfe3,
        path: _0x4abf58
      };
      console.log("  Dumped original system prompt to " + _0x4abf58 + " (" + _0x12bfe3.length + " chars)");
      console.warn("  DEBUG_EXPORT_SYSTEM_PROMPT is ON — disable in production");
    } catch (_0x467193) {
      console.error("  ❌ Failed to dump original system prompt: " + _0x467193.message);
    }
  }
}
var rl = {
  0: "UNSPECIFIED",
  1: "USER",
  2: "SYSTEM(assistant)",
  3: "UNKNOWN(assistant)",
  4: "TOOL",
  5: "SYSTEM_PROMPT"
};
function sl(_0x5a74fd) {
  if (!tl || !Array.isArray(_0x5a74fd) || _0x5a74fd.length === 0) {
    return;
  }
  let _0x2d8ad9 = 300;
  let _0x5193d5 = 150;
  S(_.DETAIL, "▼ CLIENT TURNS DUMP · " + _0x5a74fd.length + " prompts");
  _0x5a74fd.forEach((_0x3b6ca0, _0x133639) => {
    let _0x46076e = rl[_0x3b6ca0.source] ?? "src=" + _0x3b6ca0.source;
    let _0x1a0f53 = typeof _0x3b6ca0.prompt == "string" ? _0x3b6ca0.prompt : "";
    let _0x16129d = _0x1a0f53.length;
    let _0x10d5f2;
    if (_0x16129d <= _0x2d8ad9 + _0x5193d5) {
      _0x10d5f2 = _0x1a0f53;
    } else {
      _0x10d5f2 = _0x1a0f53.slice(0, _0x2d8ad9) + ("\n…(" + (_0x16129d - _0x2d8ad9 - _0x5193d5) + " chars omitted)…\n") + _0x1a0f53.slice(_0x16129d - _0x5193d5);
    }
    let _0x37f55e = _0x10d5f2.split("\n").map(_0x2f4798 => /(?:key|token|secret|password|credential)\s*[:=]\s*\S/i.test(_0x2f4798) ? "[REDACTED]" : _0x2f4798).join("\n");
    S(_.DETAIL, "[" + _0x133639 + "] " + _0x46076e + " · id=" + (_0x3b6ca0.messageId || "-") + " · " + _0x16129d + "chars:\n" + _0x37f55e);
  });
  S(_.DETAIL, "▲ CLIENT TURNS DUMP END");
}
var il = ["tool_calling", "making_code_changes", "debugging", "running_commands", "calling_external_apis", "communication", "workflows"];
var al = [/^There will be an <ephemeral_message>/];
function cl(_0x2f0609) {
  let _0xc4efa6 = [];
  for (let _0x222edb of il) {
    let _0x3b3440 = new RegExp("<" + _0x222edb + ">[\\s\\S]*?</" + _0x222edb + ">", "g");
    let _0x21b08e;
    while ((_0x21b08e = _0x3b3440.exec(_0x2f0609)) !== null) {
      _0xc4efa6.push(_0x21b08e[0]);
    }
    let _0x3f46b6 = "<" + _0x222edb + " ";
    let _0x18f92e = "</" + _0x222edb + ">";
    let _0x41dfa0 = _0x2f0609.indexOf(_0x3f46b6);
    while (_0x41dfa0 !== -1) {
      let _0x53f1e3 = _0x2f0609.indexOf(_0x18f92e, _0x41dfa0);
      if (_0x53f1e3 !== -1) {
        _0xc4efa6.push(_0x2f0609.slice(_0x41dfa0, _0x53f1e3 + _0x18f92e.length));
      }
      _0x41dfa0 = _0x2f0609.indexOf(_0x3f46b6, _0x41dfa0 + 1);
    }
  }
  for (let _0x162a7d of _0x2f0609.split("\n")) {
    let _0x5bcb36 = _0x162a7d.trim();
    if (al.some(_0xa59ba0 => _0xa59ba0.test(_0x5bcb36))) {
      _0xc4efa6.push(_0x5bcb36);
    }
  }
  return _0xc4efa6.join("\n\n");
}
function ko(_0x3e9ef7) {
  if (_0x3e9ef7) {
    return _0x3e9ef7.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  } else {
    return "";
  }
}
var Ce = {
  UNSPECIFIED: 0,
  USER: 1,
  SYSTEM: 2,
  UNKNOWN: 3,
  TOOL: 4,
  SYSTEM_PROMPT: 5
};
function ll(_0x3f0895) {
  let _0x34ec89 = V(_0x3f0895);
  let _0x599bd6 = j(_0x34ec89, 1, 2);
  let _0x44b42f = j(_0x34ec89, 2, 2);
  let _0x59ff96 = j(_0x34ec89, 3, 2);
  return {
    base64_data: _0x599bd6 ? _0x599bd6.value.toString("utf8") : "",
    mime_type: _0x44b42f ? _0x44b42f.value.toString("utf8") : "image/png",
    caption: _0x59ff96 ? _0x59ff96.value.toString("utf8") : ""
  };
}
function ul(_0x3aad23) {
  let _0x3bb039 = V(_0x3aad23);
  let _0x463a89 = j(_0x3bb039, 1, 2);
  let _0x4d73d2 = j(_0x3bb039, 2, 2);
  let _0x51ad37 = j(_0x3bb039, 3, 2);
  let _0x270c72 = _0x4d73d2 ? _0x4d73d2.value.toString("utf8") : "";
  let _0x410abd = _0x51ad37 ? _0x51ad37.value.toString("utf8") : "{}";
  let _0x6b4f = He(_0x270c72, _0x410abd);
  return {
    id: _0x463a89 ? _0x463a89.value.toString("utf8") : "",
    name: _0x6b4f.toolName,
    arguments_json: JSON.stringify(_0x6b4f.params ?? {})
  };
}
function dl(_0x303808) {
  let _0x578e6f = V(_0x303808);
  let _0x368bb0 = j(_0x578e6f, 1, 2);
  let _0x338e75 = j(_0x578e6f, 2, 0);
  let _0x5d62ca = j(_0x578e6f, 3, 2);
  let _0x3b3724 = j(_0x578e6f, 4, 0);
  let _0x64dddc = j(_0x578e6f, 7, 2);
  let _0x5c42d8 = j(_0x578e6f, 9, 0);
  let _0x2a52d9 = j(_0x578e6f, 11, 2);
  let _0x3faccf = j(_0x578e6f, 12, 2);
  let _0x50afa7 = ut(_0x578e6f, 6);
  let _0x121e99 = ut(_0x578e6f, 10);
  return {
    messageId: _0x368bb0 ? _0x368bb0.value.toString("utf8") : "",
    source: _0x338e75 ? _0x338e75.value : 0,
    prompt: _0x5d62ca ? _0x5d62ca.value.toString("utf8") : "",
    numTokens: _0x3b3724 && Number(_0x3b3724.value) || 0,
    toolCalls: _0x50afa7.map(_0x5f2e3c => ul(_0x5f2e3c.value)),
    toolCallId: _0x64dddc ? _0x64dddc.value.toString("utf8") : "",
    toolResultIsError: _0x5c42d8 ? !!_0x5c42d8.value : false,
    images: _0x121e99.map(_0x2aae70 => ll(_0x2aae70.value)),
    thinking: _0x2a52d9 ? _0x2a52d9.value.toString("utf8") : "",
    signature: _0x3faccf ? _0x3faccf.value.toString("utf8") : ""
  };
}
function fl(_0x4ec771) {
  let _0x10a1c6 = V(_0x4ec771);
  let _0x376cbc = j(_0x10a1c6, 1, 2);
  let _0x50f124 = j(_0x10a1c6, 2, 2);
  let _0x44baaa = j(_0x10a1c6, 3, 2);
  let _0x4d9a = _0x376cbc ? _0x376cbc.value.toString("utf8") : "";
  let _0x5747c9 = _0x50f124 ? _0x50f124.value.toString("utf8") : "";
  let _0xe9c5c6 = _0x44baaa ? _0x44baaa.value.toString("utf8") : "{}";
  let _0x78dc37;
  try {
    _0x78dc37 = JSON.parse(_0xe9c5c6);
  } catch {
    _0x78dc37 = {
      type: "object",
      properties: {}
    };
  }
  _0x78dc37.type ||= "object";
  if (_0x78dc37.type === "object" && !_0x78dc37.properties) {
    _0x78dc37.properties = {};
  }
  return {
    name: Zr.has(_0x4d9a) || xo(_0x4d9a) ? _0x4d9a : He(_0x4d9a, {}).toolName || _0x4d9a,
    description: _0x5747c9,
    input_schema: _0x78dc37
  };
}
function pl(_0xef2377) {
  let _0x4fb477 = V(_0xef2377);
  let _0x86f533 = j(_0x4fb477, 1, 2);
  let _0x2b8451 = j(_0x4fb477, 2, 2);
  let _0x1f9adf = _0x2b8451 ? _0x2b8451.value.toString("utf8").trim() : "";
  let _0x500198 = _0x86f533 ? _0x86f533.value.toString("utf8").trim() : "";
  if (_0x1f9adf) {
    return {
      type: "tool",
      name: He(_0x1f9adf, {}).toolName
    };
  }
  if (_0x500198) {
    return {
      type: _0x500198
    };
  }
}
function hl(_0xd11a6e) {
  let {
    source: _0x211646,
    prompt: _0xc64718,
    toolCalls: _0xc48a32,
    toolCallId: _0x441e8a,
    toolResultIsError: _0x5877e8,
    images: _0x398e9,
    thinking: _0x24acb2,
    signature: _0xe8f93e
  } = _0xd11a6e;
  if (_0x211646 === Ce.SYSTEM_PROMPT || _0x211646 === Ce.UNSPECIFIED) {
    return null;
  }
  if (_0x211646 === Ce.TOOL) {
    let _0x5dc738 = {
      type: "tool_result",
      tool_use_id: _0x441e8a,
      content: _0xc64718
    };
    if (_0x5877e8) {
      _0x5dc738.is_error = true;
    }
    return {
      role: "user",
      content: [_0x5dc738]
    };
  }
  if (_0x211646 === Ce.USER) {
    if (_0x398e9 && _0x398e9.length > 0) {
      let _0x523fa7 = [];
      for (let _0x328498 of _0x398e9) {
        if (_0x328498.base64_data) {
          _0x523fa7.push({
            type: "image",
            source: {
              type: "base64",
              media_type: _0x328498.mime_type || "image/png",
              data: _0x328498.base64_data
            }
          });
        }
      }
      if (_0xc64718) {
        _0x523fa7.push({
          type: "text",
          text: _0xc64718
        });
      }
      return {
        role: "user",
        content: _0x523fa7
      };
    }
    return {
      role: "user",
      content: _0xc64718
    };
  }
  if (_0x211646 === Ce.UNKNOWN || _0x211646 === Ce.SYSTEM) {
    let _0x2da546 = [];
    let _0x58bd53 = _0xc64718;
    if (typeof _0x58bd53 == "string" && _0x58bd53) {
      let _0x2a19a3 = Ln(_0x58bd53);
      if (_0x2a19a3 !== -1) {
        let _0x5951ff = _0x58bd53.length - _0x2a19a3;
        _0x58bd53 = _0x58bd53.slice(0, _0x2a19a3).replace(/\s+$/, "");
        S(_.TOOL, "清创 assistant 越界正文 · 截断 " + _0x5951ff + " chars（从 turn-bleed 标记处）");
      }
    }
    if (_0x24acb2 && _0xe8f93e) {
      _0x2da546.push({
        type: "thinking",
        thinking: _0x24acb2,
        signature: _0xe8f93e
      });
    }
    if (_0x58bd53) {
      _0x2da546.push({
        type: "text",
        text: _0x58bd53
      });
    }
    for (let _0x58e54e of _0xc48a32) {
      let _0x35d7e5;
      try {
        _0x35d7e5 = JSON.parse(_0x58e54e.arguments_json);
      } catch {
        _0x35d7e5 = {};
      }
      _0x2da546.push({
        type: "tool_use",
        id: _0x58e54e.id,
        name: _0x58e54e.name,
        input: _0x35d7e5
      });
    }
    if (_0x2da546.length > 1 || _0x2da546.length === 1 && _0x2da546[0].type !== "text") {
      return {
        role: "assistant",
        content: _0x2da546
      };
    } else {
      return {
        role: "assistant",
        content: _0x58bd53
      };
    }
  }
  return null;
}
function ls(_0x1d1456, _0x4140de) {
  let _0x32a659 = ve(_0x1d1456, _0x4140de);
  let _0x514e4f = V(_0x32a659);
  let _0xd2f3ae = new Set([1, 2, 3, 10, 12, 16, 21]);
  let _0x436163 = _0x514e4f.filter(_0x4fc4c1 => !_0xd2f3ae.has(_0x4fc4c1.field));
  if (_0x436163.length > 0) {
    let _0x284936 = _0x436163.map(_0x1d417f => _0x1d417f.field + "/" + _0x1d417f.wireType).join(", ");
    if (Zc) {
      console.log("  GetChatMessage unknown fields: " + _0x284936);
      for (let _0x47bd07 of _0x436163) {
        if (_0x47bd07.wireType === 0) {
          console.log("    field " + _0x47bd07.field + " (varint): " + _0x47bd07.value);
        } else if (_0x47bd07.wireType === 2) {
          let _0x4e776e = _0x47bd07.value.toString("utf8");
          let _0x46820f = /^[\x20-\x7e\n\r\t]+$/.test(_0x4e776e.slice(0, 50));
          console.log("    field " + _0x47bd07.field + " (bytes/" + _0x47bd07.value.length + "b): " + (_0x46820f ? _0x4e776e.slice(0, 120) : "[binary " + _0x47bd07.value.toString("hex").slice(0, 40) + "]"));
        } else {
          console.log("    field " + _0x47bd07.field + " (wire " + _0x47bd07.wireType + "): " + _0x47bd07.value?.toString?.("hex")?.slice(0, 40));
        }
      }
    }
  }
  let _0x9789cb = j(_0x514e4f, 2, 2);
  let _0x5840b3 = _0x9789cb ? _0x9789cb.value.toString("utf8") : "";
  ol(_0x5840b3);
  if (cs) {
    let _0x2077bb = nl();
    if (_0x2077bb) {
      let _0x1c743f = _0x5840b3.length;
      let _0x51f6c0 = ko(cl(_0x5840b3));
      _0x5840b3 = ko(_0x51f6c0 ? _0x2077bb + "\n\n" + _0x51f6c0 : _0x2077bb);
      console.log("  System prompt: custom " + _0x2077bb.length + " + preserved " + _0x51f6c0.length + " chars (was " + _0x1c743f + ")");
    }
  }
  let _0x7248c4 = j(_0x514e4f, 21, 2);
  let _0x19fb91 = _0x7248c4 ? _0x7248c4.value.toString("utf8") : "";
  let _0x43fe0b = j(_0x514e4f, 16, 2);
  let _0x4689e4 = _0x43fe0b ? _0x43fe0b.value.toString("utf8").trim() : "";
  let _0x11d244 = ut(_0x514e4f, 3, 2).map(_0x3ab4c3 => dl(_0x3ab4c3.value));
  sl(_0x11d244);
  for (let _0x35af21 of _0x11d244) {
    if (_0x35af21.source === Ce.SYSTEM_PROMPT && _0x35af21.prompt) {
      _0x5840b3 += (_0x5840b3 ? "\n\n" : "") + _0x35af21.prompt;
    }
  }
  _0x5840b3 = ko(_0x5840b3);
  let _0x4cc384 = "agent";
  let _0x5f5857 = _0x11d244.filter(_0x387125 => _0x387125.source !== Ce.SYSTEM_PROMPT && _0x387125.source !== Ce.UNSPECIFIED);
  if (_0x5f5857.length > 0) {
    let _0xea1ebc = _0x5f5857[_0x5f5857.length - 1];
    if (_0xea1ebc.source === Ce.USER) {
      let _0x182392 = _0x5f5857.length >= 2 ? _0x5f5857[_0x5f5857.length - 2] : null;
      if (!_0x182392 || _0x182392.source !== Ce.TOOL) {
        _0x4cc384 = "user";
      } else {
        console.log("  Agent-round trailing USER text (" + _0xea1ebc.prompt.length + " chars): \"" + _0xea1ebc.prompt.slice(0, 150) + "...\"");
      }
    }
  }
  let _0x3ca360 = [];
  for (let _0x4f72cf of _0x11d244) {
    let _0x3419ed = hl(_0x4f72cf);
    if (_0x3419ed) {
      _0x3ca360.push({
        messageId: _0x4f72cf.messageId || "",
        numTokens: _0x4f72cf.numTokens || 0,
        source: _0x4f72cf.source,
        message: _0x3419ed
      });
    }
  }
  let _0x295ff1 = Bt(_0x3ca360.map(_0x576f47 => _0x576f47.message));
  let _0x5f07c9 = _0x11d244.reduce((_0x54c88c, _0x4e7c7e) => {
    let _0x4f0688 = _0x4e7c7e.prompt ? _0x4e7c7e.prompt.length : 0;
    _0x54c88c.promptChars += _0x4f0688;
    if (_0x4e7c7e.source !== Ce.SYSTEM_PROMPT && _0x4e7c7e.source !== Ce.UNSPECIFIED) {
      _0x54c88c.messageChars += _0x4f0688;
    }
    if (_0x4e7c7e.numTokens > 0) {
      _0x54c88c.tokenTotal += _0x4e7c7e.numTokens;
      _0x54c88c.tokenFields += 1;
    }
    return _0x54c88c;
  }, {
    tokenTotal: 0,
    tokenFields: 0,
    promptChars: 0,
    systemPromptChars: _0x5840b3.length,
    messageChars: 0
  });
  _0x5f07c9.totalChars = _0x5f07c9.systemPromptChars + _0x5f07c9.messageChars;
  let _0xa86c8 = ut(_0x514e4f, 10, 2).map(_0x880465 => fl(_0x880465.value)).filter(_0x538a45 => _0x538a45.name);
  if (_0xa86c8.length > 0) {
    let _0x1f20e7 = new Map();
    for (let _0x43c23f of _0xa86c8) {
      if (_0x43c23f.name) {
        if (!_0x1f20e7.has(_0x43c23f.name)) {
          _0x1f20e7.set(_0x43c23f.name, _0x43c23f);
        }
      }
    }
    _0xa86c8 = [..._0x1f20e7.values()];
  }
  if (_0xa86c8.length === 0) {
    _0xa86c8 = undefined;
  }
  let _0x4092a1 = j(_0x514e4f, 12, 2);
  let _0x19b17a = _0x4092a1 ? pl(_0x4092a1.value) : undefined;
  return {
    systemPrompt: _0x5840b3,
    messages: _0x295ff1,
    promptEntries: _0x3ca360,
    tools: _0xa86c8,
    toolChoice: _0x19b17a,
    requestedModel: _0x19fb91,
    cascadeId: _0x4689e4,
    initiator: _0x4cc384,
    contextStats: _0x5f07c9
  };
}
import _0x1737db from "node:fs";
import _0xca0aa5 from "node:path";
var ml = /_BYOK/i;
function nt(_0x2f8f1b) {
  let _0x3a7fe0 = parseInt(String(_0x2f8f1b ?? "").trim(), 10);
  if (Number.isFinite(_0x3a7fe0) && _0x3a7fe0 > 0) {
    return _0x3a7fe0;
  } else {
    return 0;
  }
}
function Fn() {
  return nt(process.env.BYOK_UI_CONTEXT_LIMIT || process.env.BYOK_CONTEXT_LIMIT);
}
function Mo(_0x10cbc6, _0x5e6e1f, _0x141a09) {
  if (_0x141a09 === 5) {
    let _0x409da2 = Buffer.alloc(4);
    _0x409da2.writeFloatBE(_0x5e6e1f, 0);
    return sn(_0x10cbc6, _0x409da2);
  }
  return me(_0x10cbc6, _0x5e6e1f);
}
function gl(_0x357b48, _0x5d39f4) {
  let _0x2e02f2 = V(_0x357b48);
  let _0x57ff1c = "";
  for (let _0x40fafe of _0x2e02f2) {
    if (_0x40fafe.field === 22 && _0x40fafe.wireType === 2) {
      _0x57ff1c = _0x40fafe.value.toString("utf8");
      break;
    }
  }
  if (!ml.test(_0x57ff1c)) {
    return {
      buf: _0x357b48,
      changed: false
    };
  }
  let _0x307fa7 = 0;
  if (typeof _0x5d39f4 == "number") {
    _0x307fa7 = _0x5d39f4;
  } else if (_0x5d39f4 && typeof _0x5d39f4 == "object") {
    _0x307fa7 = nt(_0x5d39f4[_0x57ff1c]) || nt(_0x5d39f4.default) || Fn();
  } else {
    _0x307fa7 = Fn();
  }
  if (!(_0x307fa7 > 0)) {
    return {
      buf: _0x357b48,
      changed: false
    };
  }
  let _0xe0795e = [];
  let _0xfb5a41 = false;
  let _0x1d94b2 = false;
  for (let _0x492e97 of _0x2e02f2) {
    if (_0x492e97.field === 18) {
      _0x1d94b2 = true;
      if (_0x492e97.wireType === 0 && _0x492e97.value === _0x307fa7) {
        _0xe0795e.push($e(_0x492e97));
      } else if (_0x492e97.wireType === 5) {
        let _0x11ac1d = _0x492e97.value.readFloatBE(0);
        if (Math.round(_0x11ac1d) === _0x307fa7) {
          _0xe0795e.push($e(_0x492e97));
        } else {
          _0xe0795e.push(Mo(18, _0x307fa7, 5));
          _0xfb5a41 = true;
        }
      } else {
        _0xe0795e.push(Mo(18, _0x307fa7, _0x492e97.wireType));
        _0xfb5a41 = true;
      }
    } else {
      _0xe0795e.push($e(_0x492e97));
    }
  }
  if (!_0x1d94b2) {
    _0xe0795e.push(Mo(18, _0x307fa7, 0));
    _0xfb5a41 = true;
  }
  return {
    buf: Buffer.concat(_0xe0795e),
    changed: _0xfb5a41
  };
}
function us(_0x13d824, _0x49a90c) {
  let _0x487d0f = V(_0x13d824);
  let _0x1f578d = [];
  let _0x309ef8 = false;
  let _0x2785f6 = 0;
  for (let _0x7d7c4b of _0x487d0f) {
    if (_0x7d7c4b.field === 1 && _0x7d7c4b.wireType === 2) {
      let _0x5924bf = gl(_0x7d7c4b.value, _0x49a90c);
      _0x1f578d.push(Oe(1, _0x5924bf.buf));
      if (_0x5924bf.changed) {
        _0x309ef8 = true;
        _0x2785f6 += 1;
      }
    } else {
      _0x1f578d.push($e(_0x7d7c4b));
    }
  }
  return {
    buf: Buffer.concat(_0x1f578d),
    changed: _0x309ef8,
    bumped: _0x2785f6
  };
}
function _l(_0x4eeb96, _0x50793b) {
  return us(_0x4eeb96, _0x50793b);
}
function Tl(_0x3ba59b, _0x240135) {
  let _0x34020a = V(_0x3ba59b);
  let _0x480774 = [];
  let _0x4b28cf = false;
  let _0x4cbdad = 0;
  for (let _0x5a2515 of _0x34020a) {
    if (_0x5a2515.field === 33 && _0x5a2515.wireType === 2) {
      let _0x10548d = us(_0x5a2515.value, _0x240135);
      _0x480774.push(Oe(33, _0x10548d.buf));
      if (_0x10548d.changed) {
        _0x4b28cf = true;
        _0x4cbdad += _0x10548d.bumped;
      }
    } else {
      _0x480774.push($e(_0x5a2515));
    }
  }
  return {
    buf: Buffer.concat(_0x480774),
    changed: _0x4b28cf,
    bumped: _0x4cbdad
  };
}
function Sl(_0x4c5afa, _0x585932) {
  let _0x257a3a = V(_0x4c5afa);
  let _0x18f4bc = [];
  let _0x5a552d = false;
  let _0x3c99bb = 0;
  for (let _0x49a06a of _0x257a3a) {
    if (_0x49a06a.field === 1 && _0x49a06a.wireType === 2) {
      let _0x299e28 = Tl(_0x49a06a.value, _0x585932);
      _0x18f4bc.push(Oe(1, _0x299e28.buf));
      if (_0x299e28.changed) {
        _0x5a552d = true;
        _0x3c99bb += _0x299e28.bumped;
      }
    } else {
      _0x18f4bc.push($e(_0x49a06a));
    }
  }
  return {
    buf: Buffer.concat(_0x18f4bc),
    changed: _0x5a552d,
    bumped: _0x3c99bb
  };
}
function ds(_0x343d32, _0x43fbbf) {
  let _0xdb6688 = Buffer.alloc(5 + _0x343d32.length);
  _0xdb6688[0] = _0x43fbbf;
  _0xdb6688.writeUInt32BE(_0x343d32.length, 1);
  _0x343d32.copy(_0xdb6688, 5);
  return _0xdb6688;
}
function fs(_0x5001c2) {
  if (_0x5001c2.length <= 5) {
    return null;
  }
  let _0x25d3fe = _0x5001c2[0];
  if (_0x5001c2.readUInt32BE(1) !== _0x5001c2.length - 5) {
    return null;
  }
  let _0x5b9f23 = _0x5001c2.subarray(5);
  let _0x5627e5 = _0x25d3fe === 1 || _0x25d3fe === 3;
  if (_0x5627e5) {
    let _0x699cb7 = We(_0x5b9f23);
    if (!_0x699cb7) {
      return null;
    }
    _0x5b9f23 = _0x699cb7;
  }
  return {
    flags: _0x25d3fe,
    payload: _0x5b9f23,
    compressed: _0x5627e5
  };
}
function ps(_0x3825f3, _0x2af9d2, _0x200913) {
  let _0x167105 = fs(_0x3825f3);
  if (!_0x167105) {
    return {
      body: _0x3825f3,
      changed: false,
      bumped: 0
    };
  }
  if (!(typeof _0x200913 == "number" ? _0x200913 > 0 : !!_0x200913 && typeof _0x200913 == "object" && !!Object.keys(_0x200913).length)) {
    return {
      body: _0x3825f3,
      changed: false,
      bumped: 0
    };
  }
  let _0x4b046e;
  if (_0x2af9d2 === "GetCascadeModelConfigs") {
    _0x4b046e = _l(_0x167105.payload, _0x200913);
  } else if (_0x2af9d2 === "GetUserStatus") {
    _0x4b046e = Sl(_0x167105.payload, _0x200913);
  } else {
    return {
      body: _0x3825f3,
      changed: false,
      bumped: 0
    };
  }
  if (!_0x4b046e.changed) {
    return {
      body: _0x3825f3,
      changed: false,
      bumped: 0
    };
  }
  let _0x536b74 = _0x4b046e.buf;
  let _0x1cf12f = _0x167105.flags;
  if (_0x167105.compressed) {
    _0x536b74 = $t(_0x536b74);
    _0x1cf12f = _0x167105.flags === 3 ? 3 : 1;
  } else {
    _0x1cf12f = 0;
  }
  return {
    body: ds(_0x536b74, _0x1cf12f),
    changed: true,
    bumped: _0x4b046e.bumped ?? 0
  };
}
function yl(_0x55b6eb) {
  let _0x48431 = V(_0x55b6eb);
  let _0x2dadad = [];
  let _0xcbc52c = false;
  for (let _0x24adc4 of _0x48431) {
    if (_0x24adc4.field === 4 && _0x24adc4.wireType === 0) {
      _0xcbc52c = true;
      continue;
    }
    if (_0x24adc4.field === 33 && _0x24adc4.wireType === 2) {
      _0xcbc52c = true;
      continue;
    }
    _0x2dadad.push($e(_0x24adc4));
  }
  return {
    buf: Buffer.concat(_0x2dadad),
    changed: _0xcbc52c
  };
}
function hs(_0x3d6d03) {
  let _0x48e33f = V(_0x3d6d03);
  let _0x57f60a = [];
  let _0x43bc23 = 0;
  for (let _0x38d1ca of _0x48e33f) {
    if (_0x38d1ca.field === 1 && _0x38d1ca.wireType === 2) {
      let _0xb01f8f = yl(_0x38d1ca.value);
      _0x57f60a.push(Oe(1, _0xb01f8f.buf));
      if (_0xb01f8f.changed) {
        _0x43bc23 += 1;
      }
      continue;
    }
    _0x57f60a.push($e(_0x38d1ca));
  }
  return {
    buf: Buffer.concat(_0x57f60a),
    unlocked: _0x43bc23,
    changed: _0x43bc23 > 0
  };
}
function El(_0x4ac6fc) {
  let _0x265983 = V(_0x4ac6fc);
  let _0x4db2c7 = [];
  let _0x384eb0 = 0;
  let _0x1a4676 = false;
  for (let _0x4f2df3 of _0x265983) {
    if (_0x4f2df3.field === 33 && _0x4f2df3.wireType === 2) {
      let _0x25f69d = hs(_0x4f2df3.value);
      if (_0x25f69d.changed) {
        _0x1a4676 = true;
        _0x384eb0 += _0x25f69d.unlocked;
        _0x4db2c7.push(Oe(33, _0x25f69d.buf));
        continue;
      }
    }
    _0x4db2c7.push($e(_0x4f2df3));
  }
  return {
    buf: Buffer.concat(_0x4db2c7),
    unlocked: _0x384eb0,
    changed: _0x1a4676
  };
}
function Ol(_0x39f57f) {
  let _0x3696dd = V(_0x39f57f);
  let _0x204717 = [];
  let _0x407167 = 0;
  for (let _0xf148c4 of _0x3696dd) {
    if (_0xf148c4.field === 1 && _0xf148c4.wireType === 2) {
      let _0x556953 = El(_0xf148c4.value);
      if (_0x556953.changed) {
        _0x407167 += _0x556953.unlocked;
        _0x204717.push(Oe(1, _0x556953.buf));
        continue;
      }
    }
    _0x204717.push($e(_0xf148c4));
  }
  return {
    buf: Buffer.concat(_0x204717),
    unlocked: _0x407167,
    changed: _0x407167 > 0
  };
}
function ms(_0x3a66a8, _0x12bb4c) {
  let _0x43e5b7 = fs(_0x3a66a8);
  if (!_0x43e5b7) {
    return {
      body: _0x3a66a8,
      changed: false,
      unlocked: 0
    };
  }
  let _0x395cc1;
  if (_0x12bb4c === "GetCascadeModelConfigs") {
    _0x395cc1 = hs(_0x43e5b7.payload);
  } else if (_0x12bb4c === "GetUserStatus") {
    _0x395cc1 = Ol(_0x43e5b7.payload);
  } else {
    return {
      body: _0x3a66a8,
      changed: false,
      unlocked: 0
    };
  }
  if (!_0x395cc1.changed) {
    return {
      body: _0x3a66a8,
      changed: false,
      unlocked: 0
    };
  }
  let _0x3b6916 = _0x395cc1.buf;
  let _0x153bbf = _0x43e5b7.flags;
  if (_0x43e5b7.compressed) {
    _0x3b6916 = $t(_0x3b6916);
    _0x153bbf = _0x43e5b7.flags === 3 ? 3 : 1;
  } else {
    _0x153bbf = 0;
  }
  return {
    body: ds(_0x3b6916, _0x153bbf),
    changed: true,
    unlocked: _0x395cc1.unlocked || 0
  };
}
var xl = 1000000;
var Wn = 256000;
var Ut = 512000;
var Ps = 1000000;
var gs = 0.7;
var _s = 0.6;
var Il = 0.6;
var Ts = 0.97;
var Ss = 0.94;
var Al = 2 / 3;
var Cl = 300000;
var ys = 32;
var Es = 86400000;
var Os = 3;
var Ls = 2;
var kl = 8;
var Bs = 2;
var Ml = 400;
var _e = {
  tokens: 0,
  limit: 0,
  inboundTokens: 0,
  restoredMsgs: 0,
  inboundMsgs: 0,
  reason: "",
  cascadeId: "",
  ts: 0
};
var pe = new Map();
var bl = 64;
var ne = new Map();
var Le = new Map();
// Live request registry used by the local session monitor. Entries are keyed by
// request id so parallel turns in the same conversation remain observable.
var sessionMonitorActive = new Map();
var sessionMonitorPeak = 0;
var ht = "";
var Ds = false;
var Kn = null;
var bo = false;
var Ro = false;
function vo() {
  let _0x2f99b6 = String(process.env.BYOK_HISTORY_CACHE ?? "1").trim().toLowerCase();
  return _0x2f99b6 !== "0" && _0x2f99b6 !== "false" && _0x2f99b6 !== "off" && _0x2f99b6 !== "no";
}
function Re() {
  let _0x75eb1d = nt(process.env.BYOK_HISTORY_TOKEN_LIMIT);
  if (_0x75eb1d > 0) {
    return _0x75eb1d;
  }
  let _0x5a4a51 = nt(process.env.BYOK_UI_CONTEXT_LIMIT || process.env.BYOK_CONTEXT_LIMIT);
  if (_0x5a4a51 > 0) {
    return _0x5a4a51;
  } else {
    return xl;
  }
}
function zn(_0x2cc897, _0x56f15b, _0x5c197d, _0x75a502, _0x1f760e) {
  if (_0x2cc897 <= _0x56f15b) {
    return _0x75a502;
  }
  if (_0x2cc897 >= _0x5c197d) {
    return _0x1f760e;
  }
  let _0x2809b9 = (_0x2cc897 - _0x56f15b) / (_0x5c197d - _0x56f15b);
  return _0x75a502 + (_0x1f760e - _0x75a502) * _0x2809b9;
}
function Rl(_0x32b3f6 = 0) {
  let _0x3899a0 = _0x32b3f6 > 0 ? _0x32b3f6 : Re();
  if (_0x3899a0 <= Wn) {
    return gs;
  } else if (_0x3899a0 <= Ut) {
    return zn(_0x3899a0, Wn, Ut, gs, _s);
  } else {
    return zn(_0x3899a0, Ut, Ps, _s, Il);
  }
}
function Nl(_0x22a9ed = 0) {
  let _0x576bfb = _0x22a9ed > 0 ? _0x22a9ed : Re();
  if (_0x576bfb <= Wn) {
    return Ts;
  } else if (_0x576bfb <= Ut) {
    return zn(_0x576bfb, Wn, Ut, Ts, Ss);
  } else {
    return zn(_0x576bfb, Ut, Ps, Ss, Al);
  }
}
function wl() {
  let _0x2f63ad = String(process.env.BYOK_HISTORY_SOFT_TOKEN_CAP ?? "").trim().toLowerCase();
  if (_0x2f63ad === "0" || _0x2f63ad === "off" || _0x2f63ad === "false" || _0x2f63ad === "no") {
    return 0;
  }
  let _0x5c5759 = nt(_0x2f63ad);
  if (_0x5c5759 > 0) {
    return _0x5c5759;
  } else {
    return Cl;
  }
}
function $l(_0x531743 = 0, _0x51c7ee = 0) {
  let _0xb0bdf0 = String(process.env.BYOK_HISTORY_SOFT_TOKEN_LIMIT ?? "").trim().toLowerCase();
  if (_0xb0bdf0 === "0" || _0xb0bdf0 === "off" || _0xb0bdf0 === "false" || _0xb0bdf0 === "no") {
    return 0;
  }
  let _0x206bb3 = nt(_0xb0bdf0);
  if (_0x206bb3 > 0) {
    return _0x206bb3;
  }
  let _0x3403a2 = _0x531743 > 0 ? _0x531743 : Re();
  let _0x5d74cd = Math.max(1024, Math.floor(_0x3403a2 * Rl(_0x51c7ee)));
  let _0x45bd79 = wl();
  if (_0x45bd79 > 0) {
    return Math.max(1024, Math.min(_0x5d74cd, _0x45bd79));
  } else {
    return _0x5d74cd;
  }
}
function vl(_0x2592d6, _0x133dab = 0) {
  if (_0x2592d6 > 0) {
    return Math.max(1024, Math.min(Math.floor(_0x2592d6), Math.floor(_0x2592d6 * Nl(_0x133dab))));
  } else {
    return 0;
  }
}
function Pl() {
  let _0x50d12d = String(process.env.BYOK_HISTORY_CACHE_PATH || "").trim();
  if (_0x50d12d) {
    return _0x50d12d;
  }
  let _0x519e79 = String(process.env.MODEL_CAPTURE_PATH || "").trim();
  if (_0x519e79) {
    return _0xca0aa5.join(_0xca0aa5.dirname(_0x519e79), "history-cache.json");
  } else {
    return "";
  }
}
function Ll() {
  let _0x460bc6 = parseInt(String(process.env.BYOK_HISTORY_MAX_SESSIONS || ys), 10);
  if (Number.isFinite(_0x460bc6) && _0x460bc6 > 0) {
    return _0x460bc6;
  } else {
    return ys;
  }
}
function Us() {
  let _0x3be9ec = parseInt(String(process.env.BYOK_HISTORY_TTL_MS || Es), 10);
  if (Number.isFinite(_0x3be9ec) && _0x3be9ec > 0) {
    return _0x3be9ec;
  } else {
    return Es;
  }
}
function Bl() {
  let _0x3a504f = parseInt(String(process.env.BYOK_HISTORY_MIN_OVERLAP || Os), 10);
  let _0x263f39 = Number.isFinite(_0x3a504f) && _0x3a504f > 0 ? _0x3a504f : Os;
  return Math.max(Ls, _0x263f39);
}
function ot(_0x4fdb48) {
  return typeof _0x4fdb48 == "string" && _0x4fdb48.startsWith("id:");
}
function Dl(_0x956ed2) {
  for (let _0xb5bfa4 of _0x956ed2 || []) {
    let _0x16242b = String(_0xb5bfa4?.messageId || "").trim();
    if (_0x16242b) {
      return _0x16242b;
    }
  }
  return "";
}
function Ul(_0x5f31f0, _0x2fe50a) {
  let _0x1a82b5 = new Set();
  for (let _0x457526 of _0x5f31f0 || []) {
    if (ot(_0x457526.fp)) {
      _0x1a82b5.add(_0x457526.fp);
    }
  }
  if (!_0x1a82b5.size) {
    return 0;
  }
  let _0x2a61af = 0;
  for (let _0x20562e of _0x2fe50a || []) {
    if (ot(_0x20562e.fp) && _0x1a82b5.has(_0x20562e.fp)) {
      _0x2a61af += 1;
    }
  }
  return _0x2a61af;
}
function Po() {
  let _0xe88b4 = String(process.env.BYOK_HISTORY_PERSIST ?? "1").trim().toLowerCase();
  return _0xe88b4 !== "0" && _0xe88b4 !== "false" && _0xe88b4 !== "off" && _0xe88b4 !== "no";
}
function Vn() {
  if (!!Po() && !!ht) {
    if (Kn) {
      clearTimeout(Kn);
    }
    Kn = setTimeout(() => {
      Kn = null;
      Hl().catch(() => {});
    }, Ml);
  }
}
async function Hl() {
  if (!!Po() && !!ht) {
    if (bo) {
      Ro = true;
      return;
    }
    bo = true;
    try {
      let _0x11c5eb = {
        version: Bs,
        savedAt: Date.now(),
        hint: {
          ..._e
        },
        hintBySession: [...pe.entries()].map(([_0x4b7f42, _0xf44a9b]) => ({
          sessionKey: _0x4b7f42,
          tokens: Math.max(0, Number(_0xf44a9b?.tokens) || 0),
          limit: Math.max(0, Number(_0xf44a9b?.limit) || 0),
          inboundTokens: Math.max(0, Number(_0xf44a9b?.inboundTokens) || 0),
          restoredMsgs: Math.max(0, Number(_0xf44a9b?.restoredMsgs) || 0),
          inboundMsgs: Math.max(0, Number(_0xf44a9b?.inboundMsgs) || 0),
          reason: String(_0xf44a9b?.reason || ""),
          cascadeId: String(_0xf44a9b?.cascadeId || ""),
          ts: Number(_0xf44a9b?.ts) || Date.now(),
          activityTs: Number(_0xf44a9b?.activityTs) || Number(_0xf44a9b?.ts) || Date.now()
        })),
        sessions: [...ne.entries()].map(([_0x64e8e, _0x1e8178]) => ({
          key: _0x64e8e,
          updatedAt: _0x1e8178.updatedAt,
          hits: _0x1e8178.hits || 0,
          entries: (_0x1e8178.entries || []).map(ie)
        }))
      };
      let _0x28f70d = _0xca0aa5.dirname(ht);
      _0x1737db.mkdirSync(_0x28f70d, {
        recursive: true
      });
      let _0x5e7f36 = ht + "." + process.pid + ".tmp";
      _0x1737db.writeFileSync(_0x5e7f36, JSON.stringify(_0x11c5eb), "utf8");
      let _0x34788f = [40, 80, 160, 320];
      let _0x1f775b = false;
      for (let _0x24afef = 0;; _0x24afef++) {
        try {
          _0x1737db.renameSync(_0x5e7f36, ht);
          _0x1f775b = true;
          break;
        } catch (_0x435500) {
          if (!_0x435500 || _0x435500.code !== "EPERM" && _0x435500.code !== "EACCES" && _0x435500.code !== "EBUSY" || _0x24afef >= _0x34788f.length) {
            throw _0x435500;
          }
          await new Promise(_0x188319 => setTimeout(_0x188319, _0x34788f[_0x24afef]));
        }
      }
    } catch (_0x35c4db) {
      try {
        console.warn("[history-cache] persist failed: " + _0x35c4db.message);
      } catch {}
      try {
        _0x1737db.unlinkSync(ht + "." + process.pid + ".tmp");
      } catch {}
    } finally {
      bo = false;
      if (Ro) {
        Ro = false;
        Vn();
      }
    }
  }
}
function Hs() {
  Le.clear();
  for (let [_0x5d439c, _0x4c33b6] of ne) {
    for (let _0x1e7d56 of _0x4c33b6.entries || []) {
      if (_0x1e7d56?.fp && ot(_0x1e7d56.fp)) {
        Le.set(_0x1e7d56.fp, _0x5d439c);
      }
    }
  }
}
function Fl() {
  if (!ne.size) {
    return;
  }
  let _0x1cf796 = String(_e.cascadeId || "");
  let _0x251ade = Math.max(0, Number(_e.limit) || 300000);
  for (let [_0x426114, _0x4d811f] of ne) {
    if (!_0x426114 || pe.has(_0x426114)) {
      continue;
    }
    let _0x809904 = _0x4d811f?.entries || [];
    let _0x19c0b3 = _0x809904.reduce((_0x2e31d6, _0x2f243b) => _0x2e31d6 + ze(_0x2f243b), 0);
    pe.set(_0x426114, {
      tokens: Math.max(0, _0x19c0b3),
      limit: _0x251ade,
      inboundTokens: Math.max(0, _0x19c0b3),
      restoredMsgs: _0x809904.length,
      inboundMsgs: _0x809904.length,
      reason: "seeded",
      cascadeId: _0x1cf796,
      ts: Number(_0x4d811f?.updatedAt) || Date.now(),
      activityTs: Number(_0x4d811f?.updatedAt) || Date.now(),
      sessionKey: _0x426114
    });
  }
  Ho();
}
function Fs(_0x4c4a63 = "") {
  let _0x4d4bf2 = String(_0x4c4a63 || Pl() || "").trim();
  ht = _0x4d4bf2;
  Ds = true;
  if (!_0x4d4bf2 || !Po()) {
    return {
      ok: false,
      reason: "disabled"
    };
  }
  try {
    if (!_0x1737db.existsSync(_0x4d4bf2)) {
      return {
        ok: true,
        reason: "missing",
        sessions: 0
      };
    }
    let _0x3cb3a0 = JSON.parse(_0x1737db.readFileSync(_0x4d4bf2, "utf8"));
    if (!_0x3cb3a0 || _0x3cb3a0.version !== Bs || !Array.isArray(_0x3cb3a0.sessions)) {
      if (_0x3cb3a0 && Number(_0x3cb3a0.version) === 1) {
        try {
          console.warn("[history-cache] drop polluted v1 cache (multi-chat cross-talk); starting clean v2");
          _0x1737db.renameSync(_0x4d4bf2, _0x4d4bf2 + ".v1-polluted.bak");
        } catch {}
        return {
          ok: true,
          reason: "migrated-drop-v1",
          sessions: 0
        };
      }
      return {
        ok: false,
        reason: "bad-format"
      };
    }
    ne.clear();
    let _0x3d1a89 = Date.now();
    let _0x5de2cd = Us();
    for (let _0x5eaa02 of _0x3cb3a0.sessions) {
      let _0x29ec6a = String(_0x5eaa02?.key || "").trim();
      if (!_0x29ec6a || !Array.isArray(_0x5eaa02.entries) || !_0x5eaa02.entries.length) {
        continue;
      }
      let _0x407859 = Number(_0x5eaa02.updatedAt) || _0x3d1a89;
      if (_0x3d1a89 - _0x407859 > _0x5de2cd) {
        continue;
      }
      let _0x1303f0 = Gs(_0x5eaa02.entries);
      if (_0x1303f0.length) {
        ne.set(_0x29ec6a, {
          entries: _0x1303f0,
          updatedAt: _0x407859,
          hits: Number(_0x5eaa02.hits) || 0
        });
      }
    }
    Hs();
    Vs();
    if (_0x3cb3a0.hint && typeof _0x3cb3a0.hint == "object") {
      _e = {
        tokens: Math.max(0, Number(_0x3cb3a0.hint.tokens) || 0),
        limit: Math.max(0, Number(_0x3cb3a0.hint.limit) || Re()),
        inboundTokens: Math.max(0, Number(_0x3cb3a0.hint.inboundTokens) || 0),
        restoredMsgs: Math.max(0, Number(_0x3cb3a0.hint.restoredMsgs) || 0),
        inboundMsgs: Math.max(0, Number(_0x3cb3a0.hint.inboundMsgs) || 0),
        reason: String(_0x3cb3a0.hint.reason || "loaded"),
        cascadeId: String(_0x3cb3a0.hint.cascadeId || ""),
        sessionKey: String(_0x3cb3a0.hint.sessionKey || ""),
        ts: Number(_0x3cb3a0.hint.ts) || _0x3d1a89
      };
    }
    pe.clear();
    if (Array.isArray(_0x3cb3a0.hintBySession)) {
      for (let _0x540916 of _0x3cb3a0.hintBySession) {
        let _0x41751b = String(_0x540916?.sessionKey || _0x540916?.key || "").trim();
        if (_0x41751b) {
          pe.set(_0x41751b, {
            tokens: Math.max(0, Number(_0x540916.tokens) || 0),
            limit: Math.max(0, Number(_0x540916.limit) || Re()),
            inboundTokens: Math.max(0, Number(_0x540916.inboundTokens) || 0),
            restoredMsgs: Math.max(0, Number(_0x540916.restoredMsgs) || 0),
            inboundMsgs: Math.max(0, Number(_0x540916.inboundMsgs) || 0),
            reason: String(_0x540916.reason || "loaded"),
            cascadeId: String(_0x540916.cascadeId || ""),
            ts: Number(_0x540916.ts) || _0x3d1a89,
            activityTs: Number(_0x540916.activityTs) || Number(ne.get(_0x41751b)?.updatedAt) || Number(_0x540916.ts) || _0x3d1a89,
            sessionKey: _0x41751b
          });
        }
      }
    }
    if (pe.size === 0 && ne.size > 0) {
      Fl();
    }
    Ho();
    return {
      ok: true,
      reason: "loaded",
      sessions: ne.size,
      hintTokens: _e.tokens
    };
  } catch (_0x44366f) {
    try {
      console.warn("[history-cache] load failed: " + _0x44366f.message);
    } catch {}
    return {
      ok: false,
      reason: "error",
      error: _0x44366f.message
    };
  }
}
function Ks(_0x29ff56 = "") {
  let _0x4a3309 = Fs(_0x29ff56);
  if (_0x4a3309.ok && _0x4a3309.reason === "loaded") {
    try {
      console.log("[history-cache] loaded " + _0x4a3309.sessions + " session(s) from disk · hint≈" + (_0x4a3309.hintTokens || 0));
    } catch {}
  }
  return _0x4a3309;
}
function fn() {
  if (!Ds) {
    Fs();
  }
}
function Be(_0x54a1ec) {
  if (_0x54a1ec == null) {
    return "";
  } else if (typeof _0x54a1ec == "string") {
    return _0x54a1ec;
  } else if (typeof _0x54a1ec != "object") {
    return String(_0x54a1ec);
  } else if (Array.isArray(_0x54a1ec)) {
    return "[" + _0x54a1ec.map(Be).join(",") + "]";
  } else {
    return "{" + Object.keys(_0x54a1ec).sort().map(_0x2bf5e8 => _0x2bf5e8 + ":" + Be(_0x54a1ec[_0x2bf5e8])).join(",") + "}";
  }
}
function Lo(_0x315b42) {
  let _0x462201 = 2166136261;
  let _0x28e8ae = String(_0x315b42 || "");
  for (let _0x1b16ed = 0; _0x1b16ed < _0x28e8ae.length; _0x1b16ed++) {
    _0x462201 ^= _0x28e8ae.charCodeAt(_0x1b16ed);
    _0x462201 = Math.imul(_0x462201, 16777619);
  }
  return (_0x462201 >>> 0).toString(16).padStart(8, "0");
}
function Xn(_0x9ee51d) {
  let _0xac7fd = String(_0x9ee51d?.messageId || "").trim();
  if (_0xac7fd) {
    return "id:" + _0xac7fd;
  }
  let _0x3e5e22 = _0x9ee51d?.message;
  if (!_0x3e5e22) {
    return "";
  }
  let _0x3c0782 = _0x3e5e22.role || "";
  let _0x4a2b8b = typeof _0x3e5e22.content == "string" ? _0x3e5e22.content : Be(_0x3e5e22.content);
  let _0x548434 = _0x4a2b8b.slice(0, 240);
  return "h:" + _0x3c0782 + ":" + _0x4a2b8b.length + ":" + Lo(_0x548434);
}
function Kl(_0x3e6300) {
  let _0x5dd631 = Dl(_0x3e6300);
  if (_0x5dd631) {
    return "c:id:" + _0x5dd631;
  } else {
    return "c:h:" + Lo((_0x3e6300 || []).map(_0x4b8b1e => _0x4b8b1e.fp).join("|"));
  }
}
function Ys(_0x5c2063) {
  let _0x369149 = String(_0x5c2063 || "").trim();
  if (_0x369149 && _0x369149.length <= 256) {
    return "c:cid:" + _0x369149;
  } else {
    return "";
  }
}
function Bo(_0x270394) {
  let _0x224264 = _0x270394?.message?.content;
  if (_0x270394?.message?.role !== "user" || typeof _0x224264 != "string") {
    return false;
  } else {
    return _0x224264.includes("summary of important context from your previous coding session") && /\{\{\s*CHECKPOINT\s+\d+\s*\}\}/i.test(_0x224264);
  }
}
function Yl() {
  let _0x17868f = String(process.env.BYOK_TRUST_CLIENT_CHECKPOINT ?? "0").trim().toLowerCase();
  return _0x17868f === "1" || _0x17868f === "true" || _0x17868f === "yes" || _0x17868f === "on";
}
function Gl(_0x5716e4) {
  let _0x11248b = Math.min(_0x5716e4.length, kl);
  for (let _0x48a923 = 0; _0x48a923 < _0x11248b; _0x48a923++) {
    if (Bo(_0x5716e4[_0x48a923])) {
      return true;
    }
  }
  return false;
}
function xs(_0x47032e, _0x1bba20, _0x512c31 = false) {
  let _0x41c65c = _0x47032e.map(ie);
  let _0x3d9f0c = new Set(_0x41c65c.map(_0x3a62af => _0x3a62af.fp));
  let _0x153081 = _0x512c31 && Bo(_0x1bba20[0]) ? 1 : 0;
  for (let _0x2df660 = _0x153081; _0x2df660 < _0x1bba20.length; _0x2df660++) {
    let _0x2ec70e = _0x1bba20[_0x2df660];
    if (!_0x3d9f0c.has(_0x2ec70e.fp)) {
      _0x3d9f0c.add(_0x2ec70e.fp);
      _0x41c65c.push(ie(_0x2ec70e));
    }
  }
  return _0x41c65c;
}
function jl(_0x29ad31, _0x58e2d2) {
  if (!_0x29ad31 || !_0x58e2d2 || _0x29ad31 === _0x58e2d2) {
    return;
  }
  let _0x241f7a = ne.get(_0x29ad31);
  if (_0x241f7a && !ne.has(_0x58e2d2)) {
    ne.set(_0x58e2d2, _0x241f7a);
  }
  ne.delete(_0x29ad31);
  let _0x411085 = pe.get(_0x29ad31);
  if (_0x411085 && !pe.has(_0x58e2d2)) {
    pe.set(_0x58e2d2, {
      ..._0x411085,
      sessionKey: _0x58e2d2
    });
  }
  pe.delete(_0x29ad31);
  if (_e.sessionKey === _0x29ad31) {
    _e.sessionKey = _0x58e2d2;
  }
  Hs();
}
function _t(_0x22f14b) {
  let _0x1dffd1 = String(_0x22f14b || "");
  if (!_0x1dffd1) {
    return 0;
  }
  let _0x5e0e23 = 0;
  let _0x219885 = 0;
  for (let _0x4fc971 = 0; _0x4fc971 < _0x1dffd1.length; _0x4fc971++) {
    if (_0x1dffd1.charCodeAt(_0x4fc971) >= 11904) {
      _0x5e0e23 += 1;
    } else {
      _0x219885 += 1;
    }
  }
  return Math.max(1, _0x5e0e23 + Math.ceil(_0x219885 / 4));
}
function pn(_0x547ee7) {
  if (_0x547ee7 == null) {
    return 0;
  } else {
    return _t(typeof _0x547ee7 == "string" ? _0x547ee7 : Be(_0x547ee7));
  }
}
function Wl({
  systemPrompt: _0x342878 = "",
  tools: _0x3f31ed = null,
  outputReserve: _0x5840ac = 0
} = {}) {
  let _0x2299e0 = _t(_0x342878);
  if (Array.isArray(_0x3f31ed) && _0x3f31ed.length > 0) {
    _0x2299e0 += pn(_0x3f31ed);
  }
  let _0x262366 = Math.max(0, Number(_0x5840ac) || 0);
  return _0x2299e0 + _0x262366;
}
function ze(_0x4a4c7e) {
  let _0x2a54c6 = _0x4a4c7e?.message;
  if (!_0x2a54c6) {
    let _0x210772 = Number(_0x4a4c7e?.numTokens) || 0;
    if (_0x210772 > 0) {
      return _0x210772;
    } else {
      return 0;
    }
  }
  let _0x4ed60d = typeof _0x2a54c6.content == "string" ? _0x2a54c6.content : Be(_0x2a54c6.content);
  let _0x184ac5 = _t(_0x4ed60d);
  let _0x548d74 = Number(_0x4a4c7e?.numTokens) || 0;
  if (_0x548d74 > 0) {
    return Math.max(_0x548d74, _0x184ac5);
  } else {
    return _0x184ac5;
  }
}
function ie(_0x11cad2) {
  return {
    messageId: _0x11cad2.messageId || "",
    numTokens: _0x11cad2.numTokens || 0,
    source: _0x11cad2.source,
    message: _0x11cad2.message ? {
      role: _0x11cad2.message.role,
      content: typeof _0x11cad2.message.content == "string" ? _0x11cad2.message.content : JSON.parse(JSON.stringify(_0x11cad2.message.content))
    } : null,
    fp: _0x11cad2.fp || Xn(_0x11cad2)
  };
}
function Gs(_0x59b5f2) {
  let _0x2d613b = [];
  for (let _0x367082 of _0x59b5f2 || []) {
    if (!_0x367082?.message) {
      continue;
    }
    let _0xada747 = ie(_0x367082);
    _0xada747.fp = Xn(_0xada747);
    if (_0xada747.fp) {
      _0x2d613b.push(_0xada747);
    }
  }
  return _0x2d613b;
}
function js(_0x46fc3) {
  let _0x5de442 = new Map();
  for (let _0x4a7984 = 0; _0x4a7984 < _0x46fc3.length; _0x4a7984++) {
    let _0x43d994 = _0x46fc3[_0x4a7984].fp;
    if (!_0x43d994) {
      continue;
    }
    let _0x3813a7 = _0x5de442.get(_0x43d994);
    if (_0x3813a7) {
      _0x3813a7.push(_0x4a7984);
    } else {
      _0x5de442.set(_0x43d994, [_0x4a7984]);
    }
  }
  return _0x5de442;
}
function Ws(_0x5cba08, _0xc46c04, _0x4adc33 = 1) {
  if (!_0x5cba08.length || !_0xc46c04.length) {
    return null;
  }
  let _0x6cf464 = js(_0x5cba08);
  let _0x5e9fdf = null;
  for (let _0xadd67c = 0; _0xadd67c < _0xc46c04.length; _0xadd67c++) {
    let _0x148bca = _0x6cf464.get(_0xc46c04[_0xadd67c].fp);
    if (_0x148bca) {
      for (let _0x6de4ba of _0x148bca) {
        let _0x256391 = 0;
        while (_0x6de4ba + _0x256391 < _0x5cba08.length && _0xadd67c + _0x256391 < _0xc46c04.length && _0x5cba08[_0x6de4ba + _0x256391].fp === _0xc46c04[_0xadd67c + _0x256391].fp) {
          _0x256391 += 1;
        }
        if (_0x256391 < _0x4adc33) {
          continue;
        }
        let _0x9046fd = {
          cachedStart: _0x6de4ba,
          incomingStart: _0xadd67c,
          matched: _0x256391
        };
        if (!_0x5e9fdf || zs(_0x9046fd, _0x5e9fdf, _0x5cba08.length, _0xc46c04.length)) {
          _0x5e9fdf = _0x9046fd;
        }
      }
    }
  }
  return _0x5e9fdf;
}
function zs(_0x10b5d7, _0x253e54, _0x577ff8, _0x1a64aa) {
  if (_0x10b5d7.matched !== _0x253e54.matched) {
    return _0x10b5d7.matched > _0x253e54.matched;
  }
  if (_0x10b5d7.cachedStart !== _0x253e54.cachedStart) {
    return _0x10b5d7.cachedStart < _0x253e54.cachedStart;
  }
  let _0x1a6895 = _0x1a64aa - _0x10b5d7.incomingStart;
  let _0x43f9ae = _0x1a64aa - _0x253e54.incomingStart;
  if (_0x1a6895 !== _0x43f9ae) {
    return _0x1a6895 > _0x43f9ae;
  }
  let _0x43632e = _0x10b5d7.cachedStart;
  let _0x72197b = _0x253e54.cachedStart;
  if (_0x577ff8 - _0x10b5d7.cachedStart - _0x10b5d7.matched !== _0x577ff8 - _0x253e54.cachedStart - _0x253e54.matched) {
    return _0x577ff8 - _0x10b5d7.cachedStart - _0x10b5d7.matched < _0x577ff8 - _0x253e54.cachedStart - _0x253e54.matched;
  } else {
    return _0x43632e <= _0x72197b;
  }
}
function Is(_0xb5b3df, _0x2b0cff) {
  let _0x5cdbd8 = js(_0xb5b3df);
  let _0x35b3b9 = -1;
  let _0x420d0a = -1;
  for (let _0x46a167 = 0; _0x46a167 < _0x2b0cff.length; _0x46a167++) {
    let _0x447433 = _0x5cdbd8.get(_0x2b0cff[_0x46a167].fp);
    if (!_0x447433 || !_0x447433.length) {
      continue;
    }
    let _0x4dd5a0 = _0x447433[_0x447433.length - 1];
    if (_0x4dd5a0 >= _0x35b3b9) {
      _0x35b3b9 = _0x4dd5a0;
      _0x420d0a = _0x46a167;
    }
  }
  if (_0x35b3b9 < 0) {
    return {
      entries: _0xb5b3df.map(ie),
      prepended: 0,
      reason: "protect"
    };
  }
  let _0x5b9ef8 = _0xb5b3df.slice(0, _0x35b3b9 + 1).map(ie);
  let _0xb5d4af = _0x2b0cff.slice(_0x420d0a + 1).map(ie);
  let _0x53402c = [];
  let _0x479bd5 = new Set(_0x5b9ef8.map(_0x52e952 => _0x52e952.fp));
  for (let _0x11c679 of _0xb5d4af) {
    if (!_0x479bd5.has(_0x11c679.fp)) {
      _0x479bd5.add(_0x11c679.fp);
      _0x53402c.push(_0x11c679);
    }
  }
  return {
    entries: [..._0x5b9ef8, ..._0x53402c],
    prepended: Math.max(0, _0x5b9ef8.length - (_0x420d0a + 1)),
    reason: _0x53402c.length ? "protect-extend" : "protect"
  };
}
function zl(_0x20a7f8) {
  let _0x39d3a3 = new Map();
  for (let _0x384281 of _0x20a7f8 || []) {
    if (!ot(_0x384281.fp)) {
      continue;
    }
    let _0x510b35 = Le.get(_0x384281.fp);
    if (!!_0x510b35 && !!ne.has(_0x510b35)) {
      _0x39d3a3.set(_0x510b35, (_0x39d3a3.get(_0x510b35) || 0) + 1);
    }
  }
  let _0x5931c5 = "";
  let _0x4a76c0 = 0;
  for (let [_0x3b161f, _0x4ab5bb] of _0x39d3a3) {
    if (_0x4ab5bb > _0x4a76c0) {
      _0x4a76c0 = _0x4ab5bb;
      _0x5931c5 = _0x3b161f;
    }
  }
  if (_0x4a76c0 > 0) {
    return _0x5931c5;
  } else {
    return "";
  }
}
function Vl(_0xb81cd2, _0x4b2ef8) {
  if ((_0xb81cd2 || []).some(_0x5a7392 => ot(_0x5a7392.fp))) {
    return {
      sessionKey: "",
      cached: [],
      overlap: null
    };
  }
  let _0x175fde = "";
  let _0x2b3566 = null;
  let _0x56628b = null;
  let _0x2886b5 = Math.max(_0x4b2ef8, Ls);
  for (let [_0xc9e5a5, _0x15f0ff] of ne) {
    let _0x1a2f27 = _0x15f0ff.entries || [];
    if (!_0x1a2f27.length || _0x1a2f27.some(_0x3e474f => ot(_0x3e474f.fp))) {
      continue;
    }
    let _0x384165 = Ws(_0x1a2f27, _0xb81cd2, _0x2886b5);
    if (_0x384165 && (!_0x56628b || zs(_0x384165, _0x56628b, _0x1a2f27.length, _0xb81cd2.length))) {
      _0x175fde = _0xc9e5a5;
      _0x2b3566 = _0x1a2f27;
      _0x56628b = _0x384165;
    }
  }
  return {
    sessionKey: _0x175fde,
    cached: _0x2b3566 || [],
    overlap: _0x56628b
  };
}
function Xl(_0x8f9bd9, _0x295cf0) {
  for (let [_0x3f026b, _0x10e206] of Le) {
    if (_0x10e206 === _0x8f9bd9) {
      Le.delete(_0x3f026b);
    }
  }
  for (let _0x5127db of _0x295cf0 || []) {
    if (_0x5127db?.fp && ot(_0x5127db.fp)) {
      Le.set(_0x5127db.fp, _0x8f9bd9);
    }
  }
}
function ql(_0x1c0ac0 = Date.now()) {
  let _0x414928 = Us();
  for (let [_0x25ba7f, _0x25d7d8] of ne) {
    if (_0x1c0ac0 - _0x25d7d8.updatedAt > _0x414928) {
      ne.delete(_0x25ba7f);
      for (let [_0x109420, _0x13d889] of Le) {
        if (_0x13d889 === _0x25ba7f) {
          Le.delete(_0x109420);
        }
      }
    }
  }
}
function Vs() {
  let _0x2496dd = Ll();
  while (ne.size > _0x2496dd) {
    let _0x567e84 = "";
    let _0x232821 = Infinity;
    for (let [_0x1b4bf4, _0x39b1dd] of ne) {
      if (_0x39b1dd.updatedAt < _0x232821) {
        _0x232821 = _0x39b1dd.updatedAt;
        _0x567e84 = _0x1b4bf4;
      }
    }
    if (!_0x567e84) {
      break;
    }
    ne.delete(_0x567e84);
    for (let [_0x4a2651, _0x495213] of Le) {
      if (_0x495213 === _0x567e84) {
        Le.delete(_0x4a2651);
      }
    }
  }
}
function Yn(_0x1517e8, _0x4eebc5) {
  let _0x45303c = _0x4eebc5 > 0 ? _0x4eebc5 : Re();
  if (!_0x1517e8.length) {
    return {
      entries: [],
      dropped: 0,
      tokens: 0
    };
  }
  let _0x526424 = 0;
  for (let _0x47db3b of _0x1517e8) {
    _0x526424 += ze(_0x47db3b);
  }
  if (_0x526424 <= _0x45303c) {
    return {
      entries: _0x1517e8,
      dropped: 0,
      tokens: _0x526424
    };
  }
  let _0x5dd6c2 = 0;
  let _0x40e2ef = 0;
  while (_0x40e2ef < _0x1517e8.length - 1 && _0x526424 > _0x45303c) {
    _0x526424 -= ze(_0x1517e8[_0x40e2ef]);
    _0x40e2ef += 1;
    _0x5dd6c2 += 1;
  }
  return {
    entries: _0x1517e8.slice(_0x40e2ef),
    dropped: _0x5dd6c2,
    tokens: _0x526424
  };
}
var Jl = 0.7;
var As = 10;
var Cs = 80000;
var ks = 8000;
var Ms = 10000;
var bs = 480;
var Ql = 900;
var Rs = 1400;
var Ns = 90000;
var ws = 2;
var Tt = "[history_summary]";
var Zl = /\[keep\]|【keep】/i;
var Xs = /(必须|务必|一定要|千万|不要|不能|禁止|记住|牢记|约定|需求|根因|方案|决定|确认|T0|TODO|待办|下一步|重要|关键|注意|坑|陷阱)/i;
var qs = /([\/\\][\w.\-]+\.[a-zA-Z0-9]{1,6}\b|\berror\b|\bfail(ed)?\b|\bexception\b|traceback|panic|stack|报错|异常|失败|栈)/i;
var Gn = new Map();
var jn = new Map();
function eu() {
  let _0x448ce1 = String(process.env.BYOK_HISTORY_COMPRESS ?? "1").trim().toLowerCase();
  return _0x448ce1 !== "0" && _0x448ce1 !== "false" && _0x448ce1 !== "off" && _0x448ce1 !== "no";
}
function Do() {
  let _0x1632a0 = String(process.env.BYOK_HISTORY_LLM_SUMMARY ?? "0").trim().toLowerCase();
  return _0x1632a0 === "1" || _0x1632a0 === "true" || _0x1632a0 === "on" || _0x1632a0 === "yes";
}
function Js() {
  let _0x49fee5 = parseInt(String(process.env.BYOK_HISTORY_LLM_SUMMARY_INPUT_TOKENS || Ns), 10);
  if (Number.isFinite(_0x49fee5) && _0x49fee5 >= 8000) {
    return _0x49fee5;
  } else {
    return Ns;
  }
}
function tu() {
  let _0x286417 = process.env.BYOK_HISTORY_ANCHOR_USER_MSGS;
  if (_0x286417 == null || _0x286417 === "") {
    return ws;
  }
  let _0x2aea1b = parseInt(String(_0x286417), 10);
  if (Number.isFinite(_0x2aea1b) && _0x2aea1b >= 0) {
    return _0x2aea1b;
  } else {
    return ws;
  }
}
function nu() {
  let _0x12f3a0 = String(process.env.BYOK_HISTORY_SMART_EXTRACT ?? "1").trim().toLowerCase();
  return _0x12f3a0 !== "0" && _0x12f3a0 !== "false" && _0x12f3a0 !== "off" && _0x12f3a0 !== "no";
}
function Qs() {
  let _0x2791d = parseInt(String(process.env.BYOK_HISTORY_SUMMARY_LINE_CHARS || bs), 10);
  if (Number.isFinite(_0x2791d) && _0x2791d >= 80) {
    return _0x2791d;
  } else {
    return bs;
  }
}
function Zs() {
  let _0xefc06e = parseInt(String(process.env.BYOK_HISTORY_SUMMARY_ENTRY_CHARS || Ms), 10);
  if (Number.isFinite(_0xefc06e) && _0xefc06e >= 1000) {
    return _0xefc06e;
  } else {
    return Ms;
  }
}
function Uo(_0x50190a) {
  return Zl.test(rt(_0x50190a));
}
function ou(_0x7290b3, _0x2b6951, _0x1119e4) {
  let _0x553562 = _0x7290b3?.message;
  let _0x19e0db = _0x553562?.role || "unknown";
  let _0x19d0b3 = rt(_0x7290b3);
  let _0x53ac39 = 0;
  if (Uo(_0x7290b3)) {
    _0x53ac39 += 100;
  }
  if (Ht(_0x7290b3)) {
    _0x53ac39 += 40;
  }
  if (_0x19e0db === "user") {
    _0x53ac39 += 30;
  }
  if (Xs.test(_0x19d0b3)) {
    _0x53ac39 += 25;
  }
  if (qs.test(_0x19d0b3)) {
    _0x53ac39 += 12;
  }
  if (dn(_0x553562)) {
    _0x53ac39 -= 15;
  }
  if (dn(_0x553562) && _0x19d0b3.length > 4000) {
    _0x53ac39 -= 10;
  }
  if (_0x1119e4 > 0) {
    _0x53ac39 += Math.round(_0x2b6951 / _0x1119e4 * 8);
  }
  return _0x53ac39;
}
function ru(_0x2081b2, _0x3b6f12) {
  let _0x5beb0d = _0x2081b2?.message?.role || "unknown";
  let _0x4b5c89 = rt(_0x2081b2);
  let _0x5714bc = Xs.test(_0x4b5c89) || qs.test(_0x4b5c89);
  if (Uo(_0x2081b2) || _0x5beb0d === "user") {
    return Math.max(_0x3b6f12, Rs);
  } else if (_0x5714bc) {
    return Math.max(_0x3b6f12, Ql);
  } else {
    return _0x3b6f12;
  }
}
function $s(_0x4dc037, _0x451f96) {
  let _0xf2d548 = String(_0x4dc037 || "");
  if (_0xf2d548.length <= _0x451f96) {
    return _0xf2d548;
  }
  let _0x1f7597 = Math.floor(_0x451f96 * 0.7);
  let _0x4ae7fa = Math.max(0, _0x451f96 - _0x1f7597 - 24);
  let _0x5de91e = _0xf2d548.length - _0x1f7597 - _0x4ae7fa;
  if (_0x4ae7fa <= 0) {
    return _0xf2d548.slice(0, _0x451f96) + "…";
  } else {
    return _0xf2d548.slice(0, _0x1f7597) + "…[略 " + _0x5de91e + " 字]…" + _0xf2d548.slice(-_0x4ae7fa);
  }
}
function su(_0x5e7d18) {
  let _0x38db75 = new Set();
  let _0x61e746 = tu();
  let _0x4ab448 = 0;
  for (let _0x1267ff = 0; _0x1267ff < _0x5e7d18.length; _0x1267ff++) {
    let _0x5a64c7 = _0x5e7d18[_0x1267ff];
    if (Uo(_0x5a64c7)) {
      _0x38db75.add(_0x1267ff);
      continue;
    }
    if (Ht(_0x5a64c7)) {
      _0x38db75.add(_0x1267ff);
      continue;
    }
    let _0x295623 = _0x5a64c7?.message;
    if ((_0x295623?.role || "unknown") === "user" && !dn(_0x295623) && !ri(_0x295623) && _0x4ab448 < _0x61e746) {
      _0x38db75.add(_0x1267ff);
      _0x4ab448 += 1;
    }
  }
  return _0x38db75;
}
function iu() {
  let _0x3d8226 = Number(process.env.BYOK_HISTORY_COMPRESS_RATIO);
  if (Number.isFinite(_0x3d8226) && _0x3d8226 > 0.3 && _0x3d8226 < 0.98) {
    return _0x3d8226;
  } else {
    return Jl;
  }
}
function ei() {
  let _0x2425f8 = parseInt(String(process.env.BYOK_HISTORY_KEEP_RECENT || As), 10);
  if (Number.isFinite(_0x2425f8) && _0x2425f8 >= 2) {
    return _0x2425f8;
  } else {
    return As;
  }
}
function au() {
  let _0x20c9a0 = parseInt(String(process.env.BYOK_HISTORY_KEEP_RECENT_TOKENS || Cs), 10);
  if (Number.isFinite(_0x20c9a0) && _0x20c9a0 >= 4096) {
    return _0x20c9a0;
  } else {
    return Cs;
  }
}
function ti() {
  let _0x5b57b4 = parseInt(String(process.env.BYOK_HISTORY_TOOL_MAX_CHARS || ks), 10);
  if (Number.isFinite(_0x5b57b4) && _0x5b57b4 >= 1000) {
    return _0x5b57b4;
  } else {
    return ks;
  }
}
function No(_0x5080ca) {
  let _0xc7283a = 0;
  for (let _0x4fac01 of _0x5080ca) {
    _0xc7283a += ze(_0x4fac01);
  }
  return _0xc7283a;
}
function gt(_0x581707, _0x3beb6b) {
  let _0x1fed80 = String(_0x581707 || "");
  if (_0x1fed80.length <= _0x3beb6b) {
    return _0x1fed80;
  }
  let _0x55fd78 = Math.floor(_0x3beb6b * 0.62);
  let _0x22430a = Math.max(0, _0x3beb6b - _0x55fd78 - 48);
  let _0xaee1fc = _0x1fed80.length - _0x55fd78 - _0x22430a;
  return _0x1fed80.slice(0, _0x55fd78) + "\n…[truncated " + _0xaee1fc + " chars]…\n" + (_0x22430a > 0 ? _0x1fed80.slice(-_0x22430a) : "");
}
function ni(_0x41f977) {
  if (_0x41f977 == null) {
    return "";
  }
  if (typeof _0x41f977 == "string") {
    return _0x41f977;
  }
  if (typeof _0x41f977 != "object") {
    return String(_0x41f977);
  }
  if (_0x41f977.type === "text" && _0x41f977.text != null) {
    return String(_0x41f977.text);
  }
  if (_0x41f977.type === "thinking" && _0x41f977.thinking != null) {
    return String(_0x41f977.thinking);
  }
  if (_0x41f977.type === "tool_result") {
    if (typeof _0x41f977.content == "string") {
      return _0x41f977.content;
    } else if (Array.isArray(_0x41f977.content)) {
      return _0x41f977.content.map(ni).join("\n");
    } else if (_0x41f977.content != null) {
      return Be(_0x41f977.content);
    } else {
      return "";
    }
  }
  if (_0x41f977.type === "tool_use") {
    let _0x29b21c = _0x41f977.name || "tool";
    let _0x461224 = typeof _0x41f977.input == "string" ? _0x41f977.input : Be(_0x41f977.input ?? {});
    return _0x29b21c + "(" + _0x461224 + ")";
  }
  if (_0x41f977.text != null) {
    return String(_0x41f977.text);
  } else {
    return Be(_0x41f977);
  }
}
function rt(_0x248815) {
  let _0x245fc4 = _0x248815?.message;
  if (_0x245fc4) {
    if (typeof _0x245fc4.content == "string") {
      return _0x245fc4.content;
    } else if (Array.isArray(_0x245fc4.content)) {
      return _0x245fc4.content.map(ni).join("\n");
    } else {
      return Be(_0x245fc4.content);
    }
  } else {
    return "";
  }
}
function Ht(_0x3f5a56) {
  return rt(_0x3f5a56).startsWith(Tt);
}
function $o(_0x3c4f98) {
  let _0x516b79 = ie(_0x3c4f98);
  _0x516b79.numTokens = 0;
  _0x516b79.fp = Xn(_0x516b79);
  _0x516b79.numTokens = ze(_0x516b79);
  return _0x516b79;
}
function oi(_0x32d9c7, _0x43e3d0) {
  if (typeof _0x32d9c7 == "string") {
    if (_0x32d9c7.length <= _0x43e3d0) {
      return {
        content: _0x32d9c7,
        changed: false
      };
    } else {
      return {
        content: gt(_0x32d9c7, _0x43e3d0),
        changed: true
      };
    }
  }
  if (Array.isArray(_0x32d9c7)) {
    let _0x1d3ee5 = false;
    return {
      content: _0x32d9c7.map(_0x410cb4 => {
        if (!_0x410cb4 || typeof _0x410cb4 != "object") {
          return _0x410cb4;
        }
        if (_0x410cb4.type === "text" && typeof _0x410cb4.text == "string" && _0x410cb4.text.length > _0x43e3d0) {
          _0x1d3ee5 = true;
          return {
            ..._0x410cb4,
            text: gt(_0x410cb4.text, _0x43e3d0)
          };
        }
        if (_0x410cb4.type === "tool_result") {
          let _0x4fa177 = oi(_0x410cb4.content, _0x43e3d0);
          if (_0x4fa177.changed) {
            _0x1d3ee5 = true;
            return {
              ..._0x410cb4,
              content: _0x4fa177.content
            };
          }
        }
        return _0x410cb4;
      }),
      changed: _0x1d3ee5
    };
  }
  let _0x2ff044 = Be(_0x32d9c7);
  if (_0x2ff044.length <= _0x43e3d0) {
    return {
      content: _0x32d9c7,
      changed: false
    };
  } else {
    return {
      content: gt(_0x2ff044, _0x43e3d0),
      changed: true
    };
  }
}
function cu(_0x257f95, _0x29541b = {}) {
  let _0x18008f = _0x29541b.maxChars > 0 ? _0x29541b.maxChars : ti();
  let _0x9d9c50 = Math.max(0, Number(_0x29541b.keepRecent) || ei());
  if (!Array.isArray(_0x257f95) || _0x257f95.length === 0) {
    return {
      entries: _0x257f95 || [],
      compacted: 0
    };
  }
  let _0x26b84f = Math.max(0, _0x257f95.length - _0x9d9c50);
  let _0x3e390f = 0;
  return {
    entries: _0x257f95.map((_0x536ff3, _0x51b212) => {
      if (_0x51b212 >= _0x26b84f) {
        return _0x536ff3;
      }
      let _0x211985 = _0x536ff3?.message;
      if (!_0x211985) {
        return _0x536ff3;
      }
      if (typeof _0x211985.content == "string") {
        if (_0x211985.content.length <= _0x18008f * 2) {
          return _0x536ff3;
        } else {
          _0x3e390f += 1;
          return $o({
            ..._0x536ff3,
            message: {
              role: _0x211985.role,
              content: gt(_0x211985.content, _0x18008f * 2)
            }
          });
        }
      }
      if (!Array.isArray(_0x211985.content)) {
        return _0x536ff3;
      }
      let _0x51ef61 = false;
      let _0x460e55 = _0x211985.content.map(_0x4c2eb6 => {
        if (!_0x4c2eb6 || typeof _0x4c2eb6 != "object") {
          return _0x4c2eb6;
        }
        if (_0x4c2eb6.type === "tool_result") {
          let _0x5803b9 = oi(_0x4c2eb6.content, _0x18008f);
          if (_0x5803b9.changed) {
            _0x51ef61 = true;
            return {
              ..._0x4c2eb6,
              content: _0x5803b9.content
            };
          } else {
            return _0x4c2eb6;
          }
        }
        if (_0x4c2eb6.type === "tool_use" && _0x4c2eb6.input != null) {
          let _0x462115 = typeof _0x4c2eb6.input == "string" ? _0x4c2eb6.input : Be(_0x4c2eb6.input);
          if (_0x462115.length > _0x18008f) {
            _0x51ef61 = true;
            return {
              ..._0x4c2eb6,
              input: typeof _0x4c2eb6.input == "string" ? gt(_0x4c2eb6.input, _0x18008f) : {
                _truncated: true,
                preview: gt(_0x462115, Math.min(2000, _0x18008f))
              }
            };
          }
        }
        if (_0x4c2eb6.type === "text" && typeof _0x4c2eb6.text == "string" && _0x4c2eb6.text.length > _0x18008f * 2) {
          _0x51ef61 = true;
          return {
            ..._0x4c2eb6,
            text: gt(_0x4c2eb6.text, _0x18008f * 2)
          };
        } else {
          return _0x4c2eb6;
        }
      });
      if (_0x51ef61) {
        _0x3e390f += 1;
        return $o({
          ..._0x536ff3,
          message: {
            role: _0x211985.role,
            content: _0x460e55
          }
        });
      } else {
        return _0x536ff3;
      }
    }),
    compacted: _0x3e390f
  };
}
function dn(_0x5121fc) {
  if (!_0x5121fc || !Array.isArray(_0x5121fc.content) || _0x5121fc.content.length === 0) {
    return false;
  } else {
    return _0x5121fc.content.every(_0x1aab52 => _0x1aab52 && _0x1aab52.type === "tool_result");
  }
}
function ri(_0xef2ef8) {
  if (!_0xef2ef8 || !Array.isArray(_0xef2ef8.content)) {
    return false;
  } else {
    return _0xef2ef8.content.some(_0x36d205 => _0x36d205 && _0x36d205.type === "tool_use");
  }
}
function lu(_0x4f5481, _0x988ffb, _0x3aab00) {
  let _0x202a55 = Math.max(0, Math.min(_0x988ffb, _0x3aab00));
  while (_0x202a55 < _0x3aab00 && dn(_0x4f5481[_0x202a55]?.message)) {
    _0x202a55 += 1;
  }
  if (_0x202a55 > 0 && _0x202a55 < _0x3aab00 && ri(_0x4f5481[_0x202a55 - 1]?.message)) {
    while (_0x202a55 < _0x3aab00 && dn(_0x4f5481[_0x202a55]?.message)) {
      _0x202a55 += 1;
    }
  }
  return _0x202a55;
}
function si(_0x3c58c1, _0x18db96, _0x295b45) {
  if (!_0x3c58c1.length) {
    return 0;
  }
  let _0x3db80d = Math.max(0, _0x3c58c1.length - _0x18db96);
  let _0x1d83e3 = 0;
  let _0x4fe0fc = _0x3c58c1.length;
  for (let _0x3b6891 = _0x3c58c1.length - 1; _0x3b6891 >= 0; _0x3b6891--) {
    _0x1d83e3 += ze(_0x3c58c1[_0x3b6891]);
    if (_0x1d83e3 >= _0x295b45) {
      _0x4fe0fc = _0x3b6891;
      break;
    }
    if (_0x3b6891 === 0) {
      _0x4fe0fc = 0;
    }
  }
  return Math.min(_0x3db80d, _0x4fe0fc);
}
function uu(_0x3d411f) {
  let _0x36cea3 = [];
  let _0x32abc3 = 0;
  let _0x450fb2 = Zs();
  let _0xbfc83c = Qs();
  for (let _0x383632 = 0; _0x383632 < _0x3d411f.length; _0x383632++) {
    let _0x396147 = _0x3d411f[_0x383632];
    if (Ht(_0x396147)) {
      let _0x4957db = "- prior_summary: " + rt(_0x396147).slice(0, _0xbfc83c * 2).replace(/\s+/g, " ").trim();
      if (_0x32abc3 + _0x4957db.length > _0x450fb2) {
        break;
      }
      _0x36cea3.push(_0x4957db);
      _0x32abc3 += _0x4957db.length;
      continue;
    }
    let _0x361dc2 = _0x396147?.message?.role || "unknown";
    let _0xb282da = rt(_0x396147).replace(/\s+/g, " ").trim();
    if (!_0xb282da) {
      continue;
    }
    let _0x34d66d = _0xb282da.length > _0xbfc83c ? _0xb282da.slice(0, _0xbfc83c) + "…" : _0xb282da;
    let _0x185ab4 = "- " + _0x361dc2 + ": " + _0x34d66d;
    if (_0x32abc3 + _0x185ab4.length > _0x450fb2) {
      _0x36cea3.push("- …(" + (_0x3d411f.length - _0x383632) + " more messages omitted from summary body)");
      break;
    }
    _0x36cea3.push(_0x185ab4);
    _0x32abc3 += _0x185ab4.length;
  }
  return [Tt, "Compressed " + _0x3d411f.length + " earlier messages to preserve context (extractive, not hard-deleted).", "Key points:", ..._0x36cea3].join("\n");
}
function du(_0x5f57d2) {
  let _0x91a143 = _0x5f57d2.length;
  let _0x267ec3 = Zs();
  let _0x3d9c06 = Qs();
  let _0x2bc716 = su(_0x5f57d2);
  let _0x300492 = [];
  for (let _0x4b0d51 = 0; _0x4b0d51 < _0x91a143; _0x4b0d51++) {
    let _0x2bed61 = _0x5f57d2[_0x4b0d51];
    let _0x2edf25 = rt(_0x2bed61).replace(/\s+/g, " ").trim();
    if (!_0x2edf25 && !Ht(_0x2bed61)) {
      continue;
    }
    let _0x111db2 = _0x2bc716.has(_0x4b0d51);
    let _0x4b7daa = ou(_0x2bed61, _0x4b0d51, _0x91a143);
    let _0x3f8a31;
    if (Ht(_0x2bed61)) {
      _0x3f8a31 = "- prior_summary: " + (_0x111db2 ? _0x2edf25 : $s(_0x2edf25, _0x3d9c06 * 2));
    } else {
      let _0x52dee9 = _0x2bed61?.message?.role || "unknown";
      let _0x39e279 = _0x111db2 ? _0x2edf25 : $s(_0x2edf25, ru(_0x2bed61, _0x3d9c06));
      _0x3f8a31 = "- " + _0x52dee9 + ": " + _0x39e279;
    }
    _0x300492.push({
      index: _0x4b0d51,
      score: _0x4b7daa,
      line: _0x3f8a31,
      len: _0x3f8a31.length,
      isAnchor: _0x111db2
    });
  }
  let _0x2256e9 = new Set();
  let _0x574bd1 = 0;
  for (let _0xcc65fc = 0; _0xcc65fc < _0x300492.length; _0xcc65fc++) {
    if (_0x300492[_0xcc65fc].isAnchor) {
      _0x2256e9.add(_0xcc65fc);
      _0x574bd1 += _0x300492[_0xcc65fc].len;
    }
  }
  let _0x45a8f4 = _0x300492.map((_0x259707, _0x2bd671) => _0x2bd671).filter(_0x20094b => !_0x300492[_0x20094b].isAnchor).sort((_0x4ca0e1, _0x2bf0ce) => _0x300492[_0x2bf0ce].score !== _0x300492[_0x4ca0e1].score ? _0x300492[_0x2bf0ce].score - _0x300492[_0x4ca0e1].score : _0x300492[_0x4ca0e1].index - _0x300492[_0x2bf0ce].index);
  for (let _0xfe9b91 of _0x45a8f4) {
    if (!(_0x574bd1 + _0x300492[_0xfe9b91].len > _0x267ec3)) {
      _0x2256e9.add(_0xfe9b91);
      _0x574bd1 += _0x300492[_0xfe9b91].len;
    }
  }
  let _0x2d89f8 = [];
  let _0x23ead0 = 0;
  let _0x34b6a7 = () => {
    if (_0x23ead0 > 0) {
      _0x2d89f8.push("- …(" + _0x23ead0 + " lower-priority messages omitted)");
      _0x23ead0 = 0;
    }
  };
  for (let _0x336a8a = 0; _0x336a8a < _0x300492.length; _0x336a8a++) {
    if (_0x2256e9.has(_0x336a8a)) {
      _0x34b6a7();
      _0x2d89f8.push(_0x300492[_0x336a8a].line);
    } else {
      _0x23ead0 += 1;
    }
  }
  _0x34b6a7();
  let _0x36c2cd = _0x2bc716.size;
  let _0x29284 = "Compressed " + _0x91a143 + " earlier messages (smart extractive: by-importance, " + _0x36c2cd + " anchors kept verbatim, original text, not hard-deleted).";
  return {
    text: [Tt, _0x29284, "Key points:", ..._0x2d89f8].join("\n"),
    anchors: _0x36c2cd
  };
}
function fu(_0x3afbdd) {
  if (nu()) {
    return du(_0x3afbdd);
  } else {
    return {
      text: uu(_0x3afbdd),
      anchors: 0
    };
  }
}
function ii(_0x4bfc30, _0x5b587d = "extract") {
  let _0x30b8c2 = String(_0x4bfc30 || "").trim();
  let _0x4872c1 = _0x30b8c2.startsWith(Tt) ? _0x30b8c2 : Tt + "\n" + _0x30b8c2;
  let _0x53bee8 = {
    messageId: "byok-summary-" + _0x5b587d + "-" + Lo(_0x4872c1),
    numTokens: 0,
    source: undefined,
    message: {
      role: "user",
      content: _0x4872c1
    },
    fp: ""
  };
  return $o(_0x53bee8);
}
function pu(_0x692b56) {
  let {
    text: _0x1f7393,
    anchors: _0x5b0462
  } = fu(_0x692b56);
  return {
    entry: ii(_0x1f7393, "extract"),
    anchors: _0x5b0462 || 0
  };
}
function hu(_0xd28d04, _0x3dfc8e = 0) {
  let _0x5c9715 = _0x3dfc8e > 0 ? _0x3dfc8e : Js();
  let _0x54716c = [];
  let _0x1b2289 = 0;
  let _0x45b5ad = [];
  for (let _0x398664 of _0xd28d04 || []) {
    let _0x381020 = _0x398664?.message?.role || "unknown";
    let _0x129120 = rt(_0x398664).replace(/\s+/g, " ").trim();
    if (_0x129120) {
      if (_0x129120.length > 2000) {
        _0x129120 = _0x129120.slice(0, 1600) + "…" + _0x129120.slice(-300);
      }
      _0x45b5ad.push({
        role: _0x381020,
        plain: _0x129120,
        tok: _t(_0x381020 + ": " + _0x129120)
      });
    }
  }
  let _0x11b355 = 0;
  let _0x38baa8 = _0x45b5ad.reduce((_0x183dd1, _0x2290f9) => _0x183dd1 + _0x2290f9.tok, 0);
  while (_0x11b355 < _0x45b5ad.length - 1 && _0x38baa8 > _0x5c9715) {
    _0x38baa8 -= _0x45b5ad[_0x11b355].tok;
    _0x11b355 += 1;
  }
  for (let _0x85d7a8 = _0x11b355; _0x85d7a8 < _0x45b5ad.length; _0x85d7a8++) {
    _0x54716c.push(_0x45b5ad[_0x85d7a8].role + ": " + _0x45b5ad[_0x85d7a8].plain);
    _0x1b2289 += _0x45b5ad[_0x85d7a8].tok;
  }
  return {
    text: _0x54716c.join("\n"),
    tokens: _0x1b2289,
    messageCount: _0x45b5ad.length - _0x11b355,
    truncatedFrom: _0x11b355
  };
}
function mu(_0x3263d6, _0x5d945d, _0x3373d4, _0x521cdd, _0x32dfc4, _0x1c5b84) {
  let _0x5e00fc = si(_0x3263d6, _0x5d945d, _0x3373d4);
  let _0x3781c5 = Math.max(0, _0x5e00fc);
  if (_0x3781c5 < 2) {
    return 0;
  }
  let _0x2f7700 = Math.max(2, Math.floor(_0x3781c5 * 0.4));
  if (_0x521cdd > _0x1c5b84) {
    _0x2f7700 = _0x3781c5;
  } else if (_0x521cdd > _0x32dfc4) {
    let _0x1b951c = _0x521cdd - _0x32dfc4;
    let _0x4cad72 = 0;
    for (_0x2f7700 = 0; _0x2f7700 < _0x3781c5 && (_0x4cad72 < _0x1b951c || _0x2f7700 < 2);) {
      _0x4cad72 += ze(_0x3263d6[_0x2f7700]);
      _0x2f7700 += 1;
    }
    _0x2f7700 = Math.min(_0x3781c5, Math.max(_0x2f7700, 2));
  }
  return lu(_0x3263d6, _0x2f7700, _0x3781c5);
}
async function gu(_0x124b30, _0x294f0b, _0xf45033 = {}) {
  let _0x3d85d2 = Array.isArray(_0x124b30) ? _0x124b30.map(ie) : [];
  let _0x3d2813 = _0x3d85d2.map(ie);
  let _0x2fe19a = _0x294f0b > 0 ? _0x294f0b : Re();
  let _0x2f81f9 = _0xf45033.compressRatio > 0 ? _0xf45033.compressRatio : iu();
  let _0x299642 = Math.max(1024, Math.floor(_0x2fe19a * _0x2f81f9));
  let _0x512896 = _0xf45033.thresholdTokens > 0 ? Math.min(_0x2fe19a, Math.max(1024, Math.floor(_0xf45033.thresholdTokens))) : _0x299642;
  let _0xbf7b5e = _0xf45033.targetTokens > 0 ? Math.min(_0x512896, Math.max(1024, Math.floor(_0xf45033.targetTokens))) : _0x512896;
  let _0x33b766 = _0xf45033.keepRecent > 0 ? _0xf45033.keepRecent : ei();
  let _0x5a7b9b = _0xf45033.keepRecentTokens > 0 ? _0xf45033.keepRecentTokens : au();
  let _0x5d1dbd = _0xf45033.enabled ?? eu();
  let _0x17e134 = (_0xf45033.llmSummary ?? Do()) && typeof _0xf45033.summarizeFn == "function";
  let _0x1a4939 = No(_0x3d85d2);
  let _0x1cc26c = 0;
  let _0x290237 = 0;
  let _0x17e9f1 = 0;
  let _0x16ac1f = "none";
  let _0x4525ca = 0;
  let _0x56144d = [];
  if (_0x3d85d2.length === 0) {
    return {
      entries: _0x3d85d2,
      cacheEntries: _0x3d2813,
      tokens: 0,
      toolCompacted: 0,
      summarized: 0,
      dropped: 0,
      threshold: _0x512896,
      target: _0xbf7b5e,
      stages: [],
      reason: "none",
      summaryMode: "none"
    };
  }
  if (_0x5d1dbd) {
    let _0x25ed82 = si(_0x3d85d2, _0x33b766, _0x5a7b9b);
    let _0xfdee43 = Math.max(0, _0x3d85d2.length - _0x25ed82);
    let _0x248767 = cu(_0x3d85d2, {
      maxChars: _0xf45033.toolMaxChars || ti(),
      keepRecent: _0xfdee43
    });
    for (let _0x2e7e09 = 0; _0x2e7e09 < _0x3d85d2.length; _0x2e7e09++) {
      _0x3d85d2[_0x2e7e09] = _0x248767.entries[_0x2e7e09];
    }
    for (let _0x513128 = 0; _0x513128 < _0x3d2813.length; _0x513128++) {
      if (_0x513128 < _0x3d85d2.length) {
        _0x3d2813[_0x513128] = ie(_0x3d85d2[_0x513128]);
      }
    }
    _0x1cc26c = _0x248767.compacted;
    _0x1a4939 = No(_0x3d85d2);
    if (_0x1cc26c > 0) {
      _0x56144d.push("tool");
    }
  }
  if (!_0x5d1dbd || _0x1a4939 <= _0x512896) {
    if (_0x1a4939 > _0x2fe19a) {
      let _0x55b065 = Yn(_0x3d85d2, _0x2fe19a);
      _0x17e9f1 = _0x55b065.dropped;
      if (_0x17e9f1 > 0) {
        _0x56144d.push("drop");
      }
      let _0x5eba07 = Yn(_0x3d2813, _0x2fe19a);
      return {
        entries: _0x55b065.entries,
        cacheEntries: _0x5eba07.entries.map(ie),
        tokens: _0x55b065.tokens,
        toolCompacted: _0x1cc26c,
        summarized: 0,
        dropped: Math.max(_0x17e9f1, _0x5eba07.dropped),
        threshold: _0x512896,
        target: _0xbf7b5e,
        stages: _0x56144d.length ? _0x56144d : _0x55b065.dropped > 0 ? ["drop"] : [],
        reason: _0x56144d.length ? _0x56144d.join("+") : _0x55b065.dropped > 0 ? "drop" : "none",
        summaryMode: "none"
      };
    }
    return {
      entries: _0x3d85d2,
      cacheEntries: _0x3d2813,
      tokens: _0x1a4939,
      toolCompacted: _0x1cc26c,
      summarized: 0,
      dropped: 0,
      threshold: _0x512896,
      target: _0xbf7b5e,
      stages: _0x56144d,
      reason: _0x56144d.length ? _0x56144d.join("+") : "none",
      summaryMode: "none"
    };
  }
  if (_0x1a4939 > _0xbf7b5e && _0x3d85d2.length > _0x33b766 + 1) {
    let _0x26cbc7 = mu(_0x3d85d2, _0x33b766, _0x5a7b9b, _0x1a4939, _0xbf7b5e, _0x2fe19a);
    if (_0x26cbc7 >= 2) {
      let _0x5169a3 = _0x3d2813.slice(0, _0x26cbc7);
      if (_0x5169a3.length !== 1 || !Ht(_0x5169a3[0])) {
        let _0x4cf6f9 = null;
        if (_0x17e134) {
          try {
            let _0xdb7ac6 = hu(_0x5169a3, Js());
            if (_0xdb7ac6.text) {
              let _0x236eb8 = await _0xf45033.summarizeFn({
                transcript: _0xdb7ac6.text,
                messageCount: _0x5169a3.length,
                inputTokens: _0xdb7ac6.tokens,
                sessionKey: _0xf45033.sessionKey || ""
              });
              let _0x4e4f82 = String(_0x236eb8 || "").trim();
              if (_0x4e4f82.length >= 40) {
                _0x4cf6f9 = ii(_0x4e4f82.startsWith(Tt) ? _0x4e4f82 : Tt + "\nLLM summary of " + _0x5169a3.length + " earlier messages:\n" + _0x4e4f82, "llm");
                _0x16ac1f = "llm";
              }
            }
          } catch {
            _0x4cf6f9 = null;
          }
        }
        if (!_0x4cf6f9) {
          let _0xf0b107 = pu(_0x5169a3);
          _0x4cf6f9 = _0xf0b107.entry;
          _0x4525ca = _0xf0b107.anchors;
          _0x16ac1f = _0x17e134 ? "extract_fallback" : "extract";
        }
        let _0x95ab9a = _0x3d85d2.slice(_0x26cbc7);
        let _0x3c7204 = _0x3d2813.slice(_0x26cbc7);
        _0x3d85d2.length = 0;
        _0x3d85d2.push(_0x4cf6f9, ..._0x95ab9a);
        _0x3d2813 = [ie(_0x4cf6f9), ..._0x3c7204];
        _0x290237 = _0x5169a3.length;
        _0x1a4939 = No(_0x3d85d2);
        _0x56144d.push(_0x16ac1f === "llm" ? "sum_llm" : _0x16ac1f === "extract_fallback" ? "sum_extract_fb" : "sum_extract");
      }
    }
  }
  if (_0x1a4939 > _0x2fe19a) {
    let _0x27a1c9 = Yn(_0x3d85d2, _0x2fe19a);
    _0x3d85d2.length = 0;
    for (let _0xf49cb4 of _0x27a1c9.entries) {
      _0x3d85d2.push(_0xf49cb4);
    }
    _0x17e9f1 = _0x27a1c9.dropped;
    _0x1a4939 = _0x27a1c9.tokens;
    if (_0x17e9f1 > 0) {
      _0x56144d.push("drop");
    }
  }
  let _0x4495f2 = Yn(_0x3d2813, _0x2fe19a);
  _0x3d2813 = _0x4495f2.entries.map(ie);
  if (_0x4495f2.dropped > _0x17e9f1) {
    _0x17e9f1 = _0x4495f2.dropped;
    if (!_0x56144d.includes("drop")) {
      _0x56144d.push("drop");
    }
  }
  return {
    entries: _0x3d85d2,
    cacheEntries: _0x3d2813,
    tokens: _0x1a4939,
    toolCompacted: _0x1cc26c,
    summarized: _0x290237,
    dropped: _0x17e9f1,
    anchors: _0x4525ca,
    threshold: _0x512896,
    target: _0xbf7b5e,
    stages: _0x56144d,
    summaryMode: _0x16ac1f,
    reason: _0x56144d.length ? _0x56144d.join("+") : "none"
  };
}
async function ai(_0x1e7468, _0xe67d63 = {}) {
  let _0x2a6fab = Ys(_0xe67d63.cascadeId);
  if (!_0x2a6fab) {
    return vs(_0x1e7468, _0xe67d63);
  }
  let _0x402fd0 = jn.get(_0x2a6fab) || Promise.resolve();
  let _0x547366;
  let _0x534762 = new Promise(_0x300b58 => {
    _0x547366 = _0x300b58;
  });
  jn.set(_0x2a6fab, _0x534762);
  await _0x402fd0;
  try {
    return await vs(_0x1e7468, _0xe67d63);
  } finally {
    _0x547366();
    if (jn.get(_0x2a6fab) === _0x534762) {
      jn.delete(_0x2a6fab);
    }
  }
}
async function vs(_0x1ff9ac, _0x4acc97 = {}) {
  fn();
  let _0x2ebf6d = _0x4acc97.enabled ?? vo();
  let _0x970742 = Gs(_0x1ff9ac);
  let _0x22d215 = _0x970742.length;
  let _0x15081b = _0x970742.reduce((_0x4417c3, _0x47a53e) => _0x4417c3 + ze(_0x47a53e), 0);
  let _0x2e645a = Wl({
    systemPrompt: _0x4acc97.systemPrompt || "",
    tools: _0x4acc97.tools,
    outputReserve: _0x4acc97.outputReserve
  });
  if (!_0x2ebf6d || _0x970742.length === 0) {
    return {
      entries: _0x970742,
      messages: Bt(_0x970742.map(_0x494d28 => _0x494d28.message)),
      restored: false,
      sessionKey: "",
      inboundMsgs: _0x22d215,
      inboundTokens: _0x15081b,
      restoredMsgs: _0x22d215,
      restoredTokens: _0x15081b,
      totalTokens: _0x15081b + _0x2e645a,
      overheadTokens: _0x2e645a,
      prepended: 0,
      skippedHead: 0,
      dropped: 0,
      reason: _0x2ebf6d ? "empty" : "disabled"
    };
  }
  ql();
  let _0x2ce939 = Bl();
  let _0xef086f = _0x970742.some(_0x36eb21 => ot(_0x36eb21.fp));
  let _0x150fd8 = Ys(_0x4acc97.cascadeId);
  let _0x58a708 = _0x150fd8 && ne.has(_0x150fd8) ? _0x150fd8 : zl(_0x970742);
  if (_0x150fd8 && _0x58a708 && _0x58a708 !== _0x150fd8) {
    jl(_0x58a708, _0x150fd8);
    _0x58a708 = _0x150fd8;
  } else if (_0x150fd8 && !_0x58a708) {
    _0x58a708 = _0x150fd8;
  }
  let _0x3a4d53 = _0x58a708 ? ne.get(_0x58a708)?.entries || [] : [];
  let _0x11f537 = _0x3a4d53.length ? Ws(_0x3a4d53, _0x970742, _0xef086f ? 1 : _0x2ce939) : null;
  if (!_0x150fd8 && (!_0x58a708 || !_0x11f537)) {
    let _0x2c62d4 = Vl(_0x970742, _0x2ce939);
    if (_0x2c62d4.sessionKey && _0x2c62d4.overlap) {
      _0x58a708 = _0x2c62d4.sessionKey;
      _0x3a4d53 = _0x2c62d4.cached;
      _0x11f537 = _0x2c62d4.overlap;
    }
  }
  let _0x1e6bdb = !!_0x58a708 && !!_0x3a4d53.length && !_0x11f537 && (!!_0x150fd8 || !!_0xef086f && !!(Ul(_0x3a4d53, _0x970742) > 0));
  let _0x364a8a;
  let _0x368994 = 0;
  let _0x35a1a6 = 0;
  let _0x5eafbd = "pass";
  let _0x3bfbf6 = null;
  let _0xdb9ee2 = Yl() && Gl(_0x970742);
  if (_0x11f537) {
    let {
      cachedStart: _0x5baf7c,
      incomingStart: _0x174b45,
      matched: _0x5b226b
    } = _0x11f537;
    _0x35a1a6 = _0x174b45;
    if (_0x150fd8) {
      let _0x52c42b = xs(_0x3a4d53, _0x970742.slice(_0x174b45 + _0x5b226b));
      if (_0xdb9ee2) {
        _0x3bfbf6 = _0x52c42b;
        _0x364a8a = _0x970742.map(ie);
        _0x368994 = 0;
        _0x35a1a6 = 0;
      } else {
        _0x364a8a = _0x52c42b;
        _0x368994 = Math.max(0, _0x3a4d53.length - _0x5b226b);
      }
    } else {
      let _0x1558db = _0x3a4d53.slice(0, _0x5baf7c).map(ie);
      _0x368994 = _0x1558db.length;
      let _0x318198 = _0x970742.slice(_0x174b45).map(ie);
      _0x364a8a = [..._0x1558db, ..._0x318198];
    }
    if (_0x3bfbf6) {
      _0x5eafbd = "client-checkpoint";
    } else if (_0x368994 > 0) {
      _0x5eafbd = "restored";
    } else if (_0x174b45 > 0) {
      _0x5eafbd = "anchor";
    } else {
      if (_0x5b226b >= _0x970742.length) {
        _0x5baf7c + _0x5b226b >= _0x3a4d53.length;
      }
      _0x5eafbd = "extend";
    }
  } else if (_0x1e6bdb && _0x150fd8) {
    let _0x45adb4 = Bo(_0x970742[0]);
    let _0x2629d2 = xs(_0x3a4d53, _0x970742, _0x45adb4);
    if (_0xdb9ee2) {
      _0x3bfbf6 = _0x2629d2;
      _0x364a8a = _0x970742.map(ie);
      _0x368994 = 0;
      _0x35a1a6 = 0;
      _0x5eafbd = "client-checkpoint";
    } else {
      _0x364a8a = _0x2629d2;
      _0x368994 = _0x3a4d53.length;
      _0x35a1a6 = _0x45adb4 ? 1 : 0;
      _0x5eafbd = _0x45adb4 ? "checkpoint-restored" : "protect-extend";
    }
  } else if (_0x1e6bdb && _0x970742.length < _0x3a4d53.length) {
    let _0xe09f90 = Is(_0x3a4d53, _0x970742);
    _0x364a8a = _0xe09f90.entries;
    _0x368994 = _0xe09f90.prepended;
    _0x5eafbd = _0xe09f90.reason;
  } else if (_0x1e6bdb) {
    let _0x421d94 = Is(_0x3a4d53, _0x970742);
    _0x364a8a = _0x421d94.entries;
    _0x368994 = _0x421d94.prepended;
    _0x5eafbd = _0x421d94.reason;
  } else {
    _0x58a708 = _0x58a708 || Kl(_0x970742);
    _0x364a8a = _0x970742.map(ie);
    _0x5eafbd = "new";
  }
  let _0x545b80 = _0x4acc97.tokenLimit || Re();
  let _0x11e157 = Math.max(1024, _0x545b80 - _0x2e645a);
  let _0x2d9c54 = $l(_0x11e157, _0x545b80);
  let _0x19d8b7 = _0x2d9c54 > 0 && _0x2d9c54 < _0x11e157;
  let _0x57ccbe = _0x19d8b7 ? vl(_0x2d9c54, _0x545b80) : 0;
  let _0x229c3d = _0x11e157;
  let _0xa484b9 = async () => gu(_0x364a8a, _0x229c3d, {
    enabled: _0x4acc97.compressEnabled,
    compressRatio: _0x4acc97.compressRatio,
    thresholdTokens: _0x19d8b7 ? _0x2d9c54 : undefined,
    targetTokens: _0x57ccbe || undefined,
    keepRecent: _0x4acc97.keepRecent,
    keepRecentTokens: _0x4acc97.keepRecentTokens,
    toolMaxChars: _0x4acc97.toolMaxChars,
    llmSummary: _0x4acc97.llmSummary,
    summarizeFn: _0x4acc97.summarizeFn,
    sessionKey: _0x58a708
  });
  let _0x3b798b;
  if (_0x58a708 && typeof _0x4acc97.summarizeFn == "function") {
    let _0x2eef50 = Gn.get(_0x58a708) || Promise.resolve();
    let _0x33fa4c;
    let _0x15fcb5 = new Promise(_0x12b805 => {
      _0x33fa4c = _0x12b805;
    });
    let _0x4facd4 = _0x2eef50.then(() => _0x15fcb5, () => _0x15fcb5);
    Gn.set(_0x58a708, _0x4facd4);
    try {
      await _0x2eef50;
      _0x3b798b = await _0xa484b9();
    } finally {
      _0x33fa4c();
      if (Gn.get(_0x58a708) === _0x4facd4) {
        Gn.delete(_0x58a708);
      }
    }
  } else {
    _0x3b798b = await _0xa484b9();
  }
  let _0x4996f3 = _0x3b798b.entries;
  let _0x10ea82 = (_0x3bfbf6 || _0x3b798b.cacheEntries || _0x4996f3).map(ie);
  if (_0x3b798b.reason && _0x3b798b.reason !== "none") {
    _0x5eafbd = _0x5eafbd === "pass" || _0x5eafbd === "extend" || _0x5eafbd === "new" || _0x5eafbd === "restored" || _0x5eafbd === "anchor" ? _0x5eafbd + "+" + _0x3b798b.reason : _0x5eafbd + "+" + _0x3b798b.reason;
  }
  {
    let _0x20606d = ns(_0x10ea82.map(_0x2d85ae => _0x2d85ae.message));
    if (_0x20606d.droppedUses > 0 || _0x20606d.dedupedUses > 0 || _0x20606d.droppedResults > 0) {
      let _0x1afe36 = [];
      for (let _0x12e101 = 0; _0x12e101 < _0x10ea82.length; _0x12e101++) {
        let _0x4570fd = _0x20606d.messages[_0x12e101];
        if (!_0x4570fd) {
          continue;
        }
        let _0x2c464e = ie(_0x10ea82[_0x12e101]);
        _0x2c464e.message = {
          role: _0x4570fd.role,
          content: typeof _0x4570fd.content == "string" ? _0x4570fd.content : JSON.parse(JSON.stringify(_0x4570fd.content))
        };
        _0x2c464e.fp = Xn(_0x2c464e);
        _0x1afe36.push(_0x2c464e);
      }
      _0x10ea82 = _0x1afe36;
    }
  }
  ne.set(_0x58a708, {
    entries: _0x10ea82.map(ie),
    updatedAt: Date.now(),
    hits: (ne.get(_0x58a708)?.hits || 0) + 1
  });
  Xl(_0x58a708, _0x10ea82);
  Vs();
  Vn();
  let _0x97a72c = _0x4996f3.reduce((_0x296731, _0x2c6924) => _0x296731 + ze(_0x2c6924), 0);
  let _0x48a621 = _0x97a72c + _0x2e645a;
  return {
    entries: _0x4996f3,
    messages: Bt(_0x4996f3.map(_0x950a4c => _0x950a4c.message)),
    restored: _0x368994 > 0,
    sessionKey: _0x58a708,
    inboundMsgs: _0x22d215,
    inboundTokens: _0x15081b,
    restoredMsgs: _0x4996f3.length,
    restoredTokens: _0x97a72c,
    totalTokens: _0x48a621,
    overheadTokens: _0x2e645a,
    historyBudget: _0x229c3d,
    hardHistoryBudget: _0x11e157,
    softTokenLimit: _0x19d8b7 ? _0x2d9c54 : 0,
    compressTarget: _0x57ccbe,
    compressThreshold: _0x3b798b.threshold,
    toolCompacted: _0x3b798b.toolCompacted || 0,
    summarized: _0x3b798b.summarized || 0,
    summaryMode: _0x3b798b.summaryMode || "none",
    anchors: _0x3b798b.anchors || 0,
    prepended: _0x368994,
    skippedHead: _0x35a1a6,
    dropped: _0x3b798b.dropped || 0,
    compressReason: _0x3b798b.reason || "none",
    reason: _0x5eafbd
  };
}
function Ho() {
  while (pe.size > bl) {
    let _0x16d736 = "";
    let _0x5849f3 = Infinity;
    for (let [_0x3a58a0, _0xc3c5ac] of pe) {
      if (_0xc3c5ac.ts < _0x5849f3) {
        _0x5849f3 = _0xc3c5ac.ts;
        _0x16d736 = _0x3a58a0;
      }
    }
    if (!_0x16d736) {
      break;
    }
    pe.delete(_0x16d736);
  }
}
function Ft(_0x2e11fa = {}) {
  fn();
  let _0x4e7e6c = String(_0x2e11fa.sessionKey || "").trim();
  let _0xe14b2a;
  if (Object.prototype.hasOwnProperty.call(_0x2e11fa, "tokens")) {
    _0xe14b2a = Math.max(0, Number(_0x2e11fa.tokens) || 0);
  } else {
    let _0x33de55 = _0x4e7e6c ? pe.get(_0x4e7e6c) : null;
    _0xe14b2a = Math.max(0, Number(_0x33de55?.tokens ?? _e.tokens) || 0);
  }
  let _0x75e0c5 = Math.max(0, Number(_0x2e11fa.limit) || Re());
  let _0x1fd2e6 = {
    tokens: _0xe14b2a,
    limit: _0x75e0c5,
    inboundTokens: Math.max(0, Number(_0x2e11fa.inboundTokens) || 0),
    restoredMsgs: Math.max(0, Number(_0x2e11fa.restoredMsgs) || 0),
    inboundMsgs: Math.max(0, Number(_0x2e11fa.inboundMsgs) || 0),
    reason: String(_0x2e11fa.reason || ""),
    cascadeId: String(_0x2e11fa.cascadeId || _e.cascadeId || ""),
    sessionKey: _0x4e7e6c || String(_e.sessionKey || ""),
    ts: Date.now(),
    activityTs: Date.now()
  };
  _e = _0x1fd2e6;
  if (_0x4e7e6c) {
    pe.set(_0x4e7e6c, {
      ..._0x1fd2e6,
      sessionKey: _0x4e7e6c
    });
    Ho();
  }
  Vn();
  return {
    ..._0x1fd2e6
  };
}
function Fo(_0x3a8c5d, _0x5ed46d = {}) {
  fn();
  let _0x1c4301 = Math.max(0, Number(_0x3a8c5d) || 0);
  if (!(_0x1c4301 > 0)) {
    return {
      ok: false,
      updated: 0
    };
  }
  let _0xaba4d8 = String(_0x5ed46d.cascadeId || "").trim();
  let _0x3b9330 = String(_0x5ed46d.reason || "config-limit");
  let _0x3b64c9 = Date.now();
  _e = {
    ..._e,
    limit: _0x1c4301,
    reason: _0x3b9330,
    cascadeId: _0xaba4d8 || String(_e.cascadeId || ""),
    ts: _0x3b64c9
  };
  let _0x15780f = 0;
  for (let [_0x1ff399, _0x423446] of pe) {
    if (_0x423446) {
      if (_0xaba4d8) {
        let _0x4eae94 = String(_0x423446.cascadeId || "").trim();
        if (_0x4eae94 && _0x4eae94 !== _0xaba4d8) {
          continue;
        }
      }
      pe.set(_0x1ff399, {
        ..._0x423446,
        limit: _0x1c4301,
        reason: _0x3b9330,
        ts: _0x3b64c9,
        sessionKey: _0x1ff399
      });
      _0x15780f += 1;
    }
  }
  Vn();
  return {
    ok: true,
    updated: _0x15780f,
    limit: _0x1c4301
  };
}
function ci() {
  fn();
  return {
    ..._e,
    sessionKey: String(_e.sessionKey || "")
  };
}
function li(_0x5b14b8) {
  fn();
  let _0x2798b7 = Array.isArray(_0x5b14b8) ? _0x5b14b8 : [];
  let _0x462800 = "";
  for (let _0x34a71b of _0x2798b7) {
    let _0x5a499a = String(_0x34a71b || "").trim();
    if (!_0x5a499a) {
      continue;
    }
    let _0x29e84f = Le.get("id:" + _0x5a499a);
    if (_0x29e84f) {
      if (_0x462800 && _0x29e84f !== _0x462800) {
        return null;
      }
      _0x462800 = _0x29e84f;
    }
  }
  if (!_0x462800) {
    return null;
  }
  let _0x6201ed = pe.get(_0x462800);
  if (_0x6201ed) {
    return {
      ..._0x6201ed
    };
  } else {
    return null;
  }
}
var xe = {
  UNSPECIFIED: 0,
  INCOMPLETE: 1,
  STOP_PATTERN: 2,
  MAX_TOKENS: 3,
  FUNCTION_CALL: 10,
  ERROR: 13
};
function Kt() {
  let _0x5310ff = Date.now();
  let _0x17ba7b = Math.floor(_0x5310ff / 1000);
  let _0x48adc9 = _0x5310ff % 1000 * 1000000;
  return Buffer.concat([me(1, _0x17ba7b), me(2, _0x48adc9)]);
}
function _u(_0xb180f8, _0x4e0ea8) {
  let _0x25bf0e = Buffer.alloc(8);
  _0x25bf0e.writeDoubleBE(_0x4e0ea8, 0);
  _0x25bf0e.swap64();
  return rn(_0xb180f8, _0x25bf0e);
}
function St(_0x39bc0f, _0x1c583e, _0x3e0b04) {
  let _0x721a53 = [te(1, _0x39bc0f), Ie(2, Kt())];
  if (_0x1c583e) {
    _0x721a53.push(te(3, _0x1c583e));
  }
  if (_0x3e0b04 > 0) {
    _0x721a53.push(me(4, _0x3e0b04));
  }
  return Buffer.concat(_0x721a53);
}
function Yt(_0x5c96ac, _0x6b6ddf) {
  return Buffer.concat([te(1, _0x5c96ac), Ie(2, Kt()), te(9, _0x6b6ddf)]);
}
function Gt(_0x4c28e6, _0x48cbaa) {
  let _0x188b4c = [te(1, _0x4c28e6), Ie(2, Kt())];
  for (let _0x50e2c9 of _0x48cbaa) {
    let _0x5c66a7 = Buffer.concat([te(1, _0x50e2c9.id ?? ""), te(2, _0x50e2c9.name ?? ""), te(3, _0x50e2c9.arguments_json ?? "")]);
    _0x188b4c.push(Ie(6, _0x5c66a7));
  }
  return Buffer.concat(_0x188b4c);
}
function jt(_0x765967, _0x1784e6, _0x255255, _0x2b8af9) {
  let _0x12a00d = [te(1, _0x765967), Ie(2, Kt()), me(5, _0x1784e6)];
  if (_0x2b8af9 != null) {
    _0x12a00d.push(_u(12, _0x2b8af9));
  }
  if (_0x255255) {
    _0x12a00d.push(te(20, _0x255255));
  }
  return Buffer.concat(_0x12a00d);
}
function ui(_0x2d9422, _0x45cdcb) {
  return Buffer.concat([te(1, _0x2d9422), Ie(2, Kt()), te(10, _0x45cdcb)]);
}
function di(_0x5a0b60, _0x3bcc70) {
  return Buffer.concat([te(1, _0x5a0b60), Ie(2, Kt()), te(3, _0x3bcc70), me(5, xe.ERROR)]);
}
import _0xc52bb7 from "node:crypto";
import _0x474a4c from "node:zlib";
var Yo = 160;
var fi = "Devin BYOK Bridge";
var Go = "[" + fi + "]";
var pi = "[XY Devin Byok]";
function Su(_0x3ef360) {
  return _0x3ef360.startsWith(Go) || _0x3ef360.startsWith(pi);
}
function yu(_0x544084) {
  let _0x585224 = String(_0x544084 || "");
  for (let _0xb503f of [Go, pi]) {
    if (_0x585224.startsWith(_0xb503f)) {
      return _0x585224.slice(_0xb503f.length).replace(/^\s+/, "");
    }
  }
  return _0x585224;
}
function re(_0x49bc99, _0x15a094) {
  return Go + " " + _0x49bc99 + (_0x15a094 ? "：" + _0x15a094 : "");
}
var yt = "API_KEY_QUOTA_EXHAUSTED";
function Ve(_0x3aea34, _0x43c1f0) {
  if (Number(_0x43c1f0) === 402) {
    return true;
  }
  let _0x4cf088 = String(_0x3aea34 || "");
  if (!_0x4cf088) {
    return false;
  }
  let _0x13db65 = _0x4cf088.toLowerCase();
  return !!/api[_-]?key[_-]?quota[_-]?exhausted/i.test(_0x4cf088) || !!/quota[_-]?exhausted/i.test(_0x4cf088) || !!/insufficient[_-]?quota/i.test(_0x4cf088) || !!/billing[_-]?hard[_-]?limit/i.test(_0x4cf088) || !!_0x13db65.includes("额度已用完") || !!_0x13db65.includes("额度不足") || !!_0x13db65.includes("额度用完") || !!_0x13db65.includes("余额不足") || !!_0x13db65.includes("余额已用完") || !!_0x13db65.includes("没钱") || !!_0x13db65.includes("quota") && !!/exhaust|exceed|used\s*up|deplet|insufficient|run\s*out/.test(_0x13db65) || !!_0x13db65.includes("credit") && !!/exhaust|exceed|deplet|insufficient|run\s*out/.test(_0x13db65) || !!_0x13db65.includes("insufficient") && !!/credit|balance|fund/.test(_0x13db65);
}
function jo(_0x34b355 = "") {
  let _0x46312f = "非临时限流（" + yt + "）。请更换 Key 或充值后再试";
  let _0x31974b = String(_0x34b355 || "").trim();
  let _0x1e72e4 = _0x31974b && !/rate[\s_-]?limit|too many requests/i.test(_0x31974b) ? " · " + _0x31974b : "";
  return re("API Key 额度已用完", _0x46312f + _0x1e72e4);
}
function Wo(_0x5ee38d, {
  providerLabel: _0x1621aa = "",
  providerName: _0x27786a = "",
  model: _0xc1cf58 = "",
  requestedModel: _0x1b8762 = ""
} = {}) {
  if (!_0x5ee38d) {
    return {
      providerLabel: _0x1621aa,
      providerName: _0x27786a,
      endpoint: "",
      model: _0xc1cf58,
      requestedModel: _0x1b8762
    };
  }
  let _0x1ec3c1 = _0x5ee38d.useHttp ? "http" : "https";
  let _0x100fa6 = _0x5ee38d.parsed || {};
  let _0xbd994 = _0x100fa6.port ?? (_0x5ee38d.useHttp ? 80 : 443);
  let _0x4302ec = _0x1ec3c1 === "http" && _0xbd994 === 80 || _0x1ec3c1 === "https" && _0xbd994 === 443 ? _0x100fa6.hostname : _0x100fa6.hostname + ":" + _0xbd994;
  let _0x3d1533 = _0x5ee38d.apiPath || "";
  return {
    providerLabel: _0x1621aa,
    providerName: _0x27786a || "",
    endpoint: _0x4302ec ? _0x1ec3c1 + "://" + _0x4302ec + _0x3d1533 : _0x3d1533,
    model: _0xc1cf58 || "",
    requestedModel: _0x1b8762 || ""
  };
}
function zo(_0x8467ae, _0x26bffc) {
  if (Ve(_0x8467ae, _0x26bffc)) {
    return false;
  }
  if (Number(_0x26bffc) === 429) {
    return true;
  }
  let _0x2a065b = String(_0x8467ae || "").toLowerCase();
  if (_0x2a065b) {
    return /rate[\s_-]?limit|too many requests/.test(_0x2a065b);
  } else {
    return false;
  }
}
function Jn({
  host: _0x50929d = "网关",
  model: _0x527f4f,
  timeoutSec: _0x40c872,
  providerName: _0x3ac459 = ""
}) {
  let _0x12fb97 = _0x3ac459 ? "「" + _0x3ac459 + "」" : _0x50929d ? "「" + _0x50929d + "」" : "上游";
  let _0x171ade = _0x527f4f ? "，请检查模型「" + _0x527f4f + "」是否可用" : "";
  return _0x40c872 + " 秒内 " + _0x12fb97 + " 无有效回复" + _0x171ade;
}
function Vo({
  providerLabel: _0x5eb4c6,
  host: _0x38f437,
  timeoutSec: _0x50e0af,
  providerName: _0x2df662 = ""
}) {
  return (_0x2df662 ? "「" + _0x2df662 + "」" : _0x5eb4c6 + "（" + _0x38f437 + "）") + " 流式连接中断，请重试";
}
function Wt(_0x394dec) {
  if (_0x394dec == null || _0x394dec === "") {
    return "";
  }
  if (typeof _0x394dec == "object") {
    if (_0x394dec.message != null && typeof _0x394dec.message != "object") {
      return String(_0x394dec.message);
    }
    if (_0x394dec.error != null) {
      return Wt(_0x394dec.error);
    }
    try {
      return JSON.stringify(_0x394dec);
    } catch {
      return String(_0x394dec);
    }
  }
  let _0x259eed = String(_0x394dec).trim();
  if (!_0x259eed) {
    return "";
  }
  let _0x57578f = _0x259eed.indexOf("data:");
  if (_0x57578f > 0) {
    let _0x3b6f87 = _0x259eed.slice(0, _0x57578f).trim();
    let _0x29e6c5 = _0x259eed.slice(_0x57578f + 5).trim();
    let _0x657302 = Wt(_0x3b6f87);
    let _0x3d81b1 = Wt(_0x29e6c5);
    return [_0x657302, _0x3d81b1].filter(_0x215969 => _0x215969 && !/^\s*[{[]/.test(_0x215969)).join("；") || _0x3d81b1 || _0x657302 || _0x259eed;
  }
  if (_0x259eed.startsWith("{") || _0x259eed.startsWith("[")) {
    try {
      let _0x2b2abe = JSON.parse(_0x259eed);
      let _0xbb2495 = Wt(_0x2b2abe.error?.message ?? _0x2b2abe.error ?? _0x2b2abe.message ?? _0x2b2abe);
      return _0xbb2495 || "";
    } catch {
      let _0x3cba12 = [..._0x259eed.matchAll(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/g)];
      for (let _0x17d765 = _0x3cba12.length - 1; _0x17d765 >= 0; _0x17d765--) {
        let _0x33807e = _0x3cba12[_0x17d765];
        try {
          let _0x4283ff = JSON.parse("\"" + _0x33807e[1] + "\"");
          if (_0x4283ff) {
            return _0x4283ff;
          }
        } catch {
          let _0x422202 = _0x33807e[1].replace(/\\"/g, "\"").replace(/\\n/g, "\n");
          if (_0x422202) {
            return _0x422202;
          }
        }
      }
    }
    return "";
  }
  return _0x259eed;
}
function hn(_0x21a4fb) {
  return String(_0x21a4fb || "").replace(/(?:sk-[a-zA-Z0-9_-]{10,}|Bearer\s+\S+)/g, "[REDACTED]").replace(/(?:key-[a-zA-Z0-9_-]{10,})/g, "[REDACTED]");
}
function qn(_0x26157f, _0x547929 = {}) {
  let _0x4bab86;
  if (Buffer.isBuffer(_0x26157f)) {
    _0x4bab86 = _0x26157f;
  } else if (Array.isArray(_0x26157f)) {
    _0x4bab86 = Buffer.concat(_0x26157f);
  } else {
    _0x4bab86 = Buffer.from(String(_0x26157f || ""), "utf8");
  }
  let _0x7a4f16 = String(_0x547929["content-encoding"] || "").toLowerCase();
  try {
    if (_0x7a4f16.includes("br")) {
      _0x4bab86 = _0x474a4c.brotliDecompressSync(_0x4bab86);
    } else if (_0x7a4f16.includes("gzip")) {
      _0x4bab86 = _0x474a4c.gunzipSync(_0x4bab86);
    } else if (_0x7a4f16.includes("deflate")) {
      _0x4bab86 = _0x474a4c.inflateSync(_0x4bab86);
    }
  } catch {}
  return _0x4bab86.toString("utf8");
}
function Xo(_0x589c04, _0x5792a3) {
  let _0x1df6bc = [];
  _0x589c04.on("data", _0x4e97ff => _0x1df6bc.push(Buffer.isBuffer(_0x4e97ff) ? _0x4e97ff : Buffer.from(_0x4e97ff)));
  _0x589c04.on("end", () => {
    _0x5792a3(qn(_0x1df6bc, _0x589c04.headers || {}));
  });
  _0x589c04.on("error", () => {
    _0x5792a3(qn(_0x1df6bc, _0x589c04.headers || {}));
  });
}
function Eu(_0x46f312, _0x472193) {
  let _0x5a3bdf = String(_0x46f312 || "").trim();
  if (_0x5a3bdf) {
    return hn(_0x5a3bdf);
  } else if (_0x472193) {
    return "HTTP " + _0x472193;
  } else {
    return "";
  }
}
function Ou(_0x1b1c5d, _0x529f8f, _0x583be6 = {}) {
  let _0x1627bf = typeof _0x1b1c5d == "string" ? _0x1b1c5d : qn(_0x1b1c5d, _0x583be6.headers || {});
  let _0xc6d37d = Jo(_0x1627bf);
  if (_0xc6d37d && !/^\s*[{[]/.test(_0xc6d37d)) {
    if (_0x529f8f >= 500) {
      return "HTTP " + _0x529f8f + "：" + _0xc6d37d;
    } else {
      return _0xc6d37d;
    }
  } else if (_0x529f8f >= 500) {
    if (_0x529f8f) {
      return "HTTP " + _0x529f8f + "，联系上游处理";
    } else {
      return "联系上游处理";
    }
  } else {
    return Eu(_0x1627bf, _0x529f8f) || (_0x529f8f ? "HTTP " + _0x529f8f : "");
  }
}
function qo(_0x3c4387) {
  let _0x1d910a = String(_0x3c4387 || "").trim();
  if (!_0x1d910a) {
    return "";
  }
  if (_0x1d910a.startsWith("{")) {
    try {
      if (JSON.parse(_0x1d910a)?.error?.type === "upstream_error") {
        return "联系上游处理";
      }
    } catch {}
    let _0x26a054 = Jo(_0x1d910a);
    if (_0x26a054) {
      return _0x26a054;
    }
  }
  let _0x2b1833 = _0x1d910a.match(/^error code:\s*(\d+)/i);
  if (_0x2b1833) {
    let _0x2bc5f9 = parseInt(_0x2b1833[1], 10);
    if (_0x2bc5f9 >= 500) {
      return "HTTP " + _0x2bc5f9 + "，联系上游处理";
    }
  }
  if (/upstream_error|upstream request failed|no available accounts/i.test(_0x1d910a)) {
    return "联系上游处理";
  } else {
    return _0x1d910a;
  }
}
function mn(_0x2a43cc) {
  if (_0x2a43cc == null || _0x2a43cc === "") {
    return "";
  }
  if (typeof _0x2a43cc == "string") {
    return hn(_0x2a43cc.trim());
  }
  try {
    return hn(JSON.stringify(_0x2a43cc));
  } catch {
    return hn(String(_0x2a43cc));
  }
}
function Jo(_0x335689) {
  let _0x2e809d = String(_0x335689 || "").trim();
  if (!_0x2e809d || /<!doctype\s+html/i.test(_0x2e809d) || /<html[\s>]/i.test(_0x2e809d)) {
    return "";
  }
  let _0x15200a = Wt(_0x2e809d);
  if (_0x15200a) {
    return _0x15200a;
  }
  try {
    let _0x386a96 = JSON.parse(_0x2e809d);
    return Wt(_0x386a96.error?.message ?? _0x386a96.error ?? _0x386a96.message ?? _0x386a96);
  } catch {
    return "";
  }
}
function Qo(_0x2ffbe4, _0x8e46b3, _0x429c47, _0x5ef8b5 = {}) {
  if (Ve(_0x429c47, _0x8e46b3)) {
    let _0x2ddffd = typeof _0x429c47 == "string" ? _0x429c47 : qn(_0x429c47, _0x5ef8b5.headers || {});
    return jo(Jo(_0x2ddffd));
  }
  return Ou(_0x429c47, _0x8e46b3, _0x5ef8b5);
}
function Zo(_0x389e26) {
  let _0x7b969d = String(_0x389e26 ?? "").trim();
  if (_0x7b969d) {
    if (Su(_0x7b969d)) {
      return _0x7b969d;
    } else {
      return hn(_0x7b969d);
    }
  } else {
    return re("未知错误", "请查看 Output → " + fi);
  }
}
function xu(_0x4a3bf9) {
  let _0x589a8e = [];
  for (let _0x16ba9f = 0; _0x16ba9f < _0x4a3bf9.length; _0x16ba9f += Yo) {
    _0x589a8e.push(_0x4a3bf9.slice(_0x16ba9f, _0x16ba9f + Yo));
  }
  if (_0x589a8e.length) {
    return _0x589a8e;
  } else {
    return [""];
  }
}
function gn(_0x347dc3, _0x2aab04) {
  let _0x3685de = yu(Zo(_0x2aab04));
  if (_0x3685de.length <= Yo) {
    return [di(_0x347dc3, _0x3685de)];
  }
  let _0x57f798 = [];
  xu(_0x3685de).forEach((_0x1fafa1, _0x5d35e1) => {
    _0x57f798.push(St(_0x347dc3, _0x1fafa1, _0x5d35e1 + 1));
  });
  _0x57f798.push(jt(_0x347dc3, xe.ERROR, ""));
  return _0x57f798;
}
function Iu(_0x27eb46, _0x47beea, _0x1f3ce0) {
  for (let _0x1775f6 of gn(_0x47beea, _0x1f3ce0)) {
    _0x27eb46.write(ge(_0x1775f6));
  }
}
function zt(_0x53bf8b, _0x6387d1) {
  if (!_0x53bf8b || _0x53bf8b.writableEnded) {
    return;
  }
  let _0x50f588 = _0xc52bb7.randomUUID();
  try {
    if (!_0x53bf8b.headersSent) {
      _0x53bf8b.writeHead(200, dt());
    }
    Iu(_0x53bf8b, _0x50f588, _0x6387d1);
    _0x53bf8b.write(et());
    _0x53bf8b.end();
  } catch (_0x7aa893) {
    console.error("  ❌ endChatWithError failed: " + _0x7aa893.message);
    try {
      if (!_0x53bf8b.writableEnded) {
        _0x53bf8b.end();
      }
    } catch {}
  }
}
import _0x1096b2 from "node:crypto";
var Ke = new Set();
var st = [];
var De = "default";
var hi = 0;
function mi(_0x269d1d) {
  let _0x300299 = typeof _0x269d1d == "string" ? Buffer.from(_0x269d1d) : _0x269d1d;
  let _0x2272ad = _0x300299.length;
  let _0x5ccb3a;
  if (_0x2272ad < 126) {
    _0x5ccb3a = Buffer.alloc(2);
    _0x5ccb3a[0] = 129;
    _0x5ccb3a[1] = _0x2272ad;
  } else if (_0x2272ad < 65536) {
    _0x5ccb3a = Buffer.alloc(4);
    _0x5ccb3a[0] = 129;
    _0x5ccb3a[1] = 126;
    _0x5ccb3a.writeUInt16BE(_0x2272ad, 2);
  } else {
    _0x5ccb3a = Buffer.alloc(10);
    _0x5ccb3a[0] = 129;
    _0x5ccb3a[1] = 127;
    _0x5ccb3a.writeBigUInt64BE(BigInt(_0x2272ad), 2);
  }
  return Buffer.concat([_0x5ccb3a, _0x300299]);
}
function Cu(_0x4bebfd) {
  if (_0x4bebfd.length < 2) {
    return null;
  }
  let _0x11469c = (_0x4bebfd[1] & 128) !== 0;
  let _0x4bb7e7 = _0x4bebfd[1] & 127;
  let _0x56043c = 2;
  if (_0x4bb7e7 === 126) {
    if (_0x4bebfd.length < 4) {
      return null;
    }
    _0x4bb7e7 = _0x4bebfd.readUInt16BE(2);
    _0x56043c = 4;
  } else if (_0x4bb7e7 === 127) {
    if (_0x4bebfd.length < 10) {
      return null;
    }
    _0x4bb7e7 = Number(_0x4bebfd.readBigUInt64BE(2));
    _0x56043c = 10;
  }
  if (_0x11469c) {
    if (_0x4bebfd.length < _0x56043c + 4 + _0x4bb7e7) {
      return null;
    }
    let _0x12e799 = _0x4bebfd.subarray(_0x56043c, _0x56043c + 4);
    _0x56043c += 4;
    let _0x53c140 = _0x4bebfd.subarray(_0x56043c, _0x56043c + _0x4bb7e7);
    for (let _0x36dcaa = 0; _0x36dcaa < _0x53c140.length; _0x36dcaa++) {
      _0x53c140[_0x36dcaa] ^= _0x12e799[_0x36dcaa & 3];
    }
    return _0x53c140.toString("utf8");
  }
  return _0x4bebfd.subarray(_0x56043c, _0x56043c + _0x4bb7e7).toString("utf8");
}
function ku(_0x288f53) {
  let _0x212aa7 = String(_0x288f53 || "").trim().toLowerCase().split("%", 1)[0];
  if (_0x212aa7 === "::1" || _0x212aa7 === "0:0:0:0:0:0:0:1") {
    return true;
  }
  let _0x2c8f24 = (_0x212aa7.startsWith("::ffff:") ? _0x212aa7.slice(7) : _0x212aa7).split(".");
  return _0x2c8f24.length === 4 && _0x2c8f24[0] === "127" && _0x2c8f24.every(_0x4d4f20 => /^\d{1,3}$/.test(_0x4d4f20) && Number(_0x4d4f20) <= 255);
}
function gi(_0x559d1a) {
  _0x559d1a.on("upgrade", (_0x53a2b9, _0x5d308b, _0x149815) => {
    if (_0x53a2b9.url !== "/ws/bridge") {
      _0x5d308b.destroy();
      return;
    }
    if (!ku(_0x5d308b.remoteAddress)) {
      console.warn("[WS Bridge] Rejected non-loopback client (" + (_0x5d308b.remoteAddress || "unknown") + ")");
      _0x5d308b.end("HTTP/1.1 403 Forbidden\r\nConnection: close\r\nContent-Length: 0\r\n\r\n");
      return;
    }
    let _0x45b2ba = _0x53a2b9.headers["sec-websocket-key"];
    if (!_0x45b2ba) {
      _0x5d308b.destroy();
      return;
    }
    let _0x270b4b = _0x1096b2.createHash("sha1").update(_0x45b2ba + "258EAFA5-E914-47DA-95CA-5AB5A3DF5B7A").digest("base64");
    _0x5d308b.setTimeout(0);
    _0x5d308b.setNoDelay(true);
    _0x5d308b.setKeepAlive(true, 30000);
    _0x5d308b.write("HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: " + _0x270b4b + "\r\n\r\n");
    Ke.add(_0x5d308b);
    console.log("[WS Bridge] Client connected (" + Ke.size + " active)");
    try {
      _0x5d308b.write(mi(JSON.stringify({
        type: "connected",
        injectedQueueSize: st.length
      })));
    } catch {}
    function _0x37ced7(_0x81d060) {
      if (_0x81d060.length < 2) {
        return;
      }
      let _0x2a8006 = _0x81d060[0] & 15;
      if (_0x2a8006 === 9) {
        let _0x500779 = Buffer.alloc(2);
        _0x500779[0] = 138;
        _0x500779[1] = 0;
        try {
          _0x5d308b.write(_0x500779);
        } catch {}
        return;
      }
      if (_0x2a8006 === 8) {
        Ke.delete(_0x5d308b);
        try {
          let _0x2c6688 = Buffer.alloc(2);
          _0x2c6688[0] = 136;
          _0x2c6688[1] = 0;
          _0x5d308b.write(_0x2c6688);
        } catch {}
        _0x5d308b.end();
        return;
      }
      if (_0x2a8006 === 1) {
        try {
          let _0x89dea2 = Cu(_0x81d060);
          if (!_0x89dea2) {
            return;
          }
          let _0x23451d = JSON.parse(_0x89dea2);
          Mu(_0x23451d);
        } catch {}
      }
    }
    if (_0x149815 && _0x149815.length > 0) {
      _0x37ced7(_0x149815);
    }
    _0x5d308b.on("data", _0x37ced7);
    _0x5d308b.on("close", () => {
      Ke.delete(_0x5d308b);
      console.log("[WS Bridge] Client disconnected (" + Ke.size + " active)");
    });
    _0x5d308b.on("error", _0x56bb5b => {
      console.log("[WS Bridge] Socket error: " + _0x56bb5b.message);
      Ke.delete(_0x5d308b);
    });
  });
  console.log("[WS Bridge] Listening on ws://localhost (upgrade on same port, path=/ws/bridge)");
}
function Xe(_0x39b2b3) {
  if (Ke.size === 0) {
    return;
  }
  let _0x8b1c7f = mi(JSON.stringify(_0x39b2b3));
  for (let _0x26a106 of Ke) {
    try {
      _0x26a106.write(_0x8b1c7f);
    } catch {
      Ke.delete(_0x26a106);
    }
  }
}
function Tn(_0x369934) {
  return ke(_0x369934 || De);
}
function _i(_0x33e2ad) {
  let _0x45e01b = ke(_0x33e2ad);
  let _0x3d21b4 = Date.now();
  let _0x15c421 = _0x45e01b !== De;
  De = _0x45e01b;
  if (_0x15c421 || _0x3d21b4 - hi > 3000) {
    hi = _0x3d21b4;
    Xe({
      type: "active_target",
      ts: _0x3d21b4,
      targetId: De
    });
  }
  return De;
}
function Ti() {
  return De;
}
function Sn(_0x4db770, _0x4b5955, _0x17b972, _0x3d7cc4 = null) {
  Xe({
    type: "tool_call",
    ts: Date.now(),
    targetId: Tn(_0x3d7cc4),
    tool: _0x4db770,
    args: typeof _0x4b5955 == "string" ? _0x4b5955.slice(0, 2000) : JSON.stringify(_0x4b5955).slice(0, 2000),
    callId: _0x17b972
  });
}
function Zn(_0x39bac7, _0x580373 = false, _0x11303c = null) {
  Xe({
    type: "ai_text",
    ts: Date.now(),
    targetId: Tn(_0x11303c),
    text: _0x39bac7.slice(0, 3000),
    partial: _0x580373
  });
}
function Si(_0x262b19, _0x2d789c, _0x3d88fc, _0x394b90 = null) {
  Xe({
    type: "chat_start",
    ts: Date.now(),
    targetId: Tn(_0x394b90),
    model: _0x262b19,
    messages: _0x2d789c,
    tools: _0x3d88fc
  });
}
function qt(_0x5cbdff, _0x28e2e6, _0x46ed53 = null) {
  Xe({
    type: "chat_end",
    ts: Date.now(),
    targetId: Tn(_0x46ed53),
    stopReason: _0x5cbdff,
    toolsCalled: _0x28e2e6 || []
  });
}
function yn(_0x10f3f5, _0x2b09fa, _0x4d4f35 = null) {
  if (_0x10f3f5 !== "timing" || process.env.XY_MONITOR_TIMING === "1") {
    Xe({
      type: "status",
      ts: Date.now(),
      targetId: Tn(_0x4d4f35),
      status: _0x10f3f5,
      detail: _0x2b09fa
    });
  }
}
var er = new Map();
var Vt = new Map();
var tr = new Map();
var it = new Map();
var Xt = new Map();
var _n = new Map();
function ke(_0x244d62) {
  return _0x244d62 || "default";
}
function eo(_0x45b8e0) {
  let _0x26f0a4 = ke(_0x45b8e0);
  if (!er.has(_0x26f0a4)) {
    er.set(_0x26f0a4, []);
  }
  return er.get(_0x26f0a4);
}
function Qn(_0xbc6677) {
  let _0x20325d = ke(_0xbc6677);
  if (!tr.has(_0x20325d)) {
    tr.set(_0x20325d, []);
  }
  return tr.get(_0x20325d);
}
function nr(_0x6adab2 = null) {
  let _0x3d7555 = ke(_0x6adab2);
  let _0x4aa826 = Date.now();
  _n.set(_0x3d7555, _0x4aa826);
  return {
    ok: true,
    targetId: _0x3d7555,
    ts: _0x4aa826
  };
}
function yi(_0x13122a = null) {
  let _0x1637dc = Date.now();
  let _0x3e1b26 = _0x13122a != null && String(_0x13122a).trim() !== "";
  let _0x49a16d = ke(_0x3e1b26 ? _0x13122a : De);
  let _0x4813a6 = _n.get(_0x49a16d) || 0;
  let _0x128c4a = _0x4813a6 ? _0x1637dc - _0x4813a6 : null;
  let _0x51a317 = !!_0x4813a6 && _0x128c4a != null && !!(_0x128c4a <= 10000);
  if (!_0x3e1b26 && !_0x51a317 && _n.size) {
    let _0x32f40a = null;
    let _0x2d9d30 = 0;
    for (let [_0x48e18f, _0x310107] of _n.entries()) {
      if (_0x310107 && _0x1637dc - _0x310107 <= 10000 && _0x310107 > _0x2d9d30) {
        _0x2d9d30 = _0x310107;
        _0x32f40a = _0x48e18f;
      }
    }
    if (_0x32f40a) {
      _0x49a16d = _0x32f40a;
      _0x4813a6 = _0x2d9d30;
      _0x128c4a = _0x1637dc - _0x2d9d30;
    }
  }
  return {
    ok: !!_0x4813a6 && _0x128c4a != null && !!(_0x128c4a <= 10000),
    targetId: _0x49a16d,
    activeTargetId: De,
    lastSeen: _0x4813a6 || 0,
    ageMs: _0x128c4a,
    clients: Ke.size,
    heartbeatCount: _n.size
  };
}
function Ei(_0x227189, _0x15ef30 = null) {
  let _0x1f1229 = String(_0x227189 || "").trim();
  if (!_0x1f1229) {
    return {
      ok: false,
      error: "缺少模型 ID"
    };
  }
  let _0x10cb9a = Date.now() + "-" + Math.random().toString(16).slice(2);
  let _0x3bc861 = ke(_0x15ef30 || De);
  let _0x1a18b7 = Qn(_0x3bc861);
  let _0x407363 = [];
  let _0x23d5b6 = it.get(_0x3bc861);
  if (_0x23d5b6 && _0x23d5b6.id) {
    _0x407363.push(_0x23d5b6.id);
  }
  for (let _0x12808a of _0x1a18b7) {
    if (_0x12808a && _0x12808a.id) {
      _0x407363.push(_0x12808a.id);
    }
  }
  for (let _0x453788 of _0x407363) {
    let _0x5a5091 = Xt.get(_0x453788);
    if (_0x5a5091 && _0x5a5091.pending) {
      Xt.set(_0x453788, {
        ..._0x5a5091,
        ok: true,
        pending: false,
        superseded: true,
        ts: Date.now()
      });
    }
  }
  _0x1a18b7.length = 0;
  it.delete(_0x3bc861);
  Xt.set(_0x10cb9a, {
    ok: false,
    pending: true,
    id: _0x10cb9a,
    targetId: _0x3bc861,
    modelUid: _0x1f1229,
    ts: Date.now()
  });
  _0x1a18b7.push({
    id: _0x10cb9a,
    type: "modelSwitch",
    modelUid: _0x1f1229,
    targetId: _0x3bc861,
    ts: Date.now()
  });
  console.log("[WS Bridge] Model switch push target=" + _0x3bc861 + ": " + _0x1f1229);
  return {
    ok: true,
    id: _0x10cb9a,
    targetId: _0x3bc861
  };
}
function Oi(_0x348939 = null) {
  let _0x5bf93b = ke(_0x348939 || De);
  let _0x457780 = it.get(_0x5bf93b);
  if (_0x457780 && Date.now() - (_0x457780.claimedAt || 0) > 15000) {
    it.delete(_0x5bf93b);
  }
  if (it.has(_0x5bf93b)) {
    return {
      pending: false
    };
  }
  let _0x317bb7 = Qn(_0x5bf93b);
  if (_0x317bb7.length === 0) {
    return {
      pending: false
    };
  }
  let _0xfce6ff = {
    ..._0x317bb7[0],
    claimedAt: Date.now()
  };
  it.set(_0x5bf93b, _0xfce6ff);
  return {
    pending: true,
    message: _0xfce6ff
  };
}
function xi(_0x26027a, _0x3f6c20 = null, _0x2b6cab = {}) {
  let _0x7e4c34 = ke(_0x3f6c20 || De);
  let _0xf41e0 = it.get(_0x7e4c34);
  let _0x3367db = _0xf41e0 && (!_0x26027a || _0xf41e0.id === _0x26027a);
  let _0xb41d22 = null;
  if (_0x3367db) {
    _0xb41d22 = Qn(_0x7e4c34).shift();
    it.delete(_0x7e4c34);
  }
  let _0x3d2fcd = _0x26027a || _0xb41d22 && _0xb41d22.id || _0xf41e0 && _0xf41e0.id || "";
  if (_0x3d2fcd) {
    let _0x116333 = Xt.get(_0x3d2fcd) || {};
    Xt.set(_0x3d2fcd, {
      ..._0x116333,
      ok: _0x2b6cab.ok === true,
      pending: false,
      id: _0x3d2fcd,
      targetId: _0x116333.targetId || _0x7e4c34,
      modelUid: _0x116333.modelUid || _0xb41d22 && _0xb41d22.modelUid || "",
      error: _0x2b6cab.error || "",
      switched: Number(_0x2b6cab.switched) || 0,
      total: Number(_0x2b6cab.total) || 0,
      ts: Date.now()
    });
  }
  let _0x23c164 = Qn(_0x7e4c34).length;
  console.log("[WS Bridge] Model switch ack target=" + _0x7e4c34 + " id=" + (_0x3d2fcd || "none") + " ok=" + (_0x2b6cab.ok === true) + " matched=" + !!_0x3367db + " (" + _0x23c164 + " remaining)");
}
function Ii(_0x1e4b52) {
  let _0xc81f12 = String(_0x1e4b52 || "");
  if (!_0xc81f12) {
    return {
      ok: false,
      error: "缺少请求 ID"
    };
  }
  let _0x4f5a19 = Xt.get(_0xc81f12);
  if (_0x4f5a19) {
    if (_0x4f5a19.pending && Date.now() - (_0x4f5a19.ts || 0) > 15000) {
      return {
        ok: false,
        pending: false,
        patchRequired: true,
        error: "Workbench bridge 未响应，请重载并完全重启 Devin 后重试"
      };
    } else {
      return _0x4f5a19;
    }
  } else {
    return {
      ok: false,
      pending: true,
      error: "等待注入脚本执行"
    };
  }
}
function or(_0x8eaa40, _0x38da63 = false, _0x2cdfc2 = null) {
  let _0x491313 = Date.now() + "-" + Math.random().toString(16).slice(2);
  let _0x2b0b65 = ke(_0x2cdfc2);
  let _0x37680e = eo(_0x2b0b65);
  _0x37680e.push({
    id: _0x491313,
    text: _0x8eaa40,
    hasImage: _0x38da63,
    targetId: _0x2b0b65,
    ts: Date.now()
  });
  console.log("[WS Bridge] Chat queue push target=" + _0x2b0b65 + " (" + _0x37680e.length + " pending): " + (_0x8eaa40 || "").slice(0, 60));
}
function Ai(_0x21f0d6 = null) {
  let _0x513a3c = ke(_0x21f0d6);
  let _0x442cbd = Vt.get(_0x513a3c);
  if (_0x442cbd && Date.now() - (_0x442cbd.claimedAt || 0) > 15000) {
    console.log("[WS Bridge] Chat queue claim expired target=" + _0x513a3c + ", releasing in-flight message");
    Vt.delete(_0x513a3c);
  }
  if (Vt.has(_0x513a3c)) {
    return {
      pending: false
    };
  }
  let _0x341a37 = eo(_0x513a3c);
  if (_0x341a37.length === 0) {
    return {
      pending: false
    };
  }
  let _0x389ae8 = {
    ..._0x341a37[0],
    claimedAt: Date.now()
  };
  Vt.set(_0x513a3c, _0x389ae8);
  return {
    pending: true,
    message: _0x389ae8
  };
}
function Mu(_0x5287ca) {
  if (_0x5287ca.type === "inject") {
    st.push({
      role: _0x5287ca.role || "user",
      content: _0x5287ca.content || "",
      ts: Date.now()
    });
    console.log("[WS Bridge] Queued injected message (" + st.length + " pending): " + (_0x5287ca.content || "").slice(0, 80));
    Xe({
      type: "inject_ack",
      queueSize: st.length
    });
  }
  if (_0x5287ca.type === "clear_queue") {
    st = [];
    Xe({
      type: "inject_ack",
      queueSize: 0
    });
  }
  if (_0x5287ca.type === "push_chat_queue") {
    let _0x1abbd2 = _0x5287ca.targetId || null;
    or(_0x5287ca.text || "", !!_0x5287ca.hasImage, _0x1abbd2);
    Xe({
      type: "inject_ack",
      queueSize: eo(_0x1abbd2).length,
      targetId: ke(_0x1abbd2)
    });
  }
}
function Ci() {
  if (st.length === 0) {
    return [];
  }
  let _0x4735d1 = [...st];
  st = [];
  console.log("[WS Bridge] Consuming " + _0x4735d1.length + " injected message(s)");
  return _0x4735d1;
}
function ki(_0x4d19f1, _0x1ddd80 = null) {
  let _0x40472c = ke(_0x1ddd80);
  let _0x18b1f9 = Vt.get(_0x40472c);
  if (_0x18b1f9 && (!_0x4d19f1 || _0x18b1f9.id === _0x4d19f1)) {
    let _0x3d0248 = eo(_0x40472c);
    _0x3d0248.shift();
    Vt.delete(_0x40472c);
    console.log("[WS Bridge] Chat queue ack target=" + _0x40472c + " (" + _0x3d0248.length + " remaining)");
  }
}
var bu = 8;
var Ru = process.env.STREAM_TEXT_DEBUG === "true";
var Nu = 40;
function wu(_0x5751b2) {
  return String(_0x5751b2 || "").replace(/\s+/g, " ").slice(0, Nu);
}
function to(_0x1f9c8b, _0x5a7dec, _0x40703d = "") {
  if (Ru) {
    S(_.DETAIL, "文本缓冲 " + _0x1f9c8b + " · len=" + String(_0x5a7dec || "").length + (_0x40703d ? " · " + _0x40703d : "") + " · \"" + wu(_0x5a7dec) + "\"");
  }
}
var $u = Math.max(an, ...Pn.map(_0x4c86c5 => _0x4c86c5.length));
var vu = (() => {
  let _0x3f62ff = parseInt(process.env.STREAM_MARKER_MIN_HOLD || "", 10);
  if (Number.isFinite(_0x3f62ff) && _0x3f62ff >= 1) {
    return _0x3f62ff;
  } else {
    return 4;
  }
})();
function Mi(_0x8b8e09) {
  let _0x5e49a7 = String(_0x8b8e09 || "");
  let _0x328cde = Math.min(_0x5e49a7.length, $u);
  for (let _0x337c87 = _0x328cde; _0x337c87 > 0; _0x337c87--) {
    let _0x2a0187 = _0x5e49a7.slice(_0x5e49a7.length - _0x337c87).trimStart();
    if (_0x2a0187 && !(_0x2a0187.length < vu) && (tt.some(_0x3e5abe => _0x3e5abe.startsWith(_0x2a0187)) || Pn.some(_0x201a30 => _0x201a30.startsWith(_0x2a0187)))) {
      return _0x337c87;
    }
  }
  return 0;
}
function bi(_0xe9c91d) {
  let _0x442276 = [];
  let _0x7874d3 = _0xe9c91d.split("\n");
  let _0x39db51 = null;
  let _0xa9c15e = [];
  for (let _0x1a7063 of _0x7874d3) {
    if (_0x1a7063.startsWith("event: ")) {
      _0x39db51 = _0x1a7063.slice(7).trim();
    } else if (_0x1a7063.startsWith("data: ")) {
      _0xa9c15e.push(_0x1a7063.slice(6));
    } else if (_0x1a7063.startsWith("data:")) {
      _0xa9c15e.push(_0x1a7063.slice(5));
    } else if (_0x1a7063 === "" && _0x39db51 !== null) {
      let _0x434d42 = _0xa9c15e.join("\n");
      try {
        _0x442276.push({
          event: _0x39db51,
          data: JSON.parse(_0x434d42)
        });
      } catch {
        _0x442276.push({
          event: _0x39db51,
          data: _0x434d42
        });
      }
      _0x39db51 = null;
      _0xa9c15e = [];
    }
  }
  return _0x442276;
}
var no = class {
  constructor(_0x511320, _0x51ce74, _0x487a31 = null, _0x2c29ef = true) {
    this._messageId = _0x511320;
    this._modelUid = _0x51ce74;
    this._targetId = _0x487a31;
    this._bufferForTextToolCalls = !!_0x2c29ef;
    this._tokenCount = 0;
    this._done = false;
    this._stopReason = null;
    this._currentBlockType = null;
    this._currentBlockIndex = -1;
    this._toolId = null;
    this._toolName = null;
    this._toolArgsBuffer = "";
    this._signatureBuffer = "";
    this._pendingText = "";
    this._capturingToolText = false;
    this._capturedToolText = "";
    this._emittedToolCall = false;
    this._emittedText = false;
    this._meaningfulOutput = false;
    this._visibleTextChars = 0;
    this._visibleText = "";
    this._visibleTextCap = 256;
    this._turnBleedCut = false;
    this._stats = {
      byType: {}
    };
    this._streamErrorHint = "";
    this._declaredModel = "";
  }
  get hasMeaningfulOutput() {
    return this._meaningfulOutput;
  }
  get hasEmittedToolCall() {
    return !!this._emittedToolCall;
  }
  get visibleTextChars() {
    return this._visibleTextChars || 0;
  }
  get visibleText() {
    return this._visibleText || "";
  }
  get declaredModel() {
    return this._declaredModel || "";
  }
  _noteDeclaredModel(_0x5117c8) {
    let _0x1d694b = String(_0x5117c8 || "").trim();
    if (!!_0x1d694b && !this._declaredModel) {
      this._declaredModel = _0x1d694b;
      S(_.UPSTREAM, "上游声明 model=" + _0x1d694b);
    }
  }
  hasErrorEvent() {
    return (this._stats.byType.error || 0) > 0 || !!this._streamErrorHint;
  }
  getStreamErrorHint() {
    return this._streamErrorHint;
  }
  formatEventStats() {
    return Object.entries(this._stats.byType).map(([_0x4fed51, _0x4ad3e6]) => _0x4fed51 + "=" + _0x4ad3e6).join(", ") || "(no events parsed)";
  }
  _trackEvent(_0x2bd924) {
    let _0x63a6f9 = _0x2bd924 || "(unknown)";
    this._stats.byType[_0x63a6f9] = (this._stats.byType[_0x63a6f9] || 0) + 1;
  }
  _captureStreamError(_0x43ad67) {
    let _0x3036fa = mn(_0x43ad67);
    if (_0x3036fa) {
      this._streamErrorHint = _0x3036fa;
    }
  }
  processEvent(_0xd89f96) {
    let {
      event: _0x4692a3,
      data: _0x4bc3ca
    } = _0xd89f96;
    let _0x2d4f15 = [];
    this._trackEvent(_0x4692a3);
    switch (_0x4692a3) {
      case "content_block_start":
        this._onContentBlockStart(_0x4bc3ca, _0x2d4f15);
        break;
      case "content_block_delta":
        this._onContentBlockDelta(_0x4bc3ca, _0x2d4f15);
        break;
      case "content_block_stop":
        this._onContentBlockStop(_0x4bc3ca, _0x2d4f15);
        break;
      case "message_delta":
        if (_0x4bc3ca?.delta?.stop_reason) {
          this._stopReason = _0x4bc3ca.delta.stop_reason;
        }
        break;
      case "message_stop":
        this._onMessageStop(_0x2d4f15);
        break;
      case "error":
        this._captureStreamError(_0x4bc3ca);
        break;
      case "message_start":
        this._noteDeclaredModel(_0x4bc3ca?.message?.model ?? _0x4bc3ca?.model);
        break;
      default:
        break;
    }
    return _0x2d4f15;
  }
  get isDone() {
    return this._done;
  }
  get stopReason() {
    return this._stopReason;
  }
  markIncomplete() {
    this._stopReason ||= "max_tokens";
  }
  _onContentBlockStart(_0x2545c4, _0x224853) {
    let _0x177351 = _0x2545c4?.content_block;
    if (_0x177351) {
      this._currentBlockType = _0x177351.type;
      this._currentBlockIndex = _0x2545c4?.index ?? -1;
      if (_0x177351.type === "tool_use") {
        this._toolId = _0x177351.id ?? null;
        this._toolName = _0x177351.name ?? null;
        this._toolArgsBuffer = "";
      } else if (_0x177351.type === "thinking") {
        this._signatureBuffer = "";
      }
    }
  }
  _onContentBlockDelta(_0x11bf40, _0x31f4cf) {
    let _0x3dc04a = _0x11bf40?.delta;
    if (_0x3dc04a) {
      if (_0x3dc04a.type === "text_delta" && _0x3dc04a.text) {
        this._handleTextDelta(_0x3dc04a.text, _0x31f4cf);
      } else if (_0x3dc04a.type === "thinking_delta" && _0x3dc04a.thinking) {
        this._meaningfulOutput = true;
        _0x31f4cf.push(Yt(this._messageId, _0x3dc04a.thinking));
      } else if (_0x3dc04a.type === "input_json_delta" && _0x3dc04a.partial_json != null) {
        this._toolArgsBuffer += _0x3dc04a.partial_json;
      } else if (_0x3dc04a.type === "signature_delta" && _0x3dc04a.signature != null) {
        this._signatureBuffer += _0x3dc04a.signature;
      }
    }
  }
  _onContentBlockStop(_0x38139d, _0x17117b) {
    if (this._currentBlockType === "text") {
      this._flushBufferedText(_0x17117b, true);
    } else if (this._currentBlockType === "tool_use") {
      let _0x281b71 = He(this._toolName ?? "", this._toolArgsBuffer);
      let _0x308783 = {
        id: this._toolId ?? "",
        name: _0x281b71.toolName,
        arguments_json: JSON.stringify(_0x281b71.params ?? {})
      };
      this._meaningfulOutput = true;
      _0x17117b.push(Gt(this._messageId, [_0x308783]));
      Sn(_0x308783.name, _0x308783.arguments_json, _0x308783.id, this._targetId);
      this._emittedToolCall = true;
      this._toolId = null;
      this._toolName = null;
      this._toolArgsBuffer = "";
    } else if (this._currentBlockType === "thinking" && this._signatureBuffer) {
      _0x17117b.push(ui(this._messageId, this._signatureBuffer));
      this._signatureBuffer = "";
    }
    this._currentBlockType = null;
    this._currentBlockIndex = -1;
  }
  _onMessageStop(_0x3d02a1) {
    if (this._emittedToolCall) {
      this._flushBufferedText(_0x3d02a1, true);
    } else {
      let _0x265d05 = "" + this._capturedToolText + this._pendingText;
      let _0x1f38d7 = Bn(_0x265d05);
      if (_0x1f38d7.length > 0) {
        S(_.TOOL, "文本恢复 " + _0x1f38d7.length + " 个 · " + _0x1f38d7.map(_0x560fec => _0x560fec.name).join(", "));
        let _0x392d67 = _0x1f38d7.map((_0x53bc13, _0x15125c) => ({
          id: "tc_recovered_" + _0x15125c,
          name: _0x53bc13.name,
          arguments_json: JSON.stringify(_0x53bc13.input ?? {})
        }));
        this._meaningfulOutput = true;
        _0x3d02a1.push(Gt(this._messageId, _0x392d67));
        for (let _0x43d1e1 of _0x392d67) {
          Sn(_0x43d1e1.name, _0x43d1e1.arguments_json, _0x43d1e1.id, this._targetId);
        }
        this._stopReason = "tool_use";
      } else {
        this._restoreInterceptedText(_0x3d02a1);
      }
    }
    let _0x47d305 = this._mapStopReason(this._stopReason);
    _0x3d02a1.push({
      __stopChunk: jt(this._messageId, _0x47d305, this._modelUid),
      __chatEnd: {
        stopReason: this._stopReason,
        targetId: this._targetId
      }
    });
    this._done = true;
  }
  _handleTextDelta(_0x3f33bd, _0x506812) {
    if (this._turnBleedCut) {
      return;
    }
    if (this._capturingToolText) {
      this._capturedToolText += _0x3f33bd;
      return;
    }
    this._pendingText += _0x3f33bd;
    let _0x4410ab = Ln(this._pendingText);
    if (_0x4410ab !== -1) {
      let _0x3fc325 = this._pendingText.slice(0, _0x4410ab);
      if (_0x3fc325) {
        this._emitTextChunk(_0x3fc325, _0x506812);
      }
      let _0x59e19f = this._pendingText.slice(_0x4410ab);
      let _0x25a400 = this._pendingText.slice(Math.max(0, _0x4410ab - 40), _0x4410ab);
      let _0x25841f = _0x25bb36 => String(_0x25bb36 || "").replace(/\s+/g, " ").replace(/(?:key|token|secret|password|credential)\s*[:=]\s*\S+/gi, "[REDACTED]");
      this._pendingText = "";
      this._turnBleedCut = true;
      S(_.TOOL, "拦截 assistant 越界正文 · 丢弃 " + _0x59e19f.length + " chars · 前文\"…" + _0x25841f(_0x25a400) + "\" · 命中\"" + _0x25841f(_0x59e19f.slice(0, 80)) + "\"");
      return;
    }
    if (!this._bufferForTextToolCalls) {
      this._flushBufferedText(_0x506812, false);
      return;
    }
    let _0x29c789 = Fe(this._pendingText);
    if (_0x29c789 !== -1) {
      let _0xb702e = this._pendingText.slice(0, _0x29c789);
      if (_0xb702e) {
        this._emitTextChunk(_0xb702e, _0x506812);
      }
      this._capturedToolText = this._pendingText.slice(_0x29c789);
      this._pendingText = "";
      this._capturingToolText = true;
      S(_.TOOL, "检测到文本内 tool-call 起始，暂存后续文本");
      return;
    }
    this._flushBufferedText(_0x506812, false);
  }
  _flushBufferedText(_0x15dafb, _0x22ee0f) {
    if (!this._bufferForTextToolCalls || _0x22ee0f) {
      if (this._pendingText) {
        this._emitTextChunk(this._pendingText, _0x15dafb);
        this._pendingText = "";
      }
      return;
    }
    if (!this._emittedText) {
      this._tryEmitInitialVisibleText(_0x15dafb);
    }
    if (this._emittedText && this._pendingText) {
      let _0x287c18 = Fe(this._pendingText);
      let _0x4acf3a = _0x287c18 === -1 ? Mi(this._pendingText) : this._pendingText.length - _0x287c18;
      let _0x466610 = _0x287c18 === -1 ? this._pendingText.length - _0x4acf3a : _0x287c18;
      if (_0x466610 > 0) {
        let _0x1544e3 = this._pendingText.slice(0, _0x466610);
        to("lookbehind-fast-release", _0x1544e3, "keep=" + (this._pendingText.length - _0x466610));
        this._emitTextChunk(_0x1544e3, _0x15dafb);
        this._pendingText = this._pendingText.slice(_0x1544e3.length);
      }
    }
    let _0x4f5c8e = Math.min(this._pendingText.length, Mi(this._pendingText));
    let _0x4469bb = this._pendingText.slice(0, this._pendingText.length - _0x4f5c8e);
    if (_0x4469bb) {
      to("lookbehind-release", _0x4469bb, "keep=" + _0x4f5c8e);
      this._emitTextChunk(_0x4469bb, _0x15dafb);
      this._pendingText = this._pendingText.slice(_0x4469bb.length);
    } else if (this._pendingText) {
      to("lookbehind-hold", this._pendingText, "keep=" + _0x4f5c8e);
    }
  }
  _tryEmitInitialVisibleText(_0x205de9) {
    if (!this._pendingText || Fe(this._pendingText) === 0) {
      return false;
    }
    let _0x58f104 = this._pendingText.search(/\S/);
    if (_0x58f104 === -1) {
      return false;
    }
    let _0x29655a = this._pendingText.slice(_0x58f104);
    if (tt.some(_0x29fd2c => _0x29fd2c.startsWith(_0x29655a) || _0x29655a.startsWith(_0x29fd2c))) {
      return false;
    }
    let _0x5542ce = Fe(this._pendingText);
    let _0x4dd339 = _0x5542ce === -1 ? this._pendingText.length : _0x5542ce;
    let _0x2c549d = Math.min(_0x4dd339, _0x58f104 + bu);
    if (_0x2c549d <= _0x58f104) {
      return false;
    }
    let _0x5c453b = this._pendingText.slice(0, _0x2c549d);
    to("initial-release", _0x5c453b, "pending=" + this._pendingText.length);
    this._emitTextChunk(_0x5c453b, _0x205de9);
    this._pendingText = this._pendingText.slice(_0x5c453b.length);
    return true;
  }
  _emitTextChunk(_0xa8ed08, _0x327a84) {
    if (_0xa8ed08) {
      this._meaningfulOutput = true;
      this._emittedText = true;
      this._tokenCount++;
      this._visibleTextChars += _0xa8ed08.length;
      if (this._visibleTextChars <= this._visibleTextCap) {
        this._visibleText += _0xa8ed08;
      } else {
        this._visibleText &&= "";
      }
      _0x327a84.push({
        __textDelta: _0xa8ed08,
        __tokens: this._tokenCount
      });
      Zn(_0xa8ed08, true, this._targetId);
    }
  }
  _restoreInterceptedText(_0x271d0a) {
    if (this._capturedToolText) {
      this._emitTextChunk(this._capturedToolText, _0x271d0a);
      this._capturedToolText = "";
      this._capturingToolText = false;
    }
    this._flushBufferedText(_0x271d0a, true);
  }
  _mapStopReason(_0x4092b7) {
    switch (_0x4092b7) {
      case "end_turn":
        return xe.STOP_PATTERN;
      case "tool_use":
        return xe.FUNCTION_CALL;
      case "max_tokens":
        return xe.MAX_TOKENS;
      default:
        return xe.STOP_PATTERN;
    }
  }
};
var Pu = 8;
var Lu = process.env.STREAM_TEXT_DEBUG === "true";
var Bu = 40;
function Du(_0x45b9ce) {
  return String(_0x45b9ce || "").replace(/\s+/g, " ").slice(0, Bu);
}
function oo(_0x5d5dda, _0x2be712, _0x493020 = "") {
  if (Lu) {
    S(_.DETAIL, "文本缓冲 " + _0x5d5dda + " · len=" + String(_0x2be712 || "").length + (_0x493020 ? " · " + _0x493020 : "") + " · \"" + Du(_0x2be712) + "\"");
  }
}
function Uu(_0x75b839) {
  let _0x405ddb = String(_0x75b839 || "");
  let _0x4b08e4 = Math.min(_0x405ddb.length, an);
  for (let _0x32b41d = _0x4b08e4; _0x32b41d > 0; _0x32b41d--) {
    let _0x261d55 = _0x405ddb.slice(_0x405ddb.length - _0x32b41d).trimStart();
    if (_0x261d55 && tt.some(_0x5cc645 => _0x5cc645.startsWith(_0x261d55))) {
      return _0x32b41d;
    }
  }
  return 0;
}
function Ri(_0x1bf562) {
  let _0x13c0a4 = [];
  let _0x4d5f36 = _0x1bf562.split("\n");
  for (let _0x195a2 of _0x4d5f36) {
    if (!_0x195a2.startsWith("data: ")) {
      continue;
    }
    let _0x12bb21 = _0x195a2.slice(6).trim();
    if (_0x12bb21 === "[DONE]") {
      _0x13c0a4.push({
        done: true,
        type: "done",
        data: null
      });
      continue;
    }
    try {
      let _0x44109a = JSON.parse(_0x12bb21);
      if (_0x44109a.error) {
        _0x13c0a4.push({
          done: false,
          type: "chat.completions.error",
          data: _0x44109a
        });
        continue;
      }
      if (Array.isArray(_0x44109a.choices)) {
        _0x13c0a4.push({
          done: false,
          type: "chat.completions.chunk",
          data: _0x44109a
        });
        continue;
      }
      _0x13c0a4.push({
        done: false,
        type: _0x44109a.type || "",
        data: _0x44109a
      });
    } catch {}
  }
  return _0x13c0a4;
}
var ro = class {
  constructor(_0x7a3d1a, _0xcc477, _0x486b51 = null, _0x165bdb = true) {
    this._messageId = _0x7a3d1a;
    this._modelUid = _0xcc477;
    this._targetId = _0x486b51;
    this._bufferForTextToolCalls = !!_0x165bdb;
    this._tokenCount = 0;
    this._done = false;
    this._stopReason = null;
    this._toolCalls = {};
    this._itemTypes = {};
    this._itemPhases = {};
    this._pendingText = "";
    this._thinkPlaceholderBuffer = "";
    this._reasoningPlaceholderBuffer = "";
    this._reasoningStreamStarted = false;
    this._reasoningBuffer = "";
    this._capturingToolText = false;
    this._capturedToolText = "";
    this._errorMessage = null;
    this._allowedTools = null;
    this._emittedText = false;
    this._emittedReasoning = false;
    this._meaningfulOutput = false;
    this._stats = {
      byType: {}
    };
    this._declaredModel = "";
  }
  get hasMeaningfulOutput() {
    return this._meaningfulOutput;
  }
  get hasReasoningOutput() {
    return this._emittedReasoning;
  }
  get hasVisibleTextOutput() {
    return this._emittedText;
  }
  get declaredModel() {
    return this._declaredModel || "";
  }
  _noteDeclaredModel(_0x384a80) {
    let _0xbc7a01 = String(_0x384a80 || "").trim();
    if (!!_0xbc7a01 && !this._declaredModel) {
      this._declaredModel = _0xbc7a01;
      S(_.UPSTREAM, "上游声明 model=" + _0xbc7a01);
    }
  }
  hasErrorEvent() {
    return (this._stats.byType.error || 0) > 0 || (this._stats.byType["chat.completions.error"] || 0) > 0 || !!this._errorMessage;
  }
  getStreamErrorHint() {
    return this._errorMessage || "";
  }
  formatEventStats() {
    return Object.entries(this._stats.byType).map(([_0x13b537, _0x5784f8]) => _0x13b537 + "=" + _0x5784f8).join(", ") || "(no events parsed)";
  }
  _trackEvent(_0x294886) {
    let _0x550e4b = _0x294886 || "(unknown)";
    this._stats.byType[_0x550e4b] = (this._stats.byType[_0x550e4b] || 0) + 1;
  }
  setAllowedTools(_0x457e1) {
    this._allowedTools = new Set(_0x457e1);
  }
  get isDone() {
    return this._done;
  }
  get stopReason() {
    return this._stopReason;
  }
  markIncomplete() {
    this._stopReason ||= "length";
  }
  processEvent(_0x3ba671) {
    if (_0x3ba671.done) {
      return this._onDone();
    }
    let {
      type: _0x47b96e,
      data: _0x48989e
    } = _0x3ba671;
    let _0x4deac7 = [];
    this._trackEvent(_0x47b96e);
    switch (_0x47b96e) {
      case "response.reasoning.delta":
        if (_0x48989e.delta) {
          this._handleReasoningDelta(_0x48989e.delta, _0x4deac7);
        }
        break;
      case "response.reasoning_summary_text.delta":
        if (_0x48989e.delta) {
          this._handleReasoningDelta(_0x48989e.delta, _0x4deac7);
        }
        break;
      case "chat.completions.error":
        this._stopReason = "error";
        this._errorMessage = mn(_0x48989e.error ?? _0x48989e) || "OpenAI response failed";
        return this._onDone();
      case "chat.completions.chunk":
        {
          this._noteDeclaredModel(_0x48989e?.model);
          let _0xeab005 = _0x48989e.choices?.[0];
          let _0x472c21 = _0xeab005?.finish_reason;
          if (_0x472c21 === "stop") {
            this._stopReason = "stop";
          } else if (_0x472c21 === "length") {
            this._stopReason = "length";
          } else if (_0x472c21 === "tool_calls") {
            this._stopReason = "tool_calls";
          }
          let _0x384bc0 = _0xeab005?.delta?.reasoning_content ?? _0xeab005?.delta?.reasoning;
          if (_0x384bc0) {
            this._handleReasoningDelta(_0x384bc0, _0x4deac7);
          }
          if (_0xeab005?.delta?.tool_calls) {
            this._handleChatCompletionsToolCalls(_0xeab005.delta.tool_calls, _0x4deac7);
          }
          let _0x5cb8e3 = _0xeab005?.delta?.content;
          if (_0x5cb8e3) {
            this._handleOutputTextDelta(_0x5cb8e3, _0x4deac7);
          }
          let _0x1dc0a3 = _0xeab005?.message?.content;
          if (typeof _0x1dc0a3 == "string" && _0x1dc0a3) {
            this._handleOutputTextDelta(_0x1dc0a3, _0x4deac7);
          }
          break;
        }
      case "response.output_text.delta":
        if (_0x48989e.delta) {
          let _0x2f63e3 = _0x48989e.output_index ?? 0;
          let _0x540349 = this._itemTypes[_0x2f63e3];
          let _0x1c25f2 = this._itemPhases[_0x2f63e3];
          if (_0x540349 === "reasoning" || _0x1c25f2 === "thinking") {
            this._handleReasoningDelta(_0x48989e.delta, _0x4deac7);
          } else {
            this._handleOutputTextDelta(_0x48989e.delta, _0x4deac7);
          }
        }
        break;
      case "response.output_item.added":
        {
          let _0x9bebd = _0x48989e.item;
          let _0x1011b5 = _0x48989e.output_index ?? 0;
          if (_0x9bebd) {
            this._itemTypes[_0x1011b5] = _0x9bebd.type;
            if (_0x9bebd.phase) {
              this._itemPhases[_0x1011b5] = _0x9bebd.phase;
            }
          }
          if (_0x9bebd?.type === "function_call") {
            this._toolCalls[_0x1011b5] = {
              id: _0x9bebd.call_id || _0x9bebd.id || "",
              name: _0x9bebd.name || "",
              arguments: ""
            };
          }
          break;
        }
      case "response.function_call_arguments.delta":
        {
          let _0x12ad52 = _0x48989e.output_index ?? 0;
          if (this._toolCalls[_0x12ad52]) {
            this._toolCalls[_0x12ad52].arguments += _0x48989e.delta || "";
          }
          break;
        }
      case "response.completed":
        {
          let _0x5b8b1e = _0x48989e.response;
          this._noteDeclaredModel(_0x5b8b1e?.model ?? _0x48989e?.model);
          if (_0x5b8b1e?.status === "completed") {
            this._stopReason = "stop";
            if (_0x5b8b1e.output?.some(_0x54a0af => _0x54a0af.type === "function_call")) {
              this._stopReason = "tool_calls";
            }
          }
          return this._onDone();
        }
      case "response.incomplete":
        {
          let _0x496646 = _0x48989e.response;
          this._stopReason = this._mapIncompleteReason(_0x496646?.incomplete_details?.reason);
          return this._onDone();
        }
      case "response.failed":
        {
          let _0x16eccc = _0x48989e.response?.error || _0x48989e.error;
          this._stopReason = "error";
          this._errorMessage = mn(_0x16eccc ?? _0x48989e) || "OpenAI response failed";
          return this._onDone();
        }
      case "response.created":
        this._noteDeclaredModel(_0x48989e?.response?.model ?? _0x48989e?.model);
        break;
      case "response.in_progress":
      case "response.output_item.done":
      case "response.content_part.added":
      case "response.content_part.done":
      case "response.reasoning_summary_part.added":
      case "response.reasoning_summary_part.done":
      case "response.reasoning_summary_text.done":
      case "codex.rate_limits":
        break;
      default:
        if (_0x47b96e && !_0x47b96e.startsWith("response.")) {
          S(_.DETAIL, "未知 OpenAI 事件: " + _0x47b96e);
        }
        break;
    }
    return _0x4deac7;
  }
  _onDone() {
    if (this._done) {
      return [];
    }
    let _0x5778d0 = [];
    let _0x497b65 = [];
    this._flushReasoningPlaceholder(_0x5778d0);
    let _0x3b59f7 = this._filterThinkPlaceholderText("", true);
    if (_0x3b59f7) {
      this._handleOutputTextDelta(_0x3b59f7, _0x5778d0, true);
    }
    if (this._errorMessage) {
      this._restoreInterceptedText(_0x5778d0);
      for (let _0x3dcb72 of gn(this._messageId, this._errorMessage)) {
        _0x5778d0.push(_0x3dcb72);
      }
      this._done = true;
      return _0x5778d0;
    }
    let _0x2ac7c1 = Object.keys(this._toolCalls);
    if (_0x2ac7c1.length > 0) {
      this._flushBufferedText(_0x5778d0, true);
      let _0x5e19c9 = _0x2ac7c1.sort((_0x4647f5, _0x12a386) => Number(_0x4647f5) - Number(_0x12a386)).map(_0x58baa7 => {
        let _0x13784c = this._toolCalls[_0x58baa7];
        let _0x2b2283 = He(_0x13784c.name, _0x13784c.arguments);
        let _0x3e18c3 = _0x13784c.arguments ? _0x13784c.arguments.length : 0;
        S(_.TOOL, "native · idx=" + _0x58baa7 + " · " + (_0x2b2283.toolName || _0x13784c.name || "(empty)") + " · args=" + _0x3e18c3 + "b");
        return {
          id: _0x13784c.id,
          name: _0x2b2283.toolName,
          arguments_json: JSON.stringify(_0x2b2283.params ?? {})
        };
      });
      if (_0x5e19c9.length > 0) {
        this._meaningfulOutput = true;
        _0x497b65.push(..._0x5e19c9);
        _0x5778d0.push(Gt(this._messageId, _0x5e19c9));
        this._stopReason = "tool_calls";
      } else {
        S(_.TOOL, "工具调用均被过滤，回退为文本输出");
        this._restoreInterceptedText(_0x5778d0);
      }
    } else {
      let _0x53b11f = "" + this._capturedToolText + this._pendingText;
      let _0x24b581 = Bn(_0x53b11f);
      if (_0x24b581.length > 0) {
        S(_.TOOL, "文本恢复 " + _0x24b581.length + " 个 · " + _0x24b581.map(_0x4e2d3d => _0x4e2d3d.name).join(", "));
        let _0x445ae5 = _0x24b581.map((_0x26e0d1, _0x343787) => {
          let _0x3db5b2 = JSON.stringify(_0x26e0d1.input ?? {});
          S(_.TOOL, "text · idx=" + _0x343787 + " · " + (_0x26e0d1.name || "(empty)") + " · args=" + _0x3db5b2.length + "b");
          return {
            id: "tc_recovered_" + _0x343787,
            name: _0x26e0d1.name,
            arguments_json: _0x3db5b2
          };
        });
        this._meaningfulOutput = true;
        _0x497b65.push(..._0x445ae5);
        _0x5778d0.push(Gt(this._messageId, _0x445ae5));
        this._stopReason = "tool_calls";
      } else {
        this._restoreInterceptedText(_0x5778d0);
      }
    }
    this._stopReason ||= "stop";
    if (this._tokenCount === 0 && _0x497b65.length === 0 && this._reasoningBuffer) {
      S(_.DETAIL, "仅 reasoning，提升为可见文本");
      this._emitTextChunk(this._reasoningBuffer, _0x5778d0);
      this._reasoningBuffer = "";
    }
    if (this._stopReason === "tool_calls" && _0x497b65.length === 0) {
      S(_.TOOL, "stop=tool_calls 但未解析到调用，降级为 stop");
      this._stopReason = "stop";
    }
    let _0xeba62d = _0x497b65.map(_0x4e6991 => _0x4e6991.name).filter(Boolean);
    if (_0xeba62d.length > 0) {
      S(_.TOOL, "已调用 · [" + _0xeba62d.join(", ") + "]");
    } else if (this._stopReason === "stop") {
      S(_.TOOL, "未调用 · stop=stop");
    }
    let _0x41aa94 = this._mapStopReason(this._stopReason);
    _0x5778d0.push({
      __stopChunk: jt(this._messageId, _0x41aa94, this._modelUid)
    });
    this._done = true;
    if (_0x497b65.length > 0) {
      for (let _0x346025 of _0x497b65) {
        Sn(_0x346025.name, _0x346025.arguments_json, _0x346025.id, this._targetId);
      }
    }
    qt(this._stopReason, _0xeba62d, this._targetId);
    return _0x5778d0;
  }
  _handleChatCompletionsToolCalls(_0x1cb01b, _0x510999) {
    for (let _0x21917b of _0x1cb01b || []) {
      let _0x1b1b30 = _0x21917b.index ?? 0;
      this._toolCalls[_0x1b1b30] ||= {
        id: "",
        name: "",
        arguments: ""
      };
      if (_0x21917b.id) {
        this._toolCalls[_0x1b1b30].id = _0x21917b.id;
      }
      if (_0x21917b.function?.name) {
        this._toolCalls[_0x1b1b30].name = _0x21917b.function.name;
      }
      if (_0x21917b.function?.arguments) {
        this._toolCalls[_0x1b1b30].arguments += _0x21917b.function.arguments;
      }
    }
  }
  _emitReasoningChunk(_0x394a8d, _0x44094a) {
    if (_0x394a8d) {
      this._meaningfulOutput = true;
      this._emittedReasoning = true;
      this._reasoningBuffer += _0x394a8d;
      _0x44094a.push(Yt(this._messageId, _0x394a8d));
    }
  }
  _handleReasoningDelta(_0x51f4d0, _0x265059) {
    let _0x2aebf0 = String(_0x51f4d0 || "");
    if (!_0x2aebf0) {
      return;
    }
    if (this._reasoningStreamStarted) {
      this._emitReasoningChunk(_0x2aebf0, _0x265059);
      return;
    }
    let _0x1b9133 = "" + this._reasoningPlaceholderBuffer + _0x2aebf0;
    if (/^[\s.…]*$/.test(_0x1b9133)) {
      this._reasoningPlaceholderBuffer = _0x1b9133;
      return;
    }
    this._reasoningPlaceholderBuffer = "";
    this._reasoningStreamStarted = true;
    this._emitReasoningChunk(_0x1b9133, _0x265059);
  }
  _flushReasoningPlaceholder(_0x1c88dd) {
    let _0x4bc3e2 = this._reasoningPlaceholderBuffer;
    this._reasoningPlaceholderBuffer = "";
    if (_0x4bc3e2) {
      if (/^\s*(?:\.{3,}|…+)\s*$/.test(_0x4bc3e2)) {
        S(_.DETAIL, "已过滤空 reasoning 占位");
        return;
      }
      this._reasoningStreamStarted = true;
      this._emitReasoningChunk(_0x4bc3e2, _0x1c88dd);
    }
  }
  _filterThinkPlaceholderText(_0x5696d4, _0x5c2a2f = false) {
    let _0x2f5bcf = "" + this._thinkPlaceholderBuffer + String(_0x5696d4 || "");
    this._thinkPlaceholderBuffer = "";
    let _0x38ed36 = "";
    let _0x16da3d = "<think>";
    let _0x1cf6ca = "</think>";
    while (_0x2f5bcf) {
      let _0x10c3bb = _0x2f5bcf.toLowerCase();
      let _0x185389 = _0x10c3bb.indexOf(_0x16da3d);
      if (_0x185389 === -1) {
        if (_0x5c2a2f) {
          _0x38ed36 += _0x2f5bcf;
          break;
        }
        let _0x24dba4 = 0;
        let _0x36f158 = Math.min(_0x2f5bcf.length, _0x16da3d.length - 1);
        for (let _0x1545af = _0x36f158; _0x1545af > 0; _0x1545af--) {
          if (_0x16da3d.startsWith(_0x10c3bb.slice(-_0x1545af))) {
            _0x24dba4 = _0x1545af;
            break;
          }
        }
        _0x38ed36 += _0x2f5bcf.slice(0, _0x2f5bcf.length - _0x24dba4);
        this._thinkPlaceholderBuffer = _0x2f5bcf.slice(_0x2f5bcf.length - _0x24dba4);
        break;
      }
      _0x38ed36 += _0x2f5bcf.slice(0, _0x185389);
      _0x2f5bcf = _0x2f5bcf.slice(_0x185389);
      let _0x3ed73c = _0x2f5bcf.toLowerCase().indexOf(_0x1cf6ca, _0x16da3d.length);
      if (_0x3ed73c !== -1) {
        let _0x23d53f = _0x3ed73c + _0x1cf6ca.length;
        let _0x5774bf = _0x2f5bcf.slice(_0x16da3d.length, _0x3ed73c);
        if (!/^\s*(?:\.{3,}|…+)\s*$/.test(_0x5774bf)) {
          _0x38ed36 += _0x2f5bcf.slice(0, _0x23d53f);
        }
        _0x2f5bcf = _0x2f5bcf.slice(_0x23d53f);
        continue;
      }
      let _0x4ab8fb = _0x2f5bcf.slice(_0x16da3d.length).match(/^([\s.…]*)(.*)$/s);
      let _0xa23c13 = _0x4ab8fb?.[2] || "";
      let _0x57cd1d = !!_0x4ab8fb && (!_0xa23c13 || _0x1cf6ca.startsWith(_0xa23c13.toLowerCase()));
      if (!_0x5c2a2f && _0x57cd1d) {
        this._thinkPlaceholderBuffer = _0x2f5bcf;
      } else {
        _0x38ed36 += _0x2f5bcf;
      }
      break;
    }
    return _0x38ed36;
  }
  _handleOutputTextDelta(_0x1e0557, _0x566f00, _0x4824a0 = false) {
    let _0x4cda43 = _0x4824a0 ? String(_0x1e0557 || "") : this._filterThinkPlaceholderText(_0x1e0557);
    if (!_0x4cda43) {
      return;
    }
    _0x1e0557 = _0x4cda43;
    if (this._capturingToolText) {
      this._capturedToolText += _0x1e0557;
      return;
    }
    this._pendingText += _0x1e0557;
    if (!this._bufferForTextToolCalls) {
      this._flushBufferedText(_0x566f00, false);
      return;
    }
    let _0x183349 = Fe(this._pendingText);
    if (_0x183349 !== -1) {
      let _0x109eb5 = this._pendingText.slice(0, _0x183349);
      if (_0x109eb5) {
        this._emitTextChunk(_0x109eb5, _0x566f00);
      }
      this._capturedToolText = this._pendingText.slice(_0x183349);
      this._pendingText = "";
      this._capturingToolText = true;
      S(_.TOOL, "检测到文本内 tool-call 起始，暂存后续文本");
      return;
    }
    this._flushBufferedText(_0x566f00, false);
  }
  _flushBufferedText(_0x3964ae, _0x234dfe) {
    if (!this._bufferForTextToolCalls || _0x234dfe) {
      if (this._pendingText) {
        this._emitTextChunk(this._pendingText, _0x3964ae);
        this._pendingText = "";
      }
      return;
    }
    if (!this._emittedText) {
      this._tryEmitInitialVisibleText(_0x3964ae);
    }
    if (this._emittedText && this._pendingText) {
      let _0x274f3b = Fe(this._pendingText);
      let _0x1cf9b6 = _0x274f3b === -1 ? Uu(this._pendingText) : this._pendingText.length - _0x274f3b;
      let _0x36beda = _0x274f3b === -1 ? this._pendingText.length - _0x1cf9b6 : _0x274f3b;
      if (_0x36beda > 0) {
        let _0x58c702 = this._pendingText.slice(0, _0x36beda);
        oo("lookbehind-fast-release", _0x58c702, "keep=" + (this._pendingText.length - _0x36beda));
        this._emitTextChunk(_0x58c702, _0x3964ae);
        this._pendingText = this._pendingText.slice(_0x58c702.length);
      }
    }
    let _0x31f723 = Math.min(this._pendingText.length, an);
    let _0x201a92 = this._pendingText.slice(0, this._pendingText.length - _0x31f723);
    if (_0x201a92) {
      oo("lookbehind-release", _0x201a92, "keep=" + _0x31f723);
      this._emitTextChunk(_0x201a92, _0x3964ae);
      this._pendingText = this._pendingText.slice(_0x201a92.length);
    } else if (this._pendingText) {
      oo("lookbehind-hold", this._pendingText, "keep=" + _0x31f723);
    }
  }
  _tryEmitInitialVisibleText(_0x4b10d9) {
    if (!this._pendingText || Fe(this._pendingText) === 0) {
      return false;
    }
    let _0x24b793 = this._pendingText.search(/\S/);
    if (_0x24b793 === -1) {
      return false;
    }
    let _0x5b42c2 = this._pendingText.slice(_0x24b793);
    if (tt.some(_0x145d29 => _0x145d29.startsWith(_0x5b42c2) || _0x5b42c2.startsWith(_0x145d29))) {
      return false;
    }
    let _0x45f1fd = Fe(this._pendingText);
    let _0x59eafb = _0x45f1fd === -1 ? this._pendingText.length : _0x45f1fd;
    let _0x110817 = Math.min(_0x59eafb, _0x24b793 + Pu);
    if (_0x110817 <= _0x24b793) {
      return false;
    }
    let _0x3d64de = this._pendingText.slice(0, _0x110817);
    oo("initial-release", _0x3d64de, "pending=" + this._pendingText.length);
    this._emitTextChunk(_0x3d64de, _0x4b10d9);
    this._pendingText = this._pendingText.slice(_0x3d64de.length);
    return true;
  }
  _emitTextChunk(_0x10d94c, _0x4fa350) {
    if (_0x10d94c) {
      this._meaningfulOutput = true;
      this._emittedText = true;
      this._tokenCount++;
      _0x4fa350.push({
        __textDelta: _0x10d94c,
        __tokens: this._tokenCount
      });
      Zn(_0x10d94c, true, this._targetId);
    }
  }
  _restoreInterceptedText(_0x3131a0) {
    if (this._capturedToolText) {
      this._emitTextChunk(this._capturedToolText, _0x3131a0);
      this._capturedToolText = "";
      this._capturingToolText = false;
    }
    this._flushBufferedText(_0x3131a0, true);
  }
  _mapIncompleteReason(_0x2a4156) {
    switch (_0x2a4156) {
      case "max_output_tokens":
      case "max_tokens":
      case "output_truncated":
        return "length";
      default:
        return "stop";
    }
  }
  _mapStopReason(_0x1821c9) {
    switch (_0x1821c9) {
      case "stop":
        return xe.STOP_PATTERN;
      case "tool_calls":
        return xe.FUNCTION_CALL;
      case "length":
        return xe.MAX_TOKENS;
      case "error":
        return xe.ERROR;
      default:
        return xe.STOP_PATTERN;
    }
  }
};
var Ni = "请继续执行，不要只说明计划，直接调用工具或给出完整结果。";
var Hu = "[短停续跑]";
function Fu(_0x4dc667) {
  let _0x5bacbe = String(process.env[_0x4dc667] ?? "1").trim().toLowerCase();
  return _0x5bacbe !== "0" && _0x5bacbe !== "false" && _0x5bacbe !== "off" && _0x5bacbe !== "no";
}
function wi(_0x574645, _0x17f182, _0x2c9112, _0x5ab38c) {
  let _0x4a1f68 = parseInt(String(process.env[_0x574645] ?? String(_0x17f182)), 10);
  if (Number.isFinite(_0x4a1f68)) {
    return Math.min(Math.max(_0x4a1f68, _0x2c9112), _0x5ab38c);
  } else {
    return _0x17f182;
  }
}
function $i() {
  return {
    enabled: Fu("BYOK_SHORT_STOP_CONTINUE"),
    maxChars: wi("BYOK_SHORT_STOP_MAX_CHARS", 80, 1, 10000),
    maxContinues: wi("BYOK_SHORT_STOP_CONTINUE_MAX", 1, 0, 5)
  };
}
function vi(_0x14049e) {
  let _0x9ce53f = String(_0x14049e || "").trim().toLowerCase();
  return _0x9ce53f === "end_turn" || _0x9ce53f === "stop" || _0x9ce53f === "end";
}
function Pi(_0x21186c) {
  let _0x287e97 = !!_0x21186c.enabled;
  let _0x148843 = Number(_0x21186c.maxChars) || 80;
  let _0x356514 = Number(_0x21186c.maxContinues) || 0;
  let _0x4ee6ae = Number(_0x21186c.continuesUsed) || 0;
  let _0x44ab79 = _0x21186c.stopReason;
  let _0x4f9698 = !!_0x21186c.hasToolUse;
  let _0x59be2a = Math.max(0, Number(_0x21186c.visibleTextChars) || 0);
  let _0x4f5863 = !!_0x21186c.hasError;
  let _0x275f3e = "chars=" + _0x59be2a + " tool=" + (_0x4f9698 ? 1 : 0) + " continued=" + _0x4ee6ae + "/" + _0x356514 + " stop=" + (_0x44ab79 || "null") + " enabled=" + (_0x287e97 ? 1 : 0);
  if (_0x4f9698) {
    return {
      action: "pass",
      phase: null,
      detail: _0x275f3e
    };
  } else if (_0x4f5863) {
    return {
      action: "pass",
      phase: "跳过",
      detail: _0x275f3e + " reason=error"
    };
  } else if (String(_0x44ab79 || "").toLowerCase() === "max_tokens") {
    return {
      action: "pass",
      phase: "跳过",
      detail: _0x275f3e + " reason=max_tokens"
    };
  } else if (vi(_0x44ab79)) {
    if (_0x287e97) {
      if (_0x356514 <= 0 || _0x4ee6ae >= _0x356514) {
        return {
          action: "pass",
          phase: "跳过",
          detail: _0x275f3e + " reason=已续过"
        };
      } else if (_0x59be2a >= _0x148843) {
        return {
          action: "pass",
          phase: null,
          detail: _0x275f3e + " reason=正文足够"
        };
      } else {
        return {
          action: "continue",
          phase: "触发",
          detail: _0x275f3e + " reason=短end_turn"
        };
      }
    } else {
      return {
        action: "pass",
        phase: "跳过",
        detail: _0x275f3e + " reason=disabled"
      };
    }
  } else {
    return {
      action: "pass",
      phase: null,
      detail: _0x275f3e
    };
  }
}
function Li({
  continuesUsed: _0x4e6738,
  stopReason: _0x30c7bb,
  hasToolUse: _0x5917b3,
  visibleTextChars: _0x2746fb,
  maxChars: _0x532194,
  hasError: _0x61d0e3,
  aborted: _0xb41d27
}) {
  if (!_0x4e6738 || _0x4e6738 < 1) {
    return null;
  } else if (_0xb41d27 || _0x61d0e3) {
    return "放弃";
  } else if (_0x5917b3 || !vi(_0x30c7bb) || Math.max(0, Number(_0x2746fb) || 0) >= (Number(_0x532194) || 80)) {
    return "成功";
  } else {
    return "放弃";
  }
}
function Bi(_0x452ed5, _0x5b4c86) {
  return Hu + " " + _0x452ed5 + " · " + _0x5b4c86;
}
function Di(_0x4c889c) {
  if (!Array.isArray(_0x4c889c) || _0x4c889c.length === 0) {
    return {
      chunks: _0x4c889c || [],
      strippedStop: false
    };
  }
  let _0x276e2d = false;
  let _0x1f27eb = [];
  for (let _0x8c43d9 of _0x4c889c) {
    if (_0x8c43d9 && _0x8c43d9.__stopChunk) {
      _0x276e2d = true;
      continue;
    }
    _0x1f27eb.push(_0x8c43d9);
  }
  return {
    chunks: _0x1f27eb,
    strippedStop: _0x276e2d
  };
}
function Ui(_0xf5b0ed, _0x5c95c0, _0x23faf3 = Ni) {
  let _0x57911c = Array.isArray(_0xf5b0ed) ? _0xf5b0ed.slice() : [];
  let _0xa68fb7 = String(_0x5c95c0 || "").trim();
  if (_0xa68fb7) {
    _0x57911c.push({
      role: "assistant",
      content: _0xa68fb7
    });
  }
  _0x57911c.push({
    role: "user",
    content: String(_0x23faf3 || Ni)
  });
  return _0x57911c;
}
import _0x9aa8e5 from "node:https";
import _0x1deb87 from "node:http";
function so(_0x4e1a2a) {
  return String(_0x4e1a2a || "").replace(/^https?:\/\//i, "");
}
function qe(_0x5b1c49) {
  let _0x4a5cc5 = so(String(_0x5b1c49 || "").trim()).replace(/\/+$/, "");
  let _0x1f3c45 = _0x4a5cc5.indexOf("/");
  if (_0x1f3c45 < 0) {
    return {
      host: _0x4a5cc5,
      pathPrefix: ""
    };
  } else {
    return {
      host: _0x4a5cc5.slice(0, _0x1f3c45),
      pathPrefix: _0x4a5cc5.slice(_0x1f3c45)
    };
  }
}
function En(_0x525d6e) {
  let {
    host: _0x12e5c4
  } = qe(_0x525d6e);
  let _0x1933e4 = _0x12e5c4.split(":");
  if (_0x1933e4.length >= 2 && /^\d+$/.test(_0x1933e4[_0x1933e4.length - 1])) {
    return {
      hostname: _0x1933e4.slice(0, -1).join(":"),
      port: parseInt(_0x1933e4[_0x1933e4.length - 1], 10)
    };
  } else {
    return {
      hostname: _0x12e5c4,
      port: 443
    };
  }
}
function rr(_0x5484ed) {
  let _0xcd00e6 = qe(so(_0x5484ed)).host.toLowerCase();
  let _0x31542a = _0xcd00e6.replace(/:\d+$/, "");
  if (_0x31542a === "127.0.0.1" || _0x31542a === "localhost" || _0x31542a === "0.0.0.0" || _0x31542a === "::1" || _0x31542a === "[::1]") {
    return true;
  }
  let _0x55024e = En(_0xcd00e6);
  return _0x55024e.port !== 443 && _0x55024e.port !== 80 && /:\d+$/.test(_0xcd00e6);
}
function sr(_0x44c0cc, _0x135704) {
  if (_0x135704 === true || _0x135704 === false) {
    return _0x135704;
  }
  let _0x552b74 = String(_0x44c0cc || "").trim();
  if (/^http:\/\//i.test(_0x552b74)) {
    return true;
  } else if (/^https:\/\//i.test(_0x552b74)) {
    return false;
  } else {
    return rr(_0x552b74);
  }
}
var Ku = ["/messages", "/chat/completions", "/responses", "/models"];
function ir(_0x15465f, _0x2ff789, _0x4e9950) {
  let _0x167aa2 = String(_0x15465f || "").replace(/\/+$/, "");
  let _0x4dbe25 = _0x2ff789.startsWith("/") ? _0x2ff789 : "/" + _0x2ff789;
  if (Ku.some(_0x36336c => _0x167aa2.includes(_0x36336c))) {
    return _0x167aa2;
  } else if (_0x167aa2) {
    return _0x167aa2 + _0x4dbe25;
  } else {
    return String(_0x4e9950 || "").trim() || _0x4dbe25;
  }
}
import _0x208c38 from "node:fs";
import _0x5c7068 from "node:path";
var qi = Pc(Wi(), 1);
var {
  familyKeyFromUid: ao,
  officialUidFromLegacyByok: Ji,
  deriveVariantOptsFromUid: ur
} = qi.default;
var Ju = new Set(["CLAUDE_4_OPUS_BYOK", "CLAUDE_4_OPUS_THINKING_BYOK", "CLAUDE_4_SONNET_BYOK", "CLAUDE_4_SONNET_THINKING_BYOK", "MODEL_CLAUDE_4_OPUS_BYOK", "MODEL_CLAUDE_4_OPUS_THINKING_BYOK", "MODEL_CLAUDE_4_SONNET_BYOK", "MODEL_CLAUDE_4_SONNET_THINKING_BYOK"]);
var Jt = new Map();
var Ot = process.env.MODEL_CAPTURE_PATH || "";
function Qi(_0x47a711) {
  if (_0x47a711) {
    Ot = _0x47a711;
  }
}
function Qu() {
  if (!!Ot && !!_0x208c38.existsSync(Ot)) {
    try {
      let _0x21dd15 = JSON.parse(_0x208c38.readFileSync(Ot, "utf8"));
      if (!Array.isArray(_0x21dd15)) {
        return;
      }
      for (let _0x11926e of _0x21dd15) {
        if (_0x11926e && _0x11926e.id) {
          Jt.set(_0x11926e.id, _0x11926e);
        }
      }
    } catch {}
  }
}
Qu();
function co(_0x4d6285, _0x2e10cc = {}) {
  try {
    let _0x253612 = ve(_0x4d6285, _0x2e10cc || {});
    let _0x23af4e = V(_0x253612);
    let _0x158570 = j(_0x23af4e, 21, 2);
    if (_0x158570) {
      return _0x158570.value.toString("utf8");
    }
    let _0x3de63b = j(_0x23af4e, 3, 2);
    if (_0x3de63b) {
      let _0x55cc67 = _0x3de63b.value.toString("utf8");
      if (_0x55cc67 && _0x55cc67.length < 120 && /[A-Z0-9_]/i.test(_0x55cc67)) {
        return _0x55cc67;
      }
    }
  } catch {}
  return "";
}
function Zu(_0x476868, _0x6826f5 = 12000) {
  let _0x7a3189 = Buffer.isBuffer(_0x476868) ? _0x476868 : Buffer.from(_0x476868 || []);
  let _0x30f1a4 = _0x7a3189.toString("utf8", 0, Math.min(_0x7a3189.length, _0x6826f5)).match(/\b(?:MODEL_[A-Z0-9_]+|CLAUDE_[A-Z0-9_]+|GPT_[A-Z0-9_]+|GEMINI_[A-Z0-9_]+|[a-z]+-[a-z0-9.-]+)\b/g) || [];
  return [...new Set(_0x30f1a4)].filter(_0x45d5b6 => _0x45d5b6.length >= 3 && _0x45d5b6.length <= 80);
}
function It(_0xf0baa9) {
  let _0x5f83ef = String(_0xf0baa9 || "").trim();
  if (!_0x5f83ef) {
    return false;
  }
  if (Ju.has(_0x5f83ef) || /_BYOK\b/i.test(_0x5f83ef) || /\bBYOK\b/i.test(_0x5f83ef)) {
    return true;
  }
  let _0x48fd85 = Jt.get(_0x5f83ef);
  return !!_0x48fd85 && _0x48fd85.byok === true;
}
// Devin invokes history compaction through internal UIDs instead of a normal
// Cascade model UID. Route those requests through the configured BYOK slot,
// but keep them out of the user-facing model-disclosure path.
function _isInternalCompactionUid(_0xuid) {
  return /^(?:compactor|memory-migration-default)$/i.test(String(_0xuid || "").trim());
}
function _resolveInternalCascadeBinding(_0xcfg) {
  let _0xconfig = _0xcfg || Te();
  let _0xgroups = [
    _0xconfig.cascadeBindings && typeof _0xconfig.cascadeBindings === "object" ? _0xconfig.cascadeBindings : {},
    _0xconfig.byokBindingsV2 && typeof _0xconfig.byokBindingsV2 === "object" ? _0xconfig.byokBindingsV2 : {}
  ];
  for (let _0xbindings of _0xgroups) {
    for (let [_0xkey, _0xbinding] of Object.entries(_0xbindings)) {
      if (_0xbinding?.providerId && _0xbinding?.modelId) {
        return Vi(_0xkey, _0xkey, _0xbinding, _0xconfig, "internal-compactor");
      }
    }
  }
  return null;
}
function _byokSubagentDisabled() {
  let _0xvalue = String(process.env.BYOK_DISABLE_SUBAGENT ?? "").trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(_0xvalue);
}
var Zi = {
  CLAUDE_4_OPUS_BYOK: "MODEL_CLAUDE_4_OPUS_BYOK",
  CLAUDE_4_OPUS_THINKING_BYOK: "MODEL_CLAUDE_4_OPUS_THINKING_BYOK",
  CLAUDE_4_SONNET_BYOK: "MODEL_CLAUDE_4_SONNET_BYOK",
  CLAUDE_4_SONNET_THINKING_BYOK: "MODEL_CLAUDE_4_SONNET_THINKING_BYOK"
};
var dr = {
  MODEL_CLAUDE_4_OPUS_BYOK: "byokOpus",
  MODEL_CLAUDE_4_OPUS_THINKING_BYOK: "byokOpusThinking",
  MODEL_CLAUDE_4_SONNET_BYOK: "byokSonnet",
  MODEL_CLAUDE_4_SONNET_THINKING_BYOK: "byokSonnetThinking"
};
var zi = {
  MODEL_CLAUDE_4_OPUS_BYOK: "Claude Opus 4 BYOK",
  MODEL_CLAUDE_4_OPUS_THINKING_BYOK: "Claude Opus 4 Thinking BYOK",
  MODEL_CLAUDE_4_SONNET_BYOK: "Claude Sonnet 4 BYOK",
  MODEL_CLAUDE_4_SONNET_THINKING_BYOK: "Claude Sonnet 4 Thinking BYOK"
};
var lr = {
  ...zi,
  ...Object.fromEntries(Object.entries(Zi).map(([_0x3f7e0e, _0x38e28a]) => [_0x3f7e0e, zi[_0x38e28a] || _0x38e28a]))
};
function Qt(_0x125ac0) {
  let _0x28e1c4 = String(_0x125ac0 || "").trim();
  return Zi[_0x28e1c4] || _0x28e1c4;
}
function ea(_0x3163fe, _0x2168c7 = null) {
  let _0x5d6769 = Ct(_0x3163fe, _0x2168c7);
  if (_0x5d6769 && _0x5d6769.modelId) {
    return _0x5d6769.modelId;
  } else {
    return "";
  }
}
var ed = ["low", "medium", "high", "xhigh", "max"];
var kt = 1000000;
var At = 200000;
// Bound third-party models should not inherit Devin's legacy 200K fallback.
// Keep At for official compatibility, while using an explicit/300K BYOK default.
var _byokDefaultContextTokensCascade = 300000;
var _byokMaxContextTokensCascade = 2000000;
function In(_0x450567) {
  let _0x4ea2bf = Math.floor(Number(_0x450567?.contextLimit) || 0);
  if (Number.isFinite(_0x4ea2bf) && _0x4ea2bf > 0) {
    return Math.min(_byokMaxContextTokensCascade, Math.max(8192, _0x4ea2bf));
  }
  return _0x450567 && _0x450567.context1m === false ? _byokDefaultContextTokensCascade : kt;
}
function ta(_0x3c5b99) {
  return !_0x3c5b99 || _0x3c5b99.context1m !== false;
}
function td(_0x1b0088) {
  if (!_0x1b0088 || _0x1b0088.thinking !== true) {
    return {
      thinking: false,
      thinkingBudget: 0,
      effort: ""
    };
  }
  let _0x4c41f2 = parseInt(_0x1b0088.thinkingBudget, 10);
  let _0xe38286 = Number.isFinite(_0x4c41f2) && _0x4c41f2 > 0 ? _0x4c41f2 : 0;
  let _0x3827f2 = String(_0x1b0088.effort || "").trim().toLowerCase();
  let _0x22db4f = ed.includes(_0x3827f2) ? _0x3827f2 : "max";
  return {
    thinking: true,
    thinkingBudget: _0xe38286,
    effort: _0x22db4f
  };
}
function Vi(_0x189129, _0x147a2e, _0x39ad88, _0x2cbf83, _0x1f6801) {
  if (!_0x39ad88?.providerId || !_0x39ad88?.modelId) {
    return null;
  }
  let _0x59caac = String(_0x39ad88.modelId).trim();
  let _0x5e31c4 = String(_0x39ad88.providerId);
  let _0x512653 = _0x2cbf83.providerHealth?.[_0x5e31c4];
  let _0x1d820f = _0x512653 && (_0x512653.status === "circuit-open" || Number(_0x512653.circuitUntil) > Date.now());
  if (_0x1d820f) {
    let _0x48beb7 = Object.keys(_0x2cbf83.providers || {}).find(_0x15c107 => {
      if (_0x15c107 === _0x5e31c4) return false;
      let _0x2b49b4 = _0x2cbf83.providerHealth?.[_0x15c107];
      return !_0x2b49b4 || _0x2b49b4.status !== "circuit-open" && Number(_0x2b49b4.circuitUntil) <= Date.now();
    });
    if (_0x48beb7) _0x5e31c4 = _0x48beb7;
  }
  let _0x3389e7 = _0x2cbf83.providers?.[_0x5e31c4];
  let _0x5bc0f0 = _0x2cbf83.defaultProviderId && _0x2cbf83.providers?.[_0x2cbf83.defaultProviderId] ? _0x2cbf83.providers[_0x2cbf83.defaultProviderId] : null;
  let _0x29acd5 = _0x3389e7 || _0x5bc0f0;
  let _0x29cca3 = ur(_0x189129);
  let _0x52878b = _0x39ad88.thinking === true || _0x39ad88.thinking === false ? td(_0x39ad88) : null;
  let _0x31bb67 = _0x52878b ? _0x52878b.thinking : _0x29cca3.thinking;
  let _0x477e3a = _0x52878b ? _0x52878b.thinkingBudget : _0x29cca3.thinkingBudget;
  let _0x3c7ac3 = _0x52878b && _0x52878b.thinking ? _0x52878b.effort : _0x29cca3.effort || (_0x31bb67 ? "max" : "");
  let _0x172a95;
  if (_0x39ad88.context1m === true || _0x39ad88.context1m === false) {
    _0x172a95 = ta(_0x39ad88);
  } else {
    _0x172a95 = _0x29cca3.context1m;
  }
  let _0x3a62c2 = In({
    ..._0x39ad88,
    context1m: _0x172a95
  });
  return {
    slotId: _0x147a2e,
    matchKind: _0x1f6801 || "exact",
    providerId: _0x5e31c4,
    modelId: _0x59caac,
    provider: _0x29acd5,
    thinking: !!_0x31bb67,
    thinkingBudget: _0x477e3a || 0,
    effort: _0x3c7ac3 || "",
    context1m: _0x172a95,
    contextLimit: _0x3a62c2,
    providerName: _0x3389e7 && (_0x3389e7.name || _0x5e31c4) || _0x5bc0f0 && (_0x5bc0f0.name || _0x2cbf83.defaultProviderId) || _0x5e31c4,
    failoverFrom: _0x5e31c4 !== String(_0x39ad88.providerId) ? String(_0x39ad88.providerId) : "",
    supportsVision: _0x39ad88.supportsVision
  };
}
function nd(_0x2dfc8a, _0x5a5445) {
  let _0x4e464c = String(_0x2dfc8a || "").trim();
  if (!_0x4e464c) {
    return null;
  }
  let _0x8adb3 = _0x5a5445.cascadeBindings && typeof _0x5a5445.cascadeBindings == "object" ? _0x5a5445.cascadeBindings : {};
  let _0x4144fb = _0x4e464c;
  if (/_BYOK/i.test(_0x4144fb)) {
    let _0x37a97b = Ji(_0x4144fb);
    if (_0x37a97b) {
      _0x4144fb = _0x37a97b;
    }
  }
  let _0x12f9a2 = _0x8adb3[_0x4144fb] || _0x8adb3[_0x4e464c];
  if (_0x12f9a2?.providerId && _0x12f9a2?.modelId) {
    return {
      key: _0x8adb3[_0x4144fb] ? _0x4144fb : _0x4e464c,
      binding: _0x12f9a2,
      matchKind: "exact"
    };
  }
  let _0x343642 = ao(_0x4144fb);
  if (_0x343642) {
    for (let [_0x3100c8, _0x5b8ce7] of Object.entries(_0x8adb3)) {
      if (!_0x5b8ce7?.providerId || !_0x5b8ce7?.modelId) {
        continue;
      }
      if (ao(_0x5b8ce7.familyKey || ao(_0x3100c8)) === _0x343642) {
        return {
          key: _0x3100c8,
          binding: _0x5b8ce7,
          matchKind: "family"
        };
      }
    }
  }
  return null;
}
function Ct(_0x486a2f, _0x5671af = null) {
  let _0x37b4be = _0x5671af || Te();
  if (_0x37b4be.cascadeEnabled === false || _0x37b4be.cascadeEnabled === 0) {
    return null;
  }
  let _0x8281fa = nd(_0x486a2f, _0x37b4be);
  if (_0x8281fa) {
    return Vi(_0x486a2f, _0x8281fa.key, _0x8281fa.binding, _0x37b4be, _0x8281fa.matchKind);
  }
  let _0x5bb89c = Qt(_0x486a2f);
  let _0x411ec0 = _0x37b4be.byokBindingsV2?.[_0x5bb89c];
  if (_0x411ec0?.providerId && _0x411ec0?.modelId) {
    return Vi(_0x486a2f, _0x5bb89c, _0x411ec0, _0x37b4be, "legacy-slot");
  }
  let _0x401f17 = dr[_0x5bb89c];
  let _0x37951e = _0x401f17 && _0x37b4be[_0x401f17] ? String(_0x37b4be[_0x401f17]).trim() : "";
  if (_0x37951e) {
    let _0x2f3e40 = _0x37b4be.defaultProviderId;
    let _0x231a08 = _0x2f3e40 && _0x37b4be.providers?.[_0x2f3e40] ? _0x37b4be.providers[_0x2f3e40] : null;
    let _0x43b6ac = ur(_0x486a2f);
    return {
      slotId: _0x5bb89c,
      matchKind: "legacy-env",
      providerId: _0x2f3e40 || null,
      modelId: _0x37951e,
      provider: _0x231a08,
      providerName: _0x231a08?.name || _0x2f3e40 || "",
      thinking: !!_0x43b6ac.thinking,
      thinkingBudget: 0,
      effort: _0x43b6ac.effort || (_0x43b6ac.thinking ? "max" : ""),
      context1m: _0x43b6ac.context1m !== false,
      contextLimit: In(_0x43b6ac)
    };
  }
  return null;
}
function xt(_0x1908c9, _0xdc0881 = null) {
  return !!Ct(_0x1908c9, _0xdc0881);
}
function na(_0x532046 = null) {
  let _0x46b2fb = _0x532046 || Te();
  let _0x3230ed = {};
  let _0x11e02a = _0x46b2fb.cascadeBindings && typeof _0x46b2fb.cascadeBindings == "object" ? _0x46b2fb.cascadeBindings : {};
  for (let [_0x2f982a, _0x4e081c] of Object.entries(_0x11e02a)) {
    if (!_0x4e081c?.providerId || !_0x4e081c?.modelId) {
      continue;
    }
    let _0x1b1ce8 = ur(_0x2f982a);
    let _0x3b2828 = _0x4e081c.context1m === true || _0x4e081c.context1m === false ? ta(_0x4e081c) : _0x1b1ce8.context1m;
    _0x3230ed[_0x2f982a] = In({
      ..._0x4e081c,
      context1m: _0x3b2828
    });
  }
  for (let _0x21796e of Object.keys(dr)) {
    let _0x31f93a = _0x46b2fb.byokBindingsV2?.[_0x21796e];
    if (_0x31f93a?.providerId && _0x31f93a?.modelId) {
      _0x3230ed[_0x21796e] = In(_0x31f93a);
    }
  }
  let _0x525814 = Array.isArray(_0x46b2fb.boundOfficialUids) ? _0x46b2fb.boundOfficialUids : [];
  for (let _0x2be0f0 of _0x525814) {
    let _0xdec1f0 = String(_0x2be0f0 || "").trim();
    if (!_0xdec1f0 || _0x3230ed[_0xdec1f0] != null) {
      continue;
    }
    let _0x2db6ce = Ct(_0xdec1f0, _0x46b2fb);
    if (_0x2db6ce) {
      _0x3230ed[_0xdec1f0] = _0x2db6ce.contextLimit || At;
    }
  }
  return _0x3230ed;
}
function od(_0xb7f7a8 = null) {
  let _0x3b0ca6 = _0xb7f7a8 || Te();
  let _0x5e8eba = new Set();
  let _0x56c357 = [];
  let _0x1d8016 = _0x3b0ca6.cascadeBindings && typeof _0x3b0ca6.cascadeBindings == "object" ? _0x3b0ca6.cascadeBindings : {};
  for (let [_0x57a126, _0x36e582] of Object.entries(_0x1d8016)) {
    if (!_0x36e582?.providerId || !_0x36e582?.modelId || _0x5e8eba.has(_0x57a126)) {
      continue;
    }
    _0x5e8eba.add(_0x57a126);
    let _0x35439a = Ct(_0x57a126, _0x3b0ca6);
    let _0x502606 = _0x35439a?.modelId || _0x36e582.modelId || "";
    _0x56c357.push({
      id: _0x57a126,
      label: lr[_0x57a126] || _0x57a126,
      upstream: _0x502606,
      providerId: _0x35439a?.providerId || _0x36e582.providerId || "",
      providerName: _0x35439a?.providerName || "",
      thinking: !!_0x35439a?.thinking,
      thinkingBudget: _0x35439a?.thinkingBudget || 0,
      effort: _0x35439a?.effort || "",
      context1m: _0x35439a ? _0x35439a.context1m !== false : true,
      contextLimit: _0x35439a?.contextLimit || In(_0x36e582),
      bound: !!_0x502606,
      familyKey: _0x36e582.familyKey || ao(_0x57a126)
    });
  }
  for (let _0x336526 of Object.keys(dr)) {
    if (_0x5e8eba.has(_0x336526)) {
      continue;
    }
    let _0x486752 = Ct(_0x336526, _0x3b0ca6);
    if (_0x486752?.modelId) {
      _0x5e8eba.add(_0x336526);
      _0x56c357.push({
        id: _0x336526,
        label: lr[_0x336526] || _0x336526,
        upstream: _0x486752.modelId || "",
        providerId: _0x486752.providerId || "",
        providerName: _0x486752.providerName || "",
        thinking: !!_0x486752.thinking,
        thinkingBudget: _0x486752.thinkingBudget || 0,
        effort: _0x486752.effort || "",
        context1m: _0x486752.context1m !== false,
        contextLimit: _0x486752.contextLimit || In(_0x486752),
        bound: true,
        familyKey: ao(Ji(_0x336526) || _0x336526)
      });
    }
  }
  return _0x56c357;
}
var Ye = {
  cascadeId: "",
  label: "",
  upstream: "",
  bound: false,
  declaredModel: "",
  configuredModel: "",
  declaredTs: 0,
  ts: 0
};
function fr(_0x2abbbc, _0x12004f) {
  let _0x2666d1 = Qt(_0x2abbbc);
  Ye = {
    ...Ye,
    cascadeId: _0x2666d1,
    label: lr[_0x2666d1] || _0x2666d1,
    upstream: _0x12004f || "",
    configuredModel: _0x12004f || "",
    bound: !!_0x12004f && !!String(_0x12004f).trim(),
    ts: Date.now()
  };
}
function pr(_0x57d482, _0x1774e5 = "") {
  let _0x1f337d = String(_0x57d482 || "").trim();
  if (!_0x1f337d) {
    return;
  }
  let _0x31a675 = String(_0x1774e5 || Ye.configuredModel || Ye.upstream || "").trim();
  let _0xb3e2bc = String(Ye.declaredModel || "").trim();
  let _0x6e54c8 = _0x1f337d !== _0xb3e2bc;
  Ye = {
    ...Ye,
    declaredModel: _0x1f337d,
    configuredModel: _0x31a675 || Ye.configuredModel || "",
    declaredTs: _0x6e54c8 ? Date.now() : Ye.declaredTs || Date.now(),
    ts: Date.now()
  };
  if (_0x6e54c8 && _0x31a675 && _0x31a675 !== _0x1f337d) {
    S(_.UPSTREAM, "model 不一致 · 配置目标=" + _0x31a675 + " · 上游声明=" + _0x1f337d);
  }
}
var On = 0;
var xn = 0;
function oa(_0x5b1b90 = "") {
  On = On + 1 >>> 0 || 1;
  return {
    epoch: On,
    reason: String(_0x5b1b90 || "")
  };
}
function ra(_0xa1a26d) {
  let _0x152d09 = Number(_0xa1a26d) || 0;
  if (_0x152d09 > xn) {
    xn = _0x152d09 >>> 0;
  }
  return {
    ok: true,
    appliedEpoch: xn,
    pickerEpoch: On
  };
}
function sa() {
  return xn;
}
function An() {
  let _0x4129b0 = Te();
  let _0x1544b4 = !!_0x4129b0.cascadeEnabled;
  return {
    ...Ye,
    slots: od(_0x4129b0),
    cascadeEnabled: _0x1544b4,
    unlockCascade: _0x1544b4,
    pickerEpoch: On,
    pickerAppliedEpoch: xn
  };
}
function Xi(_0x52fca6) {
  let _0x14653d = _0x52fca6.rpc || "unknown";
  let _0x1f6714 = String(_0x52fca6.requestedModel || "").trim();
  let _0x3b1051 = Array.isArray(_0x52fca6.hints) ? _0x52fca6.hints : [];
  let _0x4dc1dc = _0x52fca6.route || "unknown";
  let _0x2383ca = _0x4dc1dc.startsWith("byok") || It(_0x1f6714) || _0x3b1051.some(It);
  let _0x3bb0a0 = _0x1f6714 || _0x14653d + ":" + _0x3b1051.join("|") || _0x14653d;
  let _0xcb099d = {
    id: _0x3bb0a0,
    rpc: _0x14653d,
    requestedModel: _0x1f6714,
    hints: _0x3b1051,
    route: _0x4dc1dc,
    byok: _0x2383ca,
    count: 1,
    firstSeen: new Date().toISOString(),
    lastSeen: new Date().toISOString()
  };
  let _0x13ef09 = Jt.get(_0x3bb0a0);
  if (_0x13ef09) {
    _0xcb099d.count = (_0x13ef09.count || 0) + 1;
    _0xcb099d.firstSeen = _0x13ef09.firstSeen || _0xcb099d.firstSeen;
  }
  Jt.set(_0x3bb0a0, _0xcb099d);
  let _0x3e0f2b = _0x2383ca ? "BYOK" : "OFFICIAL";
  let _0x446ea3 = _0x1f6714 || _0x3b1051.slice(0, 3).join(", ") || "(empty)";
  if (ss(_0x2383ca)) {
    S(_.MODEL_CAPTURE, _0x3e0f2b + " · " + _0x14653d + " · " + _0x446ea3 + " · route=" + _0x4dc1dc);
  }
  rd();
  return _0xcb099d;
}
function rd() {
  if (Ot) {
    try {
      _0x208c38.mkdirSync(_0x5c7068.dirname(Ot), {
        recursive: true
      });
      let _0x1c5d33 = [...Jt.values()].sort((_0x25029c, _0x1bc3d2) => (_0x1bc3d2.lastSeen || "").localeCompare(_0x25029c.lastSeen || ""));
      _0x208c38.writeFileSync(Ot, JSON.stringify(_0x1c5d33, null, 2), "utf8");
    } catch (_0x3ef8b9) {
      S(_.ERR, "模型捕获写入失败: " + _0x3ef8b9.message, {
        err: true
      });
    }
  }
}
function ia() {
  return [...Jt.values()].sort((_0x265203, _0x3c42fc) => (_0x3c42fc.lastSeen || "").localeCompare(_0x265203.lastSeen || ""));
}
function aa(_0x31356f, _0x28261d, _0x1aa1a0) {
  if (_0x31356f === "GetChatMessage") {
    let _0x11cba0 = co(_0x28261d, _0x1aa1a0);
    let _0x34306c = xt(_0x11cba0);
    Xi({
      rpc: _0x31356f,
      requestedModel: _0x11cba0,
      route: _0x34306c ? "cascade-bound" : It(_0x11cba0) ? "byok-unbound-passthrough" : "official"
    });
    return _0x34306c;
  }
  if (_0x31356f === "GetStreamingExternalChatCompletions") {
    let _0x5ae6f0 = Zu(_0x28261d);
    let _0x3200fa = co(_0x28261d, _0x1aa1a0) || _0x5ae6f0[0] || "";
    let _0x2422a9 = xt(_0x3200fa);
    if (!_0x2422a9) {
      for (let _0x475d93 of _0x5ae6f0) {
        if (xt(_0x475d93)) {
          _0x2422a9 = true;
          break;
        }
      }
    }
    Xi({
      rpc: _0x31356f,
      requestedModel: _0x3200fa,
      hints: _0x5ae6f0,
      route: _0x2422a9 ? "cascade-bound-external" : "official-external"
    });
    return _0x2422a9;
  }
  return false;
}
var ca = "estimated_request_window";
var ua = /[\u0000-\u001f\u007f-\u009f]/u;
var sd = /^[1-9][0-9]{0,31}$/u;
var id = new Set(["conversationId", "sourceRequestId"]);
var ad = new Set(["conversationId", "sourceRequestId", "sourceStartedAt", "sourceOrder", "tokensUsed", "contextLimit", "slotId", "requestedModelUid", "upstreamModelId", "providerId", "providerName", "tokenKind"]);
function ue(_0x84acf4, _0x4e3d30) {
  return {
    ok: false,
    code: _0x84acf4,
    field: _0x4e3d30
  };
}
function Mt(_0x3e3e5d, _0x23b33c, _0x1d6c93) {
  if (typeof _0x3e3e5d != "string") {
    return ue("INVALID_SNAPSHOT", _0x23b33c);
  }
  let _0x56c927 = _0x3e3e5d.trim();
  if (!_0x56c927 || _0x56c927.length > _0x1d6c93 || ua.test(_0x56c927)) {
    return ue("INVALID_SNAPSHOT", _0x23b33c);
  } else {
    return {
      ok: true,
      value: _0x56c927
    };
  }
}
function hr(_0x304202, _0x2a7f04, {
  min: _0x3c8fdf = 0
} = {}) {
  if (!Number.isSafeInteger(_0x304202) || _0x304202 < _0x3c8fdf) {
    return ue("INVALID_SNAPSHOT", _0x2a7f04);
  } else {
    return {
      ok: true,
      value: _0x304202
    };
  }
}
function gr(_0x3e7d08) {
  if (typeof _0x3e7d08 != "string" || !sd.test(_0x3e7d08)) {
    return ue("INVALID_SNAPSHOT", "sourceOrder");
  }
  try {
    BigInt(_0x3e7d08);
  } catch {
    return ue("INVALID_SNAPSHOT", "sourceOrder");
  }
  return {
    ok: true,
    value: _0x3e7d08
  };
}
function Cn(_0x1b3ed1) {
  if (typeof _0x1b3ed1 != "string") {
    return ue("INVALID_CONVERSATION_ID", "conversationId");
  }
  let _0x5737de = _0x1b3ed1.trim();
  if (_0x5737de.length < 1 || _0x5737de.length > 256 || ua.test(_0x5737de)) {
    return ue("INVALID_CONVERSATION_ID", "conversationId");
  } else {
    return {
      ok: true,
      value: _0x5737de
    };
  }
}
function kn(_0xdc0509) {
  if (!_0xdc0509 || typeof _0xdc0509 != "object" || Array.isArray(_0xdc0509)) {
    return ue("INVALID_RESERVATION", "body");
  }
  for (let _0x54e8b7 of Object.keys(_0xdc0509)) {
    if (!id.has(_0x54e8b7)) {
      return ue("INVALID_RESERVATION", _0x54e8b7);
    }
  }
  let _0x597aa6 = Cn(_0xdc0509.conversationId);
  if (!_0x597aa6.ok) {
    return _0x597aa6;
  }
  let _0x4c8fbf = Mt(_0xdc0509.sourceRequestId, "sourceRequestId", 128);
  if (_0x4c8fbf.ok) {
    return {
      ok: true,
      value: {
        conversationId: _0x597aa6.value,
        sourceRequestId: _0x4c8fbf.value
      }
    };
  } else {
    return ue("INVALID_RESERVATION", _0x4c8fbf.field);
  }
}
function _r(_0x3bb8f6) {
  if (!_0x3bb8f6 || typeof _0x3bb8f6 != "object" || Array.isArray(_0x3bb8f6)) {
    return ue("INVALID_SNAPSHOT", "body");
  }
  for (let _0x43b294 of Object.keys(_0x3bb8f6)) {
    if (!ad.has(_0x43b294)) {
      return ue("INVALID_SNAPSHOT", _0x43b294);
    }
  }
  let _0x578018 = Cn(_0x3bb8f6.conversationId);
  if (!_0x578018.ok) {
    return _0x578018;
  }
  let _0x5b5a64 = Mt(_0x3bb8f6.sourceRequestId, "sourceRequestId", 128);
  if (!_0x5b5a64.ok) {
    return _0x5b5a64;
  }
  let _0x54f356 = hr(_0x3bb8f6.sourceStartedAt, "sourceStartedAt", {
    min: 1
  });
  if (!_0x54f356.ok) {
    return _0x54f356;
  }
  let _0x49802a = gr(_0x3bb8f6.sourceOrder);
  if (!_0x49802a.ok) {
    return _0x49802a;
  }
  let _0x582842 = hr(_0x3bb8f6.tokensUsed, "tokensUsed");
  if (!_0x582842.ok) {
    return _0x582842;
  }
  let _0x26ffb5 = hr(_0x3bb8f6.contextLimit, "contextLimit", {
    min: 1
  });
  if (!_0x26ffb5.ok) {
    return _0x26ffb5;
  }
  let _0x5e197b = Mt(_0x3bb8f6.slotId, "slotId", 256);
  if (!_0x5e197b.ok) {
    return _0x5e197b;
  }
  let _0xb3f5b2 = Mt(_0x3bb8f6.requestedModelUid, "requestedModelUid", 512);
  if (!_0xb3f5b2.ok) {
    return _0xb3f5b2;
  }
  let _0x1ab53a = Mt(_0x3bb8f6.upstreamModelId, "upstreamModelId", 512);
  if (!_0x1ab53a.ok) {
    return _0x1ab53a;
  }
  let _0x5eb806 = Mt(_0x3bb8f6.providerId, "providerId", 256);
  if (!_0x5eb806.ok) {
    return _0x5eb806;
  }
  let _0xf8962e = Mt(_0x3bb8f6.providerName, "providerName", 512);
  if (_0xf8962e.ok) {
    if (_0x3bb8f6.tokenKind !== ca) {
      return ue("INVALID_SNAPSHOT", "tokenKind");
    } else {
      return {
        ok: true,
        value: {
          conversationId: _0x578018.value,
          sourceRequestId: _0x5b5a64.value,
          sourceStartedAt: _0x54f356.value,
          sourceOrder: _0x49802a.value,
          tokensUsed: _0x582842.value,
          contextLimit: _0x26ffb5.value,
          slotId: _0x5e197b.value,
          requestedModelUid: _0xb3f5b2.value,
          upstreamModelId: _0x1ab53a.value,
          providerId: _0x5eb806.value,
          providerName: _0xf8962e.value,
          tokenKind: ca
        }
      };
    }
  } else {
    return _0xf8962e;
  }
}
function la(_0x36885f) {
  return JSON.stringify({
    conversationId: _0x36885f.conversationId,
    sourceRequestId: _0x36885f.sourceRequestId,
    sourceStartedAt: _0x36885f.sourceStartedAt,
    sourceOrder: _0x36885f.sourceOrder,
    tokensUsed: _0x36885f.tokensUsed,
    contextLimit: _0x36885f.contextLimit,
    slotId: _0x36885f.slotId,
    requestedModelUid: _0x36885f.requestedModelUid,
    upstreamModelId: _0x36885f.upstreamModelId,
    providerId: _0x36885f.providerId,
    providerName: _0x36885f.providerName,
    tokenKind: _0x36885f.tokenKind
  });
}
function da(_0x32bcc5) {
  if (_0x32bcc5) {
    return {
      conversationId: _0x32bcc5.conversationId,
      revision: _0x32bcc5.revision,
      sourceRequestId: _0x32bcc5.sourceRequestId,
      sourceStartedAt: _0x32bcc5.sourceStartedAt,
      tokensUsed: _0x32bcc5.tokensUsed,
      contextLimit: _0x32bcc5.contextLimit,
      slotId: _0x32bcc5.slotId,
      requestedModelUid: _0x32bcc5.requestedModelUid,
      upstreamModelId: _0x32bcc5.upstreamModelId,
      providerId: _0x32bcc5.providerId,
      providerName: _0x32bcc5.providerName,
      tokenKind: _0x32bcc5.tokenKind,
      updatedAt: _0x32bcc5.updatedAt
    };
  } else {
    return null;
  }
}
var mr = class {
  constructor(_0x24e38c = {}) {
    let {
      ttlMs: _0x36eeb7 = 86400000,
      maxConversations: _0x3af4d5 = 64,
      reservationTtlMs: _0x18d2a3 = _0x24e38c.ttlMs !== undefined ? _0x36eeb7 : 3600000,
      maxReservations: _0x52737c = 4096,
      now: _0x4f4519 = () => Date.now()
    } = _0x24e38c;
    this._ttlMs = _0x36eeb7;
    this._maxConversations = _0x3af4d5;
    this._reservationTtlMs = _0x18d2a3;
    this._maxReservations = _0x52737c;
    this._now = _0x4f4519;
    this._snapshots = new Map();
    this._recentSources = new Map();
    this._reservationsByRequestId = new Map();
    this._latestReservationByConversation = new Map();
    this._nextRevision = 1;
    this._nextSourceOrder = 0x1n;
  }
  _clock() {
    let _0xb7fd08 = Number(this._now());
    if (Number.isSafeInteger(_0xb7fd08) && _0xb7fd08 > 0) {
      return _0xb7fd08;
    } else {
      return Date.now();
    }
  }
  _deleteSnapshot(_0x6f3311) {
    this._snapshots.delete(_0x6f3311);
  }
  _prune(_0x3be773 = this._clock()) {
    let _0x1148fa = _0x3be773 - this._ttlMs;
    let _0x5eb267 = _0x3be773 - this._reservationTtlMs;
    for (let [_0x3c4b5e, _0x3cbac8] of this._snapshots) {
      if (_0x3cbac8.updatedAt <= _0x1148fa) {
        this._snapshots.delete(_0x3c4b5e);
      }
    }
    for (let [_0xb9145b, _0x4f9789] of this._recentSources) {
      if (_0x4f9789.updatedAt <= _0x1148fa) {
        this._recentSources.delete(_0xb9145b);
      }
    }
    for (let [_0x3b86a7, _0x542e92] of this._reservationsByRequestId) {
      if (_0x542e92.reservedAt <= _0x5eb267) {
        this._reservationsByRequestId.delete(_0x3b86a7);
      }
    }
    for (let [_0x34c205, _0x2db9fa] of this._latestReservationByConversation) {
      let _0x52db39 = this._reservationsByRequestId.get(_0x2db9fa.sourceRequestId);
      if (_0x2db9fa.reservedAt <= _0x5eb267 || !_0x52db39 || _0x52db39.conversationId !== _0x34c205 || _0x52db39.sourceOrder !== _0x2db9fa.sourceOrder) {
        this._latestReservationByConversation.delete(_0x34c205);
      }
    }
  }
  _enforceCapacity() {
    if (this._snapshots.size <= this._maxConversations) {
      return;
    }
    let _0x231c75 = [...this._snapshots.values()].sort((_0x22d125, _0x6dbdf) => _0x22d125.updatedAt - _0x6dbdf.updatedAt || _0x22d125.revision - _0x6dbdf.revision || _0x22d125.conversationId.localeCompare(_0x6dbdf.conversationId));
    let _0x3e6438 = this._snapshots.size - this._maxConversations;
    for (let _0x7a75ef = 0; _0x7a75ef < _0x3e6438; _0x7a75ef++) {
      this._deleteSnapshot(_0x231c75[_0x7a75ef].conversationId);
    }
  }
  _enforceRecentSourceCapacity() {
    let _0x25510d = Math.max(this._maxConversations * 4, this._maxConversations);
    if (this._recentSources.size <= _0x25510d) {
      return;
    }
    let _0x937db = [...this._recentSources.entries()].sort((_0x1a0c68, _0x3300ad) => _0x1a0c68[1].updatedAt - _0x3300ad[1].updatedAt || _0x1a0c68[1].revision - _0x3300ad[1].revision || _0x1a0c68[0].localeCompare(_0x3300ad[0]));
    let _0x26f8f7 = this._recentSources.size - _0x25510d;
    for (let _0x2cd196 = 0; _0x2cd196 < _0x26f8f7; _0x2cd196++) {
      this._recentSources.delete(_0x937db[_0x2cd196][0]);
    }
  }
  reserve(_0x1ba34e, _0x14f0a9) {
    let _0x6888ad = kn({
      conversationId: _0x1ba34e,
      sourceRequestId: _0x14f0a9
    });
    if (!_0x6888ad.ok) {
      return _0x6888ad;
    }
    let _0x3ba6cd = _0x6888ad.value;
    let _0x1ef375 = this._clock();
    this._prune(_0x1ef375);
    let _0x4981dd = this._reservationsByRequestId.get(_0x3ba6cd.sourceRequestId);
    if (_0x4981dd) {
      if (_0x4981dd.conversationId !== _0x3ba6cd.conversationId) {
        return ue("SOURCE_REQUEST_ID_CONFLICT", "sourceRequestId");
      } else {
        return {
          ok: true,
          accepted: true,
          duplicate: true,
          sourceOrder: _0x4981dd.sourceOrder
        };
      }
    }
    if (this._reservationsByRequestId.size >= this._maxReservations) {
      return {
        ok: true,
        accepted: false,
        reason: "reservation-capacity"
      };
    }
    let _0x4c1ab8 = this._nextSourceOrder.toString();
    this._nextSourceOrder += 0x1n;
    let _0x14002b = Object.freeze({
      conversationId: _0x3ba6cd.conversationId,
      sourceRequestId: _0x3ba6cd.sourceRequestId,
      sourceOrder: _0x4c1ab8,
      reservedAt: _0x1ef375
    });
    this._reservationsByRequestId.set(_0x3ba6cd.sourceRequestId, _0x14002b);
    this._latestReservationByConversation.set(_0x3ba6cd.conversationId, _0x14002b);
    return {
      ok: true,
      accepted: true,
      duplicate: false,
      sourceOrder: _0x4c1ab8
    };
  }
  publish(_0x1741d2) {
    let _0x1b2154 = _r(_0x1741d2);
    if (!_0x1b2154.ok) {
      return _0x1b2154;
    }
    let _0x5469ad = _0x1b2154.value;
    let _0x545c0b = this._clock();
    this._prune(_0x545c0b);
    let _0x5158a9 = this._reservationsByRequestId.get(_0x5469ad.sourceRequestId);
    if (!_0x5158a9) {
      return ue("UNRESERVED_SOURCE_REQUEST", "sourceRequestId");
    }
    if (_0x5158a9.conversationId !== _0x5469ad.conversationId || _0x5158a9.sourceRequestId !== _0x5469ad.sourceRequestId || _0x5158a9.sourceOrder !== _0x5469ad.sourceOrder) {
      return ue("RESERVATION_MISMATCH", "sourceOrder");
    }
    let _0x5b7774 = this._latestReservationByConversation.get(_0x5469ad.conversationId);
    if (!_0x5b7774) {
      return ue("EXPIRED_RESERVATION", "sourceOrder");
    }
    let _0x1bed56 = BigInt(_0x5469ad.sourceOrder);
    let _0x7c8789 = BigInt(_0x5b7774.sourceOrder);
    if (_0x1bed56 < _0x7c8789 || _0x5b7774.sourceRequestId !== _0x5469ad.sourceRequestId || _0x5b7774.sourceOrder !== _0x5469ad.sourceOrder) {
      return ue("STALE_RESERVATION", "sourceOrder");
    }
    let _0x3b4d53 = la(_0x5469ad);
    let _0x13a4b0 = this._recentSources.get(_0x5469ad.sourceRequestId);
    if (_0x13a4b0) {
      if (_0x13a4b0.conversationId !== _0x5469ad.conversationId || _0x13a4b0.fingerprint !== _0x3b4d53) {
        return ue("SOURCE_REQUEST_ID_CONFLICT", "sourceRequestId");
      } else {
        return {
          ok: true,
          accepted: false,
          reason: "duplicate",
          revision: _0x13a4b0.revision
        };
      }
    }
    let _0x1810e3 = this._snapshots.get(_0x5469ad.conversationId);
    if (_0x1810e3 && _0x1810e3.sourceRequestId === _0x5469ad.sourceRequestId) {
      if (la(_0x1810e3) !== _0x3b4d53) {
        return ue("SOURCE_REQUEST_ID_CONFLICT", "sourceRequestId");
      } else {
        return {
          ok: true,
          accepted: false,
          reason: "duplicate",
          revision: _0x1810e3.revision
        };
      }
    }
    let _0x543078 = this._nextRevision++;
    let _0x47c451 = Object.freeze({
      ..._0x5469ad,
      revision: _0x543078,
      updatedAt: _0x545c0b
    });
    this._snapshots.set(_0x5469ad.conversationId, _0x47c451);
    this._recentSources.set(_0x5469ad.sourceRequestId, {
      conversationId: _0x5469ad.conversationId,
      fingerprint: _0x3b4d53,
      revision: _0x543078,
      updatedAt: _0x545c0b
    });
    this._enforceCapacity();
    this._enforceRecentSourceCapacity();
    return {
      ok: true,
      accepted: true,
      reason: "stored",
      revision: _0x543078,
      snapshot: {
        ..._0x47c451
      }
    };
  }
  get(_0x42f266) {
    let _0x3d3ae7 = Cn(_0x42f266);
    if (!_0x3d3ae7.ok) {
      return _0x3d3ae7;
    }
    this._prune();
    let _0x14fb6b = this._snapshots.get(_0x3d3ae7.value);
    return {
      ok: true,
      snapshot: _0x14fb6b ? {
        ..._0x14fb6b
      } : null
    };
  }
  clear() {
    this._snapshots.clear();
    this._recentSources.clear();
    this._reservationsByRequestId.clear();
    this._latestReservationByConversation.clear();
  }
  get size() {
    this._prune();
    return this._snapshots.size;
  }
};
var at = new mr();
var ma = qe(process.env.ANTHROPIC_API_HOST || "api.anthropic.com").host;
var ud = qe(process.env.OPENAI_API_HOST || ma).host;
var K = {
  defaultModel: process.env.DEFAULT_MODEL || "",
  byokOpus: process.env.BYOK_MODEL_OPUS || "",
  byokOpusThinking: process.env.BYOK_MODEL_OPUS_THINKING || "",
  byokSonnet: process.env.BYOK_MODEL_SONNET || "",
  byokSonnetThinking: process.env.BYOK_MODEL_SONNET_THINKING || "",
  maxTokens: parseInt(process.env.MAX_TOKENS || "0", 10),
  forceDefault: false,
  anthropicHost: ma,
  anthropicApiPath: process.env.ANTHROPIC_API_PATH || "/messages",
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
  promptCacheTtl: "5m",
  openaiHost: ud,
  openaiApiPath: process.env.OPENAI_API_PATH || "/responses",
  openaiApiKey: process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || "",
  defaultProviderId: "",
  providers: {},
  providerHealth: {},
  byokBindingsV2: {},
  cascadeEnabled: false,
  cascadeBindings: {},
  boundOfficialUids: []
};
function Te() {
  return {
    ...K,
    providers: {
      ...(K.providers || {})
    },
    providerHealth: {
      ...(K.providerHealth || {})
    },
    byokBindingsV2: {
      ...(K.byokBindingsV2 || {})
    },
    cascadeBindings: {
      ...(K.cascadeBindings || {})
    },
    boundOfficialUids: Array.isArray(K.boundOfficialUids) ? K.boundOfficialUids.slice() : [],
    cascadeEnabled: !!K.cascadeEnabled
  };
}
function Sr(_0x19f44e) {
  let _0x3c932c = qe(_0x19f44e?.anthropicHost || "api.anthropic.com");
  let _0x24510b = _0x3c932c.host || "api.anthropic.com";
  let _0x186ffc = qe(_0x19f44e?.openaiHost || _0x24510b);
  let _0x3d32fe = _0x186ffc.host || _0x24510b;
  let _0x4a1648 = En(_0x24510b);
  let _0x3671fa = En(_0x3d32fe);
  let _0xa75b74 = fa(_0x19f44e?.anthropicApiPath, _0x3c932c.pathPrefix, "/messages");
  let _0x56349a = fa(_0x19f44e?.openaiApiPath, _0x186ffc.pathPrefix, "/chat/completions");
  let _0x277b77 = sr(_0x24510b, _0x19f44e?.useHttp);
  let _byokProviderProtocol = String(_0x19f44e?.protocol || _0x19f44e?.apiProtocol || _0x19f44e?.apiFormat || "").trim().toLowerCase();
  if (_byokProviderProtocol !== "openai" && _byokProviderProtocol !== "anthropic") _byokProviderProtocol = "";
  let _byokPromptCacheTtl = String(_0x19f44e?.promptCacheTtl ?? _0x19f44e?.cacheTtl ?? "5m").trim().toLowerCase() === "1h" ? "1h" : "5m";
  return {
    protocol: _byokProviderProtocol,
    anthropic: {
      host: _0x24510b,
      apiPath: _0xa75b74,
      apiKey: _0x19f44e?.anthropicApiKey || "",
      parsed: _0x4a1648,
      useHttp: _0x277b77,
      promptCacheTtl: _byokPromptCacheTtl
    },
    openai: {
      host: _0x3d32fe,
      apiPath: _0x56349a,
      apiKey: _0x19f44e?.openaiApiKey || _0x19f44e?.anthropicApiKey || "",
      parsed: _0x3671fa,
      useHttp: sr(_0x3d32fe, _0x19f44e?.useHttp ?? _0x277b77)
    }
  };
}
function Ue() {
  let _0x2a8bae = K.defaultProviderId;
  if (_0x2a8bae && K.providers?.[_0x2a8bae]) {
    return Sr(K.providers[_0x2a8bae]);
  } else {
    return Sr({
      anthropicHost: K.anthropicHost,
      anthropicApiPath: K.anthropicApiPath,
      anthropicApiKey: K.anthropicApiKey,
      promptCacheTtl: K.promptCacheTtl || K.cacheTtl,
      openaiHost: K.openaiHost,
      openaiApiPath: K.openaiApiPath,
      openaiApiKey: K.openaiApiKey
    });
  }
}
function yr(_0x4ae9e1) {
  let _0x462af1 = _0x4ae9e1 && K.providers?.[_0x4ae9e1];
  if (_0x462af1) {
    return Sr(_0x462af1);
  } else {
    return Ue();
  }
}
function fa(_0x4abd82, _0x7fec8b, _0x91e954) {
  return ir(_0x7fec8b, _0x91e954, _0x4abd82);
}
function pa(_0x2a55d9) {
  return qe(so(String(_0x2a55d9 ?? "").trim())).host;
}
function Zt(_0x333648, _0x4fd87d, _0x439245, _0xee1986 = _0x309197 => _0x309197) {
  if (!Object.prototype.hasOwnProperty.call(_0x333648, _0x4fd87d)) {
    return false;
  }
  let _0x57aaa6 = _0xee1986(String(_0x333648[_0x4fd87d] ?? "").trim());
  if (K[_0x439245] === _0x57aaa6) {
    return false;
  } else {
    K[_0x439245] = _0x57aaa6;
    return true;
  }
}
function dd(_0x33f765) {
  if (_0x33f765.defaultModel && typeof _0x33f765.defaultModel == "string") {
    K.defaultModel = _0x33f765.defaultModel;
  }
  let _0x59afda = [["byokOpus", "byokOpus"], ["byokOpusThinking", "byokOpusThinking"], ["byokSonnet", "byokSonnet"], ["byokSonnetThinking", "byokSonnetThinking"], ["BYOK_MODEL_OPUS", "byokOpus"], ["BYOK_MODEL_OPUS_THINKING", "byokOpusThinking"], ["BYOK_MODEL_SONNET", "byokSonnet"], ["BYOK_MODEL_SONNET_THINKING", "byokSonnetThinking"]];
  for (let [_0x54b474, _0x3060df] of _0x59afda) {
    if (Object.prototype.hasOwnProperty.call(_0x33f765, _0x54b474) && typeof _0x33f765[_0x54b474] == "string") {
      K[_0x3060df] = _0x33f765[_0x54b474].trim();
    }
  }
  if (Number.isInteger(_0x33f765.maxTokens) && _0x33f765.maxTokens >= 0) {
    K.maxTokens = _0x33f765.maxTokens;
  }
  if (typeof _0x33f765.forceDefault == "boolean") {
    K.forceDefault = _0x33f765.forceDefault;
  }
  if (_0x33f765.promptCacheTtl != null || _0x33f765.cacheTtl != null) {
    K.promptCacheTtl = String(_0x33f765.promptCacheTtl ?? _0x33f765.cacheTtl ?? "5m").trim().toLowerCase() === "1h" ? "1h" : "5m";
  }
  let _0x305d47 = false;
  if (typeof _0x33f765.defaultProviderId == "string") {
    K.defaultProviderId = _0x33f765.defaultProviderId.trim();
  }
  if (_0x33f765.providers && typeof _0x33f765.providers == "object") {
    K.providers = {
      ..._0x33f765.providers
    };
    _0x305d47 = true;
  }
  if (_0x33f765.providerHealth && typeof _0x33f765.providerHealth == "object") {
    K.providerHealth = { ..._0x33f765.providerHealth };
  }
  if (typeof _0x33f765.cascadeEnabled == "boolean") {
    K.cascadeEnabled = _0x33f765.cascadeEnabled;
  }
  if (_0x33f765.cascadeBindings && typeof _0x33f765.cascadeBindings == "object") {
    K.cascadeBindings = {
      ..._0x33f765.cascadeBindings
    };
  }
  if (Array.isArray(_0x33f765.boundOfficialUids)) {
    K.boundOfficialUids = _0x33f765.boundOfficialUids.map(_0x1e5905 => String(_0x1e5905 || "").trim()).filter(Boolean);
  }
  if (_0x33f765.byokBindingsV2 && typeof _0x33f765.byokBindingsV2 == "object") {
    K.byokBindingsV2 = {
      ..._0x33f765.byokBindingsV2
    };
  }
  if (_0x33f765.byokBindingsV2 && typeof _0x33f765.byokBindingsV2 == "object" || _0x33f765.cascadeBindings && typeof _0x33f765.cascadeBindings == "object" || typeof _0x33f765.cascadeEnabled == "boolean") {
    try {
      let _0xd2d6dd = ci();
      let _0x132053 = K.cascadeBindings || {};
      let _0x49acae = K.byokBindingsV2 || {};
      for (let [_0x278c69, _0x46fea4] of Object.entries(_0x132053)) {
        if (!!_0x46fea4 && !!_0x278c69) {
          Fo(In(_0x46fea4), {
            cascadeId: _0x278c69,
            reason: "config-limit"
          });
        }
      }
      for (let [_0x2a6858, _0x511079] of Object.entries(_0x49acae)) {
        if (!!_0x511079 && !!_0x2a6858) {
          Fo(In(_0x511079), {
            cascadeId: _0x2a6858,
            reason: "config-limit"
          });
        }
      }
      let _0x56a506 = String(_0xd2d6dd.cascadeId || "").trim();
      let _0x2f5bf4 = _0x56a506 ? _0x132053[_0x56a506] || _0x49acae[_0x56a506] : null;
      let _0x30ea59 = _0x56a506;
      if (!_0x2f5bf4) {
        let _0xe198cf = Object.entries(_0x132053).find(([, _0x492b24]) => _0x492b24 && _0x492b24.modelId) || Object.entries(_0x49acae).find(([, _0x335183]) => _0x335183 && _0x335183.modelId);
        if (_0xe198cf) {
          _0x30ea59 = _0xe198cf[0];
          _0x2f5bf4 = _0xe198cf[1];
        }
      }
      if (_0x2f5bf4) {
        let _0x37c202 = In(_0x2f5bf4);
        Ft({
          tokens: _0xd2d6dd.tokens || 0,
          limit: _0x37c202,
          inboundTokens: _0xd2d6dd.inboundTokens || 0,
          restoredMsgs: _0xd2d6dd.restoredMsgs || 0,
          inboundMsgs: _0xd2d6dd.inboundMsgs || 0,
          reason: "config",
          cascadeId: _0x30ea59 || "",
          sessionKey: String(_0xd2d6dd.sessionKey || "").trim()
        });
      }
    } catch {}
  }
  _0x305d47 = Zt(_0x33f765, "ANTHROPIC_API_HOST", "anthropicHost", pa) || _0x305d47;
  _0x305d47 = Zt(_0x33f765, "ANTHROPIC_API_PATH", "anthropicApiPath") || _0x305d47;
  _0x305d47 = Zt(_0x33f765, "ANTHROPIC_API_KEY", "anthropicApiKey") || _0x305d47;
  _0x305d47 = Zt(_0x33f765, "OPENAI_API_HOST", "openaiHost", pa) || _0x305d47;
  _0x305d47 = Zt(_0x33f765, "OPENAI_API_PATH", "openaiApiPath") || _0x305d47;
  _0x305d47 = Zt(_0x33f765, "OPENAI_API_KEY", "openaiApiKey") || _0x305d47;
  if (_0x305d47) {
    en = {
      anthropic: null,
      openai: null,
      ts: 0
    };
  }
  return {
    ...K
  };
}
var fd = 300000;
var en = {
  anthropic: null,
  openai: null,
  ts: 0
};
function pd() {
  return en.ts > 0 && Date.now() - en.ts < fd;
}
function ga(_0x2fdf2c) {
  let _0x29499a = K.defaultProviderId;
  let _0xeb138b = _0x29499a && K.providers?.[_0x29499a];
  let _0x595ff7 = _0xeb138b ? _0x2fdf2c === "anthropic" ? _0xeb138b.anthropicHost : _0xeb138b.openaiHost : _0x2fdf2c === "anthropic" ? K.anthropicHost : K.openaiHost;
  let {
    pathPrefix: _0x2e1220
  } = qe(_0x595ff7 || "");
  return ir(_0x2e1220, "/models", null);
}
function _a(_0x3da9e0, _0x34bf8d, _0x233cbf, _0x638e65 = 15000, _0x2b1fef = false) {
  let _0x11f810 = En(_0x3da9e0);
  let _0x1ab42a = _0x2b1fef || _0x11f810.port !== 443;
  let _0x56046b = _0x1ab42a ? _0x1deb87 : _0x9aa8e5;
  let _0x4f095c = _0x1ab42a && _0x11f810.port === 443 ? 80 : _0x11f810.port;
  return new Promise((_0x6477c6, _0x3a06f8) => {
    let _0x46391c = {
      hostname: _0x11f810.hostname,
      port: _0x4f095c,
      path: _0x34bf8d,
      method: "GET",
      headers: _0x233cbf
    };
    if (!_0x1ab42a) {
      _0x46391c.rejectUnauthorized = !rr(_0x3da9e0);
    }
    let _0x18a564 = _0x56046b.request(_0x46391c, _0x5257cc => {
      let _0x4171c0 = "";
      _0x5257cc.setEncoding("utf8");
      _0x5257cc.on("data", _0x27f487 => _0x4171c0 += _0x27f487);
      _0x5257cc.on("end", () => {
        if (_0x5257cc.statusCode !== 200) {
          _0x3a06f8(new Error("HTTP " + _0x5257cc.statusCode + ": " + _0x4171c0.slice(0, 300)));
          return;
        }
        try {
          _0x6477c6(JSON.parse(_0x4171c0));
        } catch (_0x14fbcf) {
          _0x3a06f8(new Error("JSON parse error: " + _0x14fbcf.message));
        }
      });
    });
    _0x18a564.setTimeout(_0x638e65, () => {
      _0x18a564.destroy();
      _0x3a06f8(new Error("timeout"));
    });
    _0x18a564.on("error", _0x3a06f8);
    _0x18a564.end();
  });
}
async function hd() {
  let _0x20762e = Ue().anthropic;
  if (!_0x20762e.apiKey) {
    return [];
  }
  try {
    let _0x32427d = await _a(_0x20762e.host, ga("anthropic"), {
      "x-api-key": _0x20762e.apiKey,
      "anthropic-version": "2023-06-01"
    }, 15000, _0x20762e.useHttp);
    let _0x1bd893 = (_0x32427d.data || _0x32427d.models || []).map(_0xba34bb => ({
      id: _0xba34bb.id,
      name: _0xba34bb.display_name || _0xba34bb.id,
      provider: "anthropic",
      created: _0xba34bb.created_at || _0xba34bb.created || null
    }));
    _0x1bd893.sort((_0x2871a5, _0x169fac) => _0x2871a5.id.localeCompare(_0x169fac.id));
    return _0x1bd893;
  } catch (_0x2522fc) {
    console.error("  ❌ Fetch Anthropic models failed: " + _0x2522fc.message);
    return [];
  }
}
async function md() {
  let _0x190892 = Ue().openai;
  if (!_0x190892.apiKey) {
    return [];
  }
  try {
    let _0x81b8f7 = await _a(_0x190892.host, ga("openai"), {
      authorization: "Bearer " + _0x190892.apiKey
    }, 15000, _0x190892.useHttp);
    let _0x3b93d1 = (_0x81b8f7.data || _0x81b8f7.models || []).map(_0x228194 => ({
      id: _0x228194.id,
      name: _0x228194.id,
      provider: "openai",
      created: _0x228194.created ? new Date(_0x228194.created * 1000).toISOString() : null,
      owned_by: _0x228194.owned_by || null
    }));
    _0x3b93d1.sort((_0x3e620f, _0x346bbe) => _0x3e620f.id.localeCompare(_0x346bbe.id));
    return _0x3b93d1;
  } catch (_0x142b7d) {
    console.error("  ❌ Fetch OpenAI models failed: " + _0x142b7d.message);
    return [];
  }
}
async function Tr(_0x360852 = false) {
  if (!_0x360852 && pd()) {
    return {
      anthropic: en.anthropic,
      openai: en.openai
    };
  }
  let [_0x341701, _0x4b01d7] = await Promise.all([hd(), md()]);
  en = {
    anthropic: _0x341701,
    openai: _0x4b01d7,
    ts: Date.now()
  };
  return {
    anthropic: _0x341701,
    openai: _0x4b01d7
  };
}
function gd(_0x57fa7b) {
  let _0x233057 = _0x57fa7b.headers.origin || "";
  if (!_0x233057) {
    return "*";
  }
  try {
    let _0x20cd0a = new URL(_0x233057);
    if (_0x20cd0a.hostname === "localhost" || _0x20cd0a.hostname === "127.0.0.1" || _0x20cd0a.hostname === "::1") {
      return _0x233057;
    }
  } catch {}
  return "null";
}
function Er(_0x25667c) {
  return {
    "access-control-allow-origin": gd(_0x25667c),
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "content-type, authorization, x-admin-token",
    vary: "Origin"
  };
}
function ct(_0x22404b, _0x4894d5, _0x57d87d, _0xd53604) {
  let _0x291dc3 = JSON.stringify(_0xd53604, null, 2);
  _0x4894d5.writeHead(_0x57d87d, {
    "content-type": "application/json",
    ...Er(_0x22404b)
  });
  _0x4894d5.end(_0x291dc3);
}
async function Ta(_0x182b77, _0x552fbb, _0x54d7f7) {
  if (_0x182b77.method === "OPTIONS") {
    _0x552fbb.writeHead(204, Er(_0x182b77));
    _0x552fbb.end();
    return;
  }
  let _0x3c621c = new URL(_0x182b77.url, "http://localhost").searchParams.get("refresh") === "1";
  try {
    if (_0x54d7f7 === "/api/models" || _0x54d7f7 === "/api/models/") {
      let {
        anthropic: _0x552abe,
        openai: _0x150acf
      } = await Tr(_0x3c621c);
      let _0x3220f4 = Ue();
      ct(_0x182b77, _0x552fbb, 200, {
        defaultModel: K.defaultModel,
        providers: {
          anthropic: {
            host: _0x3220f4.anthropic.host,
            count: _0x552abe.length,
            models: _0x552abe
          },
          openai: {
            host: _0x3220f4.openai.host,
            count: _0x150acf.length,
            models: _0x150acf
          }
        },
        total: _0x552abe.length + _0x150acf.length
      });
    } else if (_0x54d7f7 === "/api/models/anthropic") {
      let {
        anthropic: _0x5e85c6
      } = await Tr(_0x3c621c);
      ct(_0x182b77, _0x552fbb, 200, {
        provider: "anthropic",
        host: Ue().anthropic.host,
        models: _0x5e85c6
      });
    } else if (_0x54d7f7 === "/api/models/openai") {
      let {
        openai: _0x3a2a1f
      } = await Tr(_0x3c621c);
      ct(_0x182b77, _0x552fbb, 200, {
        provider: "openai",
        host: Ue().openai.host,
        models: _0x3a2a1f
      });
    } else {
      ct(_0x182b77, _0x552fbb, 404, {
        error: "Not found"
      });
    }
  } catch (_0x2cd15b) {
    console.error("  ❌ /api/models error: " + _0x2cd15b.message);
    ct(_0x182b77, _0x552fbb, 500, {
      error: _0x2cd15b.message
    });
  }
}
var ha = process.env.ADMIN_TOKEN || "";
var _d = process.env.ALLOW_UNAUTH_CONFIG_POST === "true";
async function Sa(_0x8beb0, _0x410b42, _0x120c8f = null, _0x3e4dda = 0) {
  let _0x27ded7 = (_0x13bff5, _0x5397dc) => {
    as(_0x3e4dda, _0x8beb0.method, _0x13bff5);
    return ct(_0x8beb0, _0x410b42, _0x13bff5, _0x5397dc);
  };
  if (_0x8beb0.method === "OPTIONS") {
    _0x410b42.writeHead(204, Er(_0x8beb0));
    _0x410b42.end();
    return;
  }
  if (_0x8beb0.method === "GET") {
    let _0x4e53cf = Ue();
    ct(_0x8beb0, _0x410b42, 200, {
      ...K,
      providers: {
        anthropic: {
          host: _0x4e53cf.anthropic.host,
          hasKey: !!_0x4e53cf.anthropic.apiKey
        },
        openai: {
          host: _0x4e53cf.openai.host,
          hasKey: !!_0x4e53cf.openai.apiKey
        }
      },
      contextSnapshotSchemaVersion: 2
    });
    return;
  }
  if (_0x8beb0.method === "POST") {
    if (ha) {
      let _0x33fea3 = _0x8beb0.headers.authorization || "";
      if ((_0x33fea3.startsWith("Bearer ") ? _0x33fea3.slice(7) : _0x8beb0.headers["x-admin-token"] || "") !== ha) {
        return _0x27ded7(403, {
          error: "Forbidden: invalid ADMIN_TOKEN"
        });
      }
    } else if (!_d) {
      let _0x1a7de9 = _0x8beb0.socket?.remoteAddress || "";
      if (_0x1a7de9 !== "127.0.0.1" && _0x1a7de9 !== "::1" && _0x1a7de9 !== "::ffff:127.0.0.1") {
        return _0x27ded7(403, {
          error: "Forbidden: set ADMIN_TOKEN or use localhost"
        });
      }
    }
    let _0x402ba7 = _0x58fe2f => {
      try {
        let _0x58c09d = JSON.parse(_0x58fe2f || "{}");
        let _0x488439 = dd(_0x58c09d);
        console.log("  Config updated: " + rs(_0x488439));
        ct(_0x8beb0, _0x410b42, 200, {
          ..._0x488439,
          contextSnapshotSchemaVersion: 2
        });
      } catch (_0x169970) {
        _0x27ded7(400, {
          error: "Invalid JSON: " + _0x169970.message
        });
      }
    };
    if (_0x120c8f != null) {
      let _0x383044 = Buffer.isBuffer(_0x120c8f) ? _0x120c8f.toString("utf8") : String(_0x120c8f);
      _0x402ba7(_0x383044);
      return;
    }
    let _0x1f8415 = 1048576;
    let _0x3040c6 = "";
    let _0x1dcdc9 = false;
    _0x8beb0.setEncoding("utf8");
    _0x8beb0.on("data", _0x17dd41 => {
      _0x3040c6 += _0x17dd41;
      if (_0x3040c6.length > _0x1f8415 && !_0x1dcdc9) {
        _0x1dcdc9 = true;
        _0x27ded7(413, {
          error: "Body too large (max " + _0x1f8415 + " bytes)"
        });
        _0x8beb0.destroy();
      }
    });
    _0x8beb0.on("end", () => {
      if (!_0x1dcdc9) {
        _0x402ba7(_0x3040c6);
      }
    });
    return;
  }
  _0x27ded7(405, {
    error: "Method not allowed"
  });
}
import _0x5c7677 from "node:http";
var Ir = "/_internal/context-snapshots";
var Oa = Ir + "/reserve";
var xa = "context-snapshot-v2";
var lo = 8192;
var ya = 1000;
var Ea = 1;
var Ia = 64;
var lt = "disabled";
var Or = "127.0.0.1";
var bn = 0;
var Rt = false;
var Mn = null;
var Qe = new Set();
var xr = new Set();
function Sd(_0x4db59a) {
  let _0x47d47e = Number.parseInt(String(_0x4db59a ?? ""), 10);
  if (Number.isInteger(_0x47d47e) && _0x47d47e > 0 && _0x47d47e <= 65535) {
    return _0x47d47e;
  } else {
    return 0;
  }
}
function Aa({
  role: _0x57978a,
  host: _0x487aff = "127.0.0.1",
  port: _0x181db3 = process.env.HYBRID_PORT
} = {}) {
  if (_0x57978a !== "owner" && _0x57978a !== "publisher") {
    lt = "disabled";
    return {
      ok: false,
      role: lt
    };
  } else {
    lt = _0x57978a;
    Or = _0x487aff === "::1" ? "::1" : "127.0.0.1";
    bn = Sd(_0x181db3);
    Rt = false;
    Mn = null;
    return {
      ok: _0x57978a === "owner" || bn > 0,
      role: lt,
      host: Or,
      port: bn
    };
  }
}
function Je(_0x334b1a) {
  let _0x385d27 = new Error(_0x334b1a);
  _0x385d27.retryable = true;
  return _0x385d27;
}
function uo(_0x4fdf36) {
  let _0x1ffab8 = new Error(_0x4fdf36);
  _0x1ffab8.retryable = false;
  return _0x1ffab8;
}
function Ca(_0x1d8244, _0x391b1f, _0x197e5f, _0x3a12e5) {
  let _0x3a96fd = JSON.stringify(_0x391b1f);
  let _0x1ee817 = Buffer.byteLength(_0x3a96fd);
  if (_0x1ee817 > lo) {
    return Promise.reject(uo(_0x197e5f + " body exceeds " + lo + " bytes"));
  } else if (bn) {
    return new Promise((_0x14fc8a, _0x189784) => {
      let _0x257fbd = new AbortController();
      xr.add(_0x257fbd);
      let _0x203157 = false;
      let _0xaf9460 = (_0x552088, _0x2fe4e3) => {
        if (!_0x203157) {
          _0x203157 = true;
          clearTimeout(_0x59b9bb);
          xr.delete(_0x257fbd);
          if (_0x552088) {
            _0x189784(_0x552088);
          } else {
            _0x14fc8a(_0x2fe4e3);
          }
        }
      };
      let _0x59b9bb = setTimeout(() => {
        _0x257fbd.abort();
      }, ya);
      let _0x1d0446;
      try {
        _0x1d0446 = _0x5c7677.request({
          hostname: Or,
          port: bn,
          path: _0x1d8244,
          method: "POST",
          agent: false,
          signal: _0x257fbd.signal,
          headers: {
            "content-type": "application/json",
            "content-length": _0x1ee817,
            "x-byok-internal": xa
          }
        }, _0x1d156c => {
          let _0x1fab0c = [];
          let _0x4dc21c = 0;
          _0x1d156c.on("data", _0x438b9c => {
            _0x4dc21c += _0x438b9c.length;
            if (_0x4dc21c > lo) {
              _0x1d156c.destroy();
              _0xaf9460(Je("context snapshot " + _0x197e5f + " response is too large"));
              return;
            }
            _0x1fab0c.push(_0x438b9c);
          });
          _0x1d156c.on("end", () => {
            let _0x2b32d3 = Buffer.concat(_0x1fab0c).toString("utf8");
            if (_0x1d156c.statusCode !== 202) {
              let _0x4036cf = Number(_0x1d156c.statusCode) || 0;
              let _0x555250 = _0x4036cf === 0 || _0x4036cf >= 500 || _0x4036cf === 408 || _0x4036cf === 429 ? Je("context snapshot " + _0x197e5f + " returned HTTP " + _0x4036cf) : uo("context snapshot " + _0x197e5f + " returned HTTP " + _0x4036cf);
              _0xaf9460(_0x555250);
              return;
            }
            try {
              let _0x57868f = JSON.parse(_0x2b32d3 || "{}");
              if (!_0x3a12e5(_0x57868f)) {
                _0xaf9460(Je("context snapshot " + _0x197e5f + " returned an invalid response"));
                return;
              }
              _0xaf9460(null, _0x57868f);
            } catch {
              _0xaf9460(Je("context snapshot " + _0x197e5f + " returned invalid JSON"));
            }
          });
          _0x1d156c.on("error", _0x2fc0eb => _0xaf9460(Je(_0x2fc0eb.message)));
        });
      } catch (_0x4b15c6) {
        _0xaf9460(Je(_0x4b15c6?.message || String(_0x4b15c6)));
        return;
      }
      _0x1d0446.on("error", _0x49cca2 => {
        let _0x29c11e = _0x49cca2?.name === "AbortError" ? "context snapshot " + _0x197e5f + " timed out after " + ya + "ms" : _0x49cca2?.message || String(_0x49cca2);
        _0xaf9460(Je(_0x29c11e));
      });
      try {
        _0x1d0446.end(_0x3a96fd);
      } catch (_0x22cb65) {
        _0xaf9460(Je(_0x22cb65?.message || String(_0x22cb65)));
      }
    });
  } else {
    return Promise.reject(uo("context snapshot owner port is unavailable"));
  }
}
function yd(_0x3e5680) {
  return Ca(Ir, _0x3e5680, "publish", _0x3f29b9 => Number.isSafeInteger(_0x3f29b9?.revision) && _0x3f29b9.revision >= 1);
}
function Ed(_0x18828f) {
  return Ca(Oa, _0x18828f, "reserve", _0x59549f => _0x59549f?.accepted === true && gr(_0x59549f.sourceOrder).ok);
}
async function ka(_0x1ce907, _0x150753) {
  let _0x384091 = null;
  for (let _0x3eda46 = 0; _0x3eda46 <= Ea; _0x3eda46++) {
    if (Rt) {
      throw uo("context snapshot publisher is shutting down");
    }
    try {
      return await _0x1ce907();
    } catch (_0x4a3a13) {
      _0x384091 = _0x4a3a13;
      if (_0x4a3a13?.retryable === false || _0x3eda46 >= Ea) {
        throw _0x4a3a13;
      }
    }
  }
  throw _0x384091 || Je("context snapshot " + _0x150753 + " failed");
}
function Ma(_0x154756) {
  let _0x503d10 = _0x154756.finally(() => Qe.delete(_0x503d10));
  Qe.add(_0x503d10);
  return _0x503d10;
}
function ba(_0x51850f) {
  try {
    let _0x55788a = kn(_0x51850f);
    if (!_0x55788a.ok) {
      S(_.ERR, "context snapshot reserve skipped · " + _0x55788a.code + ":" + _0x55788a.field, {
        err: true
      });
      return Promise.resolve(null);
    }
    if (Rt) {
      return Promise.resolve(null);
    }
    if (lt === "owner") {
      let _0x227b69 = at.reserve(_0x55788a.value.conversationId, _0x55788a.value.sourceRequestId);
      if (_0x227b69.ok) {
        if (_0x227b69.accepted !== true) {
          S(_.ERR, "context snapshot reserve degraded · " + (_0x227b69.reason || "rejected"), {
            err: true
          });
          return Promise.resolve(null);
        } else {
          return Promise.resolve({
            accepted: true,
            sourceOrder: _0x227b69.sourceOrder
          });
        }
      } else {
        S(_.ERR, "context snapshot reserve rejected · " + _0x227b69.code + ":" + _0x227b69.field, {
          err: true
        });
        return Promise.resolve(null);
      }
    }
    if (lt !== "publisher") {
      return Promise.resolve(null);
    }
    if (Qe.size >= Ia) {
      S(_.ERR, "context snapshot reserve degraded · pending queue is full", {
        err: true
      });
      return Promise.resolve(null);
    }
    let _0x3adec8 = ka(() => Ed(_0x55788a.value), "reserve").then(_0x5ec4ec => ({
      accepted: true,
      sourceOrder: _0x5ec4ec.sourceOrder
    })).catch(_0x1c7a8f => {
      if (!Rt) {
        S(_.ERR, "context snapshot reserve degraded · " + (_0x1c7a8f?.message || _0x1c7a8f), {
          err: true
        });
      }
      return null;
    });
    return Ma(_0x3adec8);
  } catch (_0x1814c5) {
    S(_.ERR, "context snapshot reserve isolated · " + (_0x1814c5?.message || _0x1814c5), {
      err: true
    });
    return Promise.resolve(null);
  }
}
function Ar(_0x507b81) {
  try {
    let _0x5a1425 = _r(_0x507b81);
    if (!_0x5a1425.ok) {
      S(_.ERR, "context snapshot skipped · " + _0x5a1425.code + ":" + _0x5a1425.field, {
        err: true
      });
      return {
        queued: false,
        reason: _0x5a1425.code
      };
    }
    if (Rt) {
      return {
        queued: false,
        reason: "shutting-down"
      };
    }
    if (lt === "owner") {
      let _0x58dc63 = at.publish(_0x5a1425.value);
      if (!_0x58dc63.ok) {
        S(_.ERR, "context snapshot owner rejected · " + _0x58dc63.code + ":" + _0x58dc63.field, {
          err: true
        });
      }
      return {
        queued: false,
        accepted: _0x58dc63.ok && _0x58dc63.accepted === true,
        revision: _0x58dc63.ok ? _0x58dc63.revision : undefined,
        reason: _0x58dc63.ok ? _0x58dc63.reason : _0x58dc63.code
      };
    }
    if (lt !== "publisher") {
      return {
        queued: false,
        reason: "disabled"
      };
    }
    if (Qe.size >= Ia) {
      S(_.ERR, "context snapshot publish degraded · pending queue is full", {
        err: true
      });
      return {
        queued: false,
        reason: "queue-full"
      };
    }
    let _0x5b000e = ka(() => yd(_0x5a1425.value), "publish").catch(_0x1fc60d => {
      if (!Rt) {
        S(_.ERR, "context snapshot publish degraded · " + (_0x1fc60d?.message || _0x1fc60d), {
          err: true
        });
      }
      return null;
    });
    Ma(_0x5b000e);
    return {
      queued: true
    };
  } catch (_0x1afcb0) {
    S(_.ERR, "context snapshot publish isolated · " + (_0x1afcb0?.message || _0x1afcb0), {
      err: true
    });
    return {
      queued: false,
      reason: "isolated-error"
    };
  }
}
function Ra({
  graceMs: _0x15d62b = 300
} = {}) {
  if (Mn) {
    return Mn;
  }
  Rt = true;
  let _0x8d4de7 = Math.max(0, Math.min(Number(_0x15d62b) || 0, 1000));
  Mn = (async () => {
    if (Qe.size > 0 && _0x8d4de7 > 0) {
      await Promise.race([Promise.allSettled([...Qe]), new Promise(_0x48a831 => setTimeout(_0x48a831, _0x8d4de7))]);
    }
    for (let _0x2c51a5 of xr) {
      _0x2c51a5.abort();
    }
    if (Qe.size > 0) {
      await Promise.race([Promise.allSettled([...Qe]), new Promise(_0x1e4495 => setTimeout(_0x1e4495, 50))]);
    }
    return {
      pending: Qe.size
    };
  })();
  return Mn;
}
var Na = Ir;
var Cr = Oa;
var wa = xa;
var $a = lo;
var Ua = new _0x18e153.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000,
  maxSockets: 10,
  maxFreeSockets: 5
});
var xd = process.env.XY_DEVICE_ID || "";
var Id = process.env.XY_CLIENT_VERSION || "0.0.0";
function po(_0x414311, _0x5c5eb2) {
  let _0x22c3c3 = Date.now().toString();
  let _0x45bbe8 = _0x3664ef.randomBytes(16).toString("hex");
  return {
    "x-xy-device-id": xd,
    "x-xy-client-version": Id,
    "x-xy-timestamp": _0x22c3c3,
    "x-xy-nonce": _0x45bbe8,
    "x-xy-requested-model": _0x414311 || ""
  };
}
var Ad = process.env.DEFAULT_MODEL || "";
var Cd = parseInt(process.env.MAX_TOKENS || "0", 10);
var Ha = 64000;
function kd() {
  return Te().defaultModel || Ad;
}
function wr() {
  return Te().maxTokens || Cd;
}
function Md(_0x3c6d54) {
  let _0x3568c9 = Te();
  if (It(_0x3c6d54)) {
    return ea(_0x3c6d54, _0x3568c9);
  }
  let _0x1bb525 = kd();
  let _0x10e9ee = Vd[_0x3c6d54];
  if (_0x10e9ee === "__DEFAULT__") {
    return _0x1bb525;
  } else {
    return _0x10e9ee || _0x1bb525 || (_0x3c6d54 && !_0x3c6d54.startsWith("MODEL_") ? _0x3c6d54 : "");
  }
}
var bd = parseInt(process.env.OPENAI_REQUEST_TIMEOUT_MS || "600000", 10);
var fo = parseInt(process.env.OPENAI_SSE_IDLE_TIMEOUT_MS || "180000", 10);
var Rd = parseInt(process.env.ANTHROPIC_REQUEST_TIMEOUT_MS || "600000", 10);
var kr = parseInt(process.env.ANTHROPIC_SSE_IDLE_TIMEOUT_MS || "180000", 10);
var Ze = parseInt(process.env.CHAT_WALL_TIMEOUT_MS || "180000", 10);
var va = parseInt(process.env.UPSTREAM_CONNECT_TIMEOUT_MS || "30000", 10);
var Nd = process.env.OPENAI_REASONING_EFFORT || "high";
var wd = process.env.OPENAI_REASONING_SUMMARY || "auto";
var $d = process.env.OPENAI_ENABLE_REASONING !== "false";
var $r = (_0x10345a, _0x268ba9, _0x201303, _0x8c9e1b) => {
  let _0x3cdb2e = parseInt(process.env[_0x10345a] ?? String(_0x268ba9), 10);
  if (Number.isFinite(_0x3cdb2e)) {
    return Math.min(Math.max(_0x3cdb2e, _0x201303), _0x8c9e1b);
  } else {
    return _0x268ba9;
  }
};
var Nt = (() => {
  let _0x45ce09 = parseInt(process.env.STREAM_PACING_TICK_MS ?? "12", 10);
  if (!Number.isFinite(_0x45ce09) || _0x45ce09 <= 0) {
    return 0;
  } else {
    return Math.min(_0x45ce09, 200);
  }
})();
var Pa = $r("STREAM_PACING_MIN_CPS", 90, 1, 100000);
var La = $r("STREAM_PACING_DRAIN_CPS", 600, 1, 100000);
var vd = $r("STREAM_PACING_CONTROL_FLUSH_CHARS", 12, 1, 200);
var Pd = process.env.STREAM_PACING_DEBUG === "true";
var Ld = 10;
var Bd = 1000;
var Dd = 50;
function Ba(_0x31dde5) {
  let _0x4691c3 = String(_0x31dde5 || "").match(/bytes=(\d+)/);
  if (!_0x4691c3) {
    return "";
  }
  let _0x3546ab = parseInt(_0x4691c3[1], 10);
  if (!Number.isFinite(_0x3546ab) || _0x3546ab <= 0) {
    return "";
  } else if (_0x3546ab >= 1024) {
    return (_0x3546ab / 1024).toFixed(1) + "KB";
  } else {
    return _0x3546ab + "B";
  }
}
function Fa({
  apiPayload: _0x3c79ef,
  systemPrompt: _0x3a8a6d = "",
  messageField: _0x41413a = "messages",
  systemInMessages: _0xfce977 = false,
  outputReserve: _0x1ccbaf = 0,
  contextLimit: _0x33adc7 = 0
}) {
  let _0x316211 = {
    ..._0x3c79ef
  };
  delete _0x316211.max_tokens;
  delete _0x316211.max_output_tokens;
  let _0x45a22e = pn(_0x316211);
  let _0x22dd3d = _t(_0x3a8a6d);
  let _0x146e2a = pn(_0x3c79ef?.tools);
  let _0x65f79e = Array.isArray(_0x3c79ef?.[_0x41413a]) ? _0x3c79ef[_0x41413a] : [];
  let _0x5e2a9c = _0xfce977 && _0x3a8a6d && _0x65f79e.length > 0 ? 1 : 0;
  let _0x18418b = pn(_0x65f79e.slice(_0x5e2a9c));
  let _0x11b0e2 = Math.max(0, _0x45a22e - _0x22dd3d - _0x146e2a - _0x18418b);
  let _0xecfa48 = Math.max(0, Number(_0x1ccbaf) || 0);
  let _0x2876a4 = _0x45a22e + _0xecfa48;
  let _0x14cd37 = Math.max(0, Number(_0x33adc7) || Re());
  S(_.ROUTE, "[上下文] final · messages~" + _0x18418b + " · system~" + _0x22dd3d + " · tools~" + _0x146e2a + " · meta~" + _0x11b0e2 + " · input~" + _0x45a22e + " · outputReserve=" + _0xecfa48 + " · window~" + _0x2876a4 + " · ctx=" + _0x14cd37);
  return {
    inputTokens: _0x45a22e,
    outputTokens: _0xecfa48,
    tokensUsed: _0x2876a4,
    contextLimit: _0x14cd37
  };
}
function Ud() {
  let _0x1a6d2c = false;
  let _0x308a40 = 0;
  let _0x18c4af = "";
  let _0x28a0c4 = true;
  let _0x630cdf = _0x21de95 => {
    let _0x4a537d = 0;
    while (_0x4a537d < _0x21de95.length && _0x21de95[_0x4a537d] === " ") {
      _0x4a537d++;
    }
    if (_0x4a537d > 3) {
      return false;
    }
    if (_0x4a537d === _0x21de95.length) {
      return true;
    }
    if (_0x21de95[_0x4a537d] !== "`") {
      return false;
    }
    let _0xfcc45 = _0x4a537d;
    while (_0xfcc45 < _0x21de95.length && _0x21de95[_0xfcc45] === "`") {
      _0xfcc45++;
    }
    let _0x3f99cd = _0xfcc45 - _0x4a537d;
    let _0x18b699 = _0x21de95.slice(_0xfcc45);
    if (_0x3f99cd >= 3) {
      return !_0x18b699.includes("`");
    } else {
      return /^[ \t\r]*$/.test(_0x18b699);
    }
  };
  let _0x1e2a7b = _0x1274b0 => {
    let _0x2b509b = _0x1274b0.endsWith("\r") ? "\r" : "";
    let _0x45038c = _0x2b509b ? _0x1274b0.slice(0, -1) : _0x1274b0;
    let _0x31172f = _0x45038c.match(/^( {0,3})(`{3,})([^`]*)$/);
    if (!_0x1a6d2c) {
      if (_0x31172f) {
        _0x1a6d2c = true;
        _0x308a40 = _0x31172f[2].length;
      }
      return _0x45038c + _0x2b509b;
    }
    let _0x3c19c4 = _0x45038c.match(/^( {0,3})(`{3,})[ \t]*$/);
    if (_0x3c19c4 && _0x3c19c4[2].length >= _0x308a40) {
      _0x1a6d2c = false;
      _0x308a40 = 0;
      return _0x45038c + _0x2b509b;
    }
    let _0x5dc469 = _0x45038c.match(/^( {0,3})(`{1,2})([ \t]*)$/);
    if (_0x5dc469) {
      let _0x37f9f9 = _0x5dc469[1] + "`".repeat(_0x308a40) + _0x5dc469[3];
      _0x1a6d2c = false;
      _0x308a40 = 0;
      return _0x37f9f9 + _0x2b509b;
    }
    return _0x45038c + _0x2b509b;
  };
  return {
    push: _0x5e8d84 => {
      let _0x465f62 = String(_0x5e8d84 || "");
      let _0x19ec25 = "";
      for (let _0x1b5c35 of _0x465f62) {
        if (_0x1b5c35 === "\n") {
          if (_0x28a0c4) {
            _0x19ec25 += _0x1e2a7b(_0x18c4af);
          }
          _0x19ec25 += "\n";
          _0x18c4af = "";
          _0x28a0c4 = true;
          continue;
        }
        if (!_0x28a0c4) {
          _0x19ec25 += _0x1b5c35;
          continue;
        }
        _0x18c4af += _0x1b5c35;
        if (!_0x630cdf(_0x18c4af)) {
          _0x19ec25 += _0x18c4af;
          _0x18c4af = "";
          _0x28a0c4 = false;
        }
      }
      return _0x19ec25;
    },
    flush: () => {
      let _0x4852b4 = _0x28a0c4 ? _0x1e2a7b(_0x18c4af) : "";
      _0x18c4af = "";
      _0x28a0c4 = true;
      return _0x4852b4;
    }
  };
}
function Hd(_0x57e348, _0x4ff7ed = {}, _0x244831 = null) {
  let _0x2ae307 = Date.now();
  let _0x2eade6 = new Map();
  let _0x1f2073 = 0;
  return {
    mark: (_0x57e846, _0x40b780 = "") => {
      if (_0x2eade6.has(_0x57e846)) {
        return;
      }
      let _0x31510c = Date.now() - _0x2ae307;
      _0x2eade6.set(_0x57e846, _0x31510c);
      if (_0x57e846 === "upstream_request_start") {
        let _0x46481a = String(_0x40b780 || "").match(/bytes=(\d+)/);
        if (_0x46481a) {
          _0x1f2073 = parseInt(_0x46481a[1], 10) || 0;
        }
        let _0x4b5569 = Ba(_0x40b780);
        S(_.UPSTREAM, "请求体 " + (_0x4b5569 || "—") + (_0x40b780 ? " · " + _0x40b780 : ""));
      } else if (_0x57e846 === "first_upstream_chunk") {
        S(_.CHAT, "首上游包 " + _0x31510c + "ms" + (_0x40b780 ? " · " + _0x40b780 : ""));
      } else if (_0x57e846 === "first_reasoning_delta") {
        S(_.CHAT, "首推理 " + _0x31510c + "ms" + (_0x40b780 ? " · " + _0x40b780 : ""));
      } else if (_0x57e846 === "first_visible_text") {
        S(_.CHAT, "首正文 " + _0x31510c + "ms" + (_0x40b780 ? " · " + _0x40b780 : ""));
      } else if (_0x57e846 === "first_visible_write") {
        S(_.CHAT, "首正文写出 " + _0x31510c + "ms" + (_0x40b780 ? " · " + _0x40b780 : ""));
      } else if (_0x57e846 === "upstream_completed") {
        S(_.CHAT, "上游结束 " + _0x31510c + "ms" + (_0x40b780 ? " · " + _0x40b780 : ""));
      } else if (_0x57e846 === "upstream_eof") {
        S(_.CHAT, "上游 EOF " + _0x31510c + "ms" + (_0x40b780 ? " · " + _0x40b780 : ""));
      } else if (_0x57e846 === "pacing_drained") {
        S(_.CHAT, "排空完成 " + _0x31510c + "ms" + (_0x40b780 ? " · " + _0x40b780 : ""));
      } else if (Dt) {
        S(_.DETAIL, _0x57e846 + " " + _0x31510c + "ms" + (_0x40b780 ? " · " + _0x40b780 : ""));
      }
      yn("timing", _0x57e348 + " " + _0x57e846 + ": " + _0x31510c + "ms" + (_0x40b780 ? " " + _0x40b780 : ""), _0x244831);
    },
    summary: (_0x2db643, _0x12c3f0 = "") => {
      let _0x35da4d = Date.now() - _0x2ae307;
      if (_0x2db643 === "finalized") {
        let _0x35f71d = Object.entries(_0x4ff7ed).filter(([, _0x1734bc]) => _0x1734bc != null && _0x1734bc !== "").map(([_0x3d4266, _0x50a27f]) => _0x3d4266 + "=" + _0x50a27f);
        let _0x4c495c = [["first_upstream_chunk", "首上游包"], ["first_reasoning_delta", "首推理"], ["first_visible_text", "首正文"], ["first_visible_write", "首正文写出"], ["upstream_completed", "上游结束"], ["upstream_eof", "上游EOF"], ["pacing_drained", "排空完成"]];
        if (_0x1f2073 > 0) {
          _0x35f71d.push("body=" + Ba("bytes=" + _0x1f2073));
        }
        for (let [_0x3583f5, _0x3307ef] of _0x4c495c) {
          let _0x52c750 = _0x2eade6.get(_0x3583f5);
          if (_0x52c750 != null) {
            _0x35f71d.push(_0x3307ef + "=" + _0x52c750 + "ms");
          }
        }
        S(_.CHAT, "总耗时 " + _0x35da4d + "ms · " + _0x35f71d.join(" · ") + (_0x12c3f0 ? " · " + _0x12c3f0 : ""));
      } else if (Dt) {
        S(_.DETAIL, _0x2db643 + " " + _0x35da4d + "ms" + (_0x12c3f0 ? " · " + _0x12c3f0 : ""));
      }
      yn("timing", _0x57e348 + " " + _0x2db643 + ": total=" + _0x35da4d + "ms" + (_0x12c3f0 ? " " + _0x12c3f0 : ""), _0x244831);
    },
    elapsed: () => Date.now() - _0x2ae307
  };
}
function Fd(_0x4d0d7f, _0xbd91, _0x137758) {
  let _0x18763f = Array.isArray(_0x137758) ? _0x137758.map(_0x1725dc => _0x1725dc && _0x1725dc.name).filter(Boolean) : [];
  let _0x1b3e9f = _0x18763f.length ? "; enabled=" + _0x18763f.length + " [" + _0x18763f.join(", ") + "]" : "";
  S(_.TOOL, "未调用 · " + _0x4d0d7f + " · " + _0xbd91 + _0x1b3e9f);
  yn("error", _0x4d0d7f + " " + _0xbd91 + "; no tool calls emitted");
  qt("error", []);
}
function Ka(_0x17d1b7, {
  model: _0x9e45f9
} = {}) {
  let _0x262f5f = _0x17d1b7?.getStreamErrorHint?.() || "";
  if (_0x262f5f) {
    if (Ve(_0x262f5f)) {
      return jo(qo(_0x262f5f));
    }
    let _0x396c3a = qo(_0x262f5f);
    if (_0x396c3a) {
      return re("上游错误", _0x396c3a);
    }
  }
  let _0x24726e = "建议排查上游模型 " + (_0x9e45f9 ? String(_0x9e45f9).trim() : "当前绑定") + " 是否正常！";
  return re("空回复", "未收到有效回复。" + _0x24726e);
}
function Kd(_0xa87fb7) {
  if (!Array.isArray(_0xa87fb7)) {
    return "";
  }
  for (let _0x496c2e = _0xa87fb7.length - 1; _0x496c2e >= 0; _0x496c2e--) {
    let _0x15b926 = _0xa87fb7[_0x496c2e];
    if (!_0x15b926 || _0x15b926.role !== "user") {
      continue;
    }
    let _0x78626c = _0x15b926.content;
    if (typeof _0x78626c == "string") {
      return _0x78626c;
    } else if (Array.isArray(_0x78626c)) {
      return _0x78626c.map(_0x1d6802 => typeof _0x1d6802 == "string" ? _0x1d6802 : _0x1d6802 && typeof _0x1d6802.text == "string" ? _0x1d6802.text : "").join("\n");
    } else {
      return "";
    }
  }
  return "";
}
function Yd(_0xa37f5c) {
  let _0x524a25 = Kd(_0xa37f5c);
  if (_0x524a25) {
    return /(?:你是谁|你是什么模型|什么模型|哪个模型|哪款模型|底层模型|真实模型|用的什么模型|当前模型|模型[是叫]|what\s+model|which\s+model|what\s+llm|underlying\s+model|who\s+are\s+you|what\s+are\s+you)/i.test(_0x524a25);
  } else {
    return false;
  }
}
function Gd() {
  let _0x3351f7 = new Date();
  try {
    let _0x3899b9 = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).formatToParts(_0x3351f7);
    let _0x59dad8 = _0x13c739 => _0x3899b9.find(_0x58080f => _0x58080f.type === _0x13c739)?.value || "";
    return _0x59dad8("year") + "-" + _0x59dad8("month") + "-" + _0x59dad8("day") + " " + _0x59dad8("hour") + ":" + _0x59dad8("minute");
  } catch {
    let _0x1e11ce = _0x274bb9 => String(_0x274bb9).padStart(2, "0");
    return _0x3351f7.getFullYear() + "-" + _0x1e11ce(_0x3351f7.getMonth() + 1) + "-" + _0x1e11ce(_0x3351f7.getDate()) + " " + _0x1e11ce(_0x3351f7.getHours()) + ":" + _0x1e11ce(_0x3351f7.getMinutes());
  }
}
function jd(_0x1f0883, _0x25ad06) {
  let _0x1b4c02 = String(_0x1f0883 || "").trim();
  if (!_0x1b4c02 || !_0x25ad06) {
    return "";
  }
  let _0x260bc2 = Gd();
  return "我是 Cascade，运行在 Devin 里，当前模型是 " + _0x1b4c02 + "，现在是 " + _0x260bc2 + "（本地时间）。\n";
}
function Rn(_0x57d5e1, _0x1c908c, _0x2bc145) {
  let _0x325e3f = !!_0x57d5e1.userAskedAboutModel;
  for (let _0x171430 of _0x2bc145) {
    if (_0x171430 && _0x171430.__textDelta !== undefined) {
      if (!_0x325e3f) {
        _0x57d5e1.enqueueText(_0x171430.__textDelta, _0x171430.__tokens);
        if (_0x171430.__flushText) {
          _0x57d5e1.flushPendingText();
        }
      }
    } else if (_0x171430 && _0x171430.__stopChunk) {
      let _0x47cc = ge(_0x171430.__stopChunk);
      if (_0x325e3f) {
        _0x57d5e1.safeWrite(_0x47cc);
      } else {
        _0x57d5e1.scheduleStopFrame(_0x47cc);
      }
      if (_0x171430.__chatEnd) {
        qt(_0x171430.__chatEnd.stopReason, [], _0x171430.__chatEnd.targetId ?? null);
      }
    } else {
      if (!_0x325e3f) {
        _0x57d5e1.flushPendingTextForControlFrame();
      }
      _0x57d5e1.safeWrite(ge(_0x171430));
    }
  }
  if (_0x1c908c?.hasMeaningfulOutput) {
    _0x57d5e1.markMeaningful();
  }
  let _0x570b13 = _0x1c908c?.declaredModel ? String(_0x1c908c.declaredModel).trim() : "";
  if (_0x570b13) {
    let _0x2c32be = _0x57d5e1?.configuredModel || "";
    pr(_0x570b13, _0x2c32be);
    if (_0x57d5e1.injectDeclaredModelHint && !_0x57d5e1._declaredModelLineInjected) {
      _0x57d5e1._declaredModelLineInjected = true;
      let _0x395659 = jd(_0x570b13, !!_0x57d5e1.userAskedAboutModel);
      if (_0x395659) {
        _0x57d5e1.enqueueText(_0x395659, 0);
        _0x57d5e1.flushPendingText();
      }
    }
  }
}
function br(_0x3caac0, _0x338253, _0x345f28, _0xe316d0, _0x15c309 = {}) {
  if (_0x3caac0.wasFinalized()) {
    return;
  }
  let _0x5b4190 = _0x15c309.stopReason || _0x338253?.stopReason;
  let _0x1be5c3 = _0x338253?.getStreamErrorHint?.() || "";
  let _0x2ffa6a = _0x3caac0.userAskedAboutModel && _0x3caac0._declaredModelLineInjected && _0x5b4190 && _0x5b4190 !== "error" && !_0x1be5c3;
  if (!_0x338253?.hasMeaningfulOutput && !_0x2ffa6a) {
    if (Ve(_0x1be5c3)) {
      S(_.QUOTA, yt + " · " + _0x345f28 + " 流错误 · " + String(_0x1be5c3).slice(0, 200), {
        err: true
      });
    } else if (Dt) {
      S(_.DETAIL, _0x345f28 + " SSE · " + _0x338253.formatEventStats() + (_0x1be5c3 ? " · upstream=\"" + _0x1be5c3 + "\"" : ""));
    }
    let _0x5ed6c7 = Ka(_0x338253, _0x15c309);
    return _0x3caac0.fail(_0x5ed6c7, _0x345f28 + " stream error" + (_0x1be5c3 ? ": " + _0x1be5c3 : " (empty stream)"));
  }
  if (_0x2ffa6a) {
    _0x3caac0.markMeaningful();
  }
  let _0x37080d = _0x15c309.model ? String(_0x15c309.model).trim() : "";
  let _0x14e5c4 = _0x338253?.declaredModel ? String(_0x338253.declaredModel).trim() : "";
  if (_0x14e5c4) {
    pr(_0x14e5c4, _0x37080d);
  }
  let _0x5d87ae = _0x14e5c4 ? " · 上游声明=" + _0x14e5c4 + (_0x37080d && _0x37080d !== _0x14e5c4 ? " · 配置目标=" + _0x37080d : "") : _0x37080d ? " · 配置目标=" + _0x37080d : "";
  if (_0x5b4190) {
    S(_.DONE, _0x345f28 + " · stop=" + _0x5b4190 + _0x5d87ae);
  } else if (_0xe316d0) {
    S(_.DONE, String(_0xe316d0).replace(/^\s*\[ok\]\s*/i, "").trim());
  }
  return _0x3caac0.finalizeSuccess(null);
}
function ho(_0x2c8eab) {
  return _0x2c8eab.slice(0, 500).replace(/(?:sk-[a-zA-Z0-9_-]{10,}|Bearer\s+\S+)/g, "[REDACTED]").replace(/(?:key-[a-zA-Z0-9_-]{10,})/g, "[REDACTED]").replace(/(?:"(?:api[_-]?key|token|secret|password|authorization)":\s*"[^"]{6,}")/gi, "\"$1\":\"[REDACTED]\"");
}
var Wd = ["gpt-", "MODEL_GPT", "o1-", "o1", "o3-", "o3", "o4-", "o4"];
var zd = ["glm-", "deepseek-", "qwen", "moonshot-", "yi-", "abab", "hunyuan-", "mistral-", "llama-", "minimax", "spark", "ernie", "baichuan", "chatglm", "gemini", "gemma", "google/", "grok", "doubao", "step-", "kimi"];
var Vd = {
  "gpt-5-4-low": "gpt-5.4",
  "gpt-5-4-high": "gpt-5.4",
  "gpt-5-4-xhigh": "gpt-5.4",
  "gpt-5-4-xhigh-priority": "gpt-5.4",
  MODEL_GPT_4O: "gpt-4o",
  MODEL_GPT_4O_MINI: "gpt-4o-mini",
  MODEL_CLAUDE_3_5_SONNET: "claude-sonnet-4-20250514",
  MODEL_CLAUDE_3_5_HAIKU: "claude-3-5-haiku-20241022",
  MODEL_CLAUDE_3_OPUS: "claude-3-opus-20240229",
  MODEL_CLAUDE_SONNET_4: "claude-sonnet-4-20250514",
  MODEL_SWE_1: "claude-sonnet-4-20250514",
  MODEL_SWE_1_5: "__DEFAULT__",
  MODEL_SWE_1_5_SLOW: "__DEFAULT__",
  MODEL_CHAT_11121: "__DEFAULT__",
  "claude-opus-4-6-thinking": "__DEFAULT__",
  "claude-sonnet-4-6-thinking": "__DEFAULT__",
  MODEL_GOOGLE_GEMINI_2_5_FLASH: "__DEFAULT__",
  MODEL_GOOGLE_GEMINI_2_5_PRO: "__DEFAULT__",
  MODEL_CHAT: "__DEFAULT__"
};
function Xd(_0x2a9805) {
  if (_0x2a9805 && _0x2a9805.endsWith("-priority")) {
    return "fast";
  }
}
function qd(_0x8bf14b) {
  if (!_0x8bf14b) {
    return false;
  }
  let _0x18ca3b = _0x8bf14b.toLowerCase();
  if (Wd.some(_0x5ec82f => _0x8bf14b.startsWith(_0x5ec82f))) {
    return true;
  } else {
    return zd.some(_0x1073bc => _0x18ca3b.startsWith(_0x1073bc));
  }
}
function Ya(_0x50a6b3) {
  return String(_0x50a6b3 || "").includes("chat/completions");
}
var Jd = parseInt(String(process.env.BYOK_HISTORY_LLM_SUMMARY_TIMEOUT_MS || "45000"), 10) || 45000;
var Qd = parseInt(String(process.env.BYOK_HISTORY_LLM_SUMMARY_MAX_TOKENS || "2500"), 10) || 2500;
var Mr = "You compress older chat history for a coding agent. Write a dense factual summary that preserves: user goals, decisions, file paths, errors, tool outcomes, and open TODOs. Do not invent facts. Prefer bullet points. No preamble. Output plain text only.";
function Da({
  useHttp: _0x4e6faa,
  parsed: _0x1698e8,
  path: _0x4ef71c,
  headers: _0x2667e0,
  body: _0x3f228a,
  timeoutMs: _0x282785
}) {
  return new Promise((_0x349ec6, _0x156d4f) => {
    let _0x5bef3f = _0x4e6faa ? _0x309087 : _0x18e153;
    let _0x5ec793 = _0x1698e8.port !== 443 && _0x1698e8.port !== 80 ? _0x1698e8.port : _0x4e6faa ? 80 : 443;
    let _0x51972a = _0x5bef3f.request({
      hostname: _0x1698e8.hostname,
      port: _0x5ec793,
      path: _0x4ef71c,
      method: "POST",
      rejectUnauthorized: !_0x4e6faa && _0x1698e8.port === 443,
      headers: _0x2667e0
    }, _0x45d974 => {
      let _0x583cec = "";
      _0x45d974.setEncoding("utf8");
      _0x45d974.on("data", _0x454a5f => {
        _0x583cec += _0x454a5f;
      });
      _0x45d974.on("end", () => {
        _0x349ec6({
          status: _0x45d974.statusCode || 0,
          body: _0x583cec
        });
      });
      _0x45d974.on("error", _0x156d4f);
    });
    _0x51972a.setTimeout(_0x282785, () => {
      _0x51972a.destroy(new Error("timeout " + _0x282785 + "ms"));
    });
    _0x51972a.on("error", _0x156d4f);
    _0x51972a.end(_0x3f228a);
  });
}
function Zd(_0x5250ad) {
  if (_0x5250ad) {
    if (typeof _0x5250ad.content == "string") {
      return _0x5250ad.content;
    } else if (Array.isArray(_0x5250ad.content)) {
      return _0x5250ad.content.map(_0x32cc4a => _0x32cc4a && _0x32cc4a.type === "text" ? _0x32cc4a.text : "").filter(Boolean).join("\n");
    } else {
      return "";
    }
  } else {
    return "";
  }
}
function ef(_0x3f5b5c) {
  if (!_0x3f5b5c) {
    return "";
  }
  let _0x10fbf2 = _0x3f5b5c.choices?.[0];
  if (_0x10fbf2?.message?.content) {
    if (typeof _0x10fbf2.message.content == "string") {
      return _0x10fbf2.message.content;
    }
    if (Array.isArray(_0x10fbf2.message.content)) {
      return _0x10fbf2.message.content.map(_0x2ebd5b => _0x2ebd5b?.text || _0x2ebd5b?.content || "").join("");
    }
  }
  if (typeof _0x3f5b5c.output_text == "string") {
    return _0x3f5b5c.output_text;
  }
  if (Array.isArray(_0x3f5b5c.output)) {
    let _0x562cd8 = [];
    for (let _0x20a8a5 of _0x3f5b5c.output) {
      if (_0x20a8a5?.type === "message" && Array.isArray(_0x20a8a5.content)) {
        for (let _0x4fb9d0 of _0x20a8a5.content) {
          if (_0x4fb9d0?.type === "output_text" || _0x4fb9d0?.type === "text") {
            _0x562cd8.push(_0x4fb9d0.text || "");
          }
        }
      }
    }
    if (_0x562cd8.length) {
      return _0x562cd8.join("\n");
    }
  }
  return "";
}
function tf({
  useOpenAI: _0x3f1c6b,
  providerConfig: _0x9e9aaa,
  model: _0x1c45f3
}) {
  return async function ({
    transcript: _0x25bace,
    messageCount: _0x11cf60,
    inputTokens: _0x5215ff
  }) {
    let _0x5413a2 = Math.max(3000, Jd);
    let _0x3adb1d = Math.min(8000, Math.max(400, Qd));
    let _0x4790be = "Summarize the following " + (_0x11cf60 || "?") + " earlier messages (~" + (_0x5215ff || "?") + " tokens). Keep critical technical detail.\n\n" + String(_0x25bace || "").slice(0, 400000);
    try {
      if (_0x3f1c6b) {
        let _0x5b3388 = _0x9e9aaa.openai;
        if (!_0x5b3388?.apiKey) {
          return "";
        }
        let _0x4f30ef = Ya(_0x5b3388.apiPath) ? {
          model: _0x1c45f3,
          stream: false,
          max_tokens: _0x3adb1d,
          temperature: 0.2,
          messages: [{
            role: "system",
            content: Mr
          }, {
            role: "user",
            content: _0x4790be
          }]
        } : {
          model: _0x1c45f3,
          stream: false,
          max_output_tokens: _0x3adb1d,
          temperature: 0.2,
          input: [{
            role: "developer",
            content: Mr
          }, {
            role: "user",
            content: _0x4790be
          }]
        };
        let _0x185683 = JSON.stringify(_0x4f30ef);
        let _0xbf9fac = {
          "content-type": "application/json",
          authorization: "Bearer " + _0x5b3388.apiKey,
          "content-length": Buffer.byteLength(_0x185683),
          ...po(_0x1c45f3, Buffer.byteLength(_0x185683))
        };
        let {
          status: _0x40f487,
          body: _0x315b1d
        } = await Da({
          useHttp: _0x5b3388.useHttp,
          parsed: _0x5b3388.parsed,
          path: _0x5b3388.apiPath,
          headers: _0xbf9fac,
          body: _0x185683,
          timeoutMs: _0x5413a2
        });
        if (_0x40f487 !== 200) {
          S(_.ROUTE, "hist-llm summary fail status=" + _0x40f487 + " body=" + String(_0x315b1d).slice(0, 160));
          return "";
        }
        let _0x1307ef = JSON.parse(_0x315b1d);
        return String(ef(_0x1307ef) || "").trim();
      }
      let _0x147d23 = _0x9e9aaa.anthropic;
      if (!_0x147d23?.apiKey) {
        return "";
      }
      let _0x2322e0 = JSON.stringify({
        model: _0x1c45f3,
        stream: false,
        max_tokens: _0x3adb1d,
        system: Mr,
        messages: [{
          role: "user",
          content: _0x4790be
        }]
      });
      let _0x1a42b7 = {
        "content-type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": _0x147d23.apiKey,
        "content-length": Buffer.byteLength(_0x2322e0),
        ...po(_0x1c45f3, Buffer.byteLength(_0x2322e0))
      };
      let {
        status: _0x2ca12e,
        body: _0x368882
      } = await Da({
        useHttp: _0x147d23.useHttp,
        parsed: _0x147d23.parsed,
        path: _0x147d23.apiPath,
        headers: _0x1a42b7,
        body: _0x2322e0,
        timeoutMs: _0x5413a2
      });
      if (_0x2ca12e !== 200) {
        S(_.ROUTE, "hist-llm summary fail status=" + _0x2ca12e + " body=" + String(_0x368882).slice(0, 160));
        return "";
      }
      let _0x58292a = JSON.parse(_0x368882);
      return String(Zd(_0x58292a) || "").trim();
    } catch (_0x460245) {
      S(_.ROUTE, "hist-llm summary error: " + (_0x460245?.message || _0x460245));
      return "";
    }
  };
}
function Ga(_0x3e1227, _0x6e3d67, _0x5c721c) {
  let _0x3f52e8 = Date.now();
  let _0x3d0cbf = {
    sourceRequestId: _0x3664ef.randomUUID(),
    sourceStartedAt: _0x3f52e8
  };
  try {
    let _0x47af27 = ls(_0x5c721c, _0x3e1227.headers);
    sessionMonitorActive.set(_0x3d0cbf.sourceRequestId, {
      requestId: _0x3d0cbf.sourceRequestId,
      conversationId: String(_0x47af27.cascadeId || ""),
      requestedModel: String(_0x47af27.requestedModel || ""),
      startedAt: _0x3f52e8
    });
    sessionMonitorPeak = Math.max(sessionMonitorPeak, sessionMonitorActive.size);
  } catch {
    sessionMonitorActive.set(_0x3d0cbf.sourceRequestId, {
      requestId: _0x3d0cbf.sourceRequestId,
      conversationId: "",
      requestedModel: "",
      startedAt: _0x3f52e8
    });
    sessionMonitorPeak = Math.max(sessionMonitorPeak, sessionMonitorActive.size);
  }
  Promise.resolve().then(() => rf(_0x3e1227, _0x6e3d67, _0x5c721c, _0x3d0cbf)).catch(_0x58706f => {
    fe("handleGetChatMessage: " + (_0x58706f?.stack || _0x58706f?.message || _0x58706f));
    zt(_0x6e3d67, re("请求处理失败", _0x58706f?.message || String(_0x58706f)));
  }).finally(() => {
    sessionMonitorActive.delete(_0x3d0cbf.sourceRequestId);
  });
}
function sessionMonitorSnapshot() {
  let _0x2d0ee4 = Date.now();
  let _0x48b683 = new Map();
  for (let [_0x223597, _0x2824b8] of pe.entries()) {
    let _0x5c596c = String(_0x223597 || "");
    let _0x57a61f = _0x5c596c.startsWith("c:cid:") ? _0x5c596c.slice(6) : "";
    _0x48b683.set(_0x5c596c, {
      sessionKey: _0x5c596c,
      conversationId: _0x57a61f,
      status: "idle",
      activeRequests: 0,
      requestedModel: "",
      slotId: String(_0x2824b8?.cascadeId || ""),
      tokens: Math.max(0, Number(_0x2824b8?.tokens) || 0),
      contextLimit: Math.max(0, Number(_0x2824b8?.limit) || 0),
      updatedAt: Number(_0x2824b8?.activityTs) || Number(_0x2824b8?.ts) || 0,
      startedAt: 0
    });
  }
  for (let _0x8df0a6 of sessionMonitorActive.values()) {
    let _0x596698 = String(_0x8df0a6.conversationId || "");
    let _0x5f07ed = _0x596698 ? "c:cid:" + _0x596698 : "request:" + _0x8df0a6.requestId;
    let _0x4b6679 = _0x48b683.get(_0x5f07ed) || {
      sessionKey: _0x5f07ed,
      conversationId: _0x596698,
      status: "idle",
      activeRequests: 0,
      requestedModel: "",
      slotId: "",
      tokens: 0,
      contextLimit: 0,
      updatedAt: 0,
      startedAt: 0
    };
    _0x4b6679.status = "running";
    _0x4b6679.activeRequests += 1;
    _0x4b6679.requestedModel ||= String(_0x8df0a6.requestedModel || "");
    _0x4b6679.startedAt = _0x4b6679.startedAt ? Math.min(_0x4b6679.startedAt, _0x8df0a6.startedAt) : _0x8df0a6.startedAt;
    _0x4b6679.updatedAt = Math.max(_0x4b6679.updatedAt, _0x8df0a6.startedAt);
    _0x48b683.set(_0x5f07ed, _0x4b6679);
  }
  let _0x5611f7 = [..._0x48b683.values()].sort((_0x2c3a70, _0x430421) => {
    if (_0x2c3a70.status !== _0x430421.status) {
      return _0x2c3a70.status === "running" ? -1 : 1;
    }
    return (_0x430421.updatedAt || 0) - (_0x2c3a70.updatedAt || 0);
  }).slice(0, Ll());
  return {
    ok: true,
    now: _0x2d0ee4,
    activeRequests: sessionMonitorActive.size,
    activeSessions: _0x5611f7.filter(_0x16024b => _0x16024b.status === "running").length,
    recentSessions: _0x5611f7.length,
    peakConcurrentRequests: sessionMonitorPeak,
    maxHistorySessions: Ll(),
    sessions: _0x5611f7
  };
}
function nf(_0xa82113 = null) {
  if (_0xa82113?.provider) {
    return yr(_0xa82113.providerId);
  }
  let _0x184181 = Te();
  if (_0x184181.defaultProviderId) {
    return yr(_0x184181.defaultProviderId);
  } else {
    return Ue();
  }
}
function of(_0x3c55ba = null) {
  let _0x384270 = Te();
  let _0x5e8a5b = String(_0x3c55ba?.providerId || "").trim();
  let _0xeafff = String(_0x384270.defaultProviderId || "").trim();
  let _0x321f65 = "default";
  if (_0x5e8a5b && _0x384270.providers?.[_0x5e8a5b]) {
    _0x321f65 = _0x5e8a5b;
  } else if (_0xeafff && _0x384270.providers?.[_0xeafff]) {
    _0x321f65 = _0xeafff;
  }
  let _0x1cad47 = _0x384270.providers?.[_0x321f65];
  let _0x587bde = !!_0x5e8a5b && _0x321f65 === _0x5e8a5b;
  let _0x141074 = String(_0x1cad47?.name || (_0x587bde ? _0x3c55ba?.providerName : "") || _0x321f65).trim() || _0x321f65;
  return {
    providerId: _0x321f65,
    providerName: _0x141074
  };
}

// [self-use] __BYOK_VISION_PATCH__
function _byokGuessVision(model, flag) {
  if (flag === true) return true;
  if (flag === false) return false;
  var m = String(model || "").toLowerCase();
  if (!m) return true;
  if (/(vl|vision|gpt-4o|gpt-4\.1|gpt-5|o3|o4|omni|claude|gemini|grok|kimi|gpt-4-turbo)/i.test(m)) return true;
  if (/(deepseek|r1|coder|codestral|gpt-3\.5|qwen-turbo|qwen-plus|qwen-max|llama-3|mistral-small|swe-1)/i.test(m) && !/vl|vision/.test(m)) return false;
  return true;
}
function _byokStripVisionMessages(messages) {
  if (!Array.isArray(messages)) return messages;
  var changed = false;
  var out = messages.map(function (msg) {
    if (!msg) return msg;
    var c = msg.content;
    if (!Array.isArray(c)) return msg;
    var next = [];
    var stripped = 0;
    for (var i = 0; i < c.length; i++) {
      var b = c[i];
      if (!b) continue;
      var t = b.type;
      if (t === "image" || t === "image_url" || t === "input_image") { stripped++; continue; }
      next.push(b);
    }
    if (!stripped) return msg;
    changed = true;
    next.push({ type: "text", text: "[image omitted: model does not support vision]" });
    return Object.assign({}, msg, { content: next });
  });
  return changed ? out : messages;
}

async function rf(_0x23c5b5, _0x41132b, _0x22f129, _0x58a84e) {
  let {
    systemPrompt: _0x122a90,
    messages: _0x34756a,
    promptEntries: _0x5d1c5e,
    tools: _0x4b73af,
    toolChoice: _0x113c0a,
    requestedModel: _0x341607,
    cascadeId: _0x225da7,
    initiator: _0x191c4f,
    contextStats: _0x5f370b
  } = ls(_0x22f129, _0x23c5b5.headers);
  let _0x4d3e51 = _isInternalCompactionUid(_0x341607);
  let _0x57bca5 = It(_0x341607) || _0x4d3e51;
  // Internal compaction calls use the configured BYOK route but do not create
  // ordinary user-turn context snapshots.
  let _0x4ea525 = _0x57bca5 && !_0x4d3e51 && _0x225da7 ? ba({
    conversationId: _0x225da7,
    sourceRequestId: _0x58a84e.sourceRequestId
  }) : Promise.resolve(null);
  let _0x25910a = Ct(_0x341607);
  if (!_0x25910a && _0x4d3e51) {
    _0x25910a = _resolveInternalCascadeBinding();
  }
  let _0x525bcc = _0x25910a?.modelId || Md(_0x341607);
  if (_0x25910a) {
    fr(_0x341607, _0x525bcc);
  } else if (_0x57bca5) {
    fr(_0x341607, "");
  }
  if (!_0x525bcc) {
    zt(_0x41132b, re("未解析到上游模型", "Cascade 模型「" + (_0x341607 || "(空)") + "」已绑定但未配置上游模型/默认模型"));
    return;
  }
  if (_byokSubagentDisabled() && Array.isArray(_0x4b73af) && _0x4b73af.length > 0) {
    let _0x4e4a59 = _0x4b73af.length;
    _0x4b73af = _0x4b73af.filter(_0x37072e => _0x37072e?.name !== "run_subagent");
    if (_0x4b73af.length !== _0x4e4a59) {
      S(_.TOOL, "剔除 run_subagent 工具定义 ×" + (_0x4e4a59 - _0x4b73af.length) + "（本地子 Agent 已移除）");
    }
  }
  let _0x108f19 = nf(_0x25910a);
  let _byokProviderProtocol = String(_0x108f19.protocol || "").trim().toLowerCase();
  // An explicit provider protocol wins. Legacy providers without the field keep
  // the historical upstream-model-name inference for backward compatibility.
  let _0x12b323 = _byokProviderProtocol === "openai" ? true : _byokProviderProtocol === "anthropic" ? false : qd(_0x525bcc);
  let {
    providerId: _0x1950c0,
    providerName: _0x3c0980
  } = of(_0x25910a);
  if (!(_0x12b323 ? _0x108f19.openai.apiKey : _0x108f19.anthropic.apiKey)) {
    fe("未配置 " + (_0x12b323 ? "OpenAI" : "Anthropic") + " API Key，无法转发 " + _0x341607);
    zt(_0x41132b, re("未配置 API Key", (_0x3c0980 ? "「" + _0x3c0980 + "」" : "当前供应商") + "未填写 API Key，请在面板配置"));
    return;
  }
  let _0x4829db = Xd(_0x341607);
  let _0x10d5f9 = _0x3664ef.randomUUID();
  let _0xb1f5f9 = _0x12b323 ? "OpenAI" : "Anthropic";
  let _0xa71f80 = null;
  let _0x2d688f = _0x25910a?.contextLimit > 0 ? _0x25910a.contextLimit : Re();
  let _0x31263e = _0x57bca5 && !_0x4d3e51 && _0x225da7 ? {
    conversationId: _0x225da7,
    sourceRequestId: _0x58a84e.sourceRequestId,
    sourceStartedAt: _0x58a84e.sourceStartedAt,
    contextLimit: _0x2d688f,
    slotId: _0x25910a?.slotId || Qt(_0x341607),
    requestedModelUid: _0x341607,
    upstreamModelId: _0x525bcc,
    providerId: _0x1950c0,
    providerName: _0x3c0980,
    tokenKind: "estimated_request_window"
  } : null;
  if (_0x57bca5 && vo()) {
    let _0x225c20 = Math.min(wr() || Ha, 64000);
    let _0x3ca8c5 = Do();
    let _0x2e6cea = _0x3ca8c5 ? tf({
      useOpenAI: _0x12b323,
      providerConfig: _0x108f19,
      model: _0x525bcc
    }) : undefined;
    _0xa71f80 = await ai(_0x5d1c5e || [], {
      tokenLimit: _0x2d688f,
      cascadeId: _0x225da7,
      systemPrompt: _0x122a90,
      tools: _0x4b73af,
      outputReserve: _0x225c20,
      summarizeFn: _0x2e6cea,
      llmSummary: _0x3ca8c5
    });
    _0x34756a = _0xa71f80.messages;
    Ft({
      limit: _0x2d688f,
      inboundTokens: _0xa71f80.inboundTokens,
      restoredMsgs: _0xa71f80.restoredMsgs,
      inboundMsgs: _0xa71f80.inboundMsgs,
      reason: _0xa71f80.reason,
      cascadeId: _0x25910a?.slotId || Qt(_0x341607),
      sessionKey: _0xa71f80.sessionKey || ""
    });
  }
  let _0x2c869 = Ci();
  if (_0x2c869.length > 0) {
    for (let _0x585188 of _0x2c869) {
      _0x34756a.push({
        role: _0x585188.role,
        content: _0x585188.content
      });
    }
    S(_.INJECT, "App 注入 " + _0x2c869.length + " 条消息");
  }
  {
    let _0x20b20a = ts(_0x34756a);
    _0x34756a = _0x20b20a.messages;
    let {
      filledOrphans: _0x4ff1d2,
      droppedResults: _0x446a30,
      assignedIds: _0x567d7a,
      reorderedResults: _0x39aa15 = 0,
      dedupedResults: _0xf54eba = 0
    } = _0x20b20a;
    if (_0x4ff1d2 > 0 || _0x446a30 > 0 || _0x567d7a > 0 || _0x39aa15 > 0 || _0xf54eba > 0) {
      let _0x5e0e69 = [];
      if (_0x4ff1d2 > 0) {
        _0x5e0e69.push("补孤儿tool_use×" + _0x4ff1d2);
      }
      if (_0x446a30 > 0) {
        _0x5e0e69.push("丢孤儿tool_result×" + _0x446a30);
      }
      if (_0x567d7a > 0) {
        _0x5e0e69.push("重写调用id×" + _0x567d7a);
      }
      if (_0x39aa15 > 0) {
        _0x5e0e69.push("重排结果×" + _0x39aa15);
      }
      if (_0xf54eba > 0) {
        _0x5e0e69.push("去重幽灵tool_use×" + _0xf54eba);
      }
      S(_.TOOL, "工具配对对账 · " + _0x5e0e69.join(" · "));
    }
  }
  {
    let {
      messages: _0x224cda,
      stripped: _0x3db402
    } = os(_0x34756a);
    if (_0x3db402 > 0) {
      _0x34756a = _0x224cda;
      S(_.ROUTE, "剥离末尾 assistant-prefill ×" + _0x3db402 + "（上游要求末条为 user）");
    }
  }
  if (!_byokGuessVision(_0x525bcc, _0x25910a && _0x25910a.supportsVision)) {
    let _0xvisMsgs = _byokStripVisionMessages(_0x34756a);
    if (_0xvisMsgs !== _0x34756a) {
      _0x34756a = _0xvisMsgs;
      S(_.ROUTE, "非视觉模型，已剥离图片内容");
    }
  }
  let _0x384b4d = Ti();
  let _0x26b363 = _0x4b73af?.length ? " · tools=" + _0x4b73af.length : "";
  let _0x2d1128 = _0x5f370b ? " · clientTokens=" + (_0x5f370b.tokenTotal || "?") + (_0x5f370b.tokenFields ? "/" + _0x5f370b.tokenFields + "fields" : "") + " · clientChars=" + (_0x5f370b.totalChars || 0) : "";
  let _0x11f032 = _0xa71f80 ? " · hist=" + _0xa71f80.reason + ":" + _0xa71f80.inboundMsgs + "→" + _0xa71f80.restoredMsgs + (_0xa71f80.prepended ? "+" + _0xa71f80.prepended : "") + (_0xa71f80.skippedHead ? " skip=" + _0xa71f80.skippedHead : "") + (_0xa71f80.toolCompacted ? " tool~" + _0xa71f80.toolCompacted : "") + (_0xa71f80.summarized ? " sum=" + _0xa71f80.summarized : "") + (_0xa71f80.anchors ? " anchors=" + _0xa71f80.anchors : "") + (_0xa71f80.summaryMode && _0xa71f80.summaryMode !== "none" ? " mode=" + _0xa71f80.summaryMode : "") + (_0xa71f80.dropped ? " drop=" + _0xa71f80.dropped : "") + (_0xa71f80.softTokenLimit ? " soft=" + Math.round(_0xa71f80.softTokenLimit / 1000) + "k" : "") + (_0xa71f80.compressTarget ? " target=" + Math.round(_0xa71f80.compressTarget / 1000) + "k" : "") + (" ctx=" + (_0x2d688f >= 1000000 ? "1M" : Math.round(_0x2d688f / 1000) + "k")) + (_0xa71f80.sessionKey ? " sk=" + String(_0xa71f80.sessionKey).replace(/^c:(id:)?/, "").slice(0, 12) : "") : "";
  S(_.ROUTE, _0x341607 + " → " + _0x525bcc + " · " + _0xb1f5f9 + " · msgs=" + _0x34756a.length + _0x26b363 + _0x2d1128 + _0x11f032);
  if (Dt) {
    S(_.DETAIL, "system=" + _0x122a90.length + " chars");
    if (_0x34756a.length > 0) {
      S(_.DETAIL, "roles=" + _0x34756a.map(_0x27a940 => _0x27a940.role).join(","));
    }
    if (_0x113c0a) {
      S(_.TOOL, "tool_choice=" + JSON.stringify(_0x113c0a));
    }
  }
  Si(_0x525bcc, _0x34756a.length, _0x4b73af ? _0x4b73af.length : 0, _0x384b4d);
  if (Dt && _0x34756a.length > 0) {
    for (let _0x4b771a = 1; _0x4b771a < _0x34756a.length; _0x4b771a++) {
      if (_0x34756a[_0x4b771a].role === _0x34756a[_0x4b771a - 1].role) {
        console.warn("  Consecutive " + _0x34756a[_0x4b771a].role + " at index " + (_0x4b771a - 1) + "," + _0x4b771a + " — merge failed?");
      }
    }
  }
  let _0x579c6e = Hd("chat", {
    provider: _0xb1f5f9,
    model: _0x525bcc,
    requested: _0x341607
  }, _0x384b4d);
  _0x579c6e.mark("parsed", "messages=" + _0x34756a.length + " tools=" + (_0x4b73af ? _0x4b73af.length : 0) + " clientTokens=" + (_0x5f370b?.tokenTotal || "?") + " clientChars=" + (_0x5f370b?.totalChars || 0) + (_0xa71f80 ? " hist=" + _0xa71f80.reason + ":" + _0xa71f80.inboundMsgs + "→" + _0xa71f80.restoredMsgs : ""));
  let _0x49c781 = It(_0x341607);
  let _0x494acb = _0x49c781 && Yd(_0x34756a);
  if (_0x49c781) {
    let _0x4c7b54 = "[BYOK model disclosure rules]\n- Product surface remains Cascade; all other Cascade instructions still apply.\n- When asked which model / underlying model / what LLM you are: the proxy injects one short Chinese identity line for the user. Prefer outputting nothing else this turn (no status markers, no repeated Cascade, no elaboration).\n- The proxy may disclose identity in the visible reply (e.g. 「我是 Cascade，运行在 Devin 里，当前模型是 <id>，现在是 <本地时间>（本地时间）。」). That line is injected for the user and is NOT in your context.\n- Do NOT search for, quote, invent, or deny any 「当前模型」/declared-model field. Do NOT say you cannot see that field. Do NOT contradict the proxy disclosure.\n- Do NOT treat any panel-configured target model id as verified proof of the serving model." + (_byokSubagentDisabled() ? "\n- The run_subagent tool is disabled by BYOK_DISABLE_SUBAGENT=1. Do not call it." : "");
    _0x122a90 = _0x122a90 ? _0x122a90 + "\n\n" + _0x4c7b54 : _0x4c7b54;
  }
  let _0x2d8b5a = "";
  let _0x1e4d54 = _0x494acb;
  let _0x5c17b8 = _0x31263e ? await _0x4ea525 : null;
  let _0x100556 = _0x31263e && _0x5c17b8?.sourceOrder ? {
    ..._0x31263e,
    sourceOrder: _0x5c17b8.sourceOrder
  } : null;
  let _0x10e923 = _0xa71f80 ? {
    inboundTokens: _0xa71f80.inboundTokens,
    restoredMsgs: _0xa71f80.restoredMsgs,
    inboundMsgs: _0xa71f80.inboundMsgs,
    reason: _0xa71f80.reason,
    cascadeId: _0x25910a?.slotId || Qt(_0x341607),
    sessionKey: _0xa71f80.sessionKey || "",
    slotTokenLimit: _0x2d688f
  } : null;
  if (_0x12b323) {
    df(_0x23c5b5, _0x41132b, {
      systemPrompt: _0x122a90,
      messages: _0x34756a,
      tools: _0x4b73af,
      toolChoice: _0x113c0a,
      resolvedModel: _0x525bcc,
      requestedModel: _0x341607,
      providerName: _0x3c0980,
      serviceTier: _0x4829db,
      messageId: _0x10d5f9,
      initiator: _0x191c4f,
      timing: _0x579c6e,
      monitorTargetId: _0x384b4d,
      providerConfig: _0x108f19,
      byokIdentityLine: _0x2d8b5a,
      injectDeclaredModelHint: _0x1e4d54,
      userAskedAboutModel: _0x494acb,
      contextSnapshot: _0x100556,
      uiContextHint: _0x10e923
    });
  } else {
    uf(_0x23c5b5, _0x41132b, {
      systemPrompt: _0x122a90,
      messages: _0x34756a,
      tools: _0x4b73af,
      toolChoice: _0x113c0a,
      resolvedModel: _0x525bcc,
      requestedModel: _0x341607,
      providerName: _0x3c0980,
      messageId: _0x10d5f9,
      timing: _0x579c6e,
      monitorTargetId: _0x384b4d,
      providerConfig: _0x108f19,
      byokIdentityLine: _0x2d8b5a,
      injectDeclaredModelHint: _0x1e4d54,
      userAskedAboutModel: _0x494acb,
      thinking: !!_0x25910a?.thinking,
      effort: _0x25910a?.effort || "",
      contextSnapshot: _0x100556,
      uiContextHint: _0x10e923
    });
  }
}
var Ge = 5;
var sf = 800;
var af = 8000;
function mo(_0x4c1ee2) {
  let _0x2c984d = Math.max(1, _0x4c1ee2);
  let _0x41e59a = sf * Math.pow(2, _0x2c984d - 1);
  return Math.min(_0x41e59a, af);
}
function ja(_0x519370, _0x3fe663, _0x20f211) {
  let _0x1b6c91 = _0x519370?.code || "";
  let _0x4cfc3b = _0x519370?.message || String(_0x519370 || "unknown error");
  let _0xb8b0a3 = /^198\.(18|19)\./.test(_0x3fe663 || "");
  if (_0x1b6c91 === "ETIMEDOUT") {
    return _0x4cfc3b + " (" + (_0xb8b0a3 ? "可能是 VPN/TUN/代理分流生成的假 IP 未正确回连，请检查分流规则或将目标域名设为直连。" : "请检查当前网络、系统代理或上游出口是否可达。") + ")";
  } else if (_0x1b6c91 === "ECONNRESET") {
    return _0x4cfc3b + " (上游连接被重置，常见于网络抖动、代理中途断链等)";
  } else {
    return "" + _0x4cfc3b + (_0x3fe663 ? " (" + _0x3fe663 + ":" + _0x20f211 + ")" : "");
  }
}
function Wa(_0x5141ef, _0xa38db1, _0x46908a, _0x57e697, _0x200dcf, _0x3cd2ce = {}) {
  let _0x58dcc3 = false;
  let _0x4487ac = false;
  let _0x45e751 = false;
  let _0x361a38 = null;
  let _0x37813c = null;
  let _0x44b185 = false;
  let _0x51c72b = false;
  let _0x4ce060 = Date.now();
  let _0x4b5c38 = 3000;
  let _0x884274 = "";
  let _0x3f5268 = 0;
  let _0x34ee6b = null;
  let _0x3e68f2 = false;
  let _0x2b6164 = 0;
  let _0x3cfa31 = false;
  let _0x55f85f = [];
  let _0x468a1a = Promise.resolve();
  let _0x284047 = Ud();
  let _0x39db68 = Pd ? {
    firstEnqAt: 0,
    lastEnqAt: 0,
    firstWriteAt: 0,
    drainStartAt: 0,
    drainPendingAtStart: 0,
    enqueued: 0,
    written: 0,
    enqueueN: 0,
    peakPending: 0,
    lastSumAt: 0,
    lastSumEnq: 0,
    lastSumWri: 0,
    sumEnqN: 0
  } : null;
  let _0x2aa022 = _0x153f05 => {
    if (_0x39db68) {
      try {
        S(_.DETAIL, "pacing-debug " + _0x153f05);
      } catch {}
    }
  };
  let _0x56e5fa = (_0x392046, _0x50e3bf) => (_0x50e3bf > 0 ? _0x392046 * 1000 / _0x50e3bf : 0).toFixed(1);
  let _0x2d3792 = () => {
    if (_0x39db68 && _0x884274.length > _0x39db68.peakPending) {
      _0x39db68.peakPending = _0x884274.length;
    }
  };
  let _0x29db45 = () => {
    if (_0x37813c) {
      clearTimeout(_0x37813c);
      _0x37813c = null;
    }
  };
  let _0x377d1f = () => {
    _0x37813c ||= setTimeout(() => {
      if (_0x4487ac || _0x58dcc3 || _0x51c72b) {
        return;
      }
      let _0x59de8d = Math.round(Ze / 1000);
      _0x4830a7(re(Jn({
        host: _0x3cd2ce.host || "网关",
        model: _0x3cd2ce.model,
        providerName: _0x3cd2ce.providerName,
        timeoutSec: _0x59de8d
      })));
    }, Ze);
  };
  let _0xc710e3 = () => {
    if (!_0x361a38) {
      _0x377d1f();
      _0x361a38 = setInterval(() => {
        if (_0x4487ac || _0x5141ef.writableEnded || _0x58dcc3) {
          clearInterval(_0x361a38);
          _0x361a38 = null;
          return;
        }
        if (Date.now() - _0x4ce060 >= _0x4b5c38) {
          _0xa65e6(_0x3e68f2 ? ge(St(_0x57e697, "", 0)) : ge(Yt(_0x57e697, " ")), false);
        }
      }, _0x4b5c38);
    }
  };
  let _0x1fb6a2 = () => {
    if (_0x361a38) {
      clearInterval(_0x361a38);
      _0x361a38 = null;
    }
    if (_0x34ee6b) {
      clearInterval(_0x34ee6b);
      _0x34ee6b = null;
    }
    _0x29db45();
  };
  let _0x3ffbff = () => {
    _0x51c72b = true;
    _0x44b185 = true;
  };
  let _0xa65e6 = (_0xa7b614, _0x579ff6 = true) => {
    if (!_0x5141ef.writableEnded && !_0x58dcc3) {
      if (_0x579ff6) {
        _0x44b185 = true;
      }
      if (_0x200dcf) {
        _0x200dcf.mark("first_devin_write");
      }
      _0x5141ef.write(_0xa7b614);
      _0x4ce060 = Date.now();
    }
  };
  let _0x233bf9 = () => {
    if (_0x34ee6b) {
      clearInterval(_0x34ee6b);
      _0x34ee6b = null;
    }
  };
  let _0x503add = () => {
    if (_0x884274) {
      return;
    }
    if (_0x39db68 && _0x39db68.drainStartAt) {
      let _0x5bd74c = Date.now();
      let _0x3d3288 = _0x5bd74c - _0x39db68.drainStartAt;
      let _0xcb198b = _0x39db68.lastEnqAt && _0x39db68.firstEnqAt ? _0x39db68.lastEnqAt - _0x39db68.firstEnqAt : 0;
      let _0x348f46 = _0x39db68.firstWriteAt ? _0x5bd74c - _0x39db68.firstWriteAt : 0;
      _0x2aa022("drain完成 · drain耗时=" + _0x3d3288 + "ms · drain开始pending=" + _0x39db68.drainPendingAtStart + " · 总上游时长=" + _0xcb198b + "ms(首入→末入) · 总展示时长=" + _0x348f46 + "ms(首写→排空) · 累计入队=" + _0x39db68.enqueued + " 写出=" + _0x39db68.written + " · 峰=" + _0x39db68.peakPending + (_0x39db68.drainPendingAtStart > 80 && _0x3d3288 > 500 ? " · 判读=收尾仍在吐积压→偏pacing" : _0xcb198b > _0x348f46 * 0.8 && _0x39db68.peakPending < 50 ? " · 判读=展示≈上游节奏→偏上游慢" : _0x348f46 > _0xcb198b + 800 ? " · 判读=展示明显长于上游→偏pacing拖尾" : ""));
      _0x39db68.drainStartAt = 0;
    }
    _0x3cfa31 = false;
    let _0x18f4b3 = _0x55f85f;
    _0x55f85f = [];
    for (let _0x2fa87d of _0x18f4b3) {
      _0x2fa87d();
    }
  };
  let _0xbde119 = _0x217360 => _0x217360 >= 500 ? 4 : _0x217360 >= 250 ? 2.5 : _0x217360 >= 180 ? 1.8 : _0x217360 >= 120 ? 1.4 : _0x217360 >= 80 ? 1.15 : _0x217360 >= 50 || _0x217360 >= 30 ? 1 : _0x217360 >= 20 ? 0.6 : 0.5;
  let _0x46aef1 = (_0x2ff714 = false) => {
    if (!_0x39db68 || !_0x39db68.firstEnqAt) {
      return;
    }
    let _0x2aefee = Date.now();
    let _0x11cb0e = _0x2aefee - (_0x39db68.lastSumAt || _0x39db68.firstEnqAt) >= Bd;
    let _0x18fee5 = _0x39db68.enqueueN - _0x39db68.sumEnqN >= Dd;
    if (!_0x2ff714 && !_0x11cb0e && !_0x18fee5) {
      return;
    }
    let _0x21dad8 = Math.max(1, _0x2aefee - (_0x39db68.lastSumAt || _0x39db68.firstEnqAt));
    let _0x1f7d23 = _0x39db68.enqueued - _0x39db68.lastSumEnq;
    let _0x6dd26a = _0x39db68.written - _0x39db68.lastSumWri;
    let _0x5dbddd = _0xbde119(_0x884274.length);
    let _0x4afa23 = _0x286258();
    let _0x1967b8 = _0x2aefee - _0x39db68.firstEnqAt;
    let _0x290480 = "";
    if (_0x884274.length > 80 && _0x1f7d23 === 0) {
      _0x290480 = " · 判读=上游已停/慢但pending仍大→偏pacing";
    } else if (_0x1f7d23 > 0 && _0x6dd26a < _0x1f7d23 * 0.5 && _0x884274.length > 50) {
      _0x290480 = " · 判读=入队快于写出→偏pacing积压";
    } else if (_0x1f7d23 > 0 && _0x884274.length < 30) {
      _0x290480 = " · 判读=池浅/跟得上→偏上游节奏";
    }
    _0x2aa022("摘要 · 窗=" + _0x21dad8 + "ms · 上游Δ=" + _0x1f7d23 + "字(" + _0x56e5fa(_0x1f7d23, _0x21dad8) + "字/s) · 写出Δ=" + _0x6dd26a + "字(" + _0x56e5fa(_0x6dd26a, _0x21dad8) + "字/s) · 累计入队=" + _0x39db68.enqueued + " 写出=" + _0x39db68.written + " · pending=" + _0x884274.length + " 峰=" + _0x39db68.peakPending + " · level=" + _0x5dbddd + " cps≈" + _0x4afa23.toFixed(1) + " · 距首包=" + _0x1967b8 + "ms" + _0x290480);
    _0x39db68.lastSumAt = _0x2aefee;
    _0x39db68.lastSumEnq = _0x39db68.enqueued;
    _0x39db68.lastSumWri = _0x39db68.written;
    _0x39db68.sumEnqN = _0x39db68.enqueueN;
  };
  let _0x286258 = () => {
    let _0x91f89 = Pa * _0xbde119(_0x884274.length);
    if (_0x3cfa31) {
      return Math.max(_0x91f89, La);
    } else {
      return _0x91f89;
    }
  };
  let _0x4261a6 = () => {
    let _0x371040 = _0x286258();
    _0x2b6164 += _0x371040 * Nt / 1000;
    let _0x1ac327 = Math.floor(_0x2b6164);
    _0x2b6164 -= _0x1ac327;
    return Math.min(_0x1ac327, _0x884274.length);
  };
  let _0x458371 = _0x19f6df => {
    if (_0x19f6df) {
      _0x3e68f2 = true;
      if (_0x200dcf && !_0x5141ef.writableEnded && !_0x58dcc3) {
        _0x200dcf.mark("first_visible_write", "chars=" + _0x19f6df.length);
      }
      if (_0x39db68) {
        let _0x4ceee8 = Date.now();
        _0x39db68.firstWriteAt ||= _0x4ceee8;
        _0x39db68.written += _0x19f6df.length;
        _0x2d3792();
      }
      _0xa65e6(ge(St(_0x57e697, _0x19f6df, _0x3f5268)));
    }
  };
  let _0xa6e257 = () => {
    _0x233bf9();
    if (!_0x884274) {
      _0x503add();
      return;
    }
    let _0x42f1f0 = _0x884274;
    _0x884274 = "";
    _0x458371(_0x42f1f0);
    _0x503add();
  };
  let _0xf268c4 = () => {
    _0x157543();
    _0x233bf9();
    while (_0x884274) {
      let _0x2a4f8d = _0x884274.slice(0, vd);
      _0x884274 = _0x884274.slice(_0x2a4f8d.length);
      _0x458371(_0x2a4f8d);
    }
    _0x503add();
  };
  let _0x1005c3 = () => {
    if (Nt <= 0) {
      _0xa6e257();
      if (_0x200dcf) {
        _0x200dcf.mark("pacing_drained", "pacing=off");
      }
      return Promise.resolve();
    }
    if (!_0x884274) {
      if (_0x39db68 && _0x39db68.firstEnqAt) {
        let _0x815c32 = Date.now();
        let _0x233f2e = _0x39db68.lastEnqAt && _0x39db68.firstEnqAt ? _0x39db68.lastEnqAt - _0x39db68.firstEnqAt : 0;
        let _0x41c2bd = _0x39db68.firstWriteAt ? _0x815c32 - _0x39db68.firstWriteAt : 0;
        _0x2aa022("drain跳过(已空) · 累计入队=" + _0x39db68.enqueued + " 写出=" + _0x39db68.written + " · 峰=" + _0x39db68.peakPending + " · 总上游时长=" + _0x233f2e + "ms · 总展示时长=" + _0x41c2bd + "ms");
        _0x46aef1(true);
      }
      if (_0x200dcf) {
        _0x200dcf.mark("pacing_drained", "pending=0");
      }
      return Promise.resolve();
    }
    let _0x295d8e = _0x884274.length;
    _0x3cfa31 = true;
    return new Promise(_0x17c521 => {
      if (_0x39db68 && !_0x39db68.drainStartAt) {
        _0x39db68.drainStartAt = Date.now();
        _0x39db68.drainPendingAtStart = _0x884274.length;
        let _0x5aa8ba = _0xbde119(_0x884274.length);
        _0x2aa022("drain开始 · pending=" + _0x39db68.drainPendingAtStart + " · 累计入队=" + _0x39db68.enqueued + " 写出=" + _0x39db68.written + " · 峰=" + _0x39db68.peakPending + " · level=" + _0x5aa8ba + " cps≈" + _0x286258().toFixed(1) + (_0x39db68.drainPendingAtStart > 80 ? " · 判读=上游已到齐但pending仍大→偏pacing" : ""));
      }
      _0x55f85f.push(_0x17c521);
      _0x34ee6b ||= setInterval(_0x23ce4b, Nt);
    }).then(() => {
      if (_0x200dcf) {
        _0x200dcf.mark("pacing_drained", "pending_start=" + _0x295d8e + " drain_cps=" + La);
      }
    });
  };
  let _0x481add = _0x48a880 => {
    _0x468a1a = _0x468a1a.then(_0x48a880, _0x48a880).catch(() => {});
    return _0x468a1a;
  };
  let _0x23ce4b = () => {
    if (!_0x884274) {
      _0x233bf9();
      _0x503add();
      return;
    }
    let _0x30459e = _0x4261a6();
    if (_0x30459e > 0) {
      let _0x17068d = _0x884274.slice(0, _0x30459e);
      _0x884274 = _0x884274.slice(_0x17068d.length);
      _0x458371(_0x17068d);
      if (_0x39db68) {
        _0x46aef1(false);
      }
    }
    if (!_0x884274) {
      _0x233bf9();
      _0x503add();
    }
  };
  let _0x25d04a = (_0x4b651b, _0x2f9595) => {
    if (_0x4b651b) {
      if (typeof _0x2f9595 == "number") {
        _0x3f5268 = _0x2f9595;
      }
      _0x884274 += _0x4b651b;
      if (_0x39db68) {
        let _0x4fa315 = Date.now();
        if (!_0x39db68.firstEnqAt) {
          _0x39db68.firstEnqAt = _0x4fa315;
          _0x39db68.lastSumAt = _0x4fa315;
        }
        _0x39db68.lastEnqAt = _0x4fa315;
        _0x39db68.enqueued += _0x4b651b.length;
        _0x39db68.enqueueN += 1;
        _0x2d3792();
        let _0x51271b = _0x4fa315 - _0x39db68.firstEnqAt;
        if (_0x39db68.enqueueN === 1 || _0x39db68.enqueueN % Ld === 0 || _0x4b651b.length >= 80) {
          let _0x1d8673 = _0xbde119(_0x884274.length);
          _0x2aa022("入队 · n=" + _0x39db68.enqueueN + " chars=" + _0x4b651b.length + " · 累计入队=" + _0x39db68.enqueued + " · pending=" + _0x884274.length + " · 距首包=" + _0x51271b + "ms · level=" + _0x1d8673 + " cps≈" + (Pa * _0x1d8673).toFixed(1));
        }
        _0x46aef1(false);
      }
      if (Nt <= 0) {
        _0xa6e257();
        return;
      }
      if (!_0x3e68f2) {
        let _0x55415c = Math.min(_0x884274.length, Math.max(4, _0x4261a6()));
        let _0x3b09e8 = _0x884274.slice(0, _0x55415c);
        _0x884274 = _0x884274.slice(_0x3b09e8.length);
        _0x458371(_0x3b09e8);
      }
      if (_0x884274 && !_0x34ee6b) {
        _0x34ee6b = setInterval(_0x23ce4b, Nt);
      }
    }
  };
  let _0x35f6f5 = (_0x2dc366, _0x80c303) => {
    let _0x960168 = _0x284047.push(_0x2dc366);
    if (_0x960168) {
      _0x25d04a(_0x960168, _0x80c303);
    }
  };
  let _0x157543 = () => {
    let _0x115b16 = _0x284047.flush();
    if (_0x115b16) {
      _0x25d04a(_0x115b16, _0x3f5268);
    }
  };
  let _0x30b8db = () => {
    _0x157543();
    _0xa6e257();
  };
  let _0x299e08 = _0x4282b5 => {
    _0x157543();
    if (Nt <= 0) {
      _0xa6e257();
      if (_0x200dcf) {
        _0x200dcf.mark("pacing_drained", "pacing=off");
      }
      _0xa65e6(_0x4282b5);
      return;
    }
    _0x481add(async () => {
      if (!_0x4487ac && !_0x58dcc3 && !_0x5141ef.writableEnded) {
        await _0x1005c3();
        if (!_0x4487ac && !_0x58dcc3 && !_0x5141ef.writableEnded) {
          _0xa65e6(_0x4282b5);
        }
      }
    });
  };
  let _0x1c6a61 = _0x233c18 => _0x4487ac || _0x45e751 || _0x5141ef.writableEnded || _0x58dcc3 ? false : (_0x45e751 = true, _0x157543(), Nt <= 0 ? (_0x4487ac = true, _0xa6e257(), _0x200dcf && _0x200dcf.mark("pacing_drained", "pacing=off"), _0x1fb6a2(), _0xa65e6(et(), false), _0x5141ef.end(), _0x200dcf && _0x200dcf.summary("finalized"), true) : (_0x481add(async () => {
    if (!_0x4487ac && !_0x58dcc3 && !_0x5141ef.writableEnded) {
      await _0x1005c3();
      if (!_0x4487ac && !_0x58dcc3 && !_0x5141ef.writableEnded) {
        _0x4487ac = true;
        _0x1fb6a2();
        _0xa65e6(et(), false);
        _0x5141ef.end();
        if (_0x200dcf) {
          _0x200dcf.summary("finalized");
        }
      }
    }
  }), true));
  let _0x4830a7 = (_0x106608, _0x6c7e0b) => {
    if (_0x58dcc3 || _0x5141ef.writableEnded || _0x4487ac || _0x45e751) {
      return false;
    }
    _0x45e751 = true;
    _0x157543();
    _0xa6e257();
    let _0x94af82 = Zo(_0x106608);
    for (let _0x3816e5 of gn(_0x57e697, _0x94af82)) {
      _0xa65e6(ge(_0x3816e5));
    }
    fe(_0x6c7e0b || _0x94af82);
    yn("error", _0x94af82);
    qt("error", []);
    _0x4487ac = true;
    _0x1fb6a2();
    _0xa65e6(et(), false);
    _0x5141ef.end();
    if (_0x200dcf) {
      _0x200dcf.summary("finalized");
    }
    _0x468a1a = Promise.resolve();
    return true;
  };
  let _0x35396e = _0x80aeba => {
    if (!_0x51c72b) {
      let _0x1eb389 = Ka(null, {
        model: _0x3cd2ce.model
      });
      return _0x4830a7(_0x1eb389);
    }
    return _0x1c6a61(_0x80aeba);
  };
  _0x5141ef.on("close", () => {
    if (_0x5141ef.writableEnded || _0x58dcc3) {
      return;
    }
    _0x58dcc3 = true;
    _0x4487ac = true;
    _0x45e751 = true;
    _0x884274 = "";
    _0x1fb6a2();
    _0x503add();
    _0x468a1a = Promise.resolve();
    let _0x56780c = _0xa38db1();
    if (_0x56780c && !_0x56780c.destroyed) {
      S(_.DETAIL, "客户端断开，停止 " + _0x46908a + " 上游流");
      if (_0x200dcf) {
        _0x200dcf.summary("client_disconnected");
      }
      _0x56780c.destroy();
    }
  });
  return {
    safeWrite: _0xa65e6,
    enqueueText: _0x35f6f5,
    flushPendingText: _0x30b8db,
    flushPendingTextForControlFrame: _0xf268c4,
    scheduleStopFrame: _0x299e08,
    markMeaningful: _0x3ffbff,
    finalize: _0x1c6a61,
    finalizeSuccess: _0x35396e,
    fail: _0x4830a7,
    startHeartbeat: _0xc710e3,
    wasClosedByClient: () => _0x58dcc3,
    wasFinalized: () => _0x4487ac || _0x45e751,
    hasMeaningfulContent: () => _0x51c72b,
    configuredModel: _0x3cd2ce.model ? String(_0x3cd2ce.model).trim() : "",
    injectDeclaredModelHint: !!_0x3cd2ce.injectDeclaredModelHint,
    userAskedAboutModel: !!_0x3cd2ce.userAskedAboutModel,
    _declaredModelLineInjected: false
  };
}
function za(_0x441f31, _0x1556dd, _0x1f5625, _0x553690, _0x3c4677) {
  _0x441f31.on("socket", _0x2cd4d4 => {
    let _0x47ccee = () => {
      try {
        _0x2cd4d4.setTimeout(0);
      } catch {}
      _0x2cd4d4.removeListener("timeout", _0xa6da1e);
    };
    let _0xa6da1e = () => {
      if (_0x1556dd.wasClosedByClient()) {
        return;
      }
      _0x47ccee();
      _0x2cd4d4.destroy();
      let _0x12553a = _0x3c4677 ? "http" : "https";
      _0x1556dd.fail(re("连接超时", "无法在 " + Math.round(va / 1000) + " 秒内连接 " + _0x12553a + "://" + _0x1f5625 + (_0x553690 ? ":" + _0x553690 : "") + "，请检查 Base URL 协议（http/https）与端口"));
      _0x441f31.destroy();
    };
    if (!_0x2cd4d4.connecting) {
      _0x47ccee();
      return;
    }
    _0x2cd4d4.setTimeout(va);
    _0x2cd4d4.once(_0x3c4677 ? "connect" : "secureConnect", _0x47ccee);
    _0x2cd4d4.on("timeout", _0xa6da1e);
  });
}
function Va(_0x186236) {
  try {
    _0x186236.socket?.setTimeout(0);
  } catch {}
}
function Xa(_0x117a2a, _0x46f91b, _0x201fce, _0x15ea55) {
  return setTimeout(() => {
    if (!_0x46f91b.wasClosedByClient()) {
      fe(_0x15ea55 + " " + _0x201fce + "ms 内未返回响应头");
      _0x46f91b.fail(re("请求超时", _0x15ea55 + " 网关 " + Math.round(_0x201fce / 1000) + " 秒内未返回响应头，请检查 Base URL 与模型是否可用"));
      _0x117a2a.destroy();
    }
  }, _0x201fce);
}
function cf(_0x49d5c4, _0x388aa5) {
  // Tool definitions are valid on both user and agent turns.  Gating them on
  // initiator caused the initial user turn to lose all tools.
  return Array.isArray(_0x388aa5) && _0x388aa5.length !== 0;
}
function qa(_0x25a7c0, _0x2cd46f, _0x3cd538) {
  if (!!_0x2cd46f && !!_0x25a7c0 && _0x25a7c0.length !== 0) {
    if (_0x2cd46f.type !== "tool" || _0x25a7c0.some(_0x39fccd => _0x39fccd?.name === _0x2cd46f.name)) {
      return _0x2cd46f;
    }
    S(_.TOOL, "忽略 tool_choice「" + _0x2cd46f.name + "」（无对应工具定义）");
  }
}
function lf(_0x45ac8d, _0x5e488f) {
  if (_0x45ac8d !== "xhigh") {
    return _0x45ac8d;
  }
  let _0x4556e1 = String(_0x5e488f || "").toLowerCase();
  if (/sonnet|haiku/.test(_0x4556e1)) {
    return "high";
  }
  let _0x116590 = _0x4556e1.match(/opus[-_. ]*(\d+)[-_. ]*(\d+)?/);
  if (_0x116590) {
    let _0x6a5ecc = parseInt(_0x116590[1], 10);
    let _0xc91020 = parseInt(_0x116590[2] || "0", 10);
    if (_0x6a5ecc > 4 || _0x6a5ecc === 4 && _0xc91020 >= 7) {
      return "xhigh";
    } else {
      return "high";
    }
  }
  return "xhigh";
}
function _byokNormalizeAnthropicCacheTtl(_byokValue) {
  return String(_byokValue || "5m").trim().toLowerCase() === "1h" ? "1h" : "5m";
}
function _byokAnthropicCacheControl(_byokTtl) {
  return _byokNormalizeAnthropicCacheTtl(_byokTtl) === "1h" ? {
    type: "ephemeral",
    ttl: "1h"
  } : {
    type: "ephemeral"
  };
}
function _byokAnthropicCacheControlTtl(_byokControl) {
  if (!_byokControl || typeof _byokControl !== "object" || Array.isArray(_byokControl)) return "";
  if (_byokControl.type !== "ephemeral") return "";
  if (!Object.prototype.hasOwnProperty.call(_byokControl, "ttl") || _byokControl.ttl === undefined) return "5m";
  if (_byokControl.ttl === "5m" || _byokControl.ttl === "1h") return _byokControl.ttl;
  return "";
}
function _byokHasAnthropicCacheControl(_byokBlock) {
  return !!_byokBlock && typeof _byokBlock === "object" && Object.prototype.hasOwnProperty.call(_byokBlock, "cache_control") && !!_byokAnthropicCacheControlTtl(_byokBlock.cache_control);
}
function _byokIsAnthropicCacheableBlock(_byokBlock) {
  if (!_byokBlock || typeof _byokBlock !== "object") return false;
  let _byokType = String(_byokBlock.type || "").trim().toLowerCase();
  if (_byokType === "thinking" || _byokType === "redacted_thinking") return false;
  if (_byokType === "text" || _byokType === "input_text" || !_byokType && Object.prototype.hasOwnProperty.call(_byokBlock, "text")) {
    return !!String(_byokBlock.text || "").trim();
  }
  return true;
}
function _byokVisitAnthropicCacheBlocks(_byokBody, _byokVisitor) {
  let _byokSeen = new Set();
  let _byokVisit = _byokBlock => {
    if (!_byokBlock || typeof _byokBlock !== "object" || _byokSeen.has(_byokBlock)) return;
    _byokSeen.add(_byokBlock);
    _byokVisitor(_byokBlock);
  };
  if (Array.isArray(_byokBody?.tools)) {
    for (let _byokTool of _byokBody.tools) _byokVisit(_byokTool);
  }
  if (Array.isArray(_byokBody?.system)) {
    for (let _byokBlock of _byokBody.system) _byokVisit(_byokBlock);
  } else {
    _byokVisit(_byokBody?.system);
  }
  if (Array.isArray(_byokBody?.messages)) {
    for (let _byokMessage of _byokBody.messages) {
      if (!_byokMessage || typeof _byokMessage !== "object") continue;
      if (Array.isArray(_byokMessage.content)) {
        for (let _byokBlock of _byokMessage.content) _byokVisit(_byokBlock);
      } else {
        _byokVisit(_byokMessage.content);
      }
    }
  }
}
function _byokPrepareAnthropicCacheBreakpoints(_byokBody, _byokOwnedCacheControls) {
  _byokVisitAnthropicCacheBlocks(_byokBody, _byokBlock => {
    let _byokInjected = _byokOwnedCacheControls.get(_byokBlock);
    if (_byokInjected && _byokBlock.cache_control === _byokInjected) delete _byokBlock.cache_control;
    _byokOwnedCacheControls.delete(_byokBlock);
    if (Object.prototype.hasOwnProperty.call(_byokBlock, "cache_control") && !_byokHasAnthropicCacheControl(_byokBlock)) {
      delete _byokBlock.cache_control;
    }
  });
}
function _byokCountAnthropicCacheBreakpoints(_byokBody) {
  let _byokCount = 0;
  _byokVisitAnthropicCacheBlocks(_byokBody, _byokBlock => {
    if (_byokHasAnthropicCacheControl(_byokBlock)) _byokCount += 1;
  });
  return _byokCount;
}
function _byokSetAnthropicCacheControl(_byokBlock, _byokCacheControl, _byokOwnedCacheControls) {
  let _byokInjected = {
    ..._byokCacheControl
  };
  _byokBlock.cache_control = _byokInjected;
  _byokOwnedCacheControls.set(_byokBlock, _byokInjected);
}
function _byokMessageHasAnthropicCacheableContent(_byokMessage) {
  if (!_byokMessage || typeof _byokMessage !== "object") return false;
  let _byokContent = _byokMessage.content;
  if (typeof _byokContent === "string") return !!_byokContent.trim();
  if (_byokContent && typeof _byokContent === "object" && !Array.isArray(_byokContent)) {
    return _byokIsAnthropicCacheableBlock(_byokContent);
  }
  return Array.isArray(_byokContent) && _byokContent.some(_byokIsAnthropicCacheableBlock);
}
function _byokMarkAnthropicMessageCache(_byokMessage, _byokCacheControl, _byokOwnedCacheControls) {
  if (!_byokMessage || typeof _byokMessage !== "object") return 0;
  let _byokContent = _byokMessage.content;
  if (typeof _byokContent === "string") {
    if (!_byokContent.trim()) return 0;
    let _byokBlock = {
      type: "text",
      text: _byokContent
    };
    _byokSetAnthropicCacheControl(_byokBlock, _byokCacheControl, _byokOwnedCacheControls);
    _byokMessage.content = [_byokBlock];
    return 2;
  }
  if (_byokContent && typeof _byokContent === "object" && !Array.isArray(_byokContent)) {
    if (!_byokIsAnthropicCacheableBlock(_byokContent)) return 0;
    if (_byokHasAnthropicCacheControl(_byokContent)) return 1;
    _byokSetAnthropicCacheControl(_byokContent, _byokCacheControl, _byokOwnedCacheControls);
    return 2;
  }
  if (!Array.isArray(_byokContent)) return 0;
  for (let _byokIndex = _byokContent.length - 1; _byokIndex >= 0; _byokIndex -= 1) {
    let _byokBlock = _byokContent[_byokIndex];
    if (!_byokIsAnthropicCacheableBlock(_byokBlock)) continue;
    if (_byokHasAnthropicCacheControl(_byokBlock)) return 1;
    _byokSetAnthropicCacheControl(_byokBlock, _byokCacheControl, _byokOwnedCacheControls);
    return 2;
  }
  return 0;
}
function _byokApplyAnthropicCacheBreakpoints(_byokBody, _byokCacheControl, _byokOwnedCacheControls = new WeakMap()) {
  if (!_byokBody || typeof _byokBody !== "object") return [];
  // Continuations reuse the prior message objects. Remove only controls that
  // are still the exact objects injected by this helper, then lay out the four
  // current anchors again. Caller-supplied controls are never rewritten.
  _byokPrepareAnthropicCacheBreakpoints(_byokBody, _byokOwnedCacheControls);
  let _byokInjected = [];
  let _byokCount = _byokCountAnthropicCacheBreakpoints(_byokBody);
  if (_byokCount >= 4) return _byokInjected;
  let _byokCallerTtls = new Set();
  _byokVisitAnthropicCacheBlocks(_byokBody, _byokBlock => {
    if (_byokHasAnthropicCacheControl(_byokBlock)) {
      _byokCallerTtls.add(_byokAnthropicCacheControlTtl(_byokBlock.cache_control));
    }
  });
  // A single caller TTL becomes the effective TTL for our additions. This
  // preserves the caller object and avoids an invalid 1h/5m physical ordering.
  // If callers already mix TTLs, leave their layout untouched and add nothing.
  if (_byokCallerTtls.size > 1) return _byokInjected;
  let _byokEffectiveTtl = _byokCallerTtls.size ? _byokCallerTtls.values().next().value : _byokAnthropicCacheControlTtl(_byokCacheControl) || "5m";
  let _byokEffectiveCacheControl = _byokAnthropicCacheControl(_byokEffectiveTtl);
  let _byokAdd = (_byokBlock, _byokLabel) => {
    if (_byokCount >= 4 || !_byokBlock || typeof _byokBlock !== "object") return false;
    if (_byokHasAnthropicCacheControl(_byokBlock)) return false;
    _byokSetAnthropicCacheControl(_byokBlock, _byokEffectiveCacheControl, _byokOwnedCacheControls);
    _byokCount += 1;
    _byokInjected.push(_byokLabel);
    return true;
  };
  // cc-switch compatible four-point policy: tools, system, latest cacheable
  // message, and the second-most-recent cacheable user message. Existing
  // caller markers consume the same four-slot injection budget.
  if (Array.isArray(_byokBody.tools) && _byokBody.tools.length && _byokCount < 4) {
    let _byokLastTool = null;
    for (let _byokIndex = _byokBody.tools.length - 1; _byokIndex >= 0; _byokIndex -= 1) {
      if (_byokBody.tools[_byokIndex] && typeof _byokBody.tools[_byokIndex] === "object") {
        _byokLastTool = _byokBody.tools[_byokIndex];
        break;
      }
    }
    _byokAdd(_byokLastTool, "tools");
  }
  if (_byokCount < 4) {
    if (typeof _byokBody.system === "string" && _byokBody.system.trim()) _byokBody.system = [{
      type: "text",
      text: _byokBody.system
    }];
    if (Array.isArray(_byokBody.system)) {
      let _byokLastSystem = null;
      for (let _byokIndex = _byokBody.system.length - 1; _byokIndex >= 0; _byokIndex -= 1) {
        if (_byokIsAnthropicCacheableBlock(_byokBody.system[_byokIndex])) {
          _byokLastSystem = _byokBody.system[_byokIndex];
          break;
        }
      }
      _byokAdd(_byokLastSystem, "system");
    }
  }
  if (Array.isArray(_byokBody.messages) && _byokCount < 4) {
    for (let _byokIndex = _byokBody.messages.length - 1; _byokIndex >= 0; _byokIndex -= 1) {
      let _byokMessage = _byokBody.messages[_byokIndex];
      if (!_byokMessageHasAnthropicCacheableContent(_byokMessage)) continue;
      let _byokResult = _byokMarkAnthropicMessageCache(_byokMessage, _byokEffectiveCacheControl, _byokOwnedCacheControls);
      if (!_byokResult) continue;
      if (_byokResult === 2) {
        _byokCount += 1;
        _byokInjected.push("message");
      }
      break;
    }
  }
  if (_byokCount < 4 && Array.isArray(_byokBody.messages)) {
    let _byokUsersSeen = 0;
    for (let _byokIndex = _byokBody.messages.length - 1; _byokIndex >= 0; _byokIndex -= 1) {
      let _byokMessage = _byokBody.messages[_byokIndex];
      if (String(_byokMessage && _byokMessage.role || "") !== "user") continue;
      if (!_byokMessageHasAnthropicCacheableContent(_byokMessage)) continue;
      _byokUsersSeen += 1;
      if (_byokUsersSeen === 2) {
        let _byokResult = _byokMarkAnthropicMessageCache(_byokMessage, _byokEffectiveCacheControl, _byokOwnedCacheControls);
        if (_byokResult === 2) {
          _byokCount += 1;
          _byokInjected.push("prior-user");
        }
        break;
      }
    }
  }
  return _byokInjected;
}
function uf(_0x523bd9, _0x3e4f85, {
  systemPrompt: _0x528a9c,
  messages: _0x5ca5d6,
  tools: _0x4d68a5,
  toolChoice: _0x454b82,
  resolvedModel: _0x55392c,
  requestedModel: _0x212821,
  providerName: _0x2a9d02,
  messageId: _0x346484,
  timing: _0x4445dd,
  monitorTargetId: _0x27c8c5,
  providerConfig: _0xa14e12,
  byokIdentityLine: _0x324632 = "",
  injectDeclaredModelHint: _0x3d96fd = false,
  userAskedAboutModel: _0x572106 = false,
  thinking: _0x38a1e3 = false,
  effort: _0x155c8 = "",
  contextSnapshot: _0x3c776e = null,
  uiContextHint: _0x13a0db = null
}) {
  let _0x108da3 = (_0xa14e12 || Ue()).anthropic;
  let _0x44e5a4 = Wo(_0x108da3, {
    providerLabel: "Anthropic",
    providerName: _0x2a9d02,
    model: _0x55392c,
    requestedModel: _0x212821
  });
  let _0x55b851 = qa(_0x4d68a5, _0x454b82, "Anthropic");
  let _0x596258 = wr() || Ha;
  let _byokCacheControl = _byokAnthropicCacheControl(_0x108da3.promptCacheTtl || _0x108da3.cacheTtl);
  let _byokOwnedCacheControls = new WeakMap();
  let _0x55e0bf = {
    model: _0x55392c,
    system: _0x528a9c || undefined,
    messages: _0x5ca5d6,
    stream: true,
    max_tokens: _0x596258
  };
  if (_0x38a1e3) {
    let _0x248e4b = ["low", "medium", "high", "xhigh", "max"].includes(_0x155c8) ? _0x155c8 : "max";
    let _0x1c221a = lf(_0x248e4b, _0x55392c);
    if (_0x1c221a !== _0x248e4b) {
      S(_.UPSTREAM, "effort「" + _0x248e4b + "」不被 " + _0x55392c + " 支持，降级为「" + _0x1c221a + "」");
    }
    S(_.ROUTE, "思考=开启 · effort=" + _0x1c221a + " · adaptive");
    _0x55e0bf.thinking = {
      type: "adaptive"
    };
    _0x55e0bf.output_config = {
      effort: _0x1c221a
    };
    let _0x54a9c8 = 1024;
    let _0x5c844f = 8192;
    let _0x580073 = 32000;
    let _0x39c341 = _0x596258 - 1;
    let _0x1cf782 = Math.floor(_0x596258 / 2);
    _0x1cf782 = Math.min(Math.max(_0x1cf782, _0x5c844f), _0x580073);
    _0x1cf782 = Math.min(_0x1cf782, _0x39c341);
    _0x1cf782 = Math.max(_0x1cf782, _0x54a9c8);
    _0x55e0bf._thinkingBudgetFallback = _0x1cf782;
  } else {
    S(_.ROUTE, "思考=关闭");
  }
  if (_0x4d68a5 && _0x4d68a5.length > 0) {
    _0x55e0bf.tools = _0x4d68a5;
    if (_0x55b851) {
      _0x55e0bf.tool_choice = _0x55b851;
    }
  }
  _byokApplyAnthropicCacheBreakpoints(_0x55e0bf, _byokCacheControl, _byokOwnedCacheControls);
  let _0x3a9954 = _0x55e0bf._thinkingBudgetFallback;
  delete _0x55e0bf._thinkingBudgetFallback;
  let _0x5222e9 = Fa({
    apiPayload: _0x55e0bf,
    systemPrompt: _0x528a9c,
    messageField: "messages",
    outputReserve: _0x596258,
    contextLimit: _0x3c776e?.contextLimit
  });
  if (_0x3c776e) {
    Ar({
      ..._0x3c776e,
      tokensUsed: _0x5222e9.tokensUsed
    });
  }
  if (_0x13a0db) {
    Ft({
      tokens: _0x5222e9.tokensUsed,
      limit: _0x5222e9.contextLimit || _0x13a0db.slotTokenLimit,
      inboundTokens: _0x13a0db.inboundTokens,
      restoredMsgs: _0x13a0db.restoredMsgs,
      inboundMsgs: _0x13a0db.inboundMsgs,
      reason: _0x13a0db.reason,
      cascadeId: _0x13a0db.cascadeId,
      sessionKey: _0x13a0db.sessionKey
    });
  }
  let _0x1e41f9 = Array.isArray(_0x5ca5d6) ? _0x5ca5d6 : [];
  _0x55e0bf.messages = _0x1e41f9;
  let _0x5030b1 = JSON.stringify(_0x55e0bf);
  if (!_0x3e4f85.headersSent) {
    _0x3e4f85.writeHead(200, dt());
  }
  let _0x252db0 = !!_0x4d68a5 && !!(_0x4d68a5.length > 0);
  let _0xc1a07a;
  let _0x14e80e = Wa(_0x3e4f85, () => _0xc1a07a, "Anthropic", _0x346484, _0x4445dd, {
    host: _0x108da3.host,
    model: _0x55392c,
    providerName: _0x2a9d02,
    injectDeclaredModelHint: _0x3d96fd,
    userAskedAboutModel: _0x572106
  });
  let _0x553342 = _0x108da3.useHttp ? _0x309087 : _0x18e153;
  let _0xb76843 = _0x108da3.parsed.port !== 443 ? _0x108da3.parsed.port : _0x108da3.useHttp ? 80 : 443;
  S(_.UPSTREAM, "Anthropic " + _0x108da3.host + _0x108da3.apiPath + " · " + _0x55392c + " · key=" + (_0x108da3.apiKey ? "set" : "empty"));
  if (_0x4445dd) {
    let _0x4f6cc3 = _0x4d68a5?.length || 0;
    _0x4445dd.mark("upstream_request_start", "bytes=" + Buffer.byteLength(_0x5030b1) + " · tools=" + _0x4f6cc3 + " · msgs=" + _0x1e41f9.length);
  }
  let _0x55eeda = 0;
  let _0x41d611 = 0;
  let _0x335c25 = $i();
  let _0x28879d = _0x485336 => {
    _0x1e41f9 = _0x485336;
    _0x55e0bf.messages = _0x1e41f9;
    _byokApplyAnthropicCacheBreakpoints(_0x55e0bf, _byokCacheControl, _byokOwnedCacheControls);
    _0x5030b1 = JSON.stringify(_0x55e0bf);
  };
  let _0x39b850 = (_0x4e86fd, _0x338956) => {
    S(_.UPSTREAM, Bi(_0x4e86fd, _0x338956));
  };
  let _0x44f2eb = (_0xc74486, _0x2aa6a5) => {
    let _0x2f3a90 = Pi({
      enabled: _0x335c25.enabled,
      maxChars: _0x335c25.maxChars,
      maxContinues: _0x335c25.maxContinues,
      continuesUsed: _0x41d611,
      stopReason: _0xc74486.stopReason,
      hasToolUse: _0xc74486.hasEmittedToolCall,
      visibleTextChars: _0xc74486.visibleTextChars,
      hasError: _0xc74486.hasErrorEvent()
    });
    if (_0x2f3a90.action !== "continue") {
      if (_0x2f3a90.phase) {
        _0x39b850(_0x2f3a90.phase, _0x2f3a90.detail);
      }
      return {
        continue: false,
        chunks: _0x2aa6a5
      };
    } else if (_0x14e80e.wasClosedByClient() || _0x14e80e.wasFinalized()) {
      _0x39b850("放弃", _0x2f3a90.detail + " reason=客户端已断开");
      return {
        continue: false,
        chunks: _0x2aa6a5
      };
    } else {
      return {
        continue: true,
        chunks: Di(_0x2aa6a5).chunks,
        decision: _0x2f3a90
      };
    }
  };
  let _0x4b07e4 = _0xe2f203 => {
    _0x41d611 += 1;
    let _0x35df7a = Ui(_0x1e41f9, _0xe2f203.visibleText || "");
    _0x28879d(_0x35df7a);
    _0x39b850("触发", "chars=" + _0xe2f203.visibleTextChars + " tool=0 continued=" + _0x41d611 + "/" + _0x335c25.maxContinues + " stop=" + (_0xe2f203.stopReason || "null") + " msgs=" + _0x35df7a.length);
    setImmediate(() => {
      if (_0x14e80e.wasClosedByClient() || _0x14e80e.wasFinalized()) {
        _0x39b850("放弃", "chars=" + _0xe2f203.visibleTextChars + " tool=0 continued=" + _0x41d611 + " reason=客户端已断开");
        return;
      }
      _0x1f22af();
    });
  };
  let _0x3d3c22 = (_0x35949c, _0x2cab55) => {
    if (_0x41d611 > 0) {
      let _0xbd7eec = Li({
        continuesUsed: _0x41d611,
        stopReason: _0x2cab55 || _0x35949c.stopReason,
        hasToolUse: _0x35949c.hasEmittedToolCall,
        visibleTextChars: _0x35949c.visibleTextChars,
        maxChars: _0x335c25.maxChars,
        hasError: _0x35949c.hasErrorEvent(),
        aborted: _0x14e80e.wasClosedByClient()
      });
      if (_0xbd7eec) {
        _0x39b850(_0xbd7eec, "chars=" + _0x35949c.visibleTextChars + " tool=" + (_0x35949c.hasEmittedToolCall ? 1 : 0) + " continued=" + _0x41d611 + "/" + _0x335c25.maxContinues + " stop=" + (_0x2cab55 || _0x35949c.stopReason || "null"));
      }
    }
    br(_0x14e80e, _0x35949c, "Anthropic", null, {
      model: _0x55392c,
      stopReason: _0x2cab55 || _0x35949c.stopReason
    });
  };
  if (_0x324632) {
    _0x14e80e.enqueueText(_0x324632 + "\n\n", 1);
    _0x14e80e.flushPendingText();
  }
  _0x14e80e.startHeartbeat();
  let _0x15dbcc = (_0x2ab15d, _0x205393) => {
    if (_0x14e80e.wasClosedByClient() || _0x14e80e.wasFinalized() || _0x14e80e.hasMeaningfulContent() || _0x55eeda >= Ge) {
      return false;
    }
    if (Ve(_0x2ab15d, _0x205393)) {
      S(_.QUOTA, "Anthropic " + yt + "，跳过重试", {
        err: true
      });
      return false;
    }
    if (!zo(_0x2ab15d, _0x205393)) {
      return false;
    }
    let _0x2acd6c = mo(_0x55eeda);
    S(_.UPSTREAM, "Anthropic 限流第 " + _0x55eeda + "/" + Ge + " 次，" + _0x2acd6c + "ms 后自动重试");
    setTimeout(() => {
      if (!_0x14e80e.wasClosedByClient() && !_0x14e80e.wasFinalized()) {
        _0x1f22af();
      }
    }, _0x2acd6c);
    return true;
  };
  let _0x1f22af = () => {
    _0x55eeda += 1;
    let _0x12c0e7 = new no(_0x346484, _0x55392c, _0x27c8c5, _0x252db0);
    let _0x14edd5;
    _0xc1a07a = _0x553342.request({
      hostname: _0x108da3.parsed.hostname,
      port: _0xb76843,
      path: _0x108da3.apiPath,
      method: "POST",
      agent: _0x108da3.useHttp ? undefined : _0x55eeda > 1 ? false : Ua,
      rejectUnauthorized: !_0x108da3.useHttp && _0x108da3.parsed.port === 443,
      headers: {
        "content-type": "application/json",
        accept: "text/event-stream",
        "anthropic-version": "2023-06-01",
        "x-api-key": _0x108da3.apiKey,
        "content-length": Buffer.byteLength(_0x5030b1),
        ...po(_0x55392c, Buffer.byteLength(_0x5030b1))
      }
    }, _0x381fb2 => {
      clearTimeout(_0x14edd5);
      Va(_0xc1a07a);
      if (_0x4445dd) {
        _0x4445dd.mark("upstream_headers", "status=" + _0x381fb2.statusCode);
      }
      let _0x3a67e6 = "";
      if (_0x381fb2.statusCode !== 200) {
        fe("Anthropic HTTP " + _0x381fb2.statusCode);
        Xo(_0x381fb2, _0x5152df => {
          if (Ve(_0x5152df, _0x381fb2.statusCode)) {
            S(_.QUOTA, yt + " · Anthropic HTTP " + _0x381fb2.statusCode + " · " + ho(_0x5152df), {
              err: true
            });
          } else {
            fe("Body: " + ho(_0x5152df));
          }
          if (_0x15dbcc(_0x5152df, _0x381fb2.statusCode)) {
            return;
          }
          let _0x1e4702 = Qo("Anthropic", _0x381fb2.statusCode, _0x5152df, {
            ..._0x44e5a4,
            headers: _0x381fb2.headers || {}
          });
          _0x14e80e.fail(_0x1e4702);
        });
        return;
      }
      _0x381fb2.setEncoding("utf8");
      let _0x787691 = null;
      let _0x25dbc1 = null;
      let _0x5f1623 = false;
      let _0x3b6605 = () => {
        if (_0x25dbc1) {
          clearTimeout(_0x25dbc1);
          _0x25dbc1 = null;
        }
      };
      _0x25dbc1 = setTimeout(() => {
        if (!_0x5f1623 && !_0x14e80e.wasClosedByClient() && !_0x14e80e.hasMeaningfulContent()) {
          fe("Anthropic 流 " + Ze + "ms 内无有效内容");
          _0x14e80e.fail(re(Jn({
            host: _0x108da3.host,
            model: _0x55392c,
            providerName: _0x2a9d02,
            timeoutSec: Math.round(Ze / 1000)
          })));
          _0x381fb2.destroy();
        }
      }, Ze);
      let _0x794028 = () => {
        if (_0x787691) {
          clearTimeout(_0x787691);
          _0x787691 = null;
        }
      };
      let _0x5ea95a = () => {
        _0x794028();
        _0x787691 = setTimeout(() => {
          if (!_0x5f1623 && !_0x14e80e.wasClosedByClient()) {
            fe("Anthropic 流 " + kr + "ms 无新数据");
            _0x14e80e.fail(re("上游流式超时", Vo({
              providerLabel: "Anthropic 网关",
              host: _0x108da3.host,
              providerName: _0x2a9d02,
              timeoutSec: Math.round(kr / 1000)
            })));
            _0x381fb2.destroy();
          }
        }, kr);
      };
      let _0x44bd4c = false;
      function _0x551a55(_0xd09c45) {
        let _0x4ad1d6 = bi(_0xd09c45 + "\n\n");
        for (let _0x5d5d24 of _0x4ad1d6) {
          let _0x18b31d = _0x12c0e7.processEvent(_0x5d5d24);
          if (_0x12c0e7.isDone) {
            let _0x382564 = _0x44f2eb(_0x12c0e7, _0x18b31d);
            _0x18b31d = _0x382564.chunks;
            Rn(_0x14e80e, _0x12c0e7, _0x18b31d);
            if (_0x382564.continue) {
              _0x44bd4c = true;
              _0x5f1623 = true;
              _0x794028();
              _0x3b6605();
              _0x4b07e4(_0x12c0e7);
              return;
            }
          } else {
            Rn(_0x14e80e, _0x12c0e7, _0x18b31d);
          }
        }
        if (_0x12c0e7.hasMeaningfulOutput) {
          _0x3b6605();
        }
        if (_0x12c0e7.isDone && !_0x44bd4c) {
          _0x5f1623 = true;
          _0x794028();
          _0x3b6605();
          _0x3d3c22(_0x12c0e7, _0x12c0e7.stopReason);
        }
      }
      _0x5ea95a();
      _0x381fb2.on("data", _0x5afd77 => {
        if (_0x4445dd) {
          _0x4445dd.mark("first_upstream_chunk", "bytes=" + Buffer.byteLength(_0x5afd77));
        }
        _0x5ea95a();
        _0x3a67e6 += _0x5afd77;
        let _0x4d1702 = _0x3a67e6.split("\n\n");
        _0x3a67e6 = _0x4d1702.pop();
        for (let _0x2a9e95 of _0x4d1702) {
          _0x551a55(_0x2a9e95);
          if (_0x44bd4c) {
            return;
          }
        }
      });
      _0x381fb2.on("end", () => {
        _0x5f1623 = true;
        _0x794028();
        _0x3b6605();
        if (!_0x44bd4c && (_0x3a67e6.trim() && _0x551a55(_0x3a67e6), !_0x44bd4c && (!!_0x12c0e7.isDone || !_0x12c0e7.hasErrorEvent() || !_0x15dbcc(_0x12c0e7.getStreamErrorHint())))) {
          if (!_0x12c0e7.isDone && !_0x3e4f85.writableEnded) {
            if (_0x12c0e7.hasMeaningfulOutput && !_0x12c0e7.stopReason) {
              S(_.UPSTREAM, "Anthropic 流被上游提前关闭（疑似截断），追加不完整提示");
              _0x14e80e.flushPendingText();
              _0x14e80e.safeWrite(ge(St(_0x346484, STREAM_TRUNCATED_NOTICE, 0)));
              _0x12c0e7.markIncomplete();
            } else {
              S(_.DETAIL, "Anthropic 流未收到 message_stop，强制结束");
            }
            let _0x4cefd4 = _0x12c0e7.processEvent({
              event: "message_stop",
              data: {}
            });
            let _0x36adcc = _0x44f2eb(_0x12c0e7, _0x4cefd4);
            _0x4cefd4 = _0x36adcc.chunks;
            Rn(_0x14e80e, _0x12c0e7, _0x4cefd4);
            if (_0x36adcc.continue) {
              _0x4b07e4(_0x12c0e7);
              return;
            }
          }
          _0x3d3c22(_0x12c0e7, _0x12c0e7.stopReason || "end");
        }
      });
      _0x381fb2.on("aborted", () => {
        _0x5f1623 = true;
        _0x794028();
        _0x3b6605();
        if (!_0x14e80e.wasClosedByClient()) {
          fe("Anthropic 流被中止");
          _0x14e80e.fail(re("上游流中断", "Anthropic 连接被意外终止"));
        }
      });
      _0x381fb2.on("error", _0x57123f => {
        _0x5f1623 = true;
        _0x794028();
        _0x3b6605();
        if (!_0x14e80e.wasClosedByClient()) {
          fe("Anthropic 流错误: " + _0x57123f.message);
          _0x14e80e.fail(re("上游流错误", _0x57123f.message));
        }
      });
    });
    _0x14edd5 = Xa(_0xc1a07a, _0x14e80e, Rd, "Anthropic");
    _0xc1a07a.on("error", _0x5b8c4a => {
      clearTimeout(_0x14edd5);
      if (_0x14e80e.wasClosedByClient() && (_0x5b8c4a.code === "ECONNRESET" || _0x5b8c4a.code === "ECONNABORTED") || _0x14e80e.wasFinalized()) {
        return;
      }
      if (_0x5b8c4a.code === "ECONNRESET" && !_0x14e80e.hasMeaningfulContent() && _0x55eeda < Ge) {
        let _0x43bfbe = mo(_0x55eeda);
        S(_.UPSTREAM, "Anthropic ECONNRESET 第 " + _0x55eeda + "/" + Ge + " 次，" + _0x43bfbe + "ms 后自动重连");
        setTimeout(() => {
          if (!_0x14e80e.wasClosedByClient() && !_0x14e80e.wasFinalized()) {
            _0x1f22af();
          }
        }, _0x43bfbe);
        return;
      }
      let _0x3fa5fb = ja(_0x5b8c4a, _0x108da3.host, _0x108da3.parsed.port);
      fe("Anthropic 请求失败（第 " + _0x55eeda + "/" + Ge + " 次）: " + _0x3fa5fb);
      _0x14e80e.fail(re("连接失败", _0x3fa5fb));
    });
    za(_0xc1a07a, _0x14e80e, _0x108da3.parsed.hostname, _0xb76843, _0x108da3.useHttp);
    _0xc1a07a.end(_0x5030b1);
    if (_0x4445dd) {
      _0x4445dd.mark("upstream_request_sent");
    }
  };
  _0x1f22af();
}
function df(_0x1a5453, _0x5eff91, {
  systemPrompt: _0x5e133a,
  messages: _0x156012,
  tools: _0x2048c3,
  toolChoice: _0x357c8c,
  resolvedModel: _0x5409c8,
  requestedModel: _0x1301a7,
  providerName: _0x163eda,
  serviceTier: _0x3527ad,
  messageId: _0x422b25,
  initiator: _0x3e67f0,
  timing: _0x239bad,
  monitorTargetId: _0x1bca0a,
  providerConfig: _0x2219b9,
  byokIdentityLine: _0x318a99 = "",
  injectDeclaredModelHint: _0x50d78 = false,
  userAskedAboutModel: _0x390f02 = false,
  contextSnapshot: _0x8daf37 = null,
  uiContextHint: _0x510db1 = null
}) {
  let _0x92c154 = (_0x2219b9 || Ue()).openai;
  let _0x26b8d0 = Wo(_0x92c154, {
    providerLabel: "OpenAI",
    providerName: _0x163eda,
    model: _0x5409c8,
    requestedModel: _0x1301a7
  });
  let _0x3c1b2d = Ya(_0x92c154.apiPath);
  let _0x2627a5 = _0x3c1b2d ? pf(_0x5e133a, _0x156012) : ff(_0x5e133a, _0x156012);
  let _0x33c8e4 = cf(_0x3e67f0, _0x2048c3);
  let _0xdb432e = _0x33c8e4 ? qa(_0x2048c3, _0x357c8c, "OpenAI") : undefined;
  let _0xbc60c7 = _0x3c1b2d ? {
    model: _0x5409c8,
    messages: _0x2627a5,
    stream: true
  } : {
    model: _0x5409c8,
    input: _0x2627a5,
    stream: true
  };
  let _0x57f3aa = wr();
  if (_0x57f3aa > 0) {
    if (_0x3c1b2d) {
      _0xbc60c7.max_tokens = _0x57f3aa;
    } else {
      _0xbc60c7.max_output_tokens = _0x57f3aa;
    }
  }
  if (!_0x3c1b2d && $d) {
    _0xbc60c7.reasoning = {
      effort: Nd,
      summary: wd
    };
  }
  if (_0x3527ad) {
    _0xbc60c7.service_tier = _0x3527ad;
  }
  if (_0x33c8e4) {
    _0xbc60c7.tools = _0x2048c3.map(_0x48235e => ({
      type: "function",
      ...(_0x3c1b2d ? {
        function: {
          name: _0x48235e.name,
          description: _0x48235e.description || "",
          parameters: typeof _0x48235e.input_schema == "string" ? JSON.parse(_0x48235e.input_schema) : _0x48235e.input_schema
        }
      } : {
        name: _0x48235e.name,
        description: _0x48235e.description || "",
        parameters: typeof _0x48235e.input_schema == "string" ? JSON.parse(_0x48235e.input_schema) : _0x48235e.input_schema
      })
    }));
    if (_0xdb432e) {
      if (_0xdb432e.type === "auto") {
        _0xbc60c7.tool_choice = "auto";
      } else if (_0xdb432e.type === "any") {
        _0xbc60c7.tool_choice = "required";
      } else if (_0xdb432e.type === "tool") {
        _0xbc60c7.tool_choice = _0x3c1b2d ? {
          type: "function",
          function: {
            name: _0xdb432e.name
          }
        } : {
          type: "function",
          name: _0xdb432e.name
        };
      }
    }
    S(_.TOOL, "启用 " + _0x2048c3.length + " 个 · initiator=" + (_0x3e67f0 || "unknown"));
  } else if (_0x2048c3 && _0x2048c3.length > 0) {
    S(_.TOOL, "用户轮次未启用 · 可用 " + _0x2048c3.length + " 个");
  }
  let _0x341786 = Fa({
    apiPayload: _0xbc60c7,
    systemPrompt: _0x5e133a,
    messageField: _0x3c1b2d ? "messages" : "input",
    systemInMessages: true,
    outputReserve: _0x57f3aa,
    contextLimit: _0x8daf37?.contextLimit
  });
  if (_0x8daf37) {
    Ar({
      ..._0x8daf37,
      tokensUsed: _0x341786.tokensUsed
    });
  }
  if (_0x510db1) {
    Ft({
      tokens: _0x341786.tokensUsed,
      limit: _0x341786.contextLimit || _0x510db1.slotTokenLimit,
      inboundTokens: _0x510db1.inboundTokens,
      restoredMsgs: _0x510db1.restoredMsgs,
      inboundMsgs: _0x510db1.inboundMsgs,
      reason: _0x510db1.reason,
      cascadeId: _0x510db1.cascadeId,
      sessionKey: _0x510db1.sessionKey
    });
  }
  let _0x3d2ce8 = JSON.stringify(_0xbc60c7);
  if (!_0x5eff91.headersSent) {
    _0x5eff91.writeHead(200, dt());
  }
  let _0x14d89c;
  let _0x119147 = Wa(_0x5eff91, () => _0x14d89c, "OpenAI", _0x422b25, _0x239bad, {
    host: _0x92c154.host,
    model: _0x5409c8,
    providerName: _0x163eda,
    injectDeclaredModelHint: _0x50d78,
    userAskedAboutModel: _0x390f02
  });
  let _0x5170bc = false;
  let _0x5a3ba8 = _0x49addd => {
    if (!_0x5170bc) {
      _0x5170bc = true;
      Fd("OpenAI", _0x49addd, _0x33c8e4 ? _0x2048c3 : []);
    }
  };
  let _0x2f0ac5 = _0x92c154.useHttp ? _0x309087 : _0x18e153;
  let _0x16d2b6 = _0x92c154.parsed.port !== 443 ? _0x92c154.parsed.port : _0x92c154.useHttp ? 80 : 443;
  let _0x40f1c0 = _0x92c154.apiKey ? _0x92c154.apiKey.slice(0, 6) + "..." + _0x92c154.apiKey.slice(-4) : "empty";
  S(_.UPSTREAM, "OpenAI " + (_0x92c154.useHttp ? "http" : "https") + "://" + _0x92c154.parsed.hostname + ":" + _0x16d2b6 + _0x92c154.apiPath + " · " + _0x5409c8 + " · key=" + _0x40f1c0);
  if (_0x239bad) {
    let _0x2685a9 = _0x33c8e4 && _0x2048c3 ? _0x2048c3.length : 0;
    _0x239bad.mark("upstream_request_start", "bytes=" + Buffer.byteLength(_0x3d2ce8) + " · tools=" + _0x2685a9 + " · msgs=" + _0x156012.length);
  }
  let _0x127578 = 0;
  if (_0x318a99) {
    _0x119147.enqueueText(_0x318a99 + "\n\n", 1);
    _0x119147.flushPendingText();
  }
  _0x119147.startHeartbeat();
  let _0x4641ca = (_0x9f1706, _0x18ba2a) => {
    if (_0x119147.wasClosedByClient() || _0x119147.wasFinalized() || _0x119147.hasMeaningfulContent() || _0x127578 >= Ge) {
      return false;
    }
    if (Ve(_0x9f1706, _0x18ba2a)) {
      S(_.QUOTA, "OpenAI " + yt + "，跳过重试", {
        err: true
      });
      return false;
    }
    if (!zo(_0x9f1706, _0x18ba2a)) {
      return false;
    }
    let _0x2bc438 = mo(_0x127578);
    S(_.UPSTREAM, "OpenAI 限流第 " + _0x127578 + "/" + Ge + " 次，" + _0x2bc438 + "ms 后自动重试");
    setTimeout(() => {
      if (!_0x119147.wasClosedByClient() && !_0x119147.wasFinalized()) {
        _0x259c4c();
      }
    }, _0x2bc438);
    return true;
  };
  let _0x259c4c = () => {
    _0x127578 += 1;
    let _0x3c08f6 = new ro(_0x422b25, _0x5409c8, _0x1bca0a, _0x33c8e4);
    if (_0x33c8e4 && _0x2048c3) {
      _0x3c08f6.setAllowedTools(_0x2048c3.map(_0x49ed50 => _0x49ed50.name));
    }
    let _0x5662a4;
    _0x14d89c = _0x2f0ac5.request({
      hostname: _0x92c154.parsed.hostname,
      port: _0x16d2b6,
      path: _0x92c154.apiPath,
      method: "POST",
      agent: _0x92c154.useHttp ? undefined : _0x127578 > 1 ? false : Ua,
      rejectUnauthorized: !_0x92c154.useHttp && _0x92c154.parsed.port === 443,
      headers: {
        "content-type": "application/json",
        accept: "text/event-stream",
        authorization: "Bearer " + _0x92c154.apiKey,
        "content-length": Buffer.byteLength(_0x3d2ce8),
        ...po(_0x5409c8, Buffer.byteLength(_0x3d2ce8))
      }
    }, _0x283367 => {
      clearTimeout(_0x5662a4);
      Va(_0x14d89c);
      if (_0x239bad) {
        _0x239bad.mark("upstream_headers", "status=" + _0x283367.statusCode);
      }
      let _0x21bbbf = "";
      if (_0x283367.statusCode !== 200) {
        _0x5a3ba8("HTTP " + _0x283367.statusCode + " before stream");
        fe("OpenAI HTTP " + _0x283367.statusCode);
        Xo(_0x283367, _0x2d1dda => {
          if (Ve(_0x2d1dda, _0x283367.statusCode)) {
            S(_.QUOTA, yt + " · OpenAI HTTP " + _0x283367.statusCode + " · " + ho(_0x2d1dda), {
              err: true
            });
          } else {
            fe("Body: " + ho(_0x2d1dda));
          }
          if (_0x4641ca(_0x2d1dda, _0x283367.statusCode)) {
            return;
          }
          let _0x475df2 = Qo("OpenAI", _0x283367.statusCode, _0x2d1dda, {
            ..._0x26b8d0,
            headers: _0x283367.headers || {}
          });
          _0x119147.fail(_0x475df2);
        });
        return;
      }
      let _0x39e8f9 = new _0x58f914("utf8");
      let _0x466df8 = false;
      let _0x4fa666 = null;
      let _0x510e20 = null;
      let _0x3cfb40 = () => {
        if (_0x510e20) {
          clearTimeout(_0x510e20);
          _0x510e20 = null;
        }
      };
      _0x510e20 = setTimeout(() => {
        if (!_0x466df8 && !_0x119147.wasClosedByClient() && !_0x119147.hasMeaningfulContent()) {
          fe("OpenAI 流 " + Ze + "ms 内无有效内容");
          _0x5a3ba8("no meaningful content after " + Ze + "ms");
          _0x119147.fail(re(Jn({
            host: _0x92c154.host,
            model: _0x5409c8,
            providerName: _0x163eda,
            timeoutSec: Math.round(Ze / 1000)
          })));
          _0x283367.destroy();
        }
      }, Ze);
      let _0x3ad216 = () => {
        if (_0x4fa666) {
          clearTimeout(_0x4fa666);
          _0x4fa666 = null;
        }
      };
      let _0x80157e = () => {
        _0x3ad216();
        _0x4fa666 = setTimeout(() => {
          if (!_0x466df8 && !_0x119147.wasClosedByClient()) {
            fe("OpenAI 流 " + fo + "ms 无新数据");
            _0x5a3ba8("stream idle timeout " + fo + "ms");
            _0x119147.fail(re("上游流式超时", Vo({
              providerLabel: "OpenAI 网关",
              host: _0x92c154.host,
              providerName: _0x163eda,
              timeoutSec: Math.round(fo / 1000)
            })));
            _0x283367.destroy();
          }
        }, fo);
      };
      function _0x44a49f(_0x3f73ef) {
        let _0x2315e8 = Ri(_0x3f73ef + "\n");
        for (let _0x35c789 of _0x2315e8) {
          let _0x518ff5 = _0x3c08f6.processEvent(_0x35c789);
          if (_0x239bad && _0x3c08f6.hasReasoningOutput) {
            _0x239bad.mark("first_reasoning_delta", "event=" + (_0x35c789.type || "done"));
          }
          if (_0x239bad && _0x3c08f6.hasVisibleTextOutput) {
            _0x239bad.mark("first_visible_text", "event=" + (_0x35c789.type || "done"));
          }
          if (_0x239bad && _0x3c08f6.isDone) {
            _0x239bad.mark("upstream_completed", "event=" + (_0x35c789.type || "done"));
          }
          Rn(_0x119147, _0x3c08f6, _0x518ff5);
        }
        if (_0x3c08f6.hasMeaningfulOutput) {
          _0x3cfb40();
        }
        if (_0x3c08f6.isDone) {
          _0x466df8 = true;
          _0x3ad216();
          _0x3cfb40();
          br(_0x119147, _0x3c08f6, "OpenAI", null, {
            model: _0x5409c8,
            stopReason: _0x3c08f6.stopReason
          });
        }
      }
      _0x80157e();
      _0x283367.on("data", _0x3848a2 => {
        if (_0x239bad) {
          _0x239bad.mark("first_upstream_chunk", "bytes=" + Buffer.byteLength(_0x3848a2));
        }
        _0x80157e();
        _0x21bbbf += _0x39e8f9.write(_0x3848a2);
        let _0x1ff813 = _0x21bbbf.split("\n\n");
        _0x21bbbf = _0x1ff813.pop();
        for (let _0x43d7df of _0x1ff813) {
          _0x44a49f(_0x43d7df);
        }
      });
      _0x283367.on("end", () => {
        _0x466df8 = true;
        _0x3ad216();
        _0x3cfb40();
        _0x21bbbf += _0x39e8f9.end();
        if (_0x21bbbf.trim()) {
          _0x44a49f(_0x21bbbf);
        }
        if (!!_0x3c08f6.isDone || !_0x3c08f6.hasErrorEvent() || !_0x4641ca(_0x3c08f6.getStreamErrorHint())) {
          if (_0x239bad) {
            _0x239bad.mark("upstream_eof", "attempt=" + _0x127578);
          }
          if (!_0x3c08f6.isDone && !_0x5eff91.writableEnded) {
            if (_0x3c08f6.hasMeaningfulOutput && !_0x3c08f6.stopReason) {
              S(_.UPSTREAM, "OpenAI 流被上游提前关闭（疑似截断），追加不完整提示");
              _0x119147.flushPendingText();
              _0x119147.safeWrite(ge(St(_0x422b25, STREAM_TRUNCATED_NOTICE, 0)));
              _0x3c08f6.markIncomplete();
            } else if (_0x3c08f6.stopReason) {
              S(_.DETAIL, "OpenAI 流 EOF，已补结束帧 · stop=" + _0x3c08f6.stopReason);
            } else {
              S(_.DETAIL, _0x3c1b2d ? "OpenAI ChatCompletions 流 EOF，未收到 [DONE]，已补结束帧" : "OpenAI Responses 流 EOF，未收到 response.completed，已补结束帧");
            }
            Rn(_0x119147, _0x3c08f6, _0x3c08f6.processEvent({
              done: true,
              type: "done",
              data: null
            }));
          }
          br(_0x119147, _0x3c08f6, "OpenAI", null, {
            model: _0x5409c8,
            stopReason: _0x3c08f6.stopReason || "end"
          });
        }
      });
      _0x283367.on("aborted", () => {
        _0x466df8 = true;
        _0x3ad216();
        _0x3cfb40();
        if (!_0x119147.wasClosedByClient()) {
          fe("OpenAI 流被中止");
          _0x5a3ba8("stream aborted before completion");
          _0x119147.fail(re("上游流中断", "OpenAI 连接被意外终止"));
        }
      });
      _0x283367.on("error", _0x2b1c36 => {
        _0x466df8 = true;
        _0x3ad216();
        _0x3cfb40();
        if (!_0x119147.wasClosedByClient()) {
          fe("OpenAI 流错误: " + _0x2b1c36.message);
          _0x5a3ba8("stream error: " + _0x2b1c36.message);
          _0x119147.fail(re("上游流错误", _0x2b1c36.message));
        }
      });
    });
    _0x5662a4 = Xa(_0x14d89c, _0x119147, bd, "OpenAI");
    _0x14d89c.on("error", _0xddfd18 => {
      clearTimeout(_0x5662a4);
      if (_0x119147.wasClosedByClient() && (_0xddfd18.code === "ECONNRESET" || _0xddfd18.code === "ECONNABORTED") || _0x119147.wasFinalized()) {
        return;
      }
      if (_0xddfd18.code === "ECONNRESET" && !_0x119147.hasMeaningfulContent() && _0x127578 < Ge) {
        let _0x59ac87 = mo(_0x127578);
        S(_.UPSTREAM, "OpenAI ECONNRESET 第 " + _0x127578 + "/" + Ge + " 次，" + _0x59ac87 + "ms 后自动重连");
        setTimeout(() => {
          if (!_0x119147.wasClosedByClient() && !_0x119147.wasFinalized()) {
            _0x259c4c();
          }
        }, _0x59ac87);
        return;
      }
      let _0x4d24f7 = ja(_0xddfd18, _0x92c154.host, _0x92c154.parsed.port);
      fe("OpenAI 请求失败（第 " + _0x127578 + "/" + Ge + " 次）: " + _0x4d24f7);
      _0x5a3ba8("request error: " + (_0xddfd18.message || _0xddfd18.code || "unknown"));
      _0x119147.fail(re("连接失败", _0x4d24f7));
    });
    za(_0x14d89c, _0x119147, _0x92c154.parsed.hostname, _0x16d2b6, _0x92c154.useHttp);
    _0x14d89c.end(_0x3d2ce8);
    if (_0x239bad) {
      _0x239bad.mark("upstream_request_sent");
    }
  };
  _0x259c4c();
}
function ff(_0x2e5680, _0x3824be) {
  let _0xcae419 = [];
  if (_0x2e5680) {
    _0xcae419.push({
      role: "developer",
      content: _0x2e5680
    });
  }
  for (let _0x1f7b2c of _0x3824be) {
    if (typeof _0x1f7b2c.content == "string") {
      _0xcae419.push({
        role: _0x1f7b2c.role,
        content: _0x1f7b2c.content
      });
      continue;
    }
    if (!Array.isArray(_0x1f7b2c.content)) {
      _0xcae419.push({
        role: _0x1f7b2c.role,
        content: String(_0x1f7b2c.content)
      });
      continue;
    }
    if (_0x1f7b2c.role === "assistant") {
      let _0x3bfa94 = "";
      for (let _0x5bd57e of _0x1f7b2c.content) {
        if (_0x5bd57e.type === "text") {
          _0x3bfa94 += _0x5bd57e.text;
        }
      }
      if (_0x3bfa94) {
        _0xcae419.push({
          role: "assistant",
          content: _0x3bfa94
        });
      }
      for (let _0xb8309f of _0x1f7b2c.content) {
        if (_0xb8309f.type === "tool_use") {
          _0xcae419.push({
            type: "function_call",
            call_id: _0xb8309f.id,
            name: _0xb8309f.name,
            arguments: typeof _0xb8309f.input == "string" ? _0xb8309f.input : JSON.stringify(_0xb8309f.input)
          });
        }
      }
    } else if (_0x1f7b2c.role === "user") {
      let _0x28b8a2 = [];
      for (let _0xe9dfa of _0x1f7b2c.content) {
        if (_0xe9dfa.type === "text") {
          _0x28b8a2.push(_0xe9dfa.text);
        } else if (_0xe9dfa.type === "image") {
          _0x28b8a2.push({
            type: "input_image",
            image_url: "data:" + (_0xe9dfa.source?.media_type || "image/png") + ";base64," + (_0xe9dfa.source?.data || "")
          });
        } else if (_0xe9dfa.type === "tool_result") {
          _0xcae419.push({
            type: "function_call_output",
            call_id: _0xe9dfa.tool_use_id,
            output: typeof _0xe9dfa.content == "string" ? _0xe9dfa.content : JSON.stringify(_0xe9dfa.content)
          });
        }
      }
      if (_0x28b8a2.length > 0) {
        if (_0x28b8a2.some(_0x4b363a => typeof _0x4b363a != "string")) {
          _0xcae419.push({
            role: "user",
            content: _0x28b8a2.map(_0x4d0aa3 => typeof _0x4d0aa3 == "string" ? {
              type: "input_text",
              text: _0x4d0aa3
            } : _0x4d0aa3)
          });
        } else {
          _0xcae419.push({
            role: "user",
            content: _0x28b8a2.join("\n")
          });
        }
      }
    }
  }
  return _0xcae419;
}
function pf(_0x34df94, _0x2b2161) {
  let _0x82c3a3 = [];
  if (_0x34df94) {
    _0x82c3a3.push({
      role: "system",
      content: _0x34df94
    });
  }
  for (let _0x2133f1 of _0x2b2161) {
    if (typeof _0x2133f1.content == "string") {
      _0x82c3a3.push({
        role: _0x2133f1.role,
        content: _0x2133f1.content
      });
      continue;
    }
    if (!Array.isArray(_0x2133f1.content)) {
      _0x82c3a3.push({
        role: _0x2133f1.role,
        content: String(_0x2133f1.content)
      });
      continue;
    }
    if (_0x2133f1.role === "assistant") {
      let _0x566f8f = "";
      let _0x1ea9cf = [];
      for (let _0x55ddf3 of _0x2133f1.content) {
        if (_0x55ddf3.type === "text") {
          _0x566f8f += _0x55ddf3.text;
        } else if (_0x55ddf3.type === "tool_use") {
          _0x1ea9cf.push({
            id: _0x55ddf3.id,
            type: "function",
            function: {
              name: _0x55ddf3.name,
              arguments: typeof _0x55ddf3.input == "string" ? _0x55ddf3.input : JSON.stringify(_0x55ddf3.input ?? {})
            }
          });
        }
      }
      let _0x1013fc = {
        role: "assistant",
        content: _0x566f8f || null
      };
      if (_0x1ea9cf.length > 0) {
        _0x1013fc.tool_calls = _0x1ea9cf;
      }
      _0x82c3a3.push(_0x1013fc);
      continue;
    }
    if (_0x2133f1.role === "user") {
      let _0x5ad841 = [];
      for (let _0x1927ba of _0x2133f1.content) {
        if (_0x1927ba.type === "text") {
          _0x5ad841.push(_0x1927ba.text);
        } else if (_0x1927ba.type === "image") {
          _0x5ad841.push({
            type: "image_url",
            image_url: {
              url: "data:" + (_0x1927ba.source?.media_type || "image/png") + ";base64," + (_0x1927ba.source?.data || "")
            }
          });
        } else if (_0x1927ba.type === "tool_result") {
          _0x82c3a3.push({
            role: "tool",
            tool_call_id: _0x1927ba.tool_use_id,
            content: typeof _0x1927ba.content == "string" ? _0x1927ba.content : JSON.stringify(_0x1927ba.content)
          });
        }
      }
      if (_0x5ad841.length > 0) {
        let _0x34dd87 = _0x5ad841.some(_0x39cb1c => typeof _0x39cb1c != "string");
        _0x82c3a3.push({
          role: "user",
          content: _0x34dd87 ? _0x5ad841.map(_0x2fa654 => typeof _0x2fa654 == "string" ? {
            type: "text",
            text: _0x2fa654
          } : _0x2fa654) : _0x5ad841.join("\n")
        });
      }
    }
  }
  return _0x82c3a3;
}
import _0x2bf79 from "node:https";
import _0x243fcb from "node:http";
import _0x206510 from "node:crypto";
import { URL as _0x402223 } from "node:url";
var Br = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
var mf = 10000;
var gf = /(?:^|\.)(?:baidu|so\.com|sogou|csdn|zhihu|jianshu|juejin|cnblogs|oschina|segmentfault|toutiao|weixin\.qq|qq\.com|163\.com|sina\.com|bilibili|douyin|xiaohongshu|gitee|aliyun|tencent|huawei|jd\.com|taobao|tmall|cnki|wanfang|cursor\.ac\.cn|chatgpt-chinese)\./i;
function Dr(_0x5b0b1, {
  method: _0x1b504f = "GET",
  body: _0x18ccc6 = null,
  headers: _0x3b38fb = {},
  timeoutMs: _0xd1e5ea = mf
} = {}) {
  return new Promise((_0x3c59e0, _0x40562f) => {
    let _0xf5fda7;
    try {
      _0xf5fda7 = new _0x402223(_0x5b0b1);
    } catch (_0x43c8cd) {
      return _0x40562f(_0x43c8cd);
    }
    let _0x394ce7 = (_0xf5fda7.protocol === "https:" ? _0x2bf79 : _0x243fcb).request({
      hostname: _0xf5fda7.hostname,
      port: _0xf5fda7.port || (_0xf5fda7.protocol === "https:" ? 443 : 80),
      path: _0xf5fda7.pathname + _0xf5fda7.search,
      method: _0x1b504f,
      headers: {
        "user-agent": Br,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": _0x3b38fb["accept-language"] || "en-US,en;q=0.9,zh-CN;q=0.8",
        ..._0x3b38fb,
        ...(_0x18ccc6 ? {
          "content-length": Buffer.byteLength(_0x18ccc6)
        } : {})
      }
    }, _0x280188 => {
      if (_0x280188.statusCode >= 300 && _0x280188.statusCode < 400 && _0x280188.headers.location) {
        let _0x235a29 = new _0x402223(_0x280188.headers.location, _0x5b0b1).toString();
        _0x280188.resume();
        return Dr(_0x235a29, {
          method: "GET",
          headers: _0x3b38fb,
          timeoutMs: _0xd1e5ea
        }).then(_0x3c59e0, _0x40562f);
      }
      let _0xd78468 = "";
      _0x280188.setEncoding("utf8");
      _0x280188.on("data", _0x3776dc => {
        _0xd78468 += _0x3776dc;
      });
      _0x280188.on("end", () => _0x3c59e0({
        status: _0x280188.statusCode || 0,
        body: _0xd78468
      }));
    });
    _0x394ce7.on("error", _0x40562f);
    _0x394ce7.setTimeout(_0xd1e5ea, () => {
      _0x394ce7.destroy();
      _0x40562f(new Error("timeout " + _0xd1e5ea + "ms"));
    });
    if (_0x18ccc6) {
      _0x394ce7.write(_0x18ccc6);
    }
    _0x394ce7.end();
  });
}
function Ja(_0x4b3656) {
  return String(_0x4b3656 || "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
function _f(_0x121496) {
  try {
    return "https://www.google.com/s2/favicons?domain=" + new _0x402223(_0x121496).hostname + "&sz=32";
  } catch {
    return "";
  }
}
function Tf(_0x4d4958) {
  try {
    let _0x29ca65 = new _0x402223(_0x4d4958).hostname.toLowerCase();
    return !_0x29ca65.endsWith(".cn") && !gf.test(_0x29ca65);
  } catch {
    return false;
  }
}
function vr(_0x14580d, _0x57a630, _0x42d7fa) {
  if (!_0x57a630 || !_0x14580d || !/^https?:\/\//i.test(_0x57a630) || !_o(_0x57a630)) {
    return null;
  } else {
    return {
      title: Ja(_0x14580d).slice(0, 300),
      url: _0x57a630,
      snippet: Ja(_0x42d7fa).slice(0, 500),
      faviconUrl: _f(_0x57a630),
      foreign: Tf(_0x57a630)
    };
  }
}
function Qa(_0x221e55, _0x4b6efd = "https://cn.bing.com") {
  try {
    let _0x11fc9c = new _0x402223(_0x221e55, _0x4b6efd);
    if (!/bing\.com$/i.test(_0x11fc9c.hostname) && !/\.bing\.com$/i.test(_0x11fc9c.hostname) || !_0x11fc9c.pathname.includes("/ck/")) {
      return _0x11fc9c.toString();
    }
    let _0x2a9405 = _0x11fc9c.searchParams.get("u") || "";
    if (!_0x2a9405.startsWith("a1")) {
      return _0x11fc9c.toString();
    }
    let _0x7b4c30 = _0x2a9405.slice(2).replace(/-/g, "+").replace(/_/g, "/");
    while (_0x7b4c30.length % 4) {
      _0x7b4c30 += "=";
    }
    let _0x2fb65e = Buffer.from(_0x7b4c30, "base64").toString("utf8");
    if (/^https?:\/\//i.test(_0x2fb65e)) {
      return _0x2fb65e;
    } else {
      return _0x11fc9c.toString();
    }
  } catch {
    return _0x221e55;
  }
}
function Sf(_0xbe9766, _0x8a4594, _0x228abf) {
  let _0x1495fe = [];
  let _0x5780e0 = new Set();
  let _0x16a5ed = /<li[^>]*class="[^"]*\bb_algo\b[^"]*"[^>]*>([\s\S]*?)<\/li>/gi;
  let _0x48197a;
  while ((_0x48197a = _0x16a5ed.exec(_0xbe9766)) !== null && _0x1495fe.length < _0x8a4594) {
    let _0x54b99b = _0x48197a[1];
    let _0x365b82 = _0x54b99b.match(/<h2[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i) || _0x54b99b.match(/<a[^>]+href="([^"]+)"[^>]*class="[^"]*tilk[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
    if (!_0x365b82) {
      continue;
    }
    let _0x35c44e = Qa(_0x365b82[1].replace(/&amp;/g, "&"), "https://" + _0x228abf);
    let _0x330ad9 = _0x54b99b.match(/<p[^>]*>([\s\S]*?)<\/p>/i) || _0x54b99b.match(/class="b_caption"[^>]*>([\s\S]*?)(?:<\/div>|<cite)/i);
    let _0x13c165 = vr(_0x365b82[2], _0x35c44e, _0x330ad9 ? _0x330ad9[1] : "");
    if (!_0x13c165) {
      continue;
    }
    let _0x5ecefa = _0x13c165.url.replace(/#.*$/, "").toLowerCase();
    if (!_0x5780e0.has(_0x5ecefa)) {
      _0x5780e0.add(_0x5ecefa);
      _0x1495fe.push(_0x13c165);
    }
  }
  if (_0x1495fe.length === 0) {
    let _0x1a4e73 = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    let _0x5aebb9;
    while ((_0x5aebb9 = _0x1a4e73.exec(_0xbe9766)) !== null && _0x1495fe.length < _0x8a4594) {
      let _0x4e5128 = Qa(_0x5aebb9[1].replace(/&amp;/g, "&"), "https://" + _0x228abf);
      if (/bing\.com|microsoft\.com|live\.com|msn\.com/i.test(_0x4e5128)) {
        continue;
      }
      let _0x4fe304 = vr(_0x5aebb9[2], _0x4e5128, "");
      if (!_0x4fe304) {
        continue;
      }
      let _0x3abc2c = _0x4fe304.url.replace(/#.*$/, "").toLowerCase();
      if (!_0x5780e0.has(_0x3abc2c)) {
        _0x5780e0.add(_0x3abc2c);
        _0x1495fe.push(_0x4fe304);
      }
    }
  }
  return _0x1495fe;
}
function yf(_0x2bd34a, _0x48c37b) {
  let _0x1c50f7 = [];
  let _0x38d809 = new Set();
  let _0x4ead66 = /<div[^>]*(?:class="[^"]*\bresult\b[^"]*"|tpl="[^"]*")[^>]*>([\s\S]*?)(?=<div[^>]*(?:class="[^"]*\bresult\b|id="\d+")|$)/gi;
  let _0x193b2b = [];
  let _0x4e8360;
  while ((_0x4e8360 = _0x4ead66.exec(_0x2bd34a)) !== null) {
    _0x193b2b.push(_0x4e8360[1]);
  }
  for (let _0x437246 of _0x193b2b.length ? _0x193b2b : [_0x2bd34a]) {
    if (_0x1c50f7.length >= _0x48c37b) {
      break;
    }
    let _0x1bcbe9 = _0x437246.match(/<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
    if (!_0x1bcbe9) {
      continue;
    }
    let _0x5a989d = _0x1bcbe9[1].replace(/&amp;/g, "&");
    if (/baidu\.com\/(s\?|baidu\.php)/i.test(_0x5a989d)) {
      continue;
    }
    let _0x556c95 = vr(_0x1bcbe9[2], _0x5a989d, "");
    if (!_0x556c95) {
      continue;
    }
    let _0x54fee6 = _0x556c95.url.replace(/#.*$/, "").toLowerCase();
    if (!_0x38d809.has(_0x54fee6)) {
      _0x38d809.add(_0x54fee6);
      _0x1c50f7.push(_0x556c95);
    }
  }
  return _0x1c50f7;
}
async function Za(_0xc91b86, _0x259f79, {
  intl: _0x20a9c8 = true
} = {}) {
  let _0x4c3245 = "cn.bing.com";
  let _0x520caa = _0x20a9c8 ? "q=" + encodeURIComponent(_0xc91b86) + "&setlang=en-us&cc=us&ensearch=1" : "q=" + encodeURIComponent(_0xc91b86) + "&setlang=zh-cn&cc=cn";
  let {
    status: _0x3cd1aa,
    body: _0x69bab1
  } = await Dr("https://" + _0x4c3245 + "/search?" + _0x520caa, {
    headers: {
      "accept-language": _0x20a9c8 ? "en-US,en;q=0.9" : "zh-CN,zh;q=0.9,en;q=0.5"
    }
  });
  if (_0x3cd1aa < 200 || _0x3cd1aa >= 400) {
    throw new Error("Bing HTTP " + _0x3cd1aa);
  }
  return Sf(_0x69bab1, _0x259f79, _0x4c3245);
}
async function Ef(_0xe624ca, _0xa27d6) {
  let _0x3a7b6e = "https://www.baidu.com/s?wd=" + encodeURIComponent(_0xe624ca) + "&rn=" + Math.min(_0xa27d6, 10);
  let {
    status: _0x3d9e45,
    body: _0x1e1a27
  } = await Dr(_0x3a7b6e, {
    headers: {
      "accept-language": "zh-CN,zh;q=0.9"
    }
  });
  if (_0x3d9e45 < 200 || _0x3d9e45 >= 400) {
    throw new Error("Baidu HTTP " + _0x3d9e45);
  }
  return yf(_0x1e1a27, _0xa27d6);
}
function Of(_0x8ab368, _0xab4bb8, _0x104bad) {
  let _0x268456 = new Set();
  let _0x5ada15 = [];
  let _0x194e60 = (_0x410ba8, _0xb2988) => {
    for (let _0x4340e4 of _0x410ba8 || []) {
      if (_0x5ada15.length >= _0x104bad) {
        return;
      }
      if (_0xb2988 && !_0x4340e4.foreign) {
        continue;
      }
      let _0x31f718 = String(_0x4340e4.url || "").replace(/#.*$/, "").toLowerCase();
      if (!!_0x31f718 && !_0x268456.has(_0x31f718)) {
        _0x268456.add(_0x31f718);
        _0x5ada15.push(_0x4340e4);
      }
    }
  };
  _0x194e60(_0x8ab368, true);
  _0x194e60(_0xab4bb8, true);
  _0x194e60(_0x8ab368, false);
  _0x194e60(_0xab4bb8, false);
  return _0x5ada15;
}
async function xf(_0xdbdfe9, _0x1280bb = 8) {
  let _0xd732e1 = [];
  let _0x162e06 = [];
  try {
    _0xd732e1 = await Za(_0xdbdfe9, _0x1280bb, {
      intl: true
    });
    console.log("  WebSearch: foreign Bing → " + _0xd732e1.length + " (foreign=" + _0xd732e1.filter(_0x46c43a => _0x46c43a.foreign).length + ")");
  } catch (_0x1358cc) {
    console.error("  ❌ WebSearch foreign Bing: " + _0x1358cc.message);
  }
  let _0x4709dc = _0xd732e1.filter(_0x14c948 => _0x14c948.foreign).length;
  try {
    _0x162e06 = await Za(_0xdbdfe9, _0x1280bb, {
      intl: false
    });
    console.log("  WebSearch: domestic Bing → " + _0x162e06.length);
  } catch (_0x190e79) {
    console.error("  ❌ WebSearch domestic Bing: " + _0x190e79.message);
    try {
      _0x162e06 = await Ef(_0xdbdfe9, _0x1280bb);
      console.log("  WebSearch: domestic Baidu → " + _0x162e06.length);
    } catch (_0x4f296d) {
      console.error("  ❌ WebSearch domestic Baidu: " + _0x4f296d.message);
    }
  }
  if (_0xd732e1.length === 0 && _0x162e06.length === 0) {
    throw new Error("all search backends failed or empty");
  }
  let _0x5b5200 = Of(_0xd732e1, _0x162e06, _0x1280bb);
  console.log("  WebSearch: merged " + _0x5b5200.length + " (foreignHits=" + _0x4709dc + "+)");
  return _0x5b5200;
}
function tc(_0x31a9ec, _0x4171e8 = 5) {
  return new Promise(_0x1dba15 => {
    if (_0x4171e8 <= 0 || !_o(_0x31a9ec)) {
      return _0x1dba15(_0x31a9ec);
    }
    let _0x1f8dca = new _0x402223(_0x31a9ec);
    let _0x2e4d00 = (_0x1f8dca.protocol === "https:" ? _0x2bf79 : _0x243fcb).request({
      hostname: _0x1f8dca.hostname,
      port: _0x1f8dca.port || (_0x1f8dca.protocol === "https:" ? 443 : 80),
      path: _0x1f8dca.pathname + _0x1f8dca.search,
      method: "HEAD",
      headers: {
        "user-agent": Br
      }
    }, _0x37c8ef => {
      _0x37c8ef.resume();
      if (_0x37c8ef.statusCode >= 300 && _0x37c8ef.statusCode < 400 && _0x37c8ef.headers.location) {
        let _0x2b0a84 = new _0x402223(_0x37c8ef.headers.location, _0x31a9ec).toString();
        tc(_0x2b0a84, _0x4171e8 - 1).then(_0x1dba15);
      } else {
        _0x1dba15(_0x31a9ec);
      }
    });
    _0x2e4d00.on("error", () => _0x1dba15(_0x31a9ec));
    _0x2e4d00.setTimeout(5000, () => {
      _0x2e4d00.destroy();
      _0x1dba15(_0x31a9ec);
    });
    _0x2e4d00.end();
  });
}
function _o(_0x2ed152) {
  try {
    let _0x53e391 = new _0x402223(_0x2ed152);
    if (_0x53e391.protocol !== "http:" && _0x53e391.protocol !== "https:") {
      return false;
    }
    let _0x5bfec1 = _0x53e391.hostname.toLowerCase();
    return _0x5bfec1 !== "localhost" && _0x5bfec1 !== "127.0.0.1" && _0x5bfec1 !== "::1" && _0x5bfec1 !== "0.0.0.0" && !/^0\./.test(_0x5bfec1) && !/^10\./.test(_0x5bfec1) && !/^172\.(1[6-9]|2\d|3[01])\./.test(_0x5bfec1) && !/^192\.168\./.test(_0x5bfec1) && !/^169\.254\./.test(_0x5bfec1) && !/^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(_0x5bfec1) && !/^fc00:/i.test(_0x5bfec1) && !/^fe80:/i.test(_0x5bfec1) && !/^fd/i.test(_0x5bfec1) && _0x5bfec1 !== "[::1]" && _0x5bfec1 !== "[::]" && !_0x5bfec1.endsWith(".local") && !_0x5bfec1.endsWith(".internal") && !_0x5bfec1.endsWith(".localhost") && _0x5bfec1 !== "metadata.google.internal" && _0x5bfec1 !== "169.254.169.254" && (!_0x53e391.port || !["22", "23", "25", "3306", "5432", "6379", "27017"].includes(_0x53e391.port));
  } catch {
    return false;
  }
}
function nc(_0x49aac1, _0x1fb47c = 50000) {
  return new Promise((_0x4661db, _0x3d414c) => {
    if (!_o(_0x49aac1)) {
      return _0x3d414c(new Error("Blocked URL (private/internal): " + _0x49aac1));
    }
    let _0x4ab945 = new _0x402223(_0x49aac1);
    let _0x5adcc6 = (_0x4ab945.protocol === "https:" ? _0x2bf79 : _0x243fcb).request({
      hostname: _0x4ab945.hostname,
      port: _0x4ab945.port || (_0x4ab945.protocol === "https:" ? 443 : 80),
      path: _0x4ab945.pathname + _0x4ab945.search,
      method: "GET",
      headers: {
        "user-agent": Br,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    }, _0x130f79 => {
      if (_0x130f79.statusCode >= 300 && _0x130f79.statusCode < 400 && _0x130f79.headers.location) {
        let _0x41f49e = new _0x402223(_0x130f79.headers.location, _0x49aac1).toString();
        _0x130f79.resume();
        if (_o(_0x41f49e)) {
          return nc(_0x41f49e, _0x1fb47c).then(_0x4661db, _0x3d414c);
        } else {
          return _0x3d414c(new Error("Redirect to private/internal URL blocked: " + _0x41f49e));
        }
      }
      let _0x457515 = "";
      let _0x50b385 = 0;
      _0x130f79.setEncoding("utf8");
      _0x130f79.on("data", _0x2bbebb => {
        _0x50b385 += Buffer.byteLength(_0x2bbebb);
        if (_0x50b385 <= _0x1fb47c) {
          _0x457515 += _0x2bbebb;
        }
      });
      _0x130f79.on("end", () => {
        _0x4661db(_0x457515.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#x27;/g, "'").replace(/\s+/g, " ").trim().slice(0, 30000));
      });
    });
    _0x5adcc6.on("error", _0x3d414c);
    _0x5adcc6.setTimeout(15000, () => {
      _0x5adcc6.destroy();
      _0x3d414c(new Error("Fetch timeout"));
    });
    _0x5adcc6.end();
  });
}
function If(_0x2e6bd3) {
  return Buffer.concat([te(1, _0x2e6bd3.identifier || _0x206510.randomUUID()), te(2, _0x2e6bd3.content || _0x2e6bd3.snippet || ""), te(3, _0x2e6bd3.url), te(4, _0x2e6bd3.title), te(7, _0x2e6bd3.snippet || "")]);
}
function Af(_0x2cd20f, _0x1955d7) {
  let _0x19c342 = _0x2cd20f.map(_0x398599 => Ie(1, If(_0x398599)));
  _0x19c342.push(te(2, "https://cn.bing.com/search?q=" + encodeURIComponent(_0x1955d7) + "&setlang=en-us&cc=us"));
  return Buffer.concat(_0x19c342);
}
function ec(_0x90558) {
  return te(1, _0x90558);
}
function tn(_0x1a9f90, _0x67db42, _0x775f2e) {
  let _0x219850 = vt(_0x775f2e);
  _0x67db42.writeHead(200, {
    ...Pt(),
    "content-length": _0x219850.length
  });
  _0x67db42.end(_0x219850);
}
function oc(_0x234609, _0x2a7a39, _0x1f8277) {
  let _0x543480 = _0x234609.headers;
  console.log("  WebSearch headers: accept-enc=\"" + (_0x543480["accept-encoding"] || "") + "\" connect-accept-enc=\"" + (_0x543480["connect-accept-encoding"] || "") + "\" content-enc=\"" + (_0x543480["content-encoding"] || "") + "\"");
  let _0x5e9c77 = "";
  if (_0x1f8277 && _0x1f8277.length > 0) {
    try {
      let _0x1318e5 = ve(_0x1f8277, _0x543480);
      let _0x417df4 = V(_0x1318e5);
      let _0x5d2977 = j(_0x417df4, 2, 2);
      if (_0x5d2977) {
        _0x5e9c77 = _0x5d2977.value.toString("utf8");
      }
    } catch (_0x5c06f6) {
      console.log("  WebSearch parse error: " + _0x5c06f6.message);
    }
  }
  if (!_0x5e9c77) {
    console.log("  WebSearch: empty query");
    return tn(_0x234609, _0x2a7a39, Buffer.alloc(0));
  }
  console.log("  WebSearch: \"" + _0x5e9c77 + "\"");
  xf(_0x5e9c77).then(async _0x53da6a => {
    let _0x5c6198 = _0x53da6a.filter(_0x3a9aef => _0x3a9aef.foreign).length;
    console.log("  WebSearch: " + _0x53da6a.length + " results for \"" + _0x5e9c77 + "\" (foreign=" + _0x5c6198 + ")");
    await Promise.allSettled(_0x53da6a.slice(0, 5).map(_0x33b1bc => nc(_0x33b1bc.url).then(_0x4a0e42 => {
      _0x33b1bc.content = _0x4a0e42;
    }).catch(() => {})));
    let _0x4e9579 = Af(_0x53da6a, _0x5e9c77);
    console.log("  WebSearch response: " + _0x4e9579.length + "b, " + _0x53da6a.length + " results");
    tn(_0x234609, _0x2a7a39, _0x4e9579);
  }).catch(_0x2c3883 => {
    console.error("  ❌ WebSearch error: " + _0x2c3883.message);
    tn(_0x234609, _0x2a7a39, Buffer.alloc(0));
  });
}
function rc(_0x3a9610, _0x165bdc, _0x3559b6) {
  let _0x46a023 = "";
  if (_0x3559b6 && _0x3559b6.length > 0) {
    try {
      let _0x24b5eb = ve(_0x3559b6, _0x3a9610.headers);
      let _0x442cc1 = V(_0x24b5eb);
      let _0x30bfe2 = j(_0x442cc1, 1, 2);
      if (_0x30bfe2) {
        _0x46a023 = _0x30bfe2.value.toString("utf8");
      }
    } catch (_0x5de391) {
      console.log("  WebRedirect parse error: " + _0x5de391.message);
    }
  }
  if (!_0x46a023) {
    console.log("  WebRedirect: empty URL");
    return tn(_0x3a9610, _0x165bdc, Buffer.alloc(0));
  }
  console.log("  WebRedirect: " + _0x46a023);
  tc(_0x46a023).then(_0x1d3d8b => {
    console.log("  WebRedirect: " + _0x46a023 + " → " + _0x1d3d8b);
    tn(_0x3a9610, _0x165bdc, ec(_0x1d3d8b));
  }).catch(_0x3ede3d => {
    console.error("  ❌ WebRedirect error: " + _0x3ede3d.message);
    tn(_0x3a9610, _0x165bdc, ec(_0x46a023));
  });
}
import _0x229715 from "node:crypto";
import _0x3907c1 from "node:https";
var cc = process.env.VOYAGE_API_KEY || "";
var kf = "voyage-3-lite";
var To = 512;
var Ur = 128;
function ic(_0x73471f, _0x5d1066 = "document") {
  return new Promise((_0x2eef7a, _0x2c1d9d) => {
    let _0x377baa = JSON.stringify({
      model: kf,
      input: _0x73471f,
      input_type: _0x5d1066
    });
    let _0x45afb3 = _0x3907c1.request({
      hostname: "api.voyageai.com",
      path: "/v1/embeddings",
      method: "POST",
      headers: {
        Authorization: "Bearer " + cc,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(_0x377baa)
      }
    }, _0x4eef59 => {
      let _0xbc2df0 = [];
      _0x4eef59.on("data", _0x1324ef => _0xbc2df0.push(_0x1324ef));
      _0x4eef59.on("end", () => {
        try {
          let _0x14de19 = Buffer.concat(_0xbc2df0).toString();
          let _0x4b0c86 = JSON.parse(_0x14de19);
          if (_0x4b0c86.data) {
            let _0x3c1907 = _0x4b0c86.data.sort((_0x2e266c, _0x3f1ca9) => _0x2e266c.index - _0x3f1ca9.index);
            _0x2eef7a(_0x3c1907.map(_0x271234 => new Float32Array(_0x271234.embedding)));
          } else {
            _0x2c1d9d(new Error(_0x4b0c86.detail || _0x4b0c86.error?.message || "Unknown Voyage error"));
          }
        } catch (_0x360006) {
          _0x2c1d9d(_0x360006);
        }
      });
    });
    _0x45afb3.on("error", _0x2c1d9d);
    _0x45afb3.setTimeout(30000, () => {
      _0x45afb3.destroy();
      _0x2c1d9d(new Error("Voyage timeout"));
    });
    _0x45afb3.end(_0x377baa);
  });
}
async function Hr(_0x106c56, _0x159214 = 1) {
  let _0x57141a = _0x159214 === 2 ? "query" : "document";
  if (!cc) {
    return _0x106c56.map(_0x464af1 => ac(_0x464af1));
  }
  try {
    if (_0x106c56.length <= Ur) {
      return await ic(_0x106c56, _0x57141a);
    }
    let _0x4424d1 = [];
    for (let _0x1e932b = 0; _0x1e932b < _0x106c56.length; _0x1e932b += Ur) {
      let _0x49fd19 = _0x106c56.slice(_0x1e932b, _0x1e932b + Ur);
      let _0x25d0f4 = await ic(_0x49fd19, _0x57141a);
      _0x4424d1.push(..._0x25d0f4);
    }
    return _0x4424d1;
  } catch (_0x39274b) {
    console.log("  Voyage API failed: " + _0x39274b.message + " — using hash fallback");
    return _0x106c56.map(_0x45e8c4 => ac(_0x45e8c4));
  }
}
function ac(_0xc1fc5e) {
  let _0x5a4897 = _0x229715.createHash("sha512").update(_0xc1fc5e).digest();
  let _0x26928a = new Float32Array(To);
  let _0x5e11b0 = _0x5a4897;
  let _0x3eda5b = 0;
  for (let _0x3e9f0b = 0; _0x3e9f0b < To; _0x3e9f0b++) {
    if (_0x3eda5b + 4 > _0x5e11b0.length) {
      _0x5e11b0 = _0x229715.createHash("sha512").update(_0x5e11b0).update(Buffer.from([_0x3e9f0b & 255, _0x3e9f0b >> 8 & 255])).digest();
      _0x3eda5b = 0;
    }
    let _0x23670f = _0x5e11b0.readUInt32LE(_0x3eda5b);
    _0x26928a[_0x3e9f0b] = _0x23670f / 4294967295 * 2 - 1;
    _0x3eda5b += 4;
  }
  let _0x40eed7 = 0;
  for (let _0x57355c = 0; _0x57355c < To; _0x57355c++) {
    _0x40eed7 += _0x26928a[_0x57355c] * _0x26928a[_0x57355c];
  }
  _0x40eed7 = Math.sqrt(_0x40eed7);
  if (_0x40eed7 > 0) {
    for (let _0x2e2692 = 0; _0x2e2692 < To; _0x2e2692++) {
      _0x26928a[_0x2e2692] /= _0x40eed7;
    }
  }
  return _0x26928a;
}
function Mf(_0x3c5276) {
  let _0x36bd38 = _0x3c5276.length;
  let _0x4af57b = Buffer.allocUnsafe(_0x36bd38 * 4);
  for (let _0x446ece = 0; _0x446ece < _0x36bd38; _0x446ece++) {
    _0x4af57b.writeFloatLE(_0x3c5276[_0x446ece], _0x446ece * 4);
  }
  return Oe(1, _0x4af57b);
}
function bf(_0x4a03c0) {
  let _0x51673a = _0x4a03c0.map(_0x51f2a8 => Ie(1, Mf(_0x51f2a8)));
  return Buffer.concat(_0x51673a);
}
function Fr(_0x577d11, _0x5bb95f) {
  let _0x58960d = bf(_0x577d11);
  let _0x53132a = Buffer.allocUnsafe(8);
  _0x53132a.writeDoubleLE(_0x5bb95f / 1000, 0);
  let _0x2df4d0 = Buffer.concat([Buffer.from([17]), _0x53132a]);
  return Buffer.concat([Ie(1, _0x58960d), _0x2df4d0]);
}
function lc(_0x631ada) {
  try {
    let _0xec4bf = V(_0x631ada);
    let _0x5571cc = j(_0xec4bf, 1, 2);
    if (!_0x5571cc) {
      return {
        prompts: [""],
        prefix: 1
      };
    }
    let _0x1bc7bc = V(_0x5571cc.value);
    let _0x5a2ec7 = ut(_0x1bc7bc, 1).filter(_0x288e9d => _0x288e9d.wireType === 2);
    let _0x1692d0 = j(_0x1bc7bc, 3, 0);
    let _0x29b01e = _0x1692d0 ? _0x1692d0.value : 1;
    if (_0x5a2ec7.length === 0) {
      return {
        prompts: [""],
        prefix: _0x29b01e
      };
    } else {
      return {
        prompts: _0x5a2ec7.map(_0x375381 => _0x375381.value.toString("utf8")),
        prefix: _0x29b01e
      };
    }
  } catch {
    return {
      prompts: [""],
      prefix: 1
    };
  }
}
function Rf(_0x299e83) {
  let _0xaa5c76 = [];
  let _0x2ff4d3 = 0;
  while (_0x2ff4d3 + 5 <= _0x299e83.length) {
    let _0xe7e59e = _0x299e83[_0x2ff4d3];
    let _0x447f71 = _0x299e83.readUInt32BE(_0x2ff4d3 + 1);
    _0x2ff4d3 += 5;
    if (_0x2ff4d3 + _0x447f71 > _0x299e83.length) {
      break;
    }
    let _0x9ead14 = _0x299e83.slice(_0x2ff4d3, _0x2ff4d3 + _0x447f71);
    _0x2ff4d3 += _0x447f71;
    if (_0xe7e59e === 2 || _0xe7e59e === 3) {
      continue;
    }
    let _0xf0a603 = _0x9ead14;
    if (_0xe7e59e === 1) {
      let _0x2fde83 = We(_0x9ead14);
      if (_0x2fde83) {
        _0xf0a603 = _0x2fde83;
      }
    }
    _0xaa5c76.push(_0xf0a603);
  }
  return _0xaa5c76;
}
function uc(_0x57d217, _0x308e29, _0x4f1043) {
  if ((_0x57d217.headers["content-type"] || "").includes("connect+proto")) {
    wf(_0x57d217, _0x308e29, _0x4f1043);
  } else {
    Nf(_0x57d217, _0x308e29, _0x4f1043);
  }
}
async function Nf(_0x1c19c1, _0xe434f, _0x495cc8) {
  let _0x4ce615 = [""];
  let _0x3b92c4 = 1;
  if (_0x495cc8 && _0x495cc8.length > 0) {
    try {
      let _0x5cdb80 = ve(_0x495cc8, _0x1c19c1.headers);
      let _0x308306 = lc(_0x5cdb80);
      _0x4ce615 = _0x308306.prompts;
      _0x3b92c4 = _0x308306.prefix;
    } catch (_0xa1fe23) {
      console.log("  Embeddings parse error: " + _0xa1fe23.message);
    }
  }
  let _0x40d830 = Date.now();
  let _0x156d52 = await Hr(_0x4ce615, _0x3b92c4);
  let _0x16ec83 = Date.now() - _0x40d830;
  console.log("  Embeddings (unary): " + _0x4ce615.length + " texts -> Voyage " + _0x16ec83 + "ms, first=\"" + (_0x4ce615[0]?.slice(0, 60) || "") + "\"");
  let _0x350161 = Fr(_0x156d52, _0x16ec83);
  let _0x1113c7 = vt(_0x350161);
  _0xe434f.writeHead(200, {
    ...Pt(),
    "content-length": _0x1113c7.length
  });
  _0xe434f.end(_0x1113c7);
}
async function wf(_0x398d55, _0x11a1e4, _0x4b8d28) {
  let _0x39d196 = [];
  if (_0x4b8d28 && _0x4b8d28.length > 0) {
    let _0x5c18b4 = _0x4b8d28;
    if ((_0x398d55.headers["content-encoding"] || "").includes("gzip")) {
      let _0x17d28a = We(_0x5c18b4);
      if (_0x17d28a) {
        _0x5c18b4 = _0x17d28a;
      }
    }
    _0x39d196 = Rf(_0x5c18b4);
  }
  console.log("  Embeddings (stream): " + _0x39d196.length + " request frames");
  _0x11a1e4.writeHead(200, dt());
  for (let _0x39dd9e of _0x39d196) {
    let {
      prompts: _0x3c7b0a,
      prefix: _0x14e34b
    } = lc(_0x39dd9e);
    let _0x2dc7ce = Date.now();
    let _0xb9c273 = await Hr(_0x3c7b0a, _0x14e34b);
    let _0x5c9557 = Date.now() - _0x2dc7ce;
    console.log("  Frame: " + _0x3c7b0a.length + " texts -> Voyage " + _0x5c9557 + "ms");
    let _0x119320 = Fr(_0xb9c273, _0x5c9557);
    _0x11a1e4.write(ge(_0x119320));
  }
  if (_0x39d196.length === 0) {
    let _0xd58930 = await Hr([""], 1);
    let _0x2a9f59 = Fr(_0xd58930, 1);
    _0x11a1e4.write(ge(_0x2a9f59));
  }
  _0x11a1e4.write(et());
  _0x11a1e4.end();
}
var dc = "[CASCADE-SEND-DIAG]";
function $f(_0x10968b, _0x474cad = {}) {
  try {
    let _0x1ef4da = ve(_0x10968b, _0x474cad || {});
    let _0x3dafe0 = V(_0x1ef4da);
    let _0x5a56c0 = j(_0x3dafe0, 3, 2);
    if (_0x5a56c0) {
      return _0x5a56c0.value.toString("utf8");
    }
  } catch {}
  return "";
}
function vf(_0x16be44) {
  let _0x4d0f53 = [me(1, 1)];
  if (_0x16be44 === "rate") {
    _0x4d0f53.push(me(3, 999));
    _0x4d0f53.push(me(4, 999));
    _0x4d0f53.push(me(5, 0));
  } else {
    _0x4d0f53.push(me(3, 0));
  }
  return Buffer.concat(_0x4d0f53);
}
function Pf(_0x4c97ea) {
  let _0x91febc = String(_0x4c97ea?.headers?.["content-type"] || "");
  return /connect/i.test(_0x91febc);
}
function fc(_0x7c522c, _0x2b86a9, _0x2d6e6e, _0x580c79, _0x20bf9e = 0) {
  if (_0x7c522c !== "CheckUserMessageRateLimit" && _0x7c522c !== "CheckChatCapacity") {
    return false;
  }
  let _0x4ab7d6 = $f(_0x580c79, _0x2b86a9.headers) || "";
  let _0x144d51 = Te();
  let _0x4717b7 = !!_0x144d51?.cascadeEnabled;
  let _0xd01032 = xt(_0x4ab7d6, _0x144d51);
  let _0x39ffdd = _0x7c522c === "CheckUserMessageRateLimit" ? "rate" : "capacity";
  S(_.REQUEST, dc + " " + _0x7c522c + " modelUid=" + (_0x4ab7d6 || "(empty)") + " bound=" + (_0xd01032 ? 1 : 0) + " cascadeEnabled=" + (_0x4717b7 ? 1 : 0) + (_0xd01032 ? " → bypass hasCapacity=1" : " → forward Codeium"), {
    id: _0x20bf9e
  });
  if (!_0xd01032) {
    return false;
  }
  let _0x56ef45 = vf(_0x39ffdd);
  let _0x4321f1;
  let _0x2ddcdf;
  if (Pf(_0x2b86a9)) {
    _0x4321f1 = ge(_0x56ef45, true);
    _0x2ddcdf = {
      "content-type": "application/connect+proto",
      "connect-content-encoding": "gzip",
      "content-length": _0x4321f1.length
    };
  } else {
    _0x4321f1 = vt(_0x56ef45);
    _0x2ddcdf = {
      ...Pt(),
      "content-length": _0x4321f1.length
    };
  }
  if (!_0x2d6e6e.headersSent) {
    _0x2d6e6e.writeHead(200, _0x2ddcdf);
  }
  if (!_0x2d6e6e.writableEnded) {
    _0x2d6e6e.end(_0x4321f1);
  }
  return true;
}
function pc(_0xaa6e04, _0xc4c8eb = 0) {
  let _0x535352 = _0xaa6e04 && typeof _0xaa6e04 == "object" ? _0xaa6e04 : {};
  let _0x409f53 = String(_0x535352.currentModelUid || _0x535352.modelUid || "").trim();
  S(_.REQUEST, dc + " " + (_0x535352.reason || "client") + " modelUid=" + (_0x409f53 || "(empty)") + " bound=" + (_0x535352.bound ? 1 : 0) + " cascadeEnabled=" + (_0x535352.cascadeEnabled || _0x535352.cascadeUnlock ? 1 : 0) + " submitDisabled=" + (_0x535352.submitDisabled ? 1 : 0) + " mode=" + (_0x535352.chatMode || "") + (_0x535352.extra ? " extra=" + JSON.stringify(_0x535352.extra) : ""), {
    id: _0xc4c8eb
  });
}
import _0x4c1c14 from "node:crypto";
var Uf = process.env.XY_DEVICE_ID || "";
var mc = process.env.XY_SESSION_SECRET || "";
function Hf(_0x3df424, _0x21255e, _0x53e87f) {
  if (!mc) {
    return {};
  }
  let _0x44f735 = Math.floor(Date.now() / 1000).toString();
  let _0x4b542d = _0x4c1c14.randomBytes(16).toString("hex");
  let _0x3ff0e7 = _0x4c1c14.createHash("sha256").update(_0x53e87f || "").digest("hex");
  let _0x3d34a7 = [_0x44f735, _0x4b542d, _0x3df424.toUpperCase(), _0x21255e, _0x3ff0e7].join("|");
  let _0x3b7186 = _0x4c1c14.createHmac("sha256", mc).update(_0x3d34a7).digest("hex");
  return {
    "x-device-id": Uf,
    "x-timestamp": _0x44f735,
    "x-nonce": _0x4b542d,
    "x-body-hash": _0x3ff0e7,
    "x-signature": _0x3b7186
  };
}
function Ff(_0x48fa34, _0x557b1f) {
  let _0x405a22 = process.env[_0x48fa34];
  let _0x55d264 = parseInt(String(_0x405a22 ?? ""), 10);
  if (Number.isInteger(_0x55d264) && _0x55d264 > 0 && _0x55d264 <= 65535) {
    return _0x55d264;
  } else {
    return _0x557b1f;
  }
}
var nn = Ff("HYBRID_PORT", 6678);
var gc = process.env.BIND_HOST || "::";
Aa({
  role: "owner"
});
var Wr = "server.self-serve.windsurf.com";
var Kf = "windsurf.com";
var Yf = "register.windsurf.com";
var Gf = "unleash.codeium.com";
var _c = new URL("../certs/", import.meta.url);
var Yr = process.env.MITM_CERT_HOST || Wr;
var Gr;
var jr;
try {
  Gr = _0x366fdf.readFileSync(new URL(Yr + ".pem", _c));
  jr = _0x366fdf.readFileSync(new URL(Yr + "-key.pem", _c));
} catch {
  console.log("No MITM certs found for " + Yr + " — CONNECT MITM disabled (OK if behind nginx)");
}
var zr = 0;
function yo(_0x386f29) {
  let _0x5a2fc4 = _0x386f29.split("/");
  return _0x5a2fc4[_0x5a2fc4.length - 1] || "";
}
function jf(_0x39b953) {
  if (_0x39b953.includes("unleash") || _0x39b953.includes("experiment_config")) {
    return Gf;
  } else {
    return Wr;
  }
}
function Wf(_0x80aa04) {
  return _0x80aa04.replace(/^\/_route\/api_server/, "");
}
function se() {
  return new Date().toISOString().slice(11, 23);
}
function zf(_0x1646b9, _0x37781d, _0x49b695, _0x16e868) {
  try {
    _0x1646b9();
  } catch (_0x5452f6) {
    console.error("[" + se() + "] #" + _0x16e868 + " Chat error: " + _0x5452f6.message);
    zt(_0x49b695, re("服务内部错误", _0x5452f6.message));
  }
}
function Nn(_0xad88d6, _0x12d8c3, _0x2725e7, _0x3a8e1f, _0x8617f1) {
  try {
    let _0x24f13c = _0xad88d6();
    if (_0x24f13c && typeof _0x24f13c.catch == "function") {
      _0x24f13c.catch(_0x374a9d => {
        console.error("[" + se() + "] #" + _0x3a8e1f + " " + _0x8617f1 + " error: " + _0x374a9d.message);
        if (!_0x2725e7.headersSent) {
          _0x2725e7.writeHead(500);
        }
        if (!_0x2725e7.writableEnded) {
          _0x2725e7.end();
        }
      });
    }
  } catch (_0x3f0cbd) {
    console.error("[" + se() + "] #" + _0x3a8e1f + " " + _0x8617f1 + " error: " + _0x3f0cbd.message);
    if (!_0x2725e7.headersSent) {
      _0x2725e7.writeHead(500);
    }
    if (!_0x2725e7.writableEnded) {
      _0x2725e7.end();
    }
  }
}
function Vf(_0x770a1b) {
  try {
    let _0x278eb1 = V(_0x770a1b);
    let _0x4e27bc = [];
    for (let _0x54ac2b of _0x278eb1) {
      if (_0x54ac2b.field === 3 && _0x54ac2b.wireType === 2) {
        let _0xbf16e6 = _0x54ac2b.value.toString("utf8");
        console.log("  RegisterUser: " + _0xbf16e6 + " -> http://localhost:" + nn);
        _0x4e27bc.push(te(3, "http://localhost:" + nn));
      } else if (_0x54ac2b.wireType === 0) {
        _0x4e27bc.push(me(_0x54ac2b.field, _0x54ac2b.value));
      } else if (_0x54ac2b.wireType === 2) {
        _0x4e27bc.push(Oe(_0x54ac2b.field, _0x54ac2b.value));
      } else if (_0x54ac2b.wireType === 1) {
        _0x4e27bc.push(rn(_0x54ac2b.field, _0x54ac2b.value));
      } else if (_0x54ac2b.wireType === 5) {
        _0x4e27bc.push(sn(_0x54ac2b.field, _0x54ac2b.value));
      }
    }
    return Buffer.concat(_0x4e27bc);
  } catch (_0x1cb44b) {
    console.error("  ❌ RegisterUser rewrite failed: " + _0x1cb44b.message);
    return _0x770a1b;
  }
}
var Xf = new Set(["GetChatMessage", "GetStreamingCompletions", "GetStreamingExternalChatCompletions"]);
var qf = 1048576;
var Jf = 16777216;
var Qf = 67108864;
function Sc(_0x2dc642, _0x277e4a) {
  if (_0x2dc642 === "/api/config") {
    return qf;
  } else if (_0x277e4a === "GetChatMessage" || _0x277e4a === "GetStreamingExternalChatCompletions") {
    return Qf;
  } else {
    return Jf;
  }
}
function Vr(_0x468dee, _0x23e2db, _0x12f93e, _0x41dc87, _0x7dd072 = {}) {
  let _0x470db5 = yo(_0x468dee.url);
  let _0x30346c = jf(_0x468dee.url);
  let _0x5b52e9 = Wf(_0x468dee.url);
  let _0x4659c2 = Xf.has(_0x470db5);
  let _0x156cd2 = {
    ..._0x468dee.headers
  };
  delete _0x156cd2.host;
  delete _0x156cd2.connection;
  _0x156cd2.host = _0x30346c;
  let _0xcb4d9 = Hf(_0x468dee.method, _0x5b52e9, _0x12f93e);
  Object.assign(_0x156cd2, _0xcb4d9);
  let _0x56c987 = new Set(["ECONNRESET", "ETIMEDOUT", "ECONNREFUSED", "EPIPE", "EAI_AGAIN", "ECONNABORTED"]);
  let _0xa2a493 = 3;
  let _0x459637 = _0x1c8662 => {
    let _0x15999b = _0x163c7a.request({
      hostname: _0x30346c,
      port: 443,
      path: _0x5b52e9,
      method: _0x468dee.method,
      headers: _0x156cd2
    }, _0x4135d0 => {
      let _0x5c14d9 = _0x7dd072.quiet || Dn(_0x470db5);
      if (_0x4659c2) {
        if (!_0x5c14d9) {
          S(_.RESPONSE, _0x4135d0.statusCode + " · 流式 · " + _0x470db5, {
            id: _0x41dc87
          });
        }
        let _0x4740b4 = {
          ..._0x4135d0.headers
        };
        if (_0x4740b4["transfer-encoding"]) {
          delete _0x4740b4["content-length"];
        }
        _0x23e2db.writeHead(_0x4135d0.statusCode, _0x4740b4);
        _0x4135d0.pipe(_0x23e2db);
        _0x4135d0.on("error", () => {
          if (!_0x23e2db.writableEnded) {
            _0x23e2db.end();
          }
        });
      } else {
        let _0x3731f1 = [];
        _0x4135d0.on("data", _0x3d3e51 => _0x3731f1.push(_0x3d3e51));
        _0x4135d0.on("end", () => {
          let _0x5819ca = Buffer.concat(_0x3731f1);
          if (!_0x5c14d9) {
            S(_.RESPONSE, _0x4135d0.statusCode + " · " + _0x5819ca.length + "b", {
              id: _0x41dc87
            });
          }
          if (!_0x7dd072.skipRewrite && _0x470db5 === "RegisterUser" && _0x4135d0.statusCode === 200 && _0x5819ca.length > 5) {
            try {
              let _0x104b47 = _0x5819ca[0];
              if (_0x5819ca.readUInt32BE(1) === _0x5819ca.length - 5 && _0x104b47 <= 1) {
                let _0xfde47b = _0x5819ca.subarray(5);
                if (_0x104b47 === 1) {
                  let _0x1a35f1 = We(_0xfde47b);
                  if (_0x1a35f1) {
                    _0xfde47b = _0x1a35f1;
                  }
                }
                let _0x3188d6 = Vf(_0xfde47b);
                let _0x39ecf5 = Buffer.alloc(5 + _0x3188d6.length);
                _0x39ecf5[0] = 0;
                _0x39ecf5.writeUInt32BE(_0x3188d6.length, 1);
                _0x3188d6.copy(_0x39ecf5, 5);
                _0x5819ca = _0x39ecf5;
                S(_.RESPONSE, "RegisterUser 已改写为本机代理地址", {
                  id: _0x41dc87
                });
              }
            } catch (_0x44b455) {
              S(_.ERR, "RegisterUser 改写失败: " + _0x44b455.message, {
                id: _0x41dc87,
                err: true
              });
            }
          }
          if (!_0x7dd072.skipRewrite && _0x4135d0.statusCode === 200 && _0x5819ca.length > 5 && (_0x470db5 === "GetCascadeModelConfigs" || _0x470db5 === "GetUserStatus")) {
            try {
              let _0x4b7fdd = Te();
              if (_0x4b7fdd && _0x4b7fdd.cascadeEnabled) {
                let _0x11fe85 = ms(_0x5819ca, _0x470db5);
                if (_0x11fe85.changed) {
                  _0x5819ca = _0x11fe85.body;
                  S(_.RESPONSE, _0x470db5 + " Cascade unlock Pro (" + (_0x11fe85.unlocked || 0) + " models)", {
                    id: _0x41dc87
                  });
                }
              }
            } catch (_0x32c92d) {
              S(_.ERR, _0x470db5 + " Cascade unlock 失败: " + _0x32c92d.message, {
                id: _0x41dc87,
                err: true
              });
            }
          }
          let _0x3b21bb = na();
          let _0x2f4ca1 = Fn();
          let _0xdd0940 = Object.keys(_0x3b21bb).length ? {
            ..._0x3b21bb,
            default: _0x2f4ca1 || kt
          } : _0x2f4ca1 > 0 ? _0x2f4ca1 : 0;
          if (!_0x7dd072.skipRewrite && _0xdd0940 && _0x4135d0.statusCode === 200 && _0x5819ca.length > 5 && (_0x470db5 === "GetCascadeModelConfigs" || _0x470db5 === "GetUserStatus")) {
            try {
              let {
                body: _0x20f5bf,
                changed: _0x4ee14e,
                bumped: _0x16bc11
              } = ps(_0x5819ca, _0x470db5, _0xdd0940);
              if (_0x4ee14e) {
                _0x5819ca = _0x20f5bf;
                S(_.RESPONSE, _0x470db5 + " BYOK max_tokens per-slot" + (_0x16bc11 ? " (" + _0x16bc11 + " models)" : ""), {
                  id: _0x41dc87
                });
              }
            } catch (_0x2fcaed) {
              S(_.ERR, _0x470db5 + " 模型配置改写失败: " + _0x2fcaed.message, {
                id: _0x41dc87,
                err: true
              });
            }
          }
          let _0x12bac4 = {
            ..._0x4135d0.headers
          };
          delete _0x12bac4["content-length"];
          delete _0x12bac4["transfer-encoding"];
          _0x12bac4["content-length"] = _0x5819ca.length;
          _0x23e2db.writeHead(_0x4135d0.statusCode, _0x12bac4);
          _0x23e2db.end(_0x5819ca);
        });
        _0x4135d0.on("error", _0x21d635 => {
          S(_.ERR, "响应中断: " + _0x21d635.message, {
            id: _0x41dc87,
            err: true
          });
          if (!_0x23e2db.headersSent) {
            _0x23e2db.writeHead(502);
          }
          if (!_0x23e2db.writableEnded) {
            _0x23e2db.end();
          }
        });
      }
    });
    _0x15999b.on("error", _0x114e8b => {
      if ((_0x56c987.has(_0x114e8b.code) || /socket disconnected before secure TLS|before secure TLS connection/i.test(_0x114e8b.message || "")) && !_0x23e2db.headersSent && _0x1c8662 < _0xa2a493) {
        let _0x32365c = _0x1c8662 * 150;
        S(_.ERR, "Codeium 上游瞬时错误(" + (_0x114e8b.code || "TLS") + ")，" + _0x32365c + "ms 后重试 " + _0x1c8662 + "/" + (_0xa2a493 - 1) + ": " + _0x114e8b.message, {
          id: _0x41dc87,
          err: true
        });
        setTimeout(() => _0x459637(_0x1c8662 + 1), _0x32365c);
        return;
      }
      S(_.ERR, "Codeium 上游失败: " + _0x114e8b.message, {
        id: _0x41dc87,
        err: true
      });
      if (!_0x23e2db.headersSent) {
        _0x23e2db.writeHead(502);
      }
      if (!_0x23e2db.writableEnded) {
        _0x23e2db.end("Upstream error: " + _0x114e8b.message);
      }
    });
    _0x15999b.end(_0x12f93e);
  };
  _0x459637(1);
}
function yc(_0x2f010b, _0x4605f6, _0x2a7e2a, _0x44b7d2, _0x4b57d5 = "") {
  let _0x3c6fd2 = yo(_0x2f010b.url);
  if (_0x3c6fd2 === "CheckUserMessageRateLimit" || _0x3c6fd2 === "CheckChatCapacity") {
    return !!fc(_0x3c6fd2, _0x2f010b, _0x4605f6, _0x2a7e2a, _0x44b7d2);
  }
  if (_0x3c6fd2 === "GetChatMessage" || _0x3c6fd2 === "GetStreamingExternalChatCompletions") {
    let _0x4cb44f = aa(_0x3c6fd2, _0x2a7e2a, _0x2f010b.headers);
    let _0x13fced = co(_0x2a7e2a, _0x2f010b.headers) || "";
    let _0xe0f342 = Te();
    let _0x2ee092 = xt(_0x13fced, _0xe0f342);
    Pe(se(), _0x44b7d2, _.REQUEST, "[CASCADE-SEND-DIAG] " + _0x4b57d5 + _0x3c6fd2 + " modelUid=" + (_0x13fced || "(empty)") + " bound=" + (_0x2ee092 ? 1 : 0) + " cascadeEnabled=" + (_0xe0f342 && _0xe0f342.cascadeEnabled ? 1 : 0) + " intercept=" + (_0x4cb44f ? 1 : 0));
    if (_0x4cb44f) {
      Pe(se(), _0x44b7d2, _.BYOK, "" + _0x4b57d5 + _0x3c6fd2 + " → 本地网关 · " + (_0x13fced || "?") + " · " + _0x2a7e2a.length + "b");
      zf(() => Ga(_0x2f010b, _0x4605f6, _0x2a7e2a), _0x2f010b, _0x4605f6, _0x44b7d2);
    } else {
      if (pt) {
        Pe(se(), _0x44b7d2, _.OFFICIAL, "" + _0x4b57d5 + _0x3c6fd2 + " → Codeium 官方 · " + (_0x13fced || "?") + " · " + _0x2a7e2a.length + "b");
      }
      Vr(_0x2f010b, _0x4605f6, _0x2a7e2a, _0x44b7d2, {
        quiet: !pt
      });
    }
    return true;
  }
  if (_0x3c6fd2 === "GetWebSearchResults") {
    Pe(se(), _0x44b7d2, _.REQUEST, _0x4b57d5 + "GetWebSearchResults · " + _0x2a7e2a.length + "b");
    Nn(() => oc(_0x2f010b, _0x4605f6, _0x2a7e2a), _0x2f010b, _0x4605f6, _0x44b7d2, "WebSearch");
    return true;
  } else if (_0x3c6fd2 === "GetWebSearchRedirect") {
    Pe(se(), _0x44b7d2, _.REQUEST, _0x4b57d5 + "GetWebSearchRedirect · " + _0x2a7e2a.length + "b");
    Nn(() => rc(_0x2f010b, _0x4605f6, _0x2a7e2a), _0x2f010b, _0x4605f6, _0x44b7d2, "WebRedirect");
    return true;
  } else if (_0x3c6fd2 === "GetEmbeddings") {
    Pe(se(), _0x44b7d2, _.REQUEST, _0x4b57d5 + "GetEmbeddings · " + _0x2a7e2a.length + "b");
    Nn(() => uc(_0x2f010b, _0x4605f6, _0x2a7e2a), _0x2f010b, _0x4605f6, _0x44b7d2, "Embeddings");
    return true;
  } else {
    return false;
  }
}
function Ec(_0x9953a9) {
  let _0x56d704 = String(_0x9953a9 || "/");
  if (_0x56d704.startsWith("http://") || _0x56d704.startsWith("https://")) {
    try {
      let _0x33d613 = new URL(_0x56d704);
      return _0x33d613.pathname + (_0x33d613.search || "");
    } catch {
      return _0x56d704;
    }
  }
  return _0x56d704;
}
function Oc(_0xd09d90) {
  try {
    return new URL(String(_0xd09d90 || "/"), "http://localhost").pathname;
  } catch {
    return String(_0xd09d90 || "/").split("?")[0];
  }
}
function xc(_0x6e34ce) {
  let _0x162520 = _0x6e34ce.socket?.remoteAddress || "";
  return _0x162520 === "127.0.0.1" || _0x162520 === "::1" || _0x162520 === "::ffff:127.0.0.1";
}
function ae(_0xb724bd, _0x4c4684, _0x24c035, {
  cors: _0x491e98 = false,
  noStore: _0x3587d6 = false
} = {}) {
  let _0x57be76 = JSON.stringify(_0x24c035);
  let _0x147b8e = {
    "content-type": "application/json",
    "content-length": Buffer.byteLength(_0x57be76)
  };
  if (_0x491e98) {
    _0x147b8e["access-control-allow-origin"] = "*";
  }
  if (_0x3587d6) {
    _0x147b8e["cache-control"] = "no-store";
  }
  _0xb724bd.writeHead(_0x4c4684, _0x147b8e);
  _0xb724bd.end(_0x57be76);
}
function Se(_0x5dc237, _0x4d6e1a) {
  return {
    schemaVersion: 2,
    status: "error",
    code: _0x4d6e1a,
    requestId: String(_0x5dc237),
    retryable: false
  };
}
function Zf(_0x150325, _0x470ef0, _0x1a66bd, {
  reserve: _0x445a2b = false
} = {}) {
  let _0x2cb385 = _0x445a2b ? "INVALID_RESERVATION" : "INVALID_SNAPSHOT";
  if (_0x150325.method !== "POST") {
    ae(_0x470ef0, 405, Se(_0x1a66bd, "METHOD_NOT_ALLOWED"));
    _0x150325.resume();
    return;
  }
  if (!xc(_0x150325)) {
    ae(_0x470ef0, 403, Se(_0x1a66bd, "LOOPBACK_REQUIRED"));
    _0x150325.resume();
    return;
  }
  if (_0x150325.headers["x-byok-internal"] !== wa) {
    ae(_0x470ef0, 403, Se(_0x1a66bd, "INVALID_INTERNAL_HEADER"));
    _0x150325.resume();
    return;
  }
  if (!String(_0x150325.headers["content-type"] || "").toLowerCase().includes("application/json")) {
    ae(_0x470ef0, 400, Se(_0x1a66bd, _0x2cb385));
    _0x150325.resume();
    return;
  }
  let _0x162649 = [];
  let _0x3ff4b8 = 0;
  let _0x340663 = false;
  _0x150325.on("data", _0x3e7703 => {
    if (!_0x340663) {
      _0x3ff4b8 += _0x3e7703.length;
      if (_0x3ff4b8 > $a) {
        _0x340663 = true;
        _0x162649.length = 0;
        return;
      }
      _0x162649.push(_0x3e7703);
    }
  });
  _0x150325.on("error", () => {
    if (!_0x470ef0.writableEnded) {
      ae(_0x470ef0, 400, Se(_0x1a66bd, _0x2cb385));
    }
  });
  _0x150325.on("end", () => {
    if (_0x470ef0.writableEnded) {
      return;
    }
    if (_0x340663) {
      ae(_0x470ef0, 413, Se(_0x1a66bd, "SNAPSHOT_BODY_TOO_LARGE"));
      return;
    }
    let _0x523bba;
    try {
      _0x523bba = JSON.parse(Buffer.concat(_0x162649).toString("utf8"));
    } catch {
      ae(_0x470ef0, 400, Se(_0x1a66bd, _0x2cb385));
      return;
    }
    let _0x10a4b6;
    try {
      if (_0x445a2b) {
        let _0x4aade9 = kn(_0x523bba);
        if (!_0x4aade9.ok) {
          ae(_0x470ef0, 400, Se(_0x1a66bd, _0x4aade9.code || _0x2cb385));
          return;
        }
        _0x10a4b6 = at.reserve(_0x4aade9.value.conversationId, _0x4aade9.value.sourceRequestId);
      } else {
        _0x10a4b6 = at.publish(_0x523bba);
      }
    } catch (_0xb489f5) {
      console.error("[context-snapshot] owner " + (_0x445a2b ? "reserve" : "publish") + " failed: " + (_0xb489f5?.message || _0xb489f5));
      ae(_0x470ef0, 500, {
        ...Se(_0x1a66bd, "SNAPSHOT_OWNER_FAILURE"),
        retryable: true
      });
      return;
    }
    if (!_0x10a4b6.ok) {
      ae(_0x470ef0, 400, Se(_0x1a66bd, _0x10a4b6.code || "INVALID_SNAPSHOT"));
      return;
    }
    if (_0x445a2b && _0x10a4b6.accepted !== true) {
      let _0x112d18 = _0x10a4b6.reason === "reservation-capacity";
      ae(_0x470ef0, _0x112d18 ? 503 : 409, {
        ...Se(_0x1a66bd, _0x112d18 ? "RESERVATION_CAPACITY" : "RESERVATION_REJECTED"),
        retryable: _0x112d18
      });
      return;
    }
    if (_0x445a2b) {
      ae(_0x470ef0, 202, {
        accepted: true,
        sourceOrder: _0x10a4b6.sourceOrder
      });
      return;
    }
    ae(_0x470ef0, 202, {
      schemaVersion: 2,
      status: "accepted",
      requestId: String(_0x1a66bd),
      accepted: _0x10a4b6.accepted === true,
      revision: _0x10a4b6.revision
    });
  });
}
function ep(_0x5e0700, _0x5b5862) {
  let _0x2a64e9 = ++zr;
  let _0x3bab0c = Ec(_0x5e0700.url);
  let _0x35b51a = Oc(_0x3bab0c);
  let _0xbb3699 = yo(_0x3bab0c);
  if (_0x35b51a === Na || _0x35b51a === Cr) {
    _0x5e0700.url = _0x3bab0c;
    Zf(_0x5e0700, _0x5b5862, _0x2a64e9, {
      reserve: _0x35b51a === Cr
    });
    return;
  }
  let _0x503c11 = [];
  let _0x34e743 = Sc(_0x35b51a, _0xbb3699);
  let _0x2e2e04 = 0;
  let _0x452cfb = false;
  _0x5e0700.on("error", _0x13a087 => {
    console.error("[" + se() + "] #" + _0x2a64e9 + " REQ ERROR: " + _0x13a087.message);
    if (!_0x5b5862.headersSent) {
      _0x5b5862.writeHead(500);
    }
    if (!_0x5b5862.writableEnded) {
      _0x5b5862.end();
    }
  });
  _0x5e0700.on("data", _0x446e82 => {
    if (!_0x452cfb) {
      _0x2e2e04 += _0x446e82.length;
      if (_0x2e2e04 > _0x34e743) {
        _0x452cfb = true;
        _0x503c11.length = 0;
        Pe(se(), _0x2a64e9, _.RESPONSE, "413 · 请求体过大 · " + (_0xbb3699 || _0x35b51a) + " · max=" + _0x34e743 + "b");
        ae(_0x5b5862, 413, {
          error: "Body too large (max " + _0x34e743 + " bytes)"
        });
        return;
      }
      _0x503c11.push(_0x446e82);
    }
  });
  _0x5e0700.on("end", () => {
    if (_0x452cfb) {
      return;
    }
    let _0x3a318a = Buffer.concat(_0x503c11);
    _0x5e0700.url = _0x3bab0c;
    if (_0x5e0700.method === "OPTIONS") {
      _0x5b5862.writeHead(204, {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": _0x35b51a === "/api/v2/context-snapshot" ? "GET, OPTIONS" : "GET, POST, PUT, OPTIONS",
        "access-control-allow-headers": "content-type",
        "access-control-max-age": "86400"
      });
      _0x5b5862.end();
      return;
    }
    if (_0x5e0700.url.startsWith("/profile") || _0x5e0700.url.startsWith("/login") || _0x5e0700.url.startsWith("/signup") || _0x5e0700.url.startsWith("/redirect/") || _0x5e0700.url.startsWith("/changelog") || _0x5e0700.url === "/favicon.ico") {
      console.log("[" + se() + "] #" + _0x2a64e9 + " → redirect " + _0x5e0700.url);
      _0x5b5862.writeHead(302, {
        location: "https://" + Kf + _0x5e0700.url
      });
      return _0x5b5862.end();
    }
    if (_0x5e0700.url.includes("prompt=login") || _0x5e0700.url.includes("scope=openid") || _0x5e0700.url.includes("authorize") || _0x5e0700.url.includes("client_id=codeium")) {
      console.log("[" + se() + "] #" + _0x2a64e9 + " → auth redirect");
      _0x5b5862.writeHead(302, {
        location: "https://" + Yf + _0x5e0700.url
      });
      return _0x5b5862.end();
    }
    if (_0x5e0700.url.startsWith("/api/models")) {
      let _0xc7ec63 = new URL(_0x5e0700.url, "http://localhost").pathname;
      console.log("[" + se() + "] #" + _0x2a64e9 + " " + _0xc7ec63);
      Nn(() => Ta(_0x5e0700, _0x5b5862, _0xc7ec63), _0x5e0700, _0x5b5862, _0x2a64e9, "Models");
      return;
    }
    if (_0x5e0700.url.startsWith("/api/config")) {
      is(_0x2a64e9, _0x5e0700.method, se);
      Nn(() => Sa(_0x5e0700, _0x5b5862, _0x3a318a, _0x2a64e9), _0x5e0700, _0x5b5862, _0x2a64e9, "Config");
      return;
    }
    if (_0x5e0700.url.startsWith("/api/model-captures")) {
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end(JSON.stringify({
        captures: ia()
      }, null, 2));
      return;
    }
    if (_0x5e0700.url.startsWith("/api/byok-bindings")) {
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end(JSON.stringify(An(), null, 2));
      return;
    }
    if ((_0x5e0700.url === "/api/model-picker-refresh" || _0x5e0700.url.startsWith("/api/model-picker-refresh?")) && (_0x5e0700.method === "POST" || _0x5e0700.method === "GET")) {
      let _0x37c7f2 = "api";
      try {
        if (_0x5e0700.method === "POST" && _0x3a318a && _0x3a318a.length) {
          let _0x5ca299 = JSON.parse(_0x3a318a.toString("utf8"));
          if (_0x5ca299 && _0x5ca299.reason) {
            _0x37c7f2 = String(_0x5ca299.reason);
          }
        } else {
          let _0x1a332a = new URL(_0x5e0700.url, "http://localhost");
          if (_0x1a332a.searchParams.get("reason")) {
            _0x37c7f2 = _0x1a332a.searchParams.get("reason");
          }
        }
      } catch {}
      let _0x4fd5f8 = oa(_0x37c7f2);
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end(JSON.stringify({
        ok: true,
        ..._0x4fd5f8,
        ...An()
      }));
      return;
    }
    if ((_0x5e0700.url === "/api/model-picker-applied" || _0x5e0700.url.startsWith("/api/model-picker-applied?")) && (_0x5e0700.method === "POST" || _0x5e0700.method === "GET")) {
      let _0x2aaa2c = 0;
      try {
        if (_0x5e0700.method === "POST" && _0x3a318a && _0x3a318a.length) {
          let _0x1eca74 = JSON.parse(_0x3a318a.toString("utf8"));
          if (_0x1eca74 && _0x1eca74.epoch != null) {
            _0x2aaa2c = Number(_0x1eca74.epoch) || 0;
          }
        }
      } catch {}
      let _0x2007b2 = _0x5e0700.method === "POST" ? ra(_0x2aaa2c) : {
        ok: true,
        appliedEpoch: sa()
      };
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end(JSON.stringify({
        ..._0x2007b2,
        ...An()
      }));
      return;
    }
    if (_0x35b51a === "/api/v2/context-snapshot") {
      if (_0x5e0700.method !== "GET") {
        ae(_0x5b5862, 405, Se(_0x2a64e9, "METHOD_NOT_ALLOWED"), {
          cors: true,
          noStore: true
        });
        return;
      }
      let _0x1ed937;
      try {
        _0x1ed937 = new URL(_0x5e0700.url, "http://localhost");
      } catch {
        ae(_0x5b5862, 400, Se(_0x2a64e9, "INVALID_CONVERSATION_ID"), {
          cors: true,
          noStore: true
        });
        return;
      }
      let _0xc4d4f0 = _0x1ed937.searchParams.getAll("conversationId");
      if (_0xc4d4f0.length !== 1) {
        ae(_0x5b5862, 400, Se(_0x2a64e9, "INVALID_CONVERSATION_ID"), {
          cors: true,
          noStore: true
        });
        return;
      }
      let _0x3821cf = Cn(_0xc4d4f0[0]);
      if (!_0x3821cf.ok) {
        ae(_0x5b5862, 400, Se(_0x2a64e9, "INVALID_CONVERSATION_ID"), {
          cors: true,
          noStore: true
        });
        return;
      }
      let _0x4061f4 = at.get(_0x3821cf.value);
      if (!_0x4061f4.ok) {
        ae(_0x5b5862, 400, Se(_0x2a64e9, "INVALID_CONVERSATION_ID"), {
          cors: true,
          noStore: true
        });
        return;
      }
      ae(_0x5b5862, 200, _0x4061f4.snapshot ? {
        schemaVersion: 2,
        status: "ready",
        requestId: String(_0x2a64e9),
        snapshot: da(_0x4061f4.snapshot)
      } : {
        schemaVersion: 2,
        status: "pending",
        requestId: String(_0x2a64e9),
        snapshot: null
      }, {
        cors: true,
        noStore: true
      });
      return;
    }
    if (_0x35b51a === "/api/session-monitor") {
      if (_0x5e0700.method !== "GET") {
        ae(_0x5b5862, 405, {
          ok: false,
          error: "method not allowed"
        }, {
          cors: true,
          noStore: true
        });
        return;
      }
      ae(_0x5b5862, 200, sessionMonitorSnapshot(), {
        cors: true,
        noStore: true
      });
      return;
    }
    if (_0x35b51a === "/api/context-hint") {
      let _0x2b2e69 = null;
      let _0x116f9f = false;
      let _0x22a015 = false;
      try {
        let _0x375be9 = new URL(_0x5e0700.url, "http://localhost").searchParams.get("ids") || "";
        _0x22a015 = !!_0x375be9.trim();
        if (_0x375be9) {
          let _0x2b8b93 = _0x375be9.split(",").map(_0x3088a3 => _0x3088a3.trim()).filter(Boolean).slice(0, 128);
          if (_0x2b8b93.length) {
            let _0x5be1c5 = li(_0x2b8b93);
            let _0x36c345 = String(_0x5be1c5?.sessionKey || "");
            if (_0x36c345.startsWith("c:cid:")) {
              let _0x4d633a = at.get(_0x36c345.slice(6));
              if (_0x4d633a.ok && _0x4d633a.snapshot) {
                let _0x9a980c = _0x4d633a.snapshot;
                _0x2b2e69 = {
                  tokens: _0x9a980c.tokensUsed,
                  limit: _0x9a980c.contextLimit,
                  inboundTokens: _0x9a980c.tokensUsed,
                  restoredMsgs: 0,
                  inboundMsgs: 0,
                  reason: "v2-exact",
                  cascadeId: _0x9a980c.slotId,
                  sessionKey: _0x36c345,
                  ts: _0x9a980c.updatedAt,
                  activityTs: _0x9a980c.updatedAt
                };
                _0x116f9f = true;
              }
            }
          }
        }
      } catch {}
      let _0x4c21b8 = (An().slots || []).map(_0x3a882a => ({
        id: _0x3a882a.id,
        label: _0x3a882a.label,
        context1m: _0x3a882a.context1m !== false,
        contextLimit: _0x3a882a.contextLimit || kt,
        providerName: _0x3a882a.providerName || "",
        upstream: _0x3a882a.upstream || "",
        bound: !!_0x3a882a.bound
      }));
      let _0x4a9f1a = _0x116f9f ? _0x2b2e69 : {
        tokens: 0,
        limit: 0,
        inboundTokens: 0,
        restoredMsgs: 0,
        inboundMsgs: 0,
        reason: _0x22a015 ? "ids-miss" : "identity-required",
        cascadeId: "",
        sessionKey: "",
        ts: 0,
        activityTs: 0
      };
      ae(_0x5b5862, 200, {
        ..._0x4a9f1a,
        tokens: _0x116f9f ? Math.max(0, Number(_0x4a9f1a.tokens) || 0) : 0,
        limit: _0x116f9f ? Math.max(0, Number(_0x4a9f1a.limit) || 0) : 0,
        scoped: _0x116f9f,
        cascadeId: _0x116f9f ? String(_0x4a9f1a.cascadeId || "") : "",
        sessionKey: _0x116f9f ? String(_0x4a9f1a.sessionKey || "") : "",
        sessions: _0x116f9f && _0x4a9f1a.sessionKey ? [{
          ..._0x4a9f1a
        }] : [],
        slots: _0x4c21b8
      }, {
        cors: true,
        noStore: true
      });
      return;
    }
    if (_0x5e0700.url === "/api/shutdown" && _0x5e0700.method === "POST") {
      if (!xc(_0x5e0700)) {
        _0x5b5862.writeHead(403, {
          "content-type": "application/json"
        });
        _0x5b5862.end("{\"error\":\"loopback only\"}");
        return;
      }
      console.log("[" + se() + "] #" + _0x2a64e9 + " /api/shutdown — exiting");
      _0x5b5862.writeHead(200, {
        "content-type": "application/json"
      });
      _0x5b5862.end("{\"ok\":true}");
      Ic().catch(_0x169869 => {
        console.error("[context-snapshot] shutdown failed: " + (_0x169869?.message || _0x169869));
        setTimeout(() => process.exit(0), 100);
      });
      return;
    }
    if (_0x5e0700.url === "/" || _0x5e0700.url === "/index.html") {
      _0x5b5862.writeHead(404, {
        "content-type": "text/plain; charset=utf-8"
      });
      _0x5b5862.end("Use the Devin BYOK Bridge panel in the IDE sidebar.");
      return;
    }
    if ((_0x5e0700.url === "/api/chat-queue" || _0x5e0700.url.startsWith("/api/chat-queue?")) && _0x5e0700.method === "GET") {
      let _0x50d83f = new URL(_0x5e0700.url, "http://localhost").searchParams.get("targetId");
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      let _0x3c549a = Ai(_0x50d83f);
      _0x5b5862.end(JSON.stringify(_0x3c549a));
      return;
    }
    if (_0x5e0700.url === "/api/chat-queue" && _0x5e0700.method === "PUT") {
      try {
        let _0x39c890 = JSON.parse(_0x3a318a.toString());
        or(_0x39c890.text || "", !!_0x39c890.hasImage, _0x39c890.targetId || null);
      } catch {}
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end("{\"ok\":true}");
      return;
    }
    if (_0x5e0700.url === "/api/active-target" && _0x5e0700.method === "POST") {
      let _0x5efe1b = null;
      try {
        _0x5efe1b = JSON.parse(_0x3a318a.toString()).targetId || null;
      } catch {}
      let _0x3d1da7 = _i(_0x5efe1b);
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end(JSON.stringify({
        ok: true,
        targetId: _0x3d1da7
      }));
      return;
    }
    if (_0x5e0700.url === "/api/chat-queue/ack" && _0x5e0700.method === "POST") {
      let _0x40bdd7 = null;
      let _0x57d62b = null;
      try {
        let _0x27ab52 = JSON.parse(_0x3a318a.toString());
        _0x40bdd7 = _0x27ab52.id || null;
        _0x57d62b = _0x27ab52.targetId || null;
      } catch {}
      ki(_0x40bdd7, _0x57d62b);
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end("{\"ok\":true}");
      return;
    }
    if ((_0x5e0700.url === "/api/bridge-status" || _0x5e0700.url.startsWith("/api/bridge-status?")) && (_0x5e0700.method === "GET" || _0x5e0700.method === "POST")) {
      let _0x46f080 = new URL(_0x5e0700.url, "http://localhost").searchParams.get("targetId");
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end(JSON.stringify(yi(_0x46f080)));
      return;
    }
    if (_0x5e0700.url === "/api/bridge-heartbeat" && _0x5e0700.method === "POST") {
      let _0x41d9ab = null;
      try {
        _0x41d9ab = JSON.parse(_0x3a318a.toString()).targetId || null;
      } catch {}
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end(JSON.stringify(nr(_0x41d9ab)));
      return;
    }
    if ((_0x5e0700.url === "/api/model-switch" || _0x5e0700.url.startsWith("/api/model-switch?")) && _0x5e0700.method === "GET") {
      let _0x5aad14 = new URL(_0x5e0700.url, "http://localhost").searchParams.get("targetId");
      nr(_0x5aad14);
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end(JSON.stringify(Oi(_0x5aad14)));
      return;
    }
    if (_0x5e0700.url === "/api/model-switch" && _0x5e0700.method === "POST") {
      let _0x518f77 = {};
      try {
        _0x518f77 = JSON.parse(_0x3a318a.toString());
      } catch {}
      let _0x3e15db = Ei(_0x518f77.modelUid, _0x518f77.targetId || null);
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end(JSON.stringify(_0x3e15db));
      return;
    }
    if ((_0x5e0700.url === "/api/model-switch/result" || _0x5e0700.url.startsWith("/api/model-switch/result?")) && (_0x5e0700.method === "GET" || _0x5e0700.method === "POST")) {
      let _0x2fa87c = new URL(_0x5e0700.url, "http://localhost").searchParams.get("id");
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end(JSON.stringify(Ii(_0x2fa87c)));
      return;
    }
    if (_0x5e0700.url === "/api/model-switch/ack" && _0x5e0700.method === "POST") {
      let _0x150585 = null;
      let _0x3d31a1 = null;
      let _0x35b0ce = false;
      let _0x58aee2 = "";
      let _0x19c714 = 0;
      let _0xcc44eb = 0;
      try {
        let _0x257562 = JSON.parse(_0x3a318a.toString());
        _0x150585 = _0x257562.id || null;
        _0x3d31a1 = _0x257562.targetId || null;
        _0x35b0ce = _0x257562.ok === true;
        _0x58aee2 = _0x257562.error || "";
        _0x19c714 = Number(_0x257562.switched) || 0;
        _0xcc44eb = Number(_0x257562.total) || 0;
      } catch {}
      xi(_0x150585, _0x3d31a1, {
        ok: _0x35b0ce,
        error: _0x58aee2,
        switched: _0x19c714,
        total: _0xcc44eb
      });
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end("{\"ok\":true}");
      return;
    }
    if (_0x5e0700.url === "/api/cascade-send-diag" && _0x5e0700.method === "POST") {
      let _0x5e8140 = {};
      try {
        _0x5e8140 = JSON.parse(_0x3a318a.toString());
      } catch {}
      pc(_0x5e8140, _0x2a64e9);
      _0x5b5862.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      });
      _0x5b5862.end("{\"ok\":true}");
      return;
    }
    if (!yc(_0x5e0700, _0x5b5862, _0x3a318a, _0x2a64e9)) {
      if (!Dn(_0xbb3699)) {
        Pe(se(), _0x2a64e9, _.REQUEST, (_0xbb3699 || _0x5e0700.url.slice(0, 80)) + " · " + _0x3a318a.length + "b → Codeium");
      }
      Vr(_0x5e0700, _0x5b5862, _0x3a318a, _0x2a64e9);
    }
  });
}
var on = _0x2e06de.createServer(ep);
var So = null;
function Ic() {
  return So || (So = (async () => {
    await Ra({
      graceMs: 100
    });
    try {
      on.close();
    } catch {}
    setTimeout(() => process.exit(0), 100);
  })(), So);
}
on.on("connection", _0x5acfe9 => {
  _0x5acfe9.setNoDelay(true);
});
var Ac = _0x2e06de.createServer((_0x1d001d, _0x40f5f5) => {
  let _0x2ab277 = ++zr;
  let _0x39054d = yo(_0x1d001d.url);
  let _0xffcb32 = Oc(Ec(_0x1d001d.url));
  let _0xc14ad4 = [];
  let _0x50afd4 = Sc(_0xffcb32, _0x39054d);
  let _0x46dc71 = 0;
  let _0x4745cb = false;
  _0x1d001d.on("error", _0x50c2a0 => {
    console.error("[" + se() + "] #" + _0x2ab277 + " MITM REQ ERROR: " + _0x50c2a0.message);
    if (!_0x40f5f5.headersSent) {
      _0x40f5f5.writeHead(500);
    }
    if (!_0x40f5f5.writableEnded) {
      _0x40f5f5.end();
    }
  });
  _0x1d001d.on("data", _0x23df07 => {
    if (!_0x4745cb) {
      _0x46dc71 += _0x23df07.length;
      if (_0x46dc71 > _0x50afd4) {
        _0x4745cb = true;
        _0xc14ad4.length = 0;
        Pe(se(), _0x2ab277, _.RESPONSE, "MITM 413 · 请求体过大 · " + (_0x39054d || _0xffcb32) + " · max=" + _0x50afd4 + "b");
        ae(_0x40f5f5, 413, {
          error: "Body too large (max " + _0x50afd4 + " bytes)"
        });
        return;
      }
      _0xc14ad4.push(_0x23df07);
    }
  });
  _0x1d001d.on("end", () => {
    if (_0x4745cb) {
      return;
    }
    let _0xfbb17a = Buffer.concat(_0xc14ad4);
    if (!yc(_0x1d001d, _0x40f5f5, _0xfbb17a, _0x2ab277, "MITM ")) {
      if (!Dn(_0x39054d)) {
        Pe(se(), _0x2ab277, _.REQUEST, "MITM " + (_0x39054d || _0x1d001d.url.slice(0, 80)) + " · " + _0xfbb17a.length + "b → Codeium");
      }
      Vr(_0x1d001d, _0x40f5f5, _0xfbb17a, _0x2ab277);
    }
  });
});
Ac.on("connection", _0x55e01c => {
  _0x55e01c.setNoDelay(true);
});
on.on("connect", (_0x21e6dc, _0x476ca1, _0x20f5dc) => {
  let _0xd78e73 = ++zr;
  let [_0x48d401, _0x5888db] = _0x21e6dc.url.split(":");
  let _0x5e797a = parseInt(_0x5888db) || 443;
  if (_0x48d401 === Wr && Gr && jr) {
    console.log("[" + se() + "] #" + _0xd78e73 + " MITM " + _0x48d401 + ":" + _0x5e797a);
    _0x476ca1.write("HTTP/1.1 200 Connection Established\r\nProxy-agent: devin-hybrid\r\n\r\n");
    if (_0x20f5dc && _0x20f5dc.length > 0) {
      _0x476ca1.unshift(_0x20f5dc);
    }
    let _0x502c04 = new _0x57ad80.TLSSocket(_0x476ca1, {
      isServer: true,
      cert: Gr,
      key: jr
    });
    _0x502c04.on("error", _0x1f1d86 => {
      if (_0x1f1d86.code !== "ECONNRESET" && _0x1f1d86.code !== "EPIPE") {
        console.error("  [#" + _0xd78e73 + "] MITM TLS error: " + _0x1f1d86.message);
        if (!_0x476ca1.destroyed) {
          _0x476ca1.destroy();
        }
      }
    });
    Ac.emit("connection", _0x502c04);
    return;
  }
  console.log("[" + se() + "] #" + _0xd78e73 + " CONNECT " + _0x48d401 + ":" + _0x5e797a);
  let _0x466518 = _0x262233.connect(_0x5e797a, _0x48d401, () => {
    _0x476ca1.write("HTTP/1.1 200 Connection Established\r\nProxy-agent: devin-hybrid\r\n\r\n");
    if (_0x20f5dc.length > 0) {
      _0x466518.write(_0x20f5dc);
    }
    _0x466518.pipe(_0x476ca1);
    _0x476ca1.pipe(_0x466518);
  });
  _0x466518.on("error", _0x3161a3 => {
    let _0x30a80f = /^198\.(18|19)\./.test(_0x48d401 || "");
    let _0x57f171 = _0x3161a3.code === "ETIMEDOUT" ? _0x30a80f ? "，目标看起来是 VPN/TUN 假 IP，请检查分流规则或将该域名设为直连" : "，请检查当前网络、系统代理或上游出口" : _0x3161a3.code === "ECONNRESET" ? "，上游连接被重置，常见于网络抖动、代理中途断链或对端主动关闭" : "";
    console.error("  [#" + _0xd78e73 + "] CONNECT error → " + _0x48d401 + ":" + _0x5e797a + ": " + _0x3161a3.message + _0x57f171);
    if (!_0x476ca1.destroyed) {
      _0x476ca1.write("HTTP/1.1 502 Bad Gateway\r\n\r\n");
      _0x476ca1.destroy();
    }
  });
  _0x476ca1.on("error", () => {
    if (!_0x466518.destroyed) {
      _0x466518.destroy();
    }
  });
});
gi(on);
on.listen(nn, gc, () => {
  console.log("\nDevin HYBRID PROXY on http://localhost:" + nn);
  console.log("   Bind host: " + gc);
  console.log("   BYOK models (*_BYOK) -> your gateway; official models -> Codeium");
  console.log("   Model capture: " + (process.env.MODEL_CAPTURE_PATH || "(disabled)"));
  console.log("   History cache: " + (process.env.BYOK_HISTORY_CACHE_PATH || "(memory-only)"));
  console.log("   http.proxy=http://localhost:" + nn + "  http.proxyStrictSSL=false\n");
  setImmediate(() => {
    try {
      if (process.env.MODEL_CAPTURE_PATH) {
        Qi(process.env.MODEL_CAPTURE_PATH);
      }
      Ks(process.env.BYOK_HISTORY_CACHE_PATH || "");
    } catch (_0x5a74cf) {
      console.error("[history-cache] init failed: " + (_0x5a74cf && _0x5a74cf.message || _0x5a74cf));
    }
  });
});
on.on("error", _0x36c419 => {
  if (_0x36c419.code === "EADDRINUSE") {
    console.error("EADDRINUSE: Port " + nn + " already in use");
  } else {
    console.error("Server error:", _0x36c419);
  }
  process.exit(1);
});
process.on("uncaughtException", _0x4dafe0 => {
  console.error("[fatal] uncaughtException:", _0x4dafe0 && _0x4dafe0.stack || _0x4dafe0);
  process.exit(1);
});
process.on("unhandledRejection", _0x52f3cd => {
  console.error("[fatal] unhandledRejection:", _0x52f3cd && (_0x52f3cd.stack || _0x52f3cd));
});
for (let e of ["SIGTERM", "SIGINT"]) {
  process.once(e, () => {
    console.log("[" + se() + "] " + e + " — exiting");
    Ic().catch(_0x3dfcdc => {
      console.error("[context-snapshot] signal shutdown failed: " + (_0x3dfcdc?.message || _0x3dfcdc));
      process.exit(0);
    });
  });
}
