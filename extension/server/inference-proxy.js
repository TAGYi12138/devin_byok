var Li = Object.create;
var Qo = Object.defineProperty;
var Bi = Object.getOwnPropertyDescriptor;
var Di = Object.getOwnPropertyNames;
var Ui = Object.getPrototypeOf;
var Hi = Object.prototype.hasOwnProperty;
var Zo = (_0x7be240, _0xaabe02) => () => {
  if (!_0xaabe02) {
    _0x7be240((_0xaabe02 = {
      exports: {}
    }).exports, _0xaabe02);
  }
  return _0xaabe02.exports;
};
var Fi = (_0x4b080d, _0x287f48, _0x336025, _0x4aded0) => {
  if (_0x287f48 && typeof _0x287f48 == "object" || typeof _0x287f48 == "function") {
    for (let _0xb2b03d of Di(_0x287f48)) {
      if (!Hi.call(_0x4b080d, _0xb2b03d) && _0xb2b03d !== _0x336025) {
        Qo(_0x4b080d, _0xb2b03d, {
          get: () => _0x287f48[_0xb2b03d],
          enumerable: !(_0x4aded0 = Bi(_0x287f48, _0xb2b03d)) || _0x4aded0.enumerable
        });
      }
    }
  }
  return _0x4b080d;
};
var Ki = (_0x2ae927, _0x175278, _0x1281a6) => {
  _0x1281a6 = _0x2ae927 != null ? Li(Ui(_0x2ae927)) : {};
  return Fi(_0x175278 || !_0x2ae927 || !_0x2ae927.__esModule ? Qo(_0x1281a6, "default", {
    value: _0x2ae927,
    enumerable: true
  }) : _0x1281a6, _0x2ae927);
};
var bs = Zo((_0x34c2cc, _0x8e8964) => {
  'use strict';

  var _0x22f799 = new Set(["low", "medium", "high", "xhigh", "max", "minimal", "none", "fast", "priority", "lightning", "slow", "thinking", "1m"]);
  var _0x5e2efa = /\s+(?:No\s+Thinking|Thinking|Medium|Low|High|XHigh|Max|Minimal|Fast|Priority|Lightning|Slow|1M(?:\s+Context)?)$/i;
  function _0x4917be(_0xafe035) {
    let _0x4d01f9 = String(_0xafe035 || "").trim().toLowerCase();
    if (!_0x4d01f9) {
      return "";
    }
    _0x4d01f9 = _0x4d01f9.replace(/_/g, "-").replace(/^model-/, "");
    let _0x27065f = _0x4d01f9.split("-").filter(Boolean);
    while (_0x27065f.length > 1 && _0x22f799.has(_0x27065f[_0x27065f.length - 1])) {
      _0x27065f.pop();
    }
    if (_0x27065f.length === 3 && _0x27065f[0] === "claude" && /^\d+$/.test(_0x27065f[1]) && /^(opus|sonnet|haiku|fable)$/.test(_0x27065f[2])) {
      let _0x2e7c51 = _0x27065f[1];
      _0x27065f.splice(1, 1);
      _0x27065f.push(_0x2e7c51);
    }
    // Fable 5 is a distinct Devin family; never alias it to Opus.
    return _0x27065f.join("-") || _0x4d01f9;
  }
  function _0x17138f(_0x52a081) {
    let _0x382165 = String(_0x52a081 || "").trim();
    if (!_0x382165) {
      return false;
    }
    let _0x15a4fa = _0x4917be(_0x382165);
    if (_0x15a4fa === "adaptive" || _0x15a4fa === "adaptivevvv") {
      return true;
    }
    let _0x5ee050 = _0x382165.toLowerCase().replace(/_/g, "-").replace(/\s+/g, "");
    return _0x5ee050 === "adaptive" || _0x5ee050 === "adaptivevvv";
  }
  function _0x37ef6f(_0x4d0d18, _0x61689d) {
    let _0x599ae9 = String(_0x4d0d18 || "").trim();
    _0x599ae9 ||= String(_0x61689d || "").trim();
    if (!_0x599ae9) {
      return "";
    }
    let _0x2962d5;
    do {
      _0x2962d5 = _0x599ae9;
      _0x599ae9 = _0x599ae9.replace(_0x5e2efa, "").trim();
    } while (_0x599ae9 !== _0x2962d5 && _0x599ae9);
    return _0x599ae9 || String(_0x4d0d18 || _0x61689d || "").trim();
  }
  function _0xda9adb(_0x7558b7) {
    return (Array.isArray(_0x7558b7) ? _0x7558b7 : []).map(_0x464867 => {
      if (!_0x464867 || typeof _0x464867 != "object") {
        return _0x464867;
      }
      let _0x42e0b7 = String(_0x464867.uid || "").trim();
      let _0x4cc2b2 = String(_0x464867.label || _0x42e0b7);
      let _0x106e42 = _0x4917be(_0x42e0b7);
      let _0x276d3e = _0x37ef6f(_0x4cc2b2, _0x42e0b7);
      return {
        ..._0x464867,
        uid: _0x42e0b7,
        label: _0x4cc2b2,
        familyKey: _0x106e42,
        familyLabel: _0x276d3e
      };
    });
  }
  function _0x5fe45c(_0x1198fd) {
    let _0x721025 = (Array.isArray(_0x1198fd) ? _0x1198fd : []).map(_0x5efeb4 => String(_0x5efeb4 || "").trim()).filter(Boolean);
    if (!_0x721025.length) {
      return "";
    }
    let _0x34ec09 = _0x59741a => {
      let _0x37c7f6 = _0x59741a.toLowerCase();
      let _0x45ca6a = 10;
      if (/(?:^|-)medium$/.test(_0x37c7f6) || /(?:^|-)medium-/.test(_0x37c7f6)) {
        _0x45ca6a = 100;
      } else if (/(?:^|-)medium-fast$/.test(_0x37c7f6)) {
        _0x45ca6a = 90;
      } else if (/(?:^|-)high$/.test(_0x37c7f6)) {
        _0x45ca6a = 50;
      } else if (/(?:^|-)low$/.test(_0x37c7f6)) {
        _0x45ca6a = 40;
      }
      if (/thinking/i.test(_0x59741a)) {
        _0x45ca6a -= 20;
      }
      return _0x45ca6a;
    };
    return _0x721025.slice().sort((_0xf38716, _0x1d4591) => {
      let _0x891ea9 = _0x34ec09(_0x1d4591) - _0x34ec09(_0xf38716);
      return _0x891ea9 || _0xf38716.localeCompare(_0x1d4591);
    })[0];
  }
  function _0x5ba8a0(_0xe2f1e1) {
    let _0x97d60d = new Map();
    for (let _0x1f7c68 of _0xda9adb(_0xe2f1e1)) {
      if (!_0x1f7c68 || !_0x1f7c68.uid) {
        continue;
      }
      let _0x579e40 = _0x1f7c68.familyKey || _0x4917be(_0x1f7c68.uid);
      if (!_0x579e40) {
        continue;
      }
      let _0x3fa716 = _0x97d60d.get(_0x579e40);
      if (!_0x3fa716) {
        _0x3fa716 = {
          familyKey: _0x579e40,
          label: _0x1f7c68.familyLabel || _0x1f7c68.label || _0x579e40,
          uids: []
        };
        _0x97d60d.set(_0x579e40, _0x3fa716);
      }
      if (!_0x3fa716.uids.includes(_0x1f7c68.uid)) {
        _0x3fa716.uids.push(_0x1f7c68.uid);
      }
      if (_0x1f7c68.familyLabel && (!_0x3fa716.label || _0x3fa716.label === _0x579e40)) {
        _0x3fa716.label = _0x1f7c68.familyLabel;
      }
    }
    let _0x40d186 = [];
    for (let _0x5bc6c3 of _0x97d60d.values()) {
      _0x5bc6c3.uids.sort();
      _0x5bc6c3.representativeUid = _0x5fe45c(_0x5bc6c3.uids);
      _0x40d186.push(_0x5bc6c3);
    }
    _0x40d186.sort((_0x39ab85, _0x315742) => String(_0x39ab85.label).localeCompare(String(_0x315742.label)));
    return _0x40d186;
  }
  function _0x4b0a0c(_0x1b1abd, _0x1c2444) {
    let _0x27af78 = String(_0x1b1abd || "").trim();
    if (!_0x27af78) {
      return [];
    }
    let _0x2c3b1a = _0x4917be(_0x27af78) || _0x27af78.toLowerCase();
    let _0x1794c0 = [];
    for (let _0x5d7bde of _0xda9adb(_0x1c2444 || [])) {
      if (!!_0x5d7bde && !!_0x5d7bde.uid) {
        if ((_0x5d7bde.familyKey || _0x4917be(_0x5d7bde.uid)) === _0x2c3b1a) {
          _0x1794c0.push(_0x5d7bde.uid);
        }
      }
    }
    if (_0x1794c0.length) {
      let _0x1499fb = Array.from(new Set(_0x1794c0));
      if (!_0x1499fb.includes(_0x27af78) && _0x4917be(_0x27af78) === _0x2c3b1a) {
        _0x1499fb.push(_0x27af78);
      }
      return _0x1499fb.sort();
    }
    return [_0x27af78];
  }
  _0x8e8964.exports = {
    VARIANT_TOKENS: _0x22f799,
    familyKeyFromUid: _0x4917be,
    familyLabelFromLabel: _0x37ef6f,
    attachFamilyMeta: _0xda9adb,
    aggregateFamilies: _0x5ba8a0,
    siblingUidsFor: _0x4b0a0c,
    preferRepresentativeUid: _0x5fe45c,
    isBlockedLocalBindEntry: _0x17138f
  };
});
var Rs = Zo((_0x2567a7, _0x11b873) => {
  'use strict';

  var {
    familyKeyFromUid: _0x3cc6f8
  } = bs();
  var _0x52d49b = {
    MODEL_CLAUDE_4_OPUS_BYOK: "MODEL_CLAUDE_4_OPUS",
    MODEL_CLAUDE_4_OPUS_THINKING_BYOK: "MODEL_CLAUDE_4_OPUS_THINKING",
    MODEL_CLAUDE_4_SONNET_BYOK: "MODEL_CLAUDE_4_SONNET",
    MODEL_CLAUDE_4_SONNET_THINKING_BYOK: "MODEL_CLAUDE_4_SONNET_THINKING",
    CLAUDE_4_OPUS_BYOK: "MODEL_CLAUDE_4_OPUS",
    CLAUDE_4_OPUS_THINKING_BYOK: "MODEL_CLAUDE_4_OPUS_THINKING",
    CLAUDE_4_SONNET_BYOK: "MODEL_CLAUDE_4_SONNET",
    CLAUDE_4_SONNET_THINKING_BYOK: "MODEL_CLAUDE_4_SONNET_THINKING"
  };
  function _0x599da2(_0x41a649) {
    let _0x5e6411 = String(_0x41a649 || "").trim();
    if (!_0x5e6411) {
      return "";
    }
    if (_0x52d49b[_0x5e6411]) {
      return _0x52d49b[_0x5e6411];
    }
    if (/_BYOK$/i.test(_0x5e6411)) {
      let _0x3c7094 = _0x5e6411.replace(/_BYOK$/i, "");
      if (_0x3c7094) {
        if (/^MODEL_/i.test(_0x3c7094)) {
          return _0x3c7094;
        } else {
          return "MODEL_" + _0x3c7094;
        }
      } else {
        return "";
      }
    }
    return "";
  }
  function _0x1e594b(_0x55abc2) {
    let _0x1c9304 = String(_0x55abc2 || "").trim();
    let _0x3bde93 = _0x1c9304.toLowerCase().replace(/_/g, "-");
    let _0x3a87fb = /(?:^|-)thinking(?:-|$)/i.test(_0x3bde93) || /thinking/i.test(_0x1c9304);
    let _0x32d9b4 = /(?:^|-)1m(?:-|$)/i.test(_0x3bde93);
    let _0x43941c = _0x3bde93.split("-").filter(Boolean);
    let _0x563fd8 = "";
    for (let _0x30c681 = _0x43941c.length - 1; _0x30c681 >= 0; _0x30c681--) {
      if (["low", "medium", "high", "xhigh", "max"].includes(_0x43941c[_0x30c681])) {
        _0x563fd8 = _0x43941c[_0x30c681];
        break;
      }
    }
    if (!_0x563fd8 && _0x3a87fb) {
      _0x563fd8 = "max";
    }
    return {
      thinking: !!_0x3a87fb,
      thinkingBudget: 0,
      effort: _0x563fd8 || "",
      context1m: !!_0x32d9b4
    };
  }
  _0x11b873.exports = {
    LEGACY_BYOK_TO_OFFICIAL: _0x52d49b,
    officialUidFromLegacyByok: _0x599da2,
    deriveVariantOptsFromUid: _0x1e594b,
    familyKeyFromUid: _0x3cc6f8
  };
});
import _0x5d4ade from "node:http2";
import _0x3e1fad from "node:https";
import _0x412940 from "node:https";
import _0x4712c4 from "node:http";
import _0x20cdd6 from "node:crypto";
import { StringDecoder as _0x26edd0 } from "node:string_decoder";
import _0x37c79b from "node:fs";
import _0x499561 from "node:path";
function $n(_0x4de502) {
  let _0x599bca = [];
  let _0x44c7ee = typeof _0x4de502 == "bigint" ? _0x4de502 : BigInt(_0x4de502);
  if (_0x44c7ee < 0x0n) {
    _0x44c7ee = _0x44c7ee + (0x1n << 0x40n);
  }
  do {
    let _0x2fc4fd = Number(_0x44c7ee & 0x7fn);
    _0x44c7ee >>= 0x7n;
    if (_0x44c7ee > 0x0n) {
      _0x2fc4fd |= 128;
    }
    _0x599bca.push(_0x2fc4fd);
  } while (_0x44c7ee > 0x0n);
  return Buffer.from(_0x599bca);
}
function vn(_0xc316a9, _0x5a9887) {
  let _0x5ece3f = 0x0n;
  let _0x3ce7f1 = 0x0n;
  let _0x37443e = _0x5a9887;
  while (_0x37443e < _0xc316a9.length) {
    let _0x2e3865 = _0xc316a9[_0x37443e++];
    _0x5ece3f |= BigInt(_0x2e3865 & 127) << _0x3ce7f1;
    if ((_0x2e3865 & 128) === 0) {
      break;
    }
    _0x3ce7f1 += 0x7n;
  }
  return {
    value: _0x5ece3f,
    bytesRead: _0x37443e - _0x5a9887
  };
}
function wn(_0x4aaa34, _0x148e29) {
  return $n(_0x4aaa34 << 3 | _0x148e29);
}
function $e(_0x291a82, _0x4e7bb0) {
  return Buffer.concat([wn(_0x291a82, 0), $n(_0x4e7bb0)]);
}
function Pn(_0x73173b, _0x2e44fc) {
  let _0xc6c73a = Buffer.isBuffer(_0x2e44fc) ? _0x2e44fc : Buffer.from(_0x2e44fc);
  return Buffer.concat([wn(_0x73173b, 2), $n(_0xc6c73a.length), _0xc6c73a]);
}
function le(_0x12fe93, _0x13470f) {
  return Pn(_0x12fe93, Buffer.from(_0x13470f, "utf8"));
}
function Ae(_0x526ae5, _0xbef659) {
  return Pn(_0x526ae5, _0xbef659);
}
function er(_0x122098, _0xd20e6e) {
  return Buffer.concat([wn(_0x122098, 1), _0xd20e6e]);
}
function ge(_0x7cb968) {
  let _0x3e606f = [];
  let _0x3bd4a0 = 0;
  while (_0x3bd4a0 < _0x7cb968.length) {
    let _0x1779e0 = vn(_0x7cb968, _0x3bd4a0);
    _0x3bd4a0 += _0x1779e0.bytesRead;
    let _0x4c22aa = _0x1779e0.value;
    let _0x38fac3 = Number(_0x4c22aa >> 0x3n);
    let _0x14db19 = Number(_0x4c22aa & 0x7n);
    if (_0x38fac3 === 0) {
      break;
    }
    switch (_0x14db19) {
      case 0:
        {
          let _0x25a565 = vn(_0x7cb968, _0x3bd4a0);
          _0x3bd4a0 += _0x25a565.bytesRead;
          _0x3e606f.push({
            field: _0x38fac3,
            wireType: 0,
            value: Number(_0x25a565.value)
          });
          break;
        }
      case 1:
        {
          _0x3e606f.push({
            field: _0x38fac3,
            wireType: 1,
            value: _0x7cb968.slice(_0x3bd4a0, _0x3bd4a0 + 8)
          });
          _0x3bd4a0 += 8;
          break;
        }
      case 2:
        {
          let _0xb5a222 = vn(_0x7cb968, _0x3bd4a0);
          _0x3bd4a0 += _0xb5a222.bytesRead;
          let _0x38526e = Number(_0xb5a222.value);
          _0x3e606f.push({
            field: _0x38fac3,
            wireType: 2,
            value: _0x7cb968.slice(_0x3bd4a0, _0x3bd4a0 + _0x38526e)
          });
          _0x3bd4a0 += _0x38526e;
          break;
        }
      case 5:
        {
          _0x3e606f.push({
            field: _0x38fac3,
            wireType: 5,
            value: _0x7cb968.slice(_0x3bd4a0, _0x3bd4a0 + 4)
          });
          _0x3bd4a0 += 4;
          break;
        }
      default:
        console.warn("[proto] Unknown wire type " + _0x14db19 + " at field " + _0x38fac3 + ", offset " + _0x3bd4a0 + " — skipping remaining bytes");
        return _0x3e606f;
    }
  }
  return _0x3e606f;
}
function W(_0x1e1dbe, _0xe70a9a, _0x225cd0) {
  return _0x1e1dbe.find(_0x12cf98 => _0x12cf98.field === _0xe70a9a && (_0x225cd0 === undefined || _0x12cf98.wireType === _0x225cd0));
}
function It(_0x49e4e0, _0x3eaa87) {
  return _0x49e4e0.filter(_0x325895 => _0x325895.field === _0x3eaa87);
}
import _0x6a1054 from "node:zlib";
function Gt(_0x4759e5) {
  return _0x6a1054.gzipSync(_0x4759e5);
}
function Ln(_0x35f544) {
  try {
    return _0x6a1054.gunzipSync(_0x35f544);
  } catch {
    return null;
  }
}
function Ce(_0x40852f, _0x48d2d5 = true) {
  if (_0x48d2d5) {
    let _0x12bbba = Gt(_0x40852f);
    let _0x5e8d59 = Buffer.alloc(5);
    _0x5e8d59[0] = 1;
    _0x5e8d59.writeUInt32BE(_0x12bbba.length, 1);
    return Buffer.concat([_0x5e8d59, _0x12bbba]);
  }
  let _0x1b8137 = Buffer.alloc(5);
  _0x1b8137[0] = 0;
  _0x1b8137.writeUInt32BE(_0x40852f.length, 1);
  return Buffer.concat([_0x1b8137, _0x40852f]);
}
function ct() {
  let _0x1c0a26 = Gt(Buffer.from("{}"));
  let _0x59d858 = Buffer.alloc(5);
  _0x59d858[0] = 3;
  _0x59d858.writeUInt32BE(_0x1c0a26.length, 1);
  return Buffer.concat([_0x59d858, _0x1c0a26]);
}
function lt(_0x1db86c, _0x4f0630) {
  let _0x1bf97e = (_0x4f0630["connect-content-encoding"] || _0x4f0630["content-encoding"] || "").includes("gzip");
  let _0x1d1a64 = _0x1db86c;
  if (_0x1bf97e) {
    let _0x3d673e = Ln(_0x1d1a64);
    if (_0x3d673e) {
      _0x1d1a64 = _0x3d673e;
    }
  }
  if (_0x1d1a64.length > 5) {
    let _0x14792d = _0x1d1a64[0];
    if (_0x1d1a64.readUInt32BE(1) === _0x1d1a64.length - 5 && _0x14792d <= 1) {
      let _0x1a8ba8 = _0x1d1a64.slice(5);
      if (_0x14792d === 1) {
        let _0xabf617 = Ln(_0x1a8ba8);
        if (_0xabf617) {
          _0x1a8ba8 = _0xabf617;
        }
      }
      return _0x1a8ba8;
    }
  }
  return _0x1d1a64;
}
function Bn(_0x394eda) {
  return Gt(_0x394eda);
}
function Dn() {
  return {
    "content-type": "application/proto",
    "content-encoding": "gzip"
  };
}
function At() {
  return {
    "content-type": "application/connect+proto",
    "connect-content-encoding": "gzip",
    "transfer-encoding": "chunked"
  };
}
var or = new Set(["read_file", "edit", "multi_edit", "write_to_file", "run_command", "grep_search", "find_by_name", "list_dir", "code_search", "command_status", "browser_preview", "todo_list", "ask_user_question", "deploy_web_app", "read_deployment_config", "check_deploy_status", "create_memory", "search_web", "read_url_content", "view_content_chunk", "skill", "edit_notebook", "read_notebook", "trajectory_search", "read_resource", "list_resources", "read_terminal"]);
function Un(_0x13897f) {
  return typeof _0x13897f == "string" && /^mcp\d+_/i.test(_0x13897f);
}
function Me(_0xc07ac1, _0x49467a) {
  if (Un(_0xc07ac1)) {
    return {
      toolName: _0xc07ac1,
      params: _e(_0x49467a)
    };
  }
  let _0x58843d = _0xc07ac1;
  let _0x5a4243 = _e(_0x49467a);
  _0x58843d = {
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
  }[_0x58843d] || _0x58843d;
  if (_0x58843d === "read_file") {
    b(_0x5a4243, "target_file", "file_path");
    b(_0x5a4243, "path", "file_path");
    b(_0x5a4243, "TargetFile", "file_path");
  }
  if (_0x58843d === "list_dir") {
    b(_0x5a4243, "directory", "DirectoryPath");
    b(_0x5a4243, "path", "DirectoryPath");
  }
  if (_0x58843d === "code_search") {
    b(_0x5a4243, "query", "search_term");
    b(_0x5a4243, "prompt", "search_term");
    b(_0x5a4243, "path", "search_folder_absolute_uri");
    b(_0x5a4243, "directory", "search_folder_absolute_uri");
    b(_0x5a4243, "SearchPath", "search_folder_absolute_uri");
  }
  if (_0x58843d === "grep_search") {
    b(_0x5a4243, "path", "SearchPath");
    b(_0x5a4243, "directory", "SearchPath");
    b(_0x5a4243, "query", "Query");
    b(_0x5a4243, "pattern", "Query");
    nr(_0x5a4243, "include", "Includes");
    nr(_0x5a4243, "includes", "Includes");
  }
  if (_0x58843d === "run_command") {
    b(_0x5a4243, "command", "CommandLine");
    b(_0x5a4243, "cmd", "CommandLine");
    b(_0x5a4243, "cwd", "Cwd");
    b(_0x5a4243, "working_directory", "Cwd");
    b(_0x5a4243, "blocking", "Blocking");
    b(_0x5a4243, "safe", "SafeToAutoRun");
  }
  if (_0x58843d === "todo_list") {
    if (_0x5a4243.items !== undefined && _0x5a4243.todos === undefined) {
      let _0xd0dfab = Array.isArray(_0x5a4243.items) ? _0x5a4243.items : String(_0x5a4243.items).split(/[,，]/).map(_0x38e16d => _0x38e16d.trim()).filter(Boolean);
      _0x5a4243.todos = _0xd0dfab.map((_0x3467f6, _0x553bf3) => ({
        id: String(_0x553bf3 + 1),
        content: typeof _0x3467f6 == "string" ? _0x3467f6 : _0x3467f6.content || _0x3467f6.text || String(_0x3467f6),
        priority: "medium",
        status: "pending"
      }));
      delete _0x5a4243.items;
    }
    if (_0x5a4243.tasks !== undefined && _0x5a4243.todos === undefined) {
      _0x5a4243.todos = Array.isArray(_0x5a4243.tasks) ? _0x5a4243.tasks : [];
      delete _0x5a4243.tasks;
    }
    if (Array.isArray(_0x5a4243.todos)) {
      _0x5a4243.todos = _0x5a4243.todos.map((_0x40a7b7, _0x15ceff) => typeof _0x40a7b7 == "string" ? {
        id: String(_0x15ceff + 1),
        content: _0x40a7b7,
        priority: "medium",
        status: "pending"
      } : typeof _0x40a7b7 == "object" && _0x40a7b7 !== null ? {
        id: _0x40a7b7.id || String(_0x15ceff + 1),
        content: _0x40a7b7.content || _0x40a7b7.text || _0x40a7b7.title || String(_0x40a7b7),
        priority: _0x40a7b7.priority || "medium",
        status: _0x40a7b7.status || "pending"
      } : {
        id: String(_0x15ceff + 1),
        content: String(_0x40a7b7),
        priority: "medium",
        status: "pending"
      });
    }
    delete _0x5a4243.operation;
  }
  if (_0x58843d === "write_to_file") {
    b(_0x5a4243, "file_path", "TargetFile");
    b(_0x5a4243, "path", "TargetFile");
    b(_0x5a4243, "target_file", "TargetFile");
    b(_0x5a4243, "content", "CodeContent");
    b(_0x5a4243, "code", "CodeContent");
    b(_0x5a4243, "text", "CodeContent");
    if (_0x5a4243.EmptyFile === undefined) {
      _0x5a4243.EmptyFile = false;
    }
  }
  if (_0x58843d === "ask_user_question") {
    b(_0x5a4243, "question_text", "question");
    b(_0x5a4243, "prompt", "question");
    b(_0x5a4243, "message", "question");
    b(_0x5a4243, "choices", "options");
    b(_0x5a4243, "allow_multiple", "allowMultiple");
    b(_0x5a4243, "multi", "allowMultiple");
    b(_0x5a4243, "multiple", "allowMultiple");
  }
  if (_0x58843d === "edit") {
    b(_0x5a4243, "path", "file_path");
    b(_0x5a4243, "target_file", "file_path");
    b(_0x5a4243, "search", "old_string");
    b(_0x5a4243, "replace", "new_string");
    b(_0x5a4243, "description", "explanation");
  }
  if (_0x58843d === "multi_edit") {
    b(_0x5a4243, "path", "file_path");
    b(_0x5a4243, "target_file", "file_path");
    b(_0x5a4243, "description", "explanation");
  }
  if (_0x58843d === "find_by_name") {
    b(_0x5a4243, "path", "SearchDirectory");
    b(_0x5a4243, "directory", "SearchDirectory");
    b(_0x5a4243, "pattern", "Pattern");
    b(_0x5a4243, "type", "Type");
  }
  if (_0x58843d === "browser_preview") {
    b(_0x5a4243, "title", "Name");
    b(_0x5a4243, "name", "Name");
    b(_0x5a4243, "url", "Url");
  }
  if (_0x58843d === "search_web") {
    b(_0x5a4243, "q", "query");
    b(_0x5a4243, "term", "query");
    b(_0x5a4243, "site", "domain");
  }
  let _0x4ff8d3 = Yi(_0x58843d, _0x5a4243);
  return {
    toolName: _0x58843d,
    params: _0x4ff8d3
  };
}
function _e(_0x4673ed) {
  if (_0x4673ed == null) {
    return {};
  }
  if (typeof _0x4673ed == "string") {
    let _0x12081d = _0x4673ed.trim();
    if (_0x12081d.startsWith("{") && _0x12081d.endsWith("}") || _0x12081d.startsWith("[") && _0x12081d.endsWith("]")) {
      try {
        return _e(JSON.parse(_0x12081d));
      } catch {
        return _0x4673ed;
      }
    }
    return _0x4673ed;
  }
  if (Array.isArray(_0x4673ed)) {
    return _0x4673ed.map(_0x1b9b81 => _e(_0x1b9b81));
  }
  if (typeof _0x4673ed == "object") {
    let _0x3a6a7e = {};
    for (let [_0x706038, _0x12edf5] of Object.entries(_0x4673ed)) {
      _0x3a6a7e[_0x706038] = _e(_0x12edf5);
    }
    return _0x3a6a7e;
  }
  return _0x4673ed;
}
function Yi(_0x1c5e1b, _0x402301) {
  if (!_0x402301 || typeof _0x402301 != "object" || Array.isArray(_0x402301)) {
    return _0x402301;
  }
  let _0x1c7e11 = {};
  for (let [_0x29a1e4, _0x4a3246] of Object.entries(_0x402301)) {
    let _0x2577ef = _0x4a3246;
    if (typeof _0x2577ef != "string") {
      _0x1c7e11[_0x29a1e4] = _e(_0x2577ef);
      continue;
    }
    let _0x2d09c5 = _0x2577ef.trim();
    if (_0x2d09c5 === "true") {
      _0x1c7e11[_0x29a1e4] = true;
      continue;
    }
    if (_0x2d09c5 === "false") {
      _0x1c7e11[_0x29a1e4] = false;
      continue;
    }
    if (_0x2d09c5.startsWith("[") && _0x2d09c5.endsWith("]") || _0x2d09c5.startsWith("{") && _0x2d09c5.endsWith("}")) {
      try {
        _0x1c7e11[_0x29a1e4] = _e(JSON.parse(_0x2d09c5));
        continue;
      } catch {}
    }
    _0x1c7e11[_0x29a1e4] = _0x2577ef;
  }
  if (_0x1c5e1b === "ask_user_question" && _0x1c7e11.options !== undefined) {
    _0x1c7e11.options = qi(_0x1c7e11.options);
    if (_0x1c7e11.allowMultiple === undefined) {
      _0x1c7e11.allowMultiple = false;
    }
  }
  return _0x1c7e11;
}
function qi(_0x2b4bf7) {
  if (Array.isArray(_0x2b4bf7)) {
    return _0x2b4bf7.map(_0x5a3d68 => {
      if (typeof _0x5a3d68 == "string") {
        let _0x2f2f97 = _0x5a3d68.trim();
        if (_0x2f2f97) {
          return {
            label: _0x2f2f97,
            description: _0x2f2f97
          };
        } else {
          return null;
        }
      }
      if (_0x5a3d68 && typeof _0x5a3d68 == "object") {
        let _0x55eba3 = String(_0x5a3d68.label || _0x5a3d68.name || _0x5a3d68.title || "").trim();
        let _0x3b1393 = String(_0x5a3d68.description || _0x5a3d68.detail || _0x55eba3).trim();
        if (_0x55eba3) {
          return {
            label: _0x55eba3,
            description: _0x3b1393 || _0x55eba3
          };
        } else {
          return null;
        }
      }
      return null;
    }).filter(Boolean);
  } else if (typeof _0x2b4bf7 == "string") {
    return _0x2b4bf7.split(/[|,，\n]/).map(_0x20f4f6 => _0x20f4f6.trim()).filter(Boolean).map(_0x29e2a8 => ({
      label: _0x29e2a8,
      description: _0x29e2a8
    }));
  } else {
    return [];
  }
}
function b(_0x31e695, _0x1b64af, _0x479e99) {
  if (_0x31e695[_0x1b64af] !== undefined && _0x31e695[_0x479e99] === undefined) {
    _0x31e695[_0x479e99] = _0x31e695[_0x1b64af];
    delete _0x31e695[_0x1b64af];
  }
}
function nr(_0x2f971d, _0x39f8c4, _0x4f730d) {
  if (_0x2f971d[_0x39f8c4] !== undefined && _0x2f971d[_0x4f730d] === undefined) {
    _0x2f971d[_0x4f730d] = Array.isArray(_0x2f971d[_0x39f8c4]) ? _0x2f971d[_0x39f8c4] : [_0x2f971d[_0x39f8c4]];
    delete _0x2f971d[_0x39f8c4];
  }
}
function ut(_0x11ccc7) {
  if (typeof _0x11ccc7 == "string") {
    return [{
      type: "text",
      text: _0x11ccc7
    }];
  } else if (Array.isArray(_0x11ccc7)) {
    return _0x11ccc7;
  } else {
    return [];
  }
}
function dt(_0x1611b4) {
  if (!_0x1611b4 || _0x1611b4.length <= 1) {
    if (!_0x1611b4 || _0x1611b4.length === 0) {
      return _0x1611b4 || [];
    }
    let _0x3891d4 = _0x1611b4[0];
    if (!_0x3891d4 || !Array.isArray(_0x3891d4.content)) {
      return _0x1611b4;
    } else if (_0x3891d4.content.length === 1 && _0x3891d4.content[0]?.type === "text") {
      return [{
        ..._0x3891d4,
        content: _0x3891d4.content[0].text
      }];
    } else {
      return [{
        ..._0x3891d4,
        content: _0x3891d4.content.slice()
      }];
    }
  }
  let _0x52a9f3 = [{
    ..._0x1611b4[0],
    content: _0x1611b4[0].content
  }];
  for (let _0x461103 = 1; _0x461103 < _0x1611b4.length; _0x461103++) {
    let _0x2f792a = _0x52a9f3[_0x52a9f3.length - 1];
    let _0x49deca = _0x1611b4[_0x461103];
    if (_0x2f792a.role === _0x49deca.role) {
      _0x2f792a.content = [...ut(_0x2f792a.content), ...ut(_0x49deca.content)];
    } else {
      _0x52a9f3.push({
        ..._0x49deca,
        content: _0x49deca.content
      });
    }
  }
  for (let _0x48a8fe of _0x52a9f3) {
    if (!Array.isArray(_0x48a8fe.content) && typeof _0x48a8fe.content != "string") {
      continue;
    }
    let _0x5d3c73 = ut(_0x48a8fe.content);
    if (_0x5d3c73.length === 1 && _0x5d3c73[0]?.type === "text") {
      _0x48a8fe.content = _0x5d3c73[0].text;
    } else {
      _0x48a8fe.content = _0x5d3c73;
    }
  }
  return _0x52a9f3;
}
var ji = "[tool output unavailable: dropped during history compression/trim]";
function Gi(_0x4f21f6, _0x5b94f4, _0x33b8c2) {
  for (let _0x49e206 = _0x5b94f4; _0x49e206 < _0x4f21f6.length; _0x49e206++) {
    let _0xe382fa = _0x4f21f6[_0x49e206]?.content;
    if (Array.isArray(_0xe382fa)) {
      for (let _0x10f5b6 = 0; _0x10f5b6 < _0xe382fa.length; _0x10f5b6++) {
        let _0x4f2062 = _0xe382fa[_0x10f5b6];
        if (!_0x4f2062 || _0x4f2062.type !== "tool_result") {
          continue;
        }
        if ((_0x4f2062.tool_use_id != null ? String(_0x4f2062.tool_use_id).trim() : "") === _0x33b8c2) {
          _0xe382fa.splice(_0x10f5b6, 1);
          return _0x4f2062;
        }
      }
    }
  }
  return null;
}
function rr(_0x59d0fe, _0xbee4e9) {
  let _0xff83c = new Map();
  let _0x2a1bde = _0x1342ff => {
    if (_0x1342ff) {
      _0xff83c.set(_0x1342ff, (_0xff83c.get(_0x1342ff) || 0) + 1);
    }
  };
  let _0x4e56f8 = _0x59d0fe[_0xbee4e9 + 1];
  if (_0x4e56f8?.role === "user" && Array.isArray(_0x4e56f8.content)) {
    for (let _0x15b2a1 of _0x4e56f8.content) {
      if (!!_0x15b2a1 && _0x15b2a1.type === "tool_result") {
        _0x2a1bde(_0x15b2a1.tool_use_id != null ? String(_0x15b2a1.tool_use_id).trim() : "");
      }
    }
  }
  for (let _0x3fcf69 = _0xbee4e9 + 2; _0x3fcf69 < _0x59d0fe.length; _0x3fcf69++) {
    let _0x511c97 = _0x59d0fe[_0x3fcf69]?.content;
    if (Array.isArray(_0x511c97)) {
      for (let _0x7762ac of _0x511c97) {
        if (!!_0x7762ac && _0x7762ac.type === "tool_result") {
          _0x2a1bde(_0x7762ac.tool_use_id != null ? String(_0x7762ac.tool_use_id).trim() : "");
        }
      }
    }
  }
  return _0xff83c;
}
function zt(_0x3a14cb, _0x452c8d) {
  if (!_0x452c8d) {
    return false;
  }
  let _0x5db5b6 = _0x3a14cb.get(_0x452c8d) || 0;
  if (_0x5db5b6 <= 0) {
    return false;
  } else {
    _0x3a14cb.set(_0x452c8d, _0x5db5b6 - 1);
    return true;
  }
}
function sr(_0x2b7fe5) {
  if (!Array.isArray(_0x2b7fe5) || _0x2b7fe5.length === 0) {
    return {
      messages: _0x2b7fe5 || [],
      filledOrphans: 0,
      droppedResults: 0,
      assignedIds: 0,
      reorderedResults: 0,
      dedupedResults: 0
    };
  }
  let _0x147985 = _0x2b7fe5.map(_0x515885 => ({
    role: _0x515885?.role,
    content: ut(_0x515885?.content).map(_0x48263e => _0x48263e && typeof _0x48263e == "object" ? {
      ..._0x48263e
    } : _0x48263e),
    wasString: typeof _0x515885?.content == "string",
    orig: _0x515885
  }));
  let _0x33571b = 0;
  let _0x88af08 = 0;
  let _0xa9177 = 0;
  let _0x56fc02 = 0;
  let _0x48b537 = 0;
  let _0xef22ee = 0;
  let _0xc2a7f9 = new Set();
  let _0x224aae = new Set();
  let _0x20b607 = [];
  let _0xc1f502 = () => {
    let _0x545600;
    do {
      _0x545600 = "byok-synth-toolcall-" + _0xef22ee++;
    } while (_0xc2a7f9.has(_0x545600));
    _0xc2a7f9.add(_0x545600);
    return _0x545600;
  };
  let _0x282aad = _0x5139a3 => {
    let _0x3dfa8d = _0x5139a3.content;
    if (!!Array.isArray(_0x3dfa8d) && _0x3dfa8d.length !== 0) {
      if (_0x5139a3.wasString && _0x3dfa8d.length === 1 && _0x3dfa8d[0]?.type === "text") {
        _0x3dfa8d = _0x3dfa8d[0].text;
      }
      _0x20b607.push(_0x5139a3.orig ? {
        ..._0x5139a3.orig,
        role: _0x5139a3.role,
        content: _0x3dfa8d
      } : {
        role: _0x5139a3.role,
        content: _0x3dfa8d
      });
    }
  };
  for (let _0x4c56c8 = 0; _0x4c56c8 < _0x147985.length; _0x4c56c8++) {
    let _0x265549 = _0x147985[_0x4c56c8];
    let _0x4525b9 = [];
    let _0x156f17 = null;
    if (_0x265549.role === "assistant") {
      let _0x396e5d = rr(_0x147985, _0x4c56c8);
      _0x156f17 = [];
      for (let _0x50b0ea of _0x265549.content) {
        if (!_0x50b0ea || _0x50b0ea.type !== "tool_use") {
          _0x156f17.push(_0x50b0ea);
          continue;
        }
        let _0x23dcb0 = _0x50b0ea.id != null ? String(_0x50b0ea.id) : "";
        let _0x5d3dd8 = _0x23dcb0.trim();
        if (_0x5d3dd8 && _0x224aae.has(_0x5d3dd8)) {
          if (!zt(_0x396e5d, _0x5d3dd8)) {
            _0x48b537 += 1;
            continue;
          }
          let _0x536d6e = _0xc1f502();
          _0x33571b += 1;
          _0x50b0ea.id = _0x536d6e;
          _0x156f17.push(_0x50b0ea);
          _0x4525b9.push({
            id: _0x536d6e,
            originalId: _0x5d3dd8
          });
          continue;
        }
        let _0x88bcb6 = _0x5d3dd8;
        if (_0x88bcb6) {
          _0xc2a7f9.add(_0x88bcb6);
          _0x224aae.add(_0x5d3dd8);
          zt(_0x396e5d, _0x5d3dd8);
          if (_0x23dcb0 !== _0x88bcb6) {
            _0x33571b += 1;
          }
        } else {
          _0x88bcb6 = _0xc1f502();
          _0x33571b += 1;
        }
        _0x50b0ea.id = _0x88bcb6;
        _0x156f17.push(_0x50b0ea);
        _0x4525b9.push({
          id: _0x88bcb6,
          originalId: _0x5d3dd8
        });
      }
    }
    if (_0x4525b9.length === 0) {
      let _0x3cf89a = (_0x156f17 || _0x265549.content).filter(_0x5388c9 => _0x5388c9 && _0x5388c9.type === "tool_result" ? (_0xa9177 += 1, false) : true);
      _0x282aad({
        ..._0x265549,
        content: _0x3cf89a
      });
      continue;
    }
    _0x282aad({
      ..._0x265549,
      content: _0x156f17
    });
    let _0xe1f089 = _0x147985[_0x4c56c8 + 1];
    let _0x58700e = _0xe1f089?.role === "user";
    let _0x2a2a45 = _0x58700e ? _0xe1f089.content : [];
    let _0x33d3cb = new Set();
    let _0xb1dbdb = [];
    for (let _0x555985 of _0x4525b9) {
      let _0x14b05e = -1;
      for (let _0x34b2ce = 0; _0x34b2ce < _0x2a2a45.length; _0x34b2ce++) {
        if (_0x33d3cb.has(_0x34b2ce)) {
          continue;
        }
        let _0x15f0b6 = _0x2a2a45[_0x34b2ce];
        if (!_0x15f0b6 || _0x15f0b6.type !== "tool_result") {
          continue;
        }
        if ((_0x15f0b6.tool_use_id != null ? String(_0x15f0b6.tool_use_id).trim() : "") === _0x555985.originalId) {
          _0x14b05e = _0x34b2ce;
          break;
        }
      }
      if (_0x14b05e >= 0) {
        _0x33d3cb.add(_0x14b05e);
        _0xb1dbdb.push({
          ..._0x2a2a45[_0x14b05e],
          tool_use_id: _0x555985.id
        });
        continue;
      }
      if (_0x555985.originalId) {
        let _0x6d41d5 = Gi(_0x147985, _0x4c56c8 + 2, _0x555985.originalId);
        if (_0x6d41d5) {
          _0xb1dbdb.push({
            ..._0x6d41d5,
            tool_use_id: _0x555985.id
          });
          _0x56fc02 += 1;
          continue;
        }
      }
      _0xb1dbdb.push({
        type: "tool_result",
        tool_use_id: _0x555985.id,
        content: ji
      });
      _0x88af08 += 1;
    }
    if (_0x58700e) {
      let _0x5e8dc1 = [];
      for (let _0x3feb38 = 0; _0x3feb38 < _0x2a2a45.length; _0x3feb38++) {
        let _0x3689e0 = _0x2a2a45[_0x3feb38];
        if (_0x3689e0 && _0x3689e0.type === "tool_result") {
          if (!_0x33d3cb.has(_0x3feb38)) {
            _0xa9177 += 1;
          }
          continue;
        }
        _0x5e8dc1.push(_0x3689e0);
      }
      _0x282aad({
        ..._0xe1f089,
        content: [..._0xb1dbdb, ..._0x5e8dc1],
        wasString: false
      });
      _0x4c56c8 += 1;
    } else {
      _0x282aad({
        role: "user",
        content: _0xb1dbdb,
        wasString: false,
        orig: null
      });
    }
  }
  return {
    messages: _0x20b607,
    filledOrphans: _0x88af08,
    droppedResults: _0xa9177,
    assignedIds: _0x33571b,
    reorderedResults: _0x56fc02,
    dedupedResults: _0x48b537
  };
}
function ir(_0x32918a) {
  if (!Array.isArray(_0x32918a) || _0x32918a.length === 0) {
    return {
      messages: _0x32918a || [],
      droppedUses: 0,
      droppedResults: 0,
      dedupedUses: 0
    };
  }
  let _0x36fff1 = _0x32918a.map(_0x452f03 => ({
    role: _0x452f03?.role,
    content: ut(_0x452f03?.content).map(_0x3489dd => _0x3489dd && typeof _0x3489dd == "object" ? {
      ..._0x3489dd
    } : _0x3489dd),
    wasString: typeof _0x452f03?.content == "string",
    orig: _0x452f03
  }));
  let _0x2d2cf6 = -1;
  for (let _0x43b037 = 0; _0x43b037 < _0x36fff1.length; _0x43b037++) {
    if (_0x36fff1[_0x43b037].role === "assistant" && _0x36fff1[_0x43b037].content.some(_0x1f9735 => _0x1f9735 && _0x1f9735.type === "tool_use")) {
      _0x2d2cf6 = _0x43b037;
    }
  }
  let _0x555b11 = 0;
  let _0x1e5bc4 = 0;
  let _0x34205d = 0;
  let _0x56f8d = new Set();
  let _0x204887 = new Array(_0x36fff1.length).fill(null);
  let _0x510a67 = _0x12d50b => {
    let _0x53afec = _0x12d50b.content;
    if (!Array.isArray(_0x53afec) || _0x53afec.length === 0) {
      return null;
    } else {
      if (_0x12d50b.wasString && _0x53afec.length === 1 && _0x53afec[0]?.type === "text") {
        _0x53afec = _0x53afec[0].text;
      }
      if (_0x12d50b.orig) {
        return {
          ..._0x12d50b.orig,
          role: _0x12d50b.role,
          content: _0x53afec
        };
      } else {
        return {
          role: _0x12d50b.role,
          content: _0x53afec
        };
      }
    }
  };
  for (let _0x6a9d62 = 0; _0x6a9d62 < _0x36fff1.length; _0x6a9d62++) {
    let _0x3109b3 = _0x36fff1[_0x6a9d62];
    if (_0x3109b3.role !== "assistant") {
      let _0x3dcfbe = _0x3109b3.content.filter(_0x22f4a4 => {
        if (_0x22f4a4 && _0x22f4a4.type === "tool_result") {
          let _0x7fe816 = _0x22f4a4.tool_use_id != null ? String(_0x22f4a4.tool_use_id).trim() : "";
          if (_0x7fe816 && _0x56f8d.has(_0x7fe816)) {
            return true;
          } else {
            _0x1e5bc4 += 1;
            return false;
          }
        }
        return true;
      });
      _0x204887[_0x6a9d62] = _0x510a67({
        ..._0x3109b3,
        content: _0x3dcfbe
      });
      continue;
    }
    let _0x106029 = rr(_0x36fff1, _0x6a9d62);
    let _0xdf457a = _0x6a9d62 === _0x2d2cf6 && _0x6a9d62 === _0x36fff1.length - 1;
    let _0x4f8830 = [];
    for (let _0x17b875 of _0x3109b3.content) {
      if (!_0x17b875 || _0x17b875.type !== "tool_use") {
        _0x4f8830.push(_0x17b875);
        continue;
      }
      let _0x34f029 = _0x17b875.id != null ? String(_0x17b875.id).trim() : "";
      if (_0x34f029 && _0x56f8d.has(_0x34f029)) {
        if (zt(_0x106029, _0x34f029)) {
          _0x4f8830.push(_0x17b875);
        } else {
          _0x34205d += 1;
        }
        continue;
      }
      if (_0x34f029) {
        if (zt(_0x106029, _0x34f029) || _0xdf457a) {
          _0x56f8d.add(_0x34f029);
          _0x4f8830.push(_0x17b875);
        } else {
          _0x555b11 += 1;
        }
        continue;
      }
      if (_0xdf457a) {
        _0x4f8830.push(_0x17b875);
      } else {
        _0x555b11 += 1;
      }
    }
    _0x204887[_0x6a9d62] = _0x510a67({
      ..._0x3109b3,
      content: _0x4f8830
    });
  }
  return {
    messages: _0x204887,
    droppedUses: _0x555b11,
    droppedResults: _0x1e5bc4,
    dedupedUses: _0x34205d
  };
}
function ar(_0x24909b) {
  if (!Array.isArray(_0x24909b) || _0x24909b.length === 0) {
    return {
      messages: _0x24909b || [],
      stripped: 0
    };
  }
  let _0x48ce54 = _0x24909b.slice();
  let _0xcef86b = 0;
  while (_0x48ce54.length > 0) {
    let _0x555b6d = _0x48ce54[_0x48ce54.length - 1];
    if (!_0x555b6d || _0x555b6d.role !== "assistant" || ut(_0x555b6d.content).some(_0x3c9b62 => _0x3c9b62 && _0x3c9b62.type === "tool_use")) {
      break;
    }
    _0x48ce54.pop();
    _0xcef86b++;
  }
  if (_0x48ce54.length === 0) {
    return {
      messages: _0x24909b,
      stripped: 0
    };
  } else {
    return {
      messages: _0x48ce54,
      stripped: _0xcef86b
    };
  }
}
var Fe = ["<tool_call>", "<tool>", "<minimax:tool_call", "<tool_calls_section_begin>", "{\"action\":\"tool_call\"", "{\"action\": \"tool_call\""];
var Ct = Math.max(...Fe.map(_0x441f2b => _0x441f2b.length));
var Wt = ["user Tool results:", "<function_results>", "</function_results>", "<function_calls>", "</function_calls>", "<parameter", "</parameter>", "<invoke", "</invoke>", "<additional_metadata>", "<user_request>", "</user_request>"];
var zi = /(?:^|\n)user(?=请|继续)/;
function Xt(_0x3fc1cd) {
  if (!_0x3fc1cd || typeof _0x3fc1cd != "string") {
    return -1;
  }
  let _0xafafe3 = -1;
  for (let _0x3c86f2 of Wt) {
    let _0x26d518 = _0x3fc1cd.indexOf(_0x3c86f2);
    if (_0x26d518 !== -1 && (_0xafafe3 === -1 || _0x26d518 < _0xafafe3)) {
      _0xafafe3 = _0x26d518;
    }
  }
  let _0x3bc035 = zi.exec(_0x3fc1cd);
  if (_0x3bc035) {
    let _0x3dbb89 = _0x3bc035[0].startsWith("\n") ? _0x3bc035.index + 1 : _0x3bc035.index;
    if (_0xafafe3 === -1 || _0x3dbb89 < _0xafafe3) {
      _0xafafe3 = _0x3dbb89;
    }
  }
  return _0xafafe3;
}
function kt(_0x2bad8c) {
  let _0x458b30 = new Map();
  for (let _0x8d582c of _0x2bad8c) {
    if (!_0x8d582c || typeof _0x8d582c.name != "string") {
      continue;
    }
    let _0x42a69a = Me(_0x8d582c.name, _0x8d582c.input ?? _0x8d582c.arguments ?? _0x8d582c.params ?? {});
    if (!_0x42a69a.toolName) {
      continue;
    }
    let _0x24c3b1 = _0x42a69a.params ?? {};
    if (typeof _0x24c3b1 != "object" || _0x24c3b1 == null || Array.isArray(_0x24c3b1)) {
      continue;
    }
    let _0x59e341 = _0x42a69a.toolName + ":" + JSON.stringify(_0x24c3b1);
    if (!_0x458b30.has(_0x59e341)) {
      _0x458b30.set(_0x59e341, {
        name: _0x42a69a.toolName,
        input: _0x24c3b1
      });
    }
  }
  return [..._0x458b30.values()];
}
function Wi(_0xc91ea3, _0x18dbaa) {
  if (!_0xc91ea3 || _0x18dbaa < 0 || _0x18dbaa >= _0xc91ea3.length || _0xc91ea3[_0x18dbaa] !== "{") {
    return null;
  }
  let _0x44799d = 0;
  let _0x4f740d = false;
  let _0x93cc4d = false;
  for (let _0x311b11 = _0x18dbaa; _0x311b11 < _0xc91ea3.length; _0x311b11++) {
    let _0x482b21 = _0xc91ea3[_0x311b11];
    if (_0x4f740d) {
      if (_0x93cc4d) {
        _0x93cc4d = false;
      } else if (_0x482b21 === "\\") {
        _0x93cc4d = true;
      } else if (_0x482b21 === "\"") {
        _0x4f740d = false;
      }
      continue;
    }
    if (_0x482b21 === "\"") {
      _0x4f740d = true;
      continue;
    }
    if (_0x482b21 === "{") {
      _0x44799d++;
    }
    if (_0x482b21 === "}" && (_0x44799d--, _0x44799d === 0)) {
      return _0xc91ea3.slice(_0x18dbaa, _0x311b11 + 1);
    }
  }
  return null;
}
function be(_0x197585) {
  if (!_0x197585 || typeof _0x197585 != "string") {
    return -1;
  }
  let _0x29d36a = -1;
  for (let _0x3d0983 of Fe) {
    let _0x38de6e = _0x197585.indexOf(_0x3d0983);
    if (_0x38de6e !== -1 && (_0x29d36a === -1 || _0x38de6e < _0x29d36a)) {
      _0x29d36a = _0x38de6e;
    }
  }
  return _0x29d36a;
}
function Xi(_0x1f41d5) {
  if (!_0x1f41d5 || typeof _0x1f41d5 != "string") {
    return [];
  }
  let _0x512d64 = [];
  let _0x496eab = ["{\"action\":\"tool_call\"", "{\"action\": \"tool_call\""];
  for (let _0x101b16 of _0x496eab) {
    let _0x5a0584 = 0;
    while (_0x5a0584 < _0x1f41d5.length) {
      let _0x348f7b = _0x1f41d5.indexOf(_0x101b16, _0x5a0584);
      if (_0x348f7b === -1) {
        break;
      }
      let _0x3b22d0 = Wi(_0x1f41d5, _0x348f7b);
      if (!_0x3b22d0) {
        break;
      }
      try {
        let _0x45a0f4 = JSON.parse(_0x3b22d0);
        if (_0x45a0f4 && _0x45a0f4.action === "tool_call" && Array.isArray(_0x45a0f4.tool_calls)) {
          _0x512d64.push(..._0x45a0f4.tool_calls.map(_0x478fcf => ({
            name: _0x478fcf?.name,
            input: _e(_0x478fcf?.arguments ?? {})
          })));
        }
      } catch {}
      _0x5a0584 = _0x348f7b + _0x101b16.length;
    }
  }
  return kt(_0x512d64);
}
function Vi(_0x40b87e) {
  if (!_0x40b87e || typeof _0x40b87e != "string") {
    return [];
  }
  let _0x3635d5 = [..._0x40b87e.matchAll(/<tool(?:_call)?>\s*([\w.-]+)\s*(\{[\s\S]*?\})(?=\s*(?:<\/tool(?:_call)?>|$))/g)];
  if (_0x3635d5.length === 0) {
    return [];
  }
  let _0x2403cd = [];
  for (let _0x1f47fa of _0x3635d5) {
    let _0x6f34d5 = _0x1f47fa[1];
    let _0x2ec694 = _0x1f47fa[2];
    try {
      _0x2403cd.push({
        name: _0x6f34d5,
        input: _e(JSON.parse(_0x2ec694))
      });
    } catch {}
  }
  return kt(_0x2403cd);
}
function Ji(_0x1b8d6e) {
  if (!_0x1b8d6e || typeof _0x1b8d6e != "string") {
    return [];
  }
  let _0x3570fc = [];
  let _0xfdd13c = /<minimax:tool_call[^>]*>([\s\S]*?)<\/minimax:tool_call>/g;
  let _0x102a1e;
  while ((_0x102a1e = _0xfdd13c.exec(_0x1b8d6e)) !== null) {
    let _0x2879e5 = _0x102a1e[1].trim();
    if (!_0x2879e5) {
      continue;
    }
    try {
      let _0x19d0a6 = JSON.parse(_0x2879e5);
      let _0x59e71b = _0x19d0a6.name || _0x19d0a6.tool_name || _0x19d0a6.function || "";
      let _0x12d07a = _0x19d0a6.arguments || _0x19d0a6.parameters || _0x19d0a6.input || _0x19d0a6.params || {};
      if (!_0x59e71b) {
        continue;
      }
      _0x3570fc.push({
        name: _0x59e71b,
        input: _e(typeof _0x12d07a == "string" ? JSON.parse(_0x12d07a) : _0x12d07a)
      });
      continue;
    } catch {}
    let _0x4e824f = _0x2879e5.split("\n").map(_0x45d1a3 => _0x45d1a3.trim()).filter(Boolean);
    if (_0x4e824f.length >= 2) {
      let _0x268061 = _0x4e824f[0].replace(/^functions\./, "").replace(/:\d+$/, "");
      try {
        _0x3570fc.push({
          name: _0x268061,
          input: _e(JSON.parse(_0x4e824f.slice(1).join("")))
        });
      } catch {}
    }
  }
  return kt(_0x3570fc);
}
function Qi(_0x53914c) {
  if (!_0x53914c || typeof _0x53914c != "string") {
    return [];
  }
  let _0x294443 = [];
  let _0x49f949 = _0x53914c.indexOf("<tool_calls_section_begin>");
  let _0x198a23 = _0x53914c.indexOf("<tool_calls_section_end>");
  if (_0x49f949 === -1) {
    return _0x294443;
  }
  let _0x36cea5 = _0x53914c.substring(_0x49f949, _0x198a23 !== -1 ? _0x198a23 : undefined);
  let _0x25b97c = /<tool_call_begin>\s*([\s\S]*?)<tool_call_end>/g;
  let _0x714e43;
  while ((_0x714e43 = _0x25b97c.exec(_0x36cea5)) !== null) {
    let _0x4ae193 = _0x714e43[1];
    let _0x325dda = _0x4ae193.match(/^\s*(?:functions\.)?([\w.-]+?)(?::\d+)?\s*<tool_call_argument_begin>/s);
    if (!_0x325dda) {
      continue;
    }
    let _0x3efaea = _0x325dda[1];
    let _0x2c469c = _0x4ae193.indexOf("<tool_call_argument_begin>");
    if (_0x2c469c === -1) {
      continue;
    }
    let _0x102954 = _0x4ae193.substring(_0x2c469c + 26).trim();
    try {
      _0x294443.push({
        name: _0x3efaea,
        input: _e(JSON.parse(_0x102954))
      });
    } catch {}
  }
  return kt(_0x294443);
}
function Vt(_0x204b64) {
  if (!_0x204b64 || typeof _0x204b64 != "string") {
    return [];
  }
  let _0x51f14b = [Xi, Vi, Ji, Qi];
  let _0x146694 = [];
  for (let _0x1117bf of _0x51f14b) {
    let _0x41e2e1 = _0x1117bf(_0x204b64);
    if (_0x41e2e1.length > 0) {
      _0x146694.push(..._0x41e2e1);
    }
  }
  return kt(_0x146694);
}
import _0x20800d from "node:fs";
import _0x4a95f2 from "node:path";
import { format as _0x5e1c1a } from "node:util";
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
    e.on("error", _0x3e839d => {
      if (!_0x3e839d || _0x3e839d.code !== "EPIPE") {
        throw _0x3e839d;
      }
    });
  }
}
var ze = String(process.env.BYOK_PROXY_LOG_PATH || "").trim();
var ta = 5242880;
var na = 0;
function oa() {
  if (ze) {
    try {
      if (_0x20800d.statSync(ze).size < ta) {
        return;
      }
      let _0x17a2cc = ze + ".1";
      try {
        _0x20800d.rmSync(_0x17a2cc, {
          force: true
        });
      } catch {}
      _0x20800d.renameSync(ze, _0x17a2cc);
    } catch {}
  }
}
function ra(_0x3b9a1a) {
  if (ze) {
    try {
      if (na++ % 200 === 0) {
        oa();
      }
      _0x20800d.mkdirSync(_0x4a95f2.dirname(ze), {
        recursive: true
      });
      _0x20800d.appendFileSync(ze, _0x5e1c1a(..._0x3b9a1a) + "\n", "utf8");
    } catch {}
  }
}
for (let e of ["log", "info", "warn", "error"]) {
  let t = console[e].bind(console);
  console[e] = (..._0x14eeb0) => {
    ra(_0x14eeb0);
    t(..._0x14eeb0);
  };
}
var Jt = process.env.VERBOSE_PROXY === "1" || process.env.VERBOSE_LOG === "1";
var ft = process.env.VERBOSE_CHAT === "1" || Jt;
var y = {
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
function E(_0x55ecdc, _0x440df6, {
  id: _0x4f7a72,
  err: _0x36572e = false
} = {}) {
  let _0x24ec4a = "  " + (_0x4f7a72 != null ? "[#" + _0x4f7a72 + "] " : "") + "[" + _0x55ecdc + "] " + _0x440df6;
  if (_0x36572e) {
    console.error(_0x24ec4a);
  } else {
    console.log(_0x24ec4a);
  }
}
function ce(_0xcd9027, _0x4acd8c = {}) {
  E(y.ERR, _0xcd9027, {
    ..._0x4acd8c,
    err: true
  });
}
function Hn(_0x36f1e9) {
  let _0x4c78ec = [];
  let _0x36f3fc = String(_0x36f1e9?.defaultModel ?? "").trim();
  if (_0x36f3fc) {
    _0x4c78ec.push("model=" + _0x36f3fc);
  }
  let _0x5baaae = _0x36f1e9?.maxTokens;
  if (Number.isInteger(_0x5baaae) && _0x5baaae >= 0) {
    _0x4c78ec.push("maxTokens=" + _0x5baaae);
  }
  return _0x4c78ec.join(", ");
}
var sa = new Set(["Ping", "GetUserStatus", "GetModelStatuses", "GetUserSettings", "GetWorkspaceSettings", "RecordAnalyticsEvent", "RecordCortexTrajectoryStep", "RecordCortexGeneratorMetadata", "RecordTrajectorySegmentAnalytics", "RecordCortexTrajectorySegment", "RecordStateUpdate", "RecordAsyncTelemetry", "RecordFeedback", "RecordBugReport", "Heartbeat", "GetStatus", "GetCommandModelConfigs", "GetAllAcpRegistries", "GetProfileData", "GetDefaultWorkflowTemplates", "GetMcpClientInfos", "GetUserJwt", "CheckUserMessageRateLimit"]);
function Fn(_0xd49206) {
  if (!_0xd49206 || Jt) {
    return false;
  } else {
    return !!sa.has(_0xd49206) || !!_0xd49206.startsWith("Record");
  }
}
function cr(_0x91ec0d) {
  return Jt || process.env.LOG_MODEL_CAPTURE === "1" || !!_0x91ec0d;
}
function lr(_0x3e29e1, _0x4e8f45, _0x16c824) {
  if (!Jt) {
    return;
  }
  let _0xaf73e0 = typeof _0x16c824 == "function" ? _0x16c824 : () => new Date().toISOString().slice(11, 23);
  let _0x5a55c8 = String(_0x4e8f45 || "GET").toUpperCase();
  console.log("[" + _0xaf73e0() + "] #" + _0x3e29e1 + " /api/config (" + _0x5a55c8 + ")");
}
function Qt(_0x3f704e, _0x4a94c, _0x1e87b5, _0x670bef) {
  let _0x2b47cd = typeof _0x670bef == "function" ? _0x670bef : () => new Date().toISOString().slice(11, 23);
  let _0x51b0c1 = String(_0x4a94c || "GET").toUpperCase();
  let _0x199880 = _0x1e87b5 != null && _0x1e87b5 !== "" ? " " + _0x1e87b5 : "";
  console.log("[" + _0x2b47cd() + "] #" + _0x3f704e + " /api/config (" + _0x51b0c1 + ") fail" + _0x199880);
}
var ur = process.env.SYSTEM_PROMPT_OVERRIDE === "true";
var bt = process.env.SYSTEM_PROMPT_PATH || "";
var ia = process.env.DEBUG_UNKNOWN_FIELDS === "1";
var aa = process.env.DEBUG_EXPORT_SYSTEM_PROMPT === "1";
var Yn = process.env.DEBUG_SYSTEM_PROMPT_DUMP_PATH || "./debug/original-system-prompt.txt";
var ca = process.env.DEBUG_EXPORT_TURNS === "1";
var Zt = {
  content: "",
  mtime: 0,
  path: ""
};
var qn = {
  content: "",
  path: ""
};
function la() {
  if (!ur || !bt) {
    return "";
  }
  try {
    let _0x2f1172 = _0x37c79b.statSync(bt);
    if (Zt.path === bt && Zt.mtime === _0x2f1172.mtimeMs) {
      return Zt.content;
    }
    let _0x15b3ea = _0x37c79b.readFileSync(bt, "utf8").trim();
    Zt = {
      content: _0x15b3ea,
      mtime: _0x2f1172.mtimeMs,
      path: bt
    };
    console.log("  Custom system prompt loaded (" + _0x15b3ea.length + " chars)");
    return _0x15b3ea;
  } catch (_0x8d0bd) {
    console.error("  ❌ Failed to load custom system prompt: " + _0x8d0bd.message);
    return "";
  }
}
function ua(_0x1553f9) {
  if (!aa || !_0x1553f9) {
    return;
  }
  let _0x2e1820 = _0x499561.isAbsolute(Yn) ? Yn : _0x499561.resolve(process.cwd(), Yn);
  if (qn.path !== _0x2e1820 || qn.content !== _0x1553f9) {
    try {
      _0x37c79b.mkdirSync(_0x499561.dirname(_0x2e1820), {
        recursive: true
      });
      let _0x267eb4 = _0x1553f9.split("\n").map(_0x39fb46 => /(?:key|token|secret|password|credential)\s*[:=]\s*\S/i.test(_0x39fb46) ? "[REDACTED]" : _0x39fb46).join("\n");
      _0x37c79b.writeFileSync(_0x2e1820, _0x267eb4.trim() + "\n", {
        encoding: "utf8",
        mode: 384
      });
      qn = {
        content: _0x1553f9,
        path: _0x2e1820
      };
      console.log("  Dumped original system prompt to " + _0x2e1820 + " (" + _0x1553f9.length + " chars)");
      console.warn("  DEBUG_EXPORT_SYSTEM_PROMPT is ON — disable in production");
    } catch (_0x270a1b) {
      console.error("  ❌ Failed to dump original system prompt: " + _0x270a1b.message);
    }
  }
}
var da = {
  0: "UNSPECIFIED",
  1: "USER",
  2: "SYSTEM(assistant)",
  3: "UNKNOWN(assistant)",
  4: "TOOL",
  5: "SYSTEM_PROMPT"
};
function fa(_0x167cc6) {
  if (!ca || !Array.isArray(_0x167cc6) || _0x167cc6.length === 0) {
    return;
  }
  let _0x402a7c = 300;
  let _0x822f27 = 150;
  E(y.DETAIL, "▼ CLIENT TURNS DUMP · " + _0x167cc6.length + " prompts");
  _0x167cc6.forEach((_0x5cef87, _0x362c36) => {
    let _0x36c5fb = da[_0x5cef87.source] ?? "src=" + _0x5cef87.source;
    let _0x405cd9 = typeof _0x5cef87.prompt == "string" ? _0x5cef87.prompt : "";
    let _0x27648f = _0x405cd9.length;
    let _0x15383f;
    if (_0x27648f <= _0x402a7c + _0x822f27) {
      _0x15383f = _0x405cd9;
    } else {
      _0x15383f = _0x405cd9.slice(0, _0x402a7c) + ("\n…(" + (_0x27648f - _0x402a7c - _0x822f27) + " chars omitted)…\n") + _0x405cd9.slice(_0x27648f - _0x822f27);
    }
    let _0x10f48f = _0x15383f.split("\n").map(_0x59ea09 => /(?:key|token|secret|password|credential)\s*[:=]\s*\S/i.test(_0x59ea09) ? "[REDACTED]" : _0x59ea09).join("\n");
    E(y.DETAIL, "[" + _0x362c36 + "] " + _0x36c5fb + " · id=" + (_0x5cef87.messageId || "-") + " · " + _0x27648f + "chars:\n" + _0x10f48f);
  });
  E(y.DETAIL, "▲ CLIENT TURNS DUMP END");
}
var pa = ["tool_calling", "making_code_changes", "debugging", "running_commands", "calling_external_apis", "communication", "workflows"];
var ha = [/^There will be an <ephemeral_message>/];
function ma(_0xd1594e) {
  let _0x44d1c9 = [];
  for (let _0x517973 of pa) {
    let _0x5ed2a2 = new RegExp("<" + _0x517973 + ">[\\s\\S]*?</" + _0x517973 + ">", "g");
    let _0x38ff09;
    while ((_0x38ff09 = _0x5ed2a2.exec(_0xd1594e)) !== null) {
      _0x44d1c9.push(_0x38ff09[0]);
    }
    let _0x545d11 = "<" + _0x517973 + " ";
    let _0x31c47e = "</" + _0x517973 + ">";
    let _0x30d118 = _0xd1594e.indexOf(_0x545d11);
    while (_0x30d118 !== -1) {
      let _0x26a30c = _0xd1594e.indexOf(_0x31c47e, _0x30d118);
      if (_0x26a30c !== -1) {
        _0x44d1c9.push(_0xd1594e.slice(_0x30d118, _0x26a30c + _0x31c47e.length));
      }
      _0x30d118 = _0xd1594e.indexOf(_0x545d11, _0x30d118 + 1);
    }
  }
  for (let _0x56b15f of _0xd1594e.split("\n")) {
    let _0x4ae789 = _0x56b15f.trim();
    if (ha.some(_0x3a1e73 => _0x3a1e73.test(_0x4ae789))) {
      _0x44d1c9.push(_0x4ae789);
    }
  }
  return _0x44d1c9.join("\n\n");
}
function jn(_0x15ab05) {
  if (_0x15ab05) {
    return _0x15ab05.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  } else {
    return "";
  }
}
var Te = {
  UNSPECIFIED: 0,
  USER: 1,
  SYSTEM: 2,
  UNKNOWN: 3,
  TOOL: 4,
  SYSTEM_PROMPT: 5
};
function ga(_0x42d253) {
  let _0xee420d = ge(_0x42d253);
  let _0x2985dc = W(_0xee420d, 1, 2);
  let _0x5ab652 = W(_0xee420d, 2, 2);
  let _0x401d24 = W(_0xee420d, 3, 2);
  return {
    base64_data: _0x2985dc ? _0x2985dc.value.toString("utf8") : "",
    mime_type: _0x5ab652 ? _0x5ab652.value.toString("utf8") : "image/png",
    caption: _0x401d24 ? _0x401d24.value.toString("utf8") : ""
  };
}
function _a(_0x462dca) {
  let _0x221cba = ge(_0x462dca);
  let _0x4ecf66 = W(_0x221cba, 1, 2);
  let _0x4ca75f = W(_0x221cba, 2, 2);
  let _0x4a22ba = W(_0x221cba, 3, 2);
  let _0x10293b = _0x4ca75f ? _0x4ca75f.value.toString("utf8") : "";
  let _0x2bbd09 = _0x4a22ba ? _0x4a22ba.value.toString("utf8") : "{}";
  let _0x35409e = Me(_0x10293b, _0x2bbd09);
  return {
    id: _0x4ecf66 ? _0x4ecf66.value.toString("utf8") : "",
    name: _0x35409e.toolName,
    arguments_json: JSON.stringify(_0x35409e.params ?? {})
  };
}
function Ta(_0x3ceecf) {
  let _0x411275 = ge(_0x3ceecf);
  let _0x3ebaf8 = W(_0x411275, 1, 2);
  let _0x57cfb0 = W(_0x411275, 2, 0);
  let _0x31040a = W(_0x411275, 3, 2);
  let _0x32234f = W(_0x411275, 4, 0);
  let _0x572ae6 = W(_0x411275, 7, 2);
  let _0x46d6b7 = W(_0x411275, 9, 0);
  let _0x802b3f = W(_0x411275, 11, 2);
  let _0x2b4c67 = W(_0x411275, 12, 2);
  let _0xa6135 = It(_0x411275, 6);
  let _0x588d7d = It(_0x411275, 10);
  return {
    messageId: _0x3ebaf8 ? _0x3ebaf8.value.toString("utf8") : "",
    source: _0x57cfb0 ? _0x57cfb0.value : 0,
    prompt: _0x31040a ? _0x31040a.value.toString("utf8") : "",
    numTokens: _0x32234f && Number(_0x32234f.value) || 0,
    toolCalls: _0xa6135.map(_0xc1e411 => _a(_0xc1e411.value)),
    toolCallId: _0x572ae6 ? _0x572ae6.value.toString("utf8") : "",
    toolResultIsError: _0x46d6b7 ? !!_0x46d6b7.value : false,
    images: _0x588d7d.map(_0x25181b => ga(_0x25181b.value)),
    thinking: _0x802b3f ? _0x802b3f.value.toString("utf8") : "",
    signature: _0x2b4c67 ? _0x2b4c67.value.toString("utf8") : ""
  };
}
function Sa(_0xda4851) {
  let _0xe199eb = ge(_0xda4851);
  let _0x5e6533 = W(_0xe199eb, 1, 2);
  let _0x3e1c6b = W(_0xe199eb, 2, 2);
  let _0x1f3976 = W(_0xe199eb, 3, 2);
  let _0x4be959 = _0x5e6533 ? _0x5e6533.value.toString("utf8") : "";
  let _0x2da9f6 = _0x3e1c6b ? _0x3e1c6b.value.toString("utf8") : "";
  let _0x201d42 = _0x1f3976 ? _0x1f3976.value.toString("utf8") : "{}";
  let _0x2af986;
  try {
    _0x2af986 = JSON.parse(_0x201d42);
  } catch {
    _0x2af986 = {
      type: "object",
      properties: {}
    };
  }
  _0x2af986.type ||= "object";
  if (_0x2af986.type === "object" && !_0x2af986.properties) {
    _0x2af986.properties = {};
  }
  return {
    name: or.has(_0x4be959) || Un(_0x4be959) ? _0x4be959 : Me(_0x4be959, {}).toolName || _0x4be959,
    description: _0x2da9f6,
    input_schema: _0x2af986
  };
}
function ya(_0x2f2aa1) {
  let _0x45c727 = ge(_0x2f2aa1);
  let _0x2f7b34 = W(_0x45c727, 1, 2);
  let _0x5278bf = W(_0x45c727, 2, 2);
  let _0x55a668 = _0x5278bf ? _0x5278bf.value.toString("utf8").trim() : "";
  let _0x1df915 = _0x2f7b34 ? _0x2f7b34.value.toString("utf8").trim() : "";
  if (_0x55a668) {
    return {
      type: "tool",
      name: Me(_0x55a668, {}).toolName
    };
  }
  if (_0x1df915) {
    return {
      type: _0x1df915
    };
  }
}
function Ea(_0x2d792c) {
  let {
    source: _0x36a7a3,
    prompt: _0x4aad16,
    toolCalls: _0x2916ad,
    toolCallId: _0x30eaf4,
    toolResultIsError: _0x5c541b,
    images: _0x234632,
    thinking: _0x2ca855,
    signature: _0x3645f0
  } = _0x2d792c;
  if (_0x36a7a3 === Te.SYSTEM_PROMPT || _0x36a7a3 === Te.UNSPECIFIED) {
    return null;
  }
  if (_0x36a7a3 === Te.TOOL) {
    let _0x7331c0 = {
      type: "tool_result",
      tool_use_id: _0x30eaf4,
      content: _0x4aad16
    };
    if (_0x5c541b) {
      _0x7331c0.is_error = true;
    }
    return {
      role: "user",
      content: [_0x7331c0]
    };
  }
  if (_0x36a7a3 === Te.USER) {
    if (_0x234632 && _0x234632.length > 0) {
      let _0x299b0f = [];
      for (let _0x5431b3 of _0x234632) {
        if (_0x5431b3.base64_data) {
          _0x299b0f.push({
            type: "image",
            source: {
              type: "base64",
              media_type: _0x5431b3.mime_type || "image/png",
              data: _0x5431b3.base64_data
            }
          });
        }
      }
      if (_0x4aad16) {
        _0x299b0f.push({
          type: "text",
          text: _0x4aad16
        });
      }
      return {
        role: "user",
        content: _0x299b0f
      };
    }
    return {
      role: "user",
      content: _0x4aad16
    };
  }
  if (_0x36a7a3 === Te.UNKNOWN || _0x36a7a3 === Te.SYSTEM) {
    let _0x228176 = [];
    let _0x5240f0 = _0x4aad16;
    if (typeof _0x5240f0 == "string" && _0x5240f0) {
      let _0x348d1a = Xt(_0x5240f0);
      if (_0x348d1a !== -1) {
        let _0x221506 = _0x5240f0.length - _0x348d1a;
        _0x5240f0 = _0x5240f0.slice(0, _0x348d1a).replace(/\s+$/, "");
        E(y.TOOL, "清创 assistant 越界正文 · 截断 " + _0x221506 + " chars（从 turn-bleed 标记处）");
      }
    }
    if (_0x2ca855 && _0x3645f0) {
      _0x228176.push({
        type: "thinking",
        thinking: _0x2ca855,
        signature: _0x3645f0
      });
    }
    if (_0x5240f0) {
      _0x228176.push({
        type: "text",
        text: _0x5240f0
      });
    }
    for (let _0x3d1ea6 of _0x2916ad) {
      let _0x5b0f9c;
      try {
        _0x5b0f9c = JSON.parse(_0x3d1ea6.arguments_json);
      } catch {
        _0x5b0f9c = {};
      }
      _0x228176.push({
        type: "tool_use",
        id: _0x3d1ea6.id,
        name: _0x3d1ea6.name,
        input: _0x5b0f9c
      });
    }
    if (_0x228176.length > 1 || _0x228176.length === 1 && _0x228176[0].type !== "text") {
      return {
        role: "assistant",
        content: _0x228176
      };
    } else {
      return {
        role: "assistant",
        content: _0x5240f0
      };
    }
  }
  return null;
}
function dr(_0x16bbd5, _0x457048) {
  let _0x52975e = lt(_0x16bbd5, _0x457048);
  let _0x3cdc3f = ge(_0x52975e);
  let _0x3e0eb6 = new Set([1, 2, 3, 10, 12, 16, 21]);
  let _0x1b9a3d = _0x3cdc3f.filter(_0x55c02c => !_0x3e0eb6.has(_0x55c02c.field));
  if (_0x1b9a3d.length > 0) {
    let _0x2e48ac = _0x1b9a3d.map(_0x346d18 => _0x346d18.field + "/" + _0x346d18.wireType).join(", ");
    if (ia) {
      console.log("  GetChatMessage unknown fields: " + _0x2e48ac);
      for (let _0x555920 of _0x1b9a3d) {
        if (_0x555920.wireType === 0) {
          console.log("    field " + _0x555920.field + " (varint): " + _0x555920.value);
        } else if (_0x555920.wireType === 2) {
          let _0x1aff41 = _0x555920.value.toString("utf8");
          let _0x4ef008 = /^[\x20-\x7e\n\r\t]+$/.test(_0x1aff41.slice(0, 50));
          console.log("    field " + _0x555920.field + " (bytes/" + _0x555920.value.length + "b): " + (_0x4ef008 ? _0x1aff41.slice(0, 120) : "[binary " + _0x555920.value.toString("hex").slice(0, 40) + "]"));
        } else {
          console.log("    field " + _0x555920.field + " (wire " + _0x555920.wireType + "): " + _0x555920.value?.toString?.("hex")?.slice(0, 40));
        }
      }
    }
  }
  let _0x43fa68 = W(_0x3cdc3f, 2, 2);
  let _0x19b985 = _0x43fa68 ? _0x43fa68.value.toString("utf8") : "";
  ua(_0x19b985);
  if (ur) {
    let _0x6da302 = la();
    if (_0x6da302) {
      let _0x45f612 = _0x19b985.length;
      let _0x4fb104 = jn(ma(_0x19b985));
      _0x19b985 = jn(_0x4fb104 ? _0x6da302 + "\n\n" + _0x4fb104 : _0x6da302);
      console.log("  System prompt: custom " + _0x6da302.length + " + preserved " + _0x4fb104.length + " chars (was " + _0x45f612 + ")");
    }
  }
  let _0x56d795 = W(_0x3cdc3f, 21, 2);
  let _0x3c218a = _0x56d795 ? _0x56d795.value.toString("utf8") : "";
  let _0x2130ff = W(_0x3cdc3f, 16, 2);
  let _0x35dda2 = _0x2130ff ? _0x2130ff.value.toString("utf8").trim() : "";
  let _0x1027fc = It(_0x3cdc3f, 3, 2).map(_0x5e7c98 => Ta(_0x5e7c98.value));
  fa(_0x1027fc);
  for (let _0x3dcf39 of _0x1027fc) {
    if (_0x3dcf39.source === Te.SYSTEM_PROMPT && _0x3dcf39.prompt) {
      _0x19b985 += (_0x19b985 ? "\n\n" : "") + _0x3dcf39.prompt;
    }
  }
  _0x19b985 = jn(_0x19b985);
  let _0x3421c0 = "agent";
  let _0x49a2b8 = _0x1027fc.filter(_0x93cab7 => _0x93cab7.source !== Te.SYSTEM_PROMPT && _0x93cab7.source !== Te.UNSPECIFIED);
  if (_0x49a2b8.length > 0) {
    let _0x4165be = _0x49a2b8[_0x49a2b8.length - 1];
    if (_0x4165be.source === Te.USER) {
      let _0x1bbd02 = _0x49a2b8.length >= 2 ? _0x49a2b8[_0x49a2b8.length - 2] : null;
      if (!_0x1bbd02 || _0x1bbd02.source !== Te.TOOL) {
        _0x3421c0 = "user";
      } else {
        console.log("  Agent-round trailing USER text (" + _0x4165be.prompt.length + " chars): \"" + _0x4165be.prompt.slice(0, 150) + "...\"");
      }
    }
  }
  let _0x220213 = [];
  for (let _0x1afd68 of _0x1027fc) {
    let _0x4a5893 = Ea(_0x1afd68);
    if (_0x4a5893) {
      _0x220213.push({
        messageId: _0x1afd68.messageId || "",
        numTokens: _0x1afd68.numTokens || 0,
        source: _0x1afd68.source,
        message: _0x4a5893
      });
    }
  }
  let _0x179a4b = dt(_0x220213.map(_0xc044bb => _0xc044bb.message));
  let _0x121b9c = _0x1027fc.reduce((_0x5ac420, _0x5aa6bf) => {
    let _0x4133ef = _0x5aa6bf.prompt ? _0x5aa6bf.prompt.length : 0;
    _0x5ac420.promptChars += _0x4133ef;
    if (_0x5aa6bf.source !== Te.SYSTEM_PROMPT && _0x5aa6bf.source !== Te.UNSPECIFIED) {
      _0x5ac420.messageChars += _0x4133ef;
    }
    if (_0x5aa6bf.numTokens > 0) {
      _0x5ac420.tokenTotal += _0x5aa6bf.numTokens;
      _0x5ac420.tokenFields += 1;
    }
    return _0x5ac420;
  }, {
    tokenTotal: 0,
    tokenFields: 0,
    promptChars: 0,
    systemPromptChars: _0x19b985.length,
    messageChars: 0
  });
  _0x121b9c.totalChars = _0x121b9c.systemPromptChars + _0x121b9c.messageChars;
  let _0x389a56 = It(_0x3cdc3f, 10, 2).map(_0x395212 => Sa(_0x395212.value)).filter(_0x3ef8c9 => _0x3ef8c9.name);
  if (_0x389a56.length > 0) {
    let _0x3b1295 = new Map();
    for (let _0x194d06 of _0x389a56) {
      if (_0x194d06.name) {
        if (!_0x3b1295.has(_0x194d06.name)) {
          _0x3b1295.set(_0x194d06.name, _0x194d06);
        }
      }
    }
    _0x389a56 = [..._0x3b1295.values()];
  }
  if (_0x389a56.length === 0) {
    _0x389a56 = undefined;
  }
  let _0x347cec = W(_0x3cdc3f, 12, 2);
  let _0x4e6ae5 = _0x347cec ? ya(_0x347cec.value) : undefined;
  return {
    systemPrompt: _0x19b985,
    messages: _0x179a4b,
    promptEntries: _0x220213,
    tools: _0x389a56,
    toolChoice: _0x4e6ae5,
    requestedModel: _0x3c218a,
    cascadeId: _0x35dda2,
    initiator: _0x3421c0,
    contextStats: _0x121b9c
  };
}
import _0x5734e9 from "node:fs";
import _0x41d675 from "node:path";
function Nt(_0x115ba2) {
  let _0x3043f0 = parseInt(String(_0x115ba2 ?? "").trim(), 10);
  if (Number.isFinite(_0x3043f0) && _0x3043f0 > 0) {
    return _0x3043f0;
  } else {
    return 0;
  }
}
var xa = 1000000;
var sn = 256000;
var pt = 512000;
var Rr = 1000000;
var fr = 0.7;
var pr = 0.6;
var Oa = 0.6;
var hr = 0.97;
var mr = 0.94;
var Ia = 2 / 3;
var Aa = 300000;
var gr = 32;
var _r = 86400000;
var Tr = 3;
var vr = 2;
var Ca = 8;
var $r = 2;
var ka = 400;
var fe = {
  tokens: 0,
  limit: 0,
  inboundTokens: 0,
  restoredMsgs: 0,
  inboundMsgs: 0,
  reason: "",
  cascadeId: "",
  ts: 0
};
var de = new Map();
var Ma = 64;
var ee = new Map();
var Ne = new Map();
var We = "";
var wr = false;
var tn = null;
var Gn = false;
var zn = false;
function Jn() {
  let _0x456bb9 = String(process.env.BYOK_HISTORY_CACHE ?? "1").trim().toLowerCase();
  return _0x456bb9 !== "0" && _0x456bb9 !== "false" && _0x456bb9 !== "off" && _0x456bb9 !== "no";
}
function Ee() {
  let _0x2fe34d = Nt(process.env.BYOK_HISTORY_TOKEN_LIMIT);
  if (_0x2fe34d > 0) {
    return _0x2fe34d;
  }
  let _0xb7d34a = Nt(process.env.BYOK_UI_CONTEXT_LIMIT || process.env.BYOK_CONTEXT_LIMIT);
  if (_0xb7d34a > 0) {
    return _0xb7d34a;
  } else {
    return xa;
  }
}
function an(_0xa6803a, _0x13f43e, _0x4da3e6, _0x2d1703, _0x147c4b) {
  if (_0xa6803a <= _0x13f43e) {
    return _0x2d1703;
  }
  if (_0xa6803a >= _0x4da3e6) {
    return _0x147c4b;
  }
  let _0x66ee5 = (_0xa6803a - _0x13f43e) / (_0x4da3e6 - _0x13f43e);
  return _0x2d1703 + (_0x147c4b - _0x2d1703) * _0x66ee5;
}
function ba(_0x4dd635 = 0) {
  let _0x56e3bc = _0x4dd635 > 0 ? _0x4dd635 : Ee();
  if (_0x56e3bc <= sn) {
    return fr;
  } else if (_0x56e3bc <= pt) {
    return an(_0x56e3bc, sn, pt, fr, pr);
  } else {
    return an(_0x56e3bc, pt, Rr, pr, Oa);
  }
}
function Na(_0x529040 = 0) {
  let _0x35c9fc = _0x529040 > 0 ? _0x529040 : Ee();
  if (_0x35c9fc <= sn) {
    return hr;
  } else if (_0x35c9fc <= pt) {
    return an(_0x35c9fc, sn, pt, hr, mr);
  } else {
    return an(_0x35c9fc, pt, Rr, mr, Ia);
  }
}
function Ra() {
  let _0x5a5ae0 = String(process.env.BYOK_HISTORY_SOFT_TOKEN_CAP ?? "").trim().toLowerCase();
  if (_0x5a5ae0 === "0" || _0x5a5ae0 === "off" || _0x5a5ae0 === "false" || _0x5a5ae0 === "no") {
    return 0;
  }
  let _0x251a3b = Nt(_0x5a5ae0);
  if (_0x251a3b > 0) {
    return _0x251a3b;
  } else {
    return Aa;
  }
}
function va(_0x467f86 = 0, _0x238373 = 0) {
  let _0x1be394 = String(process.env.BYOK_HISTORY_SOFT_TOKEN_LIMIT ?? "").trim().toLowerCase();
  if (_0x1be394 === "0" || _0x1be394 === "off" || _0x1be394 === "false" || _0x1be394 === "no") {
    return 0;
  }
  let _0x42c93a = Nt(_0x1be394);
  if (_0x42c93a > 0) {
    return _0x42c93a;
  }
  let _0x49c333 = _0x467f86 > 0 ? _0x467f86 : Ee();
  let _0x4c2465 = Math.max(1024, Math.floor(_0x49c333 * ba(_0x238373)));
  let _0x6771d7 = Ra();
  if (_0x6771d7 > 0) {
    return Math.max(1024, Math.min(_0x4c2465, _0x6771d7));
  } else {
    return _0x4c2465;
  }
}
function $a(_0x28dc75, _0x15c097 = 0) {
  if (_0x28dc75 > 0) {
    return Math.max(1024, Math.min(Math.floor(_0x28dc75), Math.floor(_0x28dc75 * Na(_0x15c097))));
  } else {
    return 0;
  }
}
function wa() {
  let _0xf71765 = String(process.env.BYOK_HISTORY_CACHE_PATH || "").trim();
  if (_0xf71765) {
    return _0xf71765;
  }
  let _0x5e329e = String(process.env.MODEL_CAPTURE_PATH || "").trim();
  if (_0x5e329e) {
    return _0x41d675.join(_0x41d675.dirname(_0x5e329e), "history-cache.json");
  } else {
    return "";
  }
}
function Pa() {
  let _0x2bba2b = parseInt(String(process.env.BYOK_HISTORY_MAX_SESSIONS || gr), 10);
  if (Number.isFinite(_0x2bba2b) && _0x2bba2b > 0) {
    return _0x2bba2b;
  } else {
    return gr;
  }
}
function Pr() {
  let _0x415b6c = parseInt(String(process.env.BYOK_HISTORY_TTL_MS || _r), 10);
  if (Number.isFinite(_0x415b6c) && _0x415b6c > 0) {
    return _0x415b6c;
  } else {
    return _r;
  }
}
function La() {
  let _0x4a333a = parseInt(String(process.env.BYOK_HISTORY_MIN_OVERLAP || Tr), 10);
  let _0x57f663 = Number.isFinite(_0x4a333a) && _0x4a333a > 0 ? _0x4a333a : Tr;
  return Math.max(vr, _0x57f663);
}
function Ke(_0x6f2eb3) {
  return typeof _0x6f2eb3 == "string" && _0x6f2eb3.startsWith("id:");
}
function Ba(_0xd4bc62) {
  for (let _0x51d711 of _0xd4bc62 || []) {
    let _0xa897a0 = String(_0x51d711?.messageId || "").trim();
    if (_0xa897a0) {
      return _0xa897a0;
    }
  }
  return "";
}
function Da(_0x3b6ee6, _0x21853e) {
  let _0x4e1692 = new Set();
  for (let _0x1a1080 of _0x3b6ee6 || []) {
    if (Ke(_0x1a1080.fp)) {
      _0x4e1692.add(_0x1a1080.fp);
    }
  }
  if (!_0x4e1692.size) {
    return 0;
  }
  let _0x2bc181 = 0;
  for (let _0x4bf9fa of _0x21853e || []) {
    if (Ke(_0x4bf9fa.fp) && _0x4e1692.has(_0x4bf9fa.fp)) {
      _0x2bc181 += 1;
    }
  }
  return _0x2bc181;
}
function Qn() {
  let _0x8cf06e = String(process.env.BYOK_HISTORY_PERSIST ?? "1").trim().toLowerCase();
  return _0x8cf06e !== "0" && _0x8cf06e !== "false" && _0x8cf06e !== "off" && _0x8cf06e !== "no";
}
function cn() {
  if (!!Qn() && !!We) {
    if (tn) {
      clearTimeout(tn);
    }
    tn = setTimeout(() => {
      tn = null;
      Ua().catch(() => {});
    }, ka);
  }
}
async function Ua() {
  if (!!Qn() && !!We) {
    if (Gn) {
      zn = true;
      return;
    }
    Gn = true;
    try {
      let _0x48dbea = {
        version: $r,
        savedAt: Date.now(),
        hint: {
          ...fe
        },
        hintBySession: [...de.entries()].map(([_0x594cc9, _0x31e7a1]) => ({
          sessionKey: _0x594cc9,
          tokens: Math.max(0, Number(_0x31e7a1?.tokens) || 0),
          limit: Math.max(0, Number(_0x31e7a1?.limit) || 0),
          inboundTokens: Math.max(0, Number(_0x31e7a1?.inboundTokens) || 0),
          restoredMsgs: Math.max(0, Number(_0x31e7a1?.restoredMsgs) || 0),
          inboundMsgs: Math.max(0, Number(_0x31e7a1?.inboundMsgs) || 0),
          reason: String(_0x31e7a1?.reason || ""),
          cascadeId: String(_0x31e7a1?.cascadeId || ""),
          ts: Number(_0x31e7a1?.ts) || Date.now(),
          activityTs: Number(_0x31e7a1?.activityTs) || Number(_0x31e7a1?.ts) || Date.now()
        })),
        sessions: [...ee.entries()].map(([_0x12ab37, _0x525efc]) => ({
          key: _0x12ab37,
          updatedAt: _0x525efc.updatedAt,
          hits: _0x525efc.hits || 0,
          entries: (_0x525efc.entries || []).map(oe)
        }))
      };
      let _0x455591 = _0x41d675.dirname(We);
      _0x5734e9.mkdirSync(_0x455591, {
        recursive: true
      });
      let _0x4049d2 = We + "." + process.pid + ".tmp";
      _0x5734e9.writeFileSync(_0x4049d2, JSON.stringify(_0x48dbea), "utf8");
      let _0x4f26a2 = [40, 80, 160, 320];
      let _0x35189d = false;
      for (let _0xa6b6f1 = 0;; _0xa6b6f1++) {
        try {
          _0x5734e9.renameSync(_0x4049d2, We);
          _0x35189d = true;
          break;
        } catch (_0x948547) {
          if (!_0x948547 || _0x948547.code !== "EPERM" && _0x948547.code !== "EACCES" && _0x948547.code !== "EBUSY" || _0xa6b6f1 >= _0x4f26a2.length) {
            throw _0x948547;
          }
          await new Promise(_0x313bd0 => setTimeout(_0x313bd0, _0x4f26a2[_0xa6b6f1]));
        }
      }
    } catch (_0x2cf89d) {
      try {
        console.warn("[history-cache] persist failed: " + _0x2cf89d.message);
      } catch {}
      try {
        _0x5734e9.unlinkSync(We + "." + process.pid + ".tmp");
      } catch {}
    } finally {
      Gn = false;
      if (zn) {
        zn = false;
        cn();
      }
    }
  }
}
function Lr() {
  Ne.clear();
  for (let [_0x5aee64, _0x5c4dd1] of ee) {
    for (let _0x2d7837 of _0x5c4dd1.entries || []) {
      if (_0x2d7837?.fp && Ke(_0x2d7837.fp)) {
        Ne.set(_0x2d7837.fp, _0x5aee64);
      }
    }
  }
}
function Ha() {
  if (!ee.size) {
    return;
  }
  let _0x4cc202 = String(fe.cascadeId || "");
  let _0x2610a0 = Math.max(0, Number(fe.limit) || 300000);
  for (let [_0x283eba, _0x5a6cc2] of ee) {
    if (!_0x283eba || de.has(_0x283eba)) {
      continue;
    }
    let _0x338a1e = _0x5a6cc2?.entries || [];
    let _0x37d22c = _0x338a1e.reduce((_0x2933e4, _0xb347e1) => _0x2933e4 + we(_0xb347e1), 0);
    de.set(_0x283eba, {
      tokens: Math.max(0, _0x37d22c),
      limit: _0x2610a0,
      inboundTokens: Math.max(0, _0x37d22c),
      restoredMsgs: _0x338a1e.length,
      inboundMsgs: _0x338a1e.length,
      reason: "seeded",
      cascadeId: _0x4cc202,
      ts: Number(_0x5a6cc2?.updatedAt) || Date.now(),
      activityTs: Number(_0x5a6cc2?.updatedAt) || Date.now(),
      sessionKey: _0x283eba
    });
  }
  oo();
}
function Fa(_0x490676 = "") {
  let _0x185c84 = String(_0x490676 || wa() || "").trim();
  We = _0x185c84;
  wr = true;
  if (!_0x185c84 || !Qn()) {
    return {
      ok: false,
      reason: "disabled"
    };
  }
  try {
    if (!_0x5734e9.existsSync(_0x185c84)) {
      return {
        ok: true,
        reason: "missing",
        sessions: 0
      };
    }
    let _0x906ebf = JSON.parse(_0x5734e9.readFileSync(_0x185c84, "utf8"));
    if (!_0x906ebf || _0x906ebf.version !== $r || !Array.isArray(_0x906ebf.sessions)) {
      if (_0x906ebf && Number(_0x906ebf.version) === 1) {
        try {
          console.warn("[history-cache] drop polluted v1 cache (multi-chat cross-talk); starting clean v2");
          _0x5734e9.renameSync(_0x185c84, _0x185c84 + ".v1-polluted.bak");
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
    ee.clear();
    let _0x774a4b = Date.now();
    let _0x2a93cf = Pr();
    for (let _0x24a699 of _0x906ebf.sessions) {
      let _0x25d6b4 = String(_0x24a699?.key || "").trim();
      if (!_0x25d6b4 || !Array.isArray(_0x24a699.entries) || !_0x24a699.entries.length) {
        continue;
      }
      let _0x58483e = Number(_0x24a699.updatedAt) || _0x774a4b;
      if (_0x774a4b - _0x58483e > _0x2a93cf) {
        continue;
      }
      let _0x4e0c18 = Dr(_0x24a699.entries);
      if (_0x4e0c18.length) {
        ee.set(_0x25d6b4, {
          entries: _0x4e0c18,
          updatedAt: _0x58483e,
          hits: Number(_0x24a699.hits) || 0
        });
      }
    }
    Lr();
    Kr();
    if (_0x906ebf.hint && typeof _0x906ebf.hint == "object") {
      fe = {
        tokens: Math.max(0, Number(_0x906ebf.hint.tokens) || 0),
        limit: Math.max(0, Number(_0x906ebf.hint.limit) || Ee()),
        inboundTokens: Math.max(0, Number(_0x906ebf.hint.inboundTokens) || 0),
        restoredMsgs: Math.max(0, Number(_0x906ebf.hint.restoredMsgs) || 0),
        inboundMsgs: Math.max(0, Number(_0x906ebf.hint.inboundMsgs) || 0),
        reason: String(_0x906ebf.hint.reason || "loaded"),
        cascadeId: String(_0x906ebf.hint.cascadeId || ""),
        sessionKey: String(_0x906ebf.hint.sessionKey || ""),
        ts: Number(_0x906ebf.hint.ts) || _0x774a4b
      };
    }
    de.clear();
    if (Array.isArray(_0x906ebf.hintBySession)) {
      for (let _0x573f3b of _0x906ebf.hintBySession) {
        let _0x8372e2 = String(_0x573f3b?.sessionKey || _0x573f3b?.key || "").trim();
        if (_0x8372e2) {
          de.set(_0x8372e2, {
            tokens: Math.max(0, Number(_0x573f3b.tokens) || 0),
            limit: Math.max(0, Number(_0x573f3b.limit) || Ee()),
            inboundTokens: Math.max(0, Number(_0x573f3b.inboundTokens) || 0),
            restoredMsgs: Math.max(0, Number(_0x573f3b.restoredMsgs) || 0),
            inboundMsgs: Math.max(0, Number(_0x573f3b.inboundMsgs) || 0),
            reason: String(_0x573f3b.reason || "loaded"),
            cascadeId: String(_0x573f3b.cascadeId || ""),
            ts: Number(_0x573f3b.ts) || _0x774a4b,
            activityTs: Number(_0x573f3b.activityTs) || Number(ee.get(_0x8372e2)?.updatedAt) || Number(_0x573f3b.ts) || _0x774a4b,
            sessionKey: _0x8372e2
          });
        }
      }
    }
    if (de.size === 0 && ee.size > 0) {
      Ha();
    }
    oo();
    return {
      ok: true,
      reason: "loaded",
      sessions: ee.size,
      hintTokens: fe.tokens
    };
  } catch (_0x5d823b) {
    try {
      console.warn("[history-cache] load failed: " + _0x5d823b.message);
    } catch {}
    return {
      ok: false,
      reason: "error",
      error: _0x5d823b.message
    };
  }
}
function ln() {
  if (!wr) {
    Fa();
  }
}
function ke(_0x2e88d0) {
  if (_0x2e88d0 == null) {
    return "";
  } else if (typeof _0x2e88d0 == "string") {
    return _0x2e88d0;
  } else if (typeof _0x2e88d0 != "object") {
    return String(_0x2e88d0);
  } else if (Array.isArray(_0x2e88d0)) {
    return "[" + _0x2e88d0.map(ke).join(",") + "]";
  } else {
    return "{" + Object.keys(_0x2e88d0).sort().map(_0x5a5831 => _0x5a5831 + ":" + ke(_0x2e88d0[_0x5a5831])).join(",") + "}";
  }
}
function Zn(_0x597a62) {
  let _0x1fa503 = 2166136261;
  let _0x32f41a = String(_0x597a62 || "");
  for (let _0x189311 = 0; _0x189311 < _0x32f41a.length; _0x189311++) {
    _0x1fa503 ^= _0x32f41a.charCodeAt(_0x189311);
    _0x1fa503 = Math.imul(_0x1fa503, 16777619);
  }
  return (_0x1fa503 >>> 0).toString(16).padStart(8, "0");
}
function un(_0x4fa412) {
  let _0x22d26c = String(_0x4fa412?.messageId || "").trim();
  if (_0x22d26c) {
    return "id:" + _0x22d26c;
  }
  let _0x3612aa = _0x4fa412?.message;
  if (!_0x3612aa) {
    return "";
  }
  let _0x2f559c = _0x3612aa.role || "";
  let _0x5c0c6c = typeof _0x3612aa.content == "string" ? _0x3612aa.content : ke(_0x3612aa.content);
  let _0xbc1456 = _0x5c0c6c.slice(0, 240);
  return "h:" + _0x2f559c + ":" + _0x5c0c6c.length + ":" + Zn(_0xbc1456);
}
function Ka(_0x36bf75) {
  let _0x5c98ac = Ba(_0x36bf75);
  if (_0x5c98ac) {
    return "c:id:" + _0x5c98ac;
  } else {
    return "c:h:" + Zn((_0x36bf75 || []).map(_0x41a0d7 => _0x41a0d7.fp).join("|"));
  }
}
function Br(_0x3b37ed) {
  let _0x1be03f = String(_0x3b37ed || "").trim();
  if (_0x1be03f && _0x1be03f.length <= 256) {
    return "c:cid:" + _0x1be03f;
  } else {
    return "";
  }
}
function eo(_0x4ccef7) {
  let _0x3e4b6c = _0x4ccef7?.message?.content;
  if (_0x4ccef7?.message?.role !== "user" || typeof _0x3e4b6c != "string") {
    return false;
  } else {
    return _0x3e4b6c.includes("summary of important context from your previous coding session") && /\{\{\s*CHECKPOINT\s+\d+\s*\}\}/i.test(_0x3e4b6c);
  }
}
function Ya() {
  let _0x530c1d = String(process.env.BYOK_TRUST_CLIENT_CHECKPOINT ?? "0").trim().toLowerCase();
  return _0x530c1d === "1" || _0x530c1d === "true" || _0x530c1d === "yes" || _0x530c1d === "on";
}
function qa(_0x3add3c) {
  let _0x2c5024 = Math.min(_0x3add3c.length, Ca);
  for (let _0x1ef1ce = 0; _0x1ef1ce < _0x2c5024; _0x1ef1ce++) {
    if (eo(_0x3add3c[_0x1ef1ce])) {
      return true;
    }
  }
  return false;
}
function Sr(_0x2a4fac, _0x1eb048, _0x410b0a = false) {
  let _0x435aa5 = _0x2a4fac.map(oe);
  let _0x428005 = new Set(_0x435aa5.map(_0x44beae => _0x44beae.fp));
  let _0x42386c = _0x410b0a && eo(_0x1eb048[0]) ? 1 : 0;
  for (let _0xd3f105 = _0x42386c; _0xd3f105 < _0x1eb048.length; _0xd3f105++) {
    let _0xaa449a = _0x1eb048[_0xd3f105];
    if (!_0x428005.has(_0xaa449a.fp)) {
      _0x428005.add(_0xaa449a.fp);
      _0x435aa5.push(oe(_0xaa449a));
    }
  }
  return _0x435aa5;
}
function ja(_0x442b37, _0x302cb7) {
  if (!_0x442b37 || !_0x302cb7 || _0x442b37 === _0x302cb7) {
    return;
  }
  let _0x1f64b0 = ee.get(_0x442b37);
  if (_0x1f64b0 && !ee.has(_0x302cb7)) {
    ee.set(_0x302cb7, _0x1f64b0);
  }
  ee.delete(_0x442b37);
  let _0x3108e4 = de.get(_0x442b37);
  if (_0x3108e4 && !de.has(_0x302cb7)) {
    de.set(_0x302cb7, {
      ..._0x3108e4,
      sessionKey: _0x302cb7
    });
  }
  de.delete(_0x442b37);
  if (fe.sessionKey === _0x442b37) {
    fe.sessionKey = _0x302cb7;
  }
  Lr();
}
function Je(_0x351dfc) {
  let _0x1d531f = String(_0x351dfc || "");
  if (!_0x1d531f) {
    return 0;
  }
  let _0xdc57b = 0;
  let _0x4ab38b = 0;
  for (let _0x172bef = 0; _0x172bef < _0x1d531f.length; _0x172bef++) {
    if (_0x1d531f.charCodeAt(_0x172bef) >= 11904) {
      _0xdc57b += 1;
    } else {
      _0x4ab38b += 1;
    }
  }
  return Math.max(1, _0xdc57b + Math.ceil(_0x4ab38b / 4));
}
function vt(_0x33aca7) {
  if (_0x33aca7 == null) {
    return 0;
  } else {
    return Je(typeof _0x33aca7 == "string" ? _0x33aca7 : ke(_0x33aca7));
  }
}
function Ga({
  systemPrompt: _0x4a7d87 = "",
  tools: _0x4707cd = null,
  outputReserve: _0xa4d97b = 0
} = {}) {
  let _0x4ae586 = Je(_0x4a7d87);
  if (Array.isArray(_0x4707cd) && _0x4707cd.length > 0) {
    _0x4ae586 += vt(_0x4707cd);
  }
  let _0xc110ca = Math.max(0, Number(_0xa4d97b) || 0);
  return _0x4ae586 + _0xc110ca;
}
function we(_0x443cd4) {
  let _0x25de52 = _0x443cd4?.message;
  if (!_0x25de52) {
    let _0x14f9d1 = Number(_0x443cd4?.numTokens) || 0;
    if (_0x14f9d1 > 0) {
      return _0x14f9d1;
    } else {
      return 0;
    }
  }
  let _0x3eabf6 = typeof _0x25de52.content == "string" ? _0x25de52.content : ke(_0x25de52.content);
  let _0x14dbb5 = Je(_0x3eabf6);
  let _0x33b4f2 = Number(_0x443cd4?.numTokens) || 0;
  if (_0x33b4f2 > 0) {
    return Math.max(_0x33b4f2, _0x14dbb5);
  } else {
    return _0x14dbb5;
  }
}
function oe(_0x52a3b8) {
  return {
    messageId: _0x52a3b8.messageId || "",
    numTokens: _0x52a3b8.numTokens || 0,
    source: _0x52a3b8.source,
    message: _0x52a3b8.message ? {
      role: _0x52a3b8.message.role,
      content: typeof _0x52a3b8.message.content == "string" ? _0x52a3b8.message.content : JSON.parse(JSON.stringify(_0x52a3b8.message.content))
    } : null,
    fp: _0x52a3b8.fp || un(_0x52a3b8)
  };
}
function Dr(_0x3a9868) {
  let _0xa9372e = [];
  for (let _0x2e93c8 of _0x3a9868 || []) {
    if (!_0x2e93c8?.message) {
      continue;
    }
    let _0x3df85c = oe(_0x2e93c8);
    _0x3df85c.fp = un(_0x3df85c);
    if (_0x3df85c.fp) {
      _0xa9372e.push(_0x3df85c);
    }
  }
  return _0xa9372e;
}
function Ur(_0x166c98) {
  let _0x3c8048 = new Map();
  for (let _0x4384ed = 0; _0x4384ed < _0x166c98.length; _0x4384ed++) {
    let _0x41a733 = _0x166c98[_0x4384ed].fp;
    if (!_0x41a733) {
      continue;
    }
    let _0x2f0855 = _0x3c8048.get(_0x41a733);
    if (_0x2f0855) {
      _0x2f0855.push(_0x4384ed);
    } else {
      _0x3c8048.set(_0x41a733, [_0x4384ed]);
    }
  }
  return _0x3c8048;
}
function Hr(_0x3d8782, _0x3c8954, _0x1acdeb = 1) {
  if (!_0x3d8782.length || !_0x3c8954.length) {
    return null;
  }
  let _0x1c1037 = Ur(_0x3d8782);
  let _0x621759 = null;
  for (let _0x5a3f14 = 0; _0x5a3f14 < _0x3c8954.length; _0x5a3f14++) {
    let _0x9e4c11 = _0x1c1037.get(_0x3c8954[_0x5a3f14].fp);
    if (_0x9e4c11) {
      for (let _0x2cbf52 of _0x9e4c11) {
        let _0x3de046 = 0;
        while (_0x2cbf52 + _0x3de046 < _0x3d8782.length && _0x5a3f14 + _0x3de046 < _0x3c8954.length && _0x3d8782[_0x2cbf52 + _0x3de046].fp === _0x3c8954[_0x5a3f14 + _0x3de046].fp) {
          _0x3de046 += 1;
        }
        if (_0x3de046 < _0x1acdeb) {
          continue;
        }
        let _0xcac3d3 = {
          cachedStart: _0x2cbf52,
          incomingStart: _0x5a3f14,
          matched: _0x3de046
        };
        if (!_0x621759 || Fr(_0xcac3d3, _0x621759, _0x3d8782.length, _0x3c8954.length)) {
          _0x621759 = _0xcac3d3;
        }
      }
    }
  }
  return _0x621759;
}
function Fr(_0x3db485, _0x4d0d0e, _0x50128e, _0x256a7e) {
  if (_0x3db485.matched !== _0x4d0d0e.matched) {
    return _0x3db485.matched > _0x4d0d0e.matched;
  }
  if (_0x3db485.cachedStart !== _0x4d0d0e.cachedStart) {
    return _0x3db485.cachedStart < _0x4d0d0e.cachedStart;
  }
  let _0x4e3a2b = _0x256a7e - _0x3db485.incomingStart;
  let _0x207f43 = _0x256a7e - _0x4d0d0e.incomingStart;
  if (_0x4e3a2b !== _0x207f43) {
    return _0x4e3a2b > _0x207f43;
  }
  let _0x380e4e = _0x3db485.cachedStart;
  let _0x46c636 = _0x4d0d0e.cachedStart;
  if (_0x50128e - _0x3db485.cachedStart - _0x3db485.matched !== _0x50128e - _0x4d0d0e.cachedStart - _0x4d0d0e.matched) {
    return _0x50128e - _0x3db485.cachedStart - _0x3db485.matched < _0x50128e - _0x4d0d0e.cachedStart - _0x4d0d0e.matched;
  } else {
    return _0x380e4e <= _0x46c636;
  }
}
function yr(_0x1ef87d, _0x13750d) {
  let _0x483692 = Ur(_0x1ef87d);
  let _0x3143e3 = -1;
  let _0x5efca3 = -1;
  for (let _0x352bfc = 0; _0x352bfc < _0x13750d.length; _0x352bfc++) {
    let _0x5aef14 = _0x483692.get(_0x13750d[_0x352bfc].fp);
    if (!_0x5aef14 || !_0x5aef14.length) {
      continue;
    }
    let _0x105741 = _0x5aef14[_0x5aef14.length - 1];
    if (_0x105741 >= _0x3143e3) {
      _0x3143e3 = _0x105741;
      _0x5efca3 = _0x352bfc;
    }
  }
  if (_0x3143e3 < 0) {
    return {
      entries: _0x1ef87d.map(oe),
      prepended: 0,
      reason: "protect"
    };
  }
  let _0x4deba9 = _0x1ef87d.slice(0, _0x3143e3 + 1).map(oe);
  let _0x51a446 = _0x13750d.slice(_0x5efca3 + 1).map(oe);
  let _0x116cef = [];
  let _0x3581ba = new Set(_0x4deba9.map(_0x5d6f61 => _0x5d6f61.fp));
  for (let _0x3a6402 of _0x51a446) {
    if (!_0x3581ba.has(_0x3a6402.fp)) {
      _0x3581ba.add(_0x3a6402.fp);
      _0x116cef.push(_0x3a6402);
    }
  }
  return {
    entries: [..._0x4deba9, ..._0x116cef],
    prepended: Math.max(0, _0x4deba9.length - (_0x5efca3 + 1)),
    reason: _0x116cef.length ? "protect-extend" : "protect"
  };
}
function za(_0x2ebabf) {
  let _0x27f615 = new Map();
  for (let _0x19c3e3 of _0x2ebabf || []) {
    if (!Ke(_0x19c3e3.fp)) {
      continue;
    }
    let _0x3b27e6 = Ne.get(_0x19c3e3.fp);
    if (!!_0x3b27e6 && !!ee.has(_0x3b27e6)) {
      _0x27f615.set(_0x3b27e6, (_0x27f615.get(_0x3b27e6) || 0) + 1);
    }
  }
  let _0x1a7495 = "";
  let _0x2ceae6 = 0;
  for (let [_0x3674e2, _0x526806] of _0x27f615) {
    if (_0x526806 > _0x2ceae6) {
      _0x2ceae6 = _0x526806;
      _0x1a7495 = _0x3674e2;
    }
  }
  if (_0x2ceae6 > 0) {
    return _0x1a7495;
  } else {
    return "";
  }
}
function Wa(_0x206965, _0x149b08) {
  if ((_0x206965 || []).some(_0x1dc98e => Ke(_0x1dc98e.fp))) {
    return {
      sessionKey: "",
      cached: [],
      overlap: null
    };
  }
  let _0x553291 = "";
  let _0x3ef92a = null;
  let _0x4ad91d = null;
  let _0x549704 = Math.max(_0x149b08, vr);
  for (let [_0xdb5592, _0x1cfd06] of ee) {
    let _0x241ffa = _0x1cfd06.entries || [];
    if (!_0x241ffa.length || _0x241ffa.some(_0x3e16c7 => Ke(_0x3e16c7.fp))) {
      continue;
    }
    let _0x2fb4cf = Hr(_0x241ffa, _0x206965, _0x549704);
    if (_0x2fb4cf && (!_0x4ad91d || Fr(_0x2fb4cf, _0x4ad91d, _0x241ffa.length, _0x206965.length))) {
      _0x553291 = _0xdb5592;
      _0x3ef92a = _0x241ffa;
      _0x4ad91d = _0x2fb4cf;
    }
  }
  return {
    sessionKey: _0x553291,
    cached: _0x3ef92a || [],
    overlap: _0x4ad91d
  };
}
function Xa(_0x44482f, _0x1c2f44) {
  for (let [_0x2a5127, _0x4ec3b2] of Ne) {
    if (_0x4ec3b2 === _0x44482f) {
      Ne.delete(_0x2a5127);
    }
  }
  for (let _0x166c5e of _0x1c2f44 || []) {
    if (_0x166c5e?.fp && Ke(_0x166c5e.fp)) {
      Ne.set(_0x166c5e.fp, _0x44482f);
    }
  }
}
function Va(_0x24f5e0 = Date.now()) {
  let _0x15fafa = Pr();
  for (let [_0x5793b4, _0x59cc64] of ee) {
    if (_0x24f5e0 - _0x59cc64.updatedAt > _0x15fafa) {
      ee.delete(_0x5793b4);
      for (let [_0x1ec16c, _0x59c622] of Ne) {
        if (_0x59c622 === _0x5793b4) {
          Ne.delete(_0x1ec16c);
        }
      }
    }
  }
}
function Kr() {
  let _0x5a3ebf = Pa();
  while (ee.size > _0x5a3ebf) {
    let _0x2f92b5 = "";
    let _0x3e2da8 = Infinity;
    for (let [_0x15b288, _0x18f926] of ee) {
      if (_0x18f926.updatedAt < _0x3e2da8) {
        _0x3e2da8 = _0x18f926.updatedAt;
        _0x2f92b5 = _0x15b288;
      }
    }
    if (!_0x2f92b5) {
      break;
    }
    ee.delete(_0x2f92b5);
    for (let [_0x1ba6aa, _0x2b7089] of Ne) {
      if (_0x2b7089 === _0x2f92b5) {
        Ne.delete(_0x1ba6aa);
      }
    }
  }
}
function nn(_0x34ec97, _0x30b98b) {
  let _0x5b5580 = _0x30b98b > 0 ? _0x30b98b : Ee();
  if (!_0x34ec97.length) {
    return {
      entries: [],
      dropped: 0,
      tokens: 0
    };
  }
  let _0xb56e6a = 0;
  for (let _0x28358b of _0x34ec97) {
    _0xb56e6a += we(_0x28358b);
  }
  if (_0xb56e6a <= _0x5b5580) {
    return {
      entries: _0x34ec97,
      dropped: 0,
      tokens: _0xb56e6a
    };
  }
  let _0x15ee91 = 0;
  let _0x2d3a25 = 0;
  while (_0x2d3a25 < _0x34ec97.length - 1 && _0xb56e6a > _0x5b5580) {
    _0xb56e6a -= we(_0x34ec97[_0x2d3a25]);
    _0x2d3a25 += 1;
    _0x15ee91 += 1;
  }
  return {
    entries: _0x34ec97.slice(_0x2d3a25),
    dropped: _0x15ee91,
    tokens: _0xb56e6a
  };
}
var Ja = 0.7;
var Er = 10;
var xr = 80000;
var Or = 8000;
var Ir = 10000;
var Ar = 480;
var Qa = 900;
var Cr = 1400;
var kr = 90000;
var Mr = 2;
var Qe = "[history_summary]";
var Za = /\[keep\]|【keep】/i;
var Yr = /(必须|务必|一定要|千万|不要|不能|禁止|记住|牢记|约定|需求|根因|方案|决定|确认|T0|TODO|待办|下一步|重要|关键|注意|坑|陷阱)/i;
var qr = /([\/\\][\w.\-]+\.[a-zA-Z0-9]{1,6}\b|\berror\b|\bfail(ed)?\b|\bexception\b|traceback|panic|stack|报错|异常|失败|栈)/i;
var on = new Map();
var rn = new Map();
function ec() {
  let _0x523bae = String(process.env.BYOK_HISTORY_COMPRESS ?? "1").trim().toLowerCase();
  return _0x523bae !== "0" && _0x523bae !== "false" && _0x523bae !== "off" && _0x523bae !== "no";
}
function to() {
  let _0x276174 = String(process.env.BYOK_HISTORY_LLM_SUMMARY ?? "0").trim().toLowerCase();
  return _0x276174 === "1" || _0x276174 === "true" || _0x276174 === "on" || _0x276174 === "yes";
}
function jr() {
  let _0x324539 = parseInt(String(process.env.BYOK_HISTORY_LLM_SUMMARY_INPUT_TOKENS || kr), 10);
  if (Number.isFinite(_0x324539) && _0x324539 >= 8000) {
    return _0x324539;
  } else {
    return kr;
  }
}
function tc() {
  let _0x596b92 = process.env.BYOK_HISTORY_ANCHOR_USER_MSGS;
  if (_0x596b92 == null || _0x596b92 === "") {
    return Mr;
  }
  let _0x25eccc = parseInt(String(_0x596b92), 10);
  if (Number.isFinite(_0x25eccc) && _0x25eccc >= 0) {
    return _0x25eccc;
  } else {
    return Mr;
  }
}
function nc() {
  let _0x102bd0 = String(process.env.BYOK_HISTORY_SMART_EXTRACT ?? "1").trim().toLowerCase();
  return _0x102bd0 !== "0" && _0x102bd0 !== "false" && _0x102bd0 !== "off" && _0x102bd0 !== "no";
}
function Gr() {
  let _0x5e48a7 = parseInt(String(process.env.BYOK_HISTORY_SUMMARY_LINE_CHARS || Ar), 10);
  if (Number.isFinite(_0x5e48a7) && _0x5e48a7 >= 80) {
    return _0x5e48a7;
  } else {
    return Ar;
  }
}
function zr() {
  let _0x138931 = parseInt(String(process.env.BYOK_HISTORY_SUMMARY_ENTRY_CHARS || Ir), 10);
  if (Number.isFinite(_0x138931) && _0x138931 >= 1000) {
    return _0x138931;
  } else {
    return Ir;
  }
}
function no(_0x9fa787) {
  return Za.test(Ye(_0x9fa787));
}
function oc(_0x1196b0, _0x41a3e2, _0x24f2f9) {
  let _0x20e7ec = _0x1196b0?.message;
  let _0x48d124 = _0x20e7ec?.role || "unknown";
  let _0x325667 = Ye(_0x1196b0);
  let _0xa99b9 = 0;
  if (no(_0x1196b0)) {
    _0xa99b9 += 100;
  }
  if (ht(_0x1196b0)) {
    _0xa99b9 += 40;
  }
  if (_0x48d124 === "user") {
    _0xa99b9 += 30;
  }
  if (Yr.test(_0x325667)) {
    _0xa99b9 += 25;
  }
  if (qr.test(_0x325667)) {
    _0xa99b9 += 12;
  }
  if (Rt(_0x20e7ec)) {
    _0xa99b9 -= 15;
  }
  if (Rt(_0x20e7ec) && _0x325667.length > 4000) {
    _0xa99b9 -= 10;
  }
  if (_0x24f2f9 > 0) {
    _0xa99b9 += Math.round(_0x41a3e2 / _0x24f2f9 * 8);
  }
  return _0xa99b9;
}
function rc(_0x2b8dbc, _0x15e492) {
  let _0x109f2f = _0x2b8dbc?.message?.role || "unknown";
  let _0x52175f = Ye(_0x2b8dbc);
  let _0x3e0a = Yr.test(_0x52175f) || qr.test(_0x52175f);
  if (no(_0x2b8dbc) || _0x109f2f === "user") {
    return Math.max(_0x15e492, Cr);
  } else if (_0x3e0a) {
    return Math.max(_0x15e492, Qa);
  } else {
    return _0x15e492;
  }
}
function br(_0x3561f4, _0xc3065f) {
  let _0x592c53 = String(_0x3561f4 || "");
  if (_0x592c53.length <= _0xc3065f) {
    return _0x592c53;
  }
  let _0x413b52 = Math.floor(_0xc3065f * 0.7);
  let _0x136379 = Math.max(0, _0xc3065f - _0x413b52 - 24);
  let _0x46d111 = _0x592c53.length - _0x413b52 - _0x136379;
  if (_0x136379 <= 0) {
    return _0x592c53.slice(0, _0xc3065f) + "…";
  } else {
    return _0x592c53.slice(0, _0x413b52) + "…[略 " + _0x46d111 + " 字]…" + _0x592c53.slice(-_0x136379);
  }
}
function sc(_0x58c48f) {
  let _0x35b71f = new Set();
  let _0x237ef3 = tc();
  let _0x315fa1 = 0;
  for (let _0xbca684 = 0; _0xbca684 < _0x58c48f.length; _0xbca684++) {
    let _0x35a98f = _0x58c48f[_0xbca684];
    if (no(_0x35a98f)) {
      _0x35b71f.add(_0xbca684);
      continue;
    }
    if (ht(_0x35a98f)) {
      _0x35b71f.add(_0xbca684);
      continue;
    }
    let _0x4accc9 = _0x35a98f?.message;
    if ((_0x4accc9?.role || "unknown") === "user" && !Rt(_0x4accc9) && !Qr(_0x4accc9) && _0x315fa1 < _0x237ef3) {
      _0x35b71f.add(_0xbca684);
      _0x315fa1 += 1;
    }
  }
  return _0x35b71f;
}
function ic() {
  let _0x499f50 = Number(process.env.BYOK_HISTORY_COMPRESS_RATIO);
  if (Number.isFinite(_0x499f50) && _0x499f50 > 0.3 && _0x499f50 < 0.98) {
    return _0x499f50;
  } else {
    return Ja;
  }
}
function Wr() {
  let _0x377777 = parseInt(String(process.env.BYOK_HISTORY_KEEP_RECENT || Er), 10);
  if (Number.isFinite(_0x377777) && _0x377777 >= 2) {
    return _0x377777;
  } else {
    return Er;
  }
}
function ac() {
  let _0x8f3dbd = parseInt(String(process.env.BYOK_HISTORY_KEEP_RECENT_TOKENS || xr), 10);
  if (Number.isFinite(_0x8f3dbd) && _0x8f3dbd >= 4096) {
    return _0x8f3dbd;
  } else {
    return xr;
  }
}
function Xr() {
  let _0x10005d = parseInt(String(process.env.BYOK_HISTORY_TOOL_MAX_CHARS || Or), 10);
  if (Number.isFinite(_0x10005d) && _0x10005d >= 1000) {
    return _0x10005d;
  } else {
    return Or;
  }
}
function Wn(_0x53b2be) {
  let _0x46f53f = 0;
  for (let _0x547e39 of _0x53b2be) {
    _0x46f53f += we(_0x547e39);
  }
  return _0x46f53f;
}
function Ve(_0x774c3c, _0x4b4728) {
  let _0x3da9f4 = String(_0x774c3c || "");
  if (_0x3da9f4.length <= _0x4b4728) {
    return _0x3da9f4;
  }
  let _0x58d807 = Math.floor(_0x4b4728 * 0.62);
  let _0x99bfa1 = Math.max(0, _0x4b4728 - _0x58d807 - 48);
  let _0x245940 = _0x3da9f4.length - _0x58d807 - _0x99bfa1;
  return _0x3da9f4.slice(0, _0x58d807) + "\n…[truncated " + _0x245940 + " chars]…\n" + (_0x99bfa1 > 0 ? _0x3da9f4.slice(-_0x99bfa1) : "");
}
function Vr(_0x4d2ccc) {
  if (_0x4d2ccc == null) {
    return "";
  }
  if (typeof _0x4d2ccc == "string") {
    return _0x4d2ccc;
  }
  if (typeof _0x4d2ccc != "object") {
    return String(_0x4d2ccc);
  }
  if (_0x4d2ccc.type === "text" && _0x4d2ccc.text != null) {
    return String(_0x4d2ccc.text);
  }
  if (_0x4d2ccc.type === "thinking" && _0x4d2ccc.thinking != null) {
    return String(_0x4d2ccc.thinking);
  }
  if (_0x4d2ccc.type === "tool_result") {
    if (typeof _0x4d2ccc.content == "string") {
      return _0x4d2ccc.content;
    } else if (Array.isArray(_0x4d2ccc.content)) {
      return _0x4d2ccc.content.map(Vr).join("\n");
    } else if (_0x4d2ccc.content != null) {
      return ke(_0x4d2ccc.content);
    } else {
      return "";
    }
  }
  if (_0x4d2ccc.type === "tool_use") {
    let _0x8254d4 = _0x4d2ccc.name || "tool";
    let _0x4331fd = typeof _0x4d2ccc.input == "string" ? _0x4d2ccc.input : ke(_0x4d2ccc.input ?? {});
    return _0x8254d4 + "(" + _0x4331fd + ")";
  }
  if (_0x4d2ccc.text != null) {
    return String(_0x4d2ccc.text);
  } else {
    return ke(_0x4d2ccc);
  }
}
function Ye(_0x277c96) {
  let _0x4a57ce = _0x277c96?.message;
  if (_0x4a57ce) {
    if (typeof _0x4a57ce.content == "string") {
      return _0x4a57ce.content;
    } else if (Array.isArray(_0x4a57ce.content)) {
      return _0x4a57ce.content.map(Vr).join("\n");
    } else {
      return ke(_0x4a57ce.content);
    }
  } else {
    return "";
  }
}
function ht(_0xa2f59f) {
  return Ye(_0xa2f59f).startsWith(Qe);
}
function Vn(_0x451bd2) {
  let _0x2bb80b = oe(_0x451bd2);
  _0x2bb80b.numTokens = 0;
  _0x2bb80b.fp = un(_0x2bb80b);
  _0x2bb80b.numTokens = we(_0x2bb80b);
  return _0x2bb80b;
}
function Jr(_0x5360b8, _0x318e57) {
  if (typeof _0x5360b8 == "string") {
    if (_0x5360b8.length <= _0x318e57) {
      return {
        content: _0x5360b8,
        changed: false
      };
    } else {
      return {
        content: Ve(_0x5360b8, _0x318e57),
        changed: true
      };
    }
  }
  if (Array.isArray(_0x5360b8)) {
    let _0x1572ac = false;
    return {
      content: _0x5360b8.map(_0xbef683 => {
        if (!_0xbef683 || typeof _0xbef683 != "object") {
          return _0xbef683;
        }
        if (_0xbef683.type === "text" && typeof _0xbef683.text == "string" && _0xbef683.text.length > _0x318e57) {
          _0x1572ac = true;
          return {
            ..._0xbef683,
            text: Ve(_0xbef683.text, _0x318e57)
          };
        }
        if (_0xbef683.type === "tool_result") {
          let _0x48914b = Jr(_0xbef683.content, _0x318e57);
          if (_0x48914b.changed) {
            _0x1572ac = true;
            return {
              ..._0xbef683,
              content: _0x48914b.content
            };
          }
        }
        return _0xbef683;
      }),
      changed: _0x1572ac
    };
  }
  let _0x13785e = ke(_0x5360b8);
  if (_0x13785e.length <= _0x318e57) {
    return {
      content: _0x5360b8,
      changed: false
    };
  } else {
    return {
      content: Ve(_0x13785e, _0x318e57),
      changed: true
    };
  }
}
function cc(_0x5cb916, _0x2dc02e = {}) {
  let _0x175bbd = _0x2dc02e.maxChars > 0 ? _0x2dc02e.maxChars : Xr();
  let _0x14a01f = Math.max(0, Number(_0x2dc02e.keepRecent) || Wr());
  if (!Array.isArray(_0x5cb916) || _0x5cb916.length === 0) {
    return {
      entries: _0x5cb916 || [],
      compacted: 0
    };
  }
  let _0xfa996f = Math.max(0, _0x5cb916.length - _0x14a01f);
  let _0x119dcb = 0;
  return {
    entries: _0x5cb916.map((_0x3de8cf, _0x1db336) => {
      if (_0x1db336 >= _0xfa996f) {
        return _0x3de8cf;
      }
      let _0x48eb33 = _0x3de8cf?.message;
      if (!_0x48eb33) {
        return _0x3de8cf;
      }
      if (typeof _0x48eb33.content == "string") {
        if (_0x48eb33.content.length <= _0x175bbd * 2) {
          return _0x3de8cf;
        } else {
          _0x119dcb += 1;
          return Vn({
            ..._0x3de8cf,
            message: {
              role: _0x48eb33.role,
              content: Ve(_0x48eb33.content, _0x175bbd * 2)
            }
          });
        }
      }
      if (!Array.isArray(_0x48eb33.content)) {
        return _0x3de8cf;
      }
      let _0x5ef6cc = false;
      let _0x385530 = _0x48eb33.content.map(_0x23d0bb => {
        if (!_0x23d0bb || typeof _0x23d0bb != "object") {
          return _0x23d0bb;
        }
        if (_0x23d0bb.type === "tool_result") {
          let _0x50666e = Jr(_0x23d0bb.content, _0x175bbd);
          if (_0x50666e.changed) {
            _0x5ef6cc = true;
            return {
              ..._0x23d0bb,
              content: _0x50666e.content
            };
          } else {
            return _0x23d0bb;
          }
        }
        if (_0x23d0bb.type === "tool_use" && _0x23d0bb.input != null) {
          let _0x3a5ce4 = typeof _0x23d0bb.input == "string" ? _0x23d0bb.input : ke(_0x23d0bb.input);
          if (_0x3a5ce4.length > _0x175bbd) {
            _0x5ef6cc = true;
            return {
              ..._0x23d0bb,
              input: typeof _0x23d0bb.input == "string" ? Ve(_0x23d0bb.input, _0x175bbd) : {
                _truncated: true,
                preview: Ve(_0x3a5ce4, Math.min(2000, _0x175bbd))
              }
            };
          }
        }
        if (_0x23d0bb.type === "text" && typeof _0x23d0bb.text == "string" && _0x23d0bb.text.length > _0x175bbd * 2) {
          _0x5ef6cc = true;
          return {
            ..._0x23d0bb,
            text: Ve(_0x23d0bb.text, _0x175bbd * 2)
          };
        } else {
          return _0x23d0bb;
        }
      });
      if (_0x5ef6cc) {
        _0x119dcb += 1;
        return Vn({
          ..._0x3de8cf,
          message: {
            role: _0x48eb33.role,
            content: _0x385530
          }
        });
      } else {
        return _0x3de8cf;
      }
    }),
    compacted: _0x119dcb
  };
}
function Rt(_0x42c27d) {
  if (!_0x42c27d || !Array.isArray(_0x42c27d.content) || _0x42c27d.content.length === 0) {
    return false;
  } else {
    return _0x42c27d.content.every(_0x421265 => _0x421265 && _0x421265.type === "tool_result");
  }
}
function Qr(_0x584f37) {
  if (!_0x584f37 || !Array.isArray(_0x584f37.content)) {
    return false;
  } else {
    return _0x584f37.content.some(_0xa14275 => _0xa14275 && _0xa14275.type === "tool_use");
  }
}
function lc(_0x464ab9, _0x314183, _0x4955dd) {
  let _0x13a735 = Math.max(0, Math.min(_0x314183, _0x4955dd));
  while (_0x13a735 < _0x4955dd && Rt(_0x464ab9[_0x13a735]?.message)) {
    _0x13a735 += 1;
  }
  if (_0x13a735 > 0 && _0x13a735 < _0x4955dd && Qr(_0x464ab9[_0x13a735 - 1]?.message)) {
    while (_0x13a735 < _0x4955dd && Rt(_0x464ab9[_0x13a735]?.message)) {
      _0x13a735 += 1;
    }
  }
  return _0x13a735;
}
function Zr(_0x5816ac, _0x1eb872, _0x264dac) {
  if (!_0x5816ac.length) {
    return 0;
  }
  let _0x416f68 = Math.max(0, _0x5816ac.length - _0x1eb872);
  let _0x3570b5 = 0;
  let _0x3b59b4 = _0x5816ac.length;
  for (let _0x165ec6 = _0x5816ac.length - 1; _0x165ec6 >= 0; _0x165ec6--) {
    _0x3570b5 += we(_0x5816ac[_0x165ec6]);
    if (_0x3570b5 >= _0x264dac) {
      _0x3b59b4 = _0x165ec6;
      break;
    }
    if (_0x165ec6 === 0) {
      _0x3b59b4 = 0;
    }
  }
  return Math.min(_0x416f68, _0x3b59b4);
}
function uc(_0x3c371a) {
  let _0x26b90f = [];
  let _0x50379e = 0;
  let _0x22a7e0 = zr();
  let _0xb07ba = Gr();
  for (let _0x1cdc25 = 0; _0x1cdc25 < _0x3c371a.length; _0x1cdc25++) {
    let _0x3937dc = _0x3c371a[_0x1cdc25];
    if (ht(_0x3937dc)) {
      let _0x23475b = "- prior_summary: " + Ye(_0x3937dc).slice(0, _0xb07ba * 2).replace(/\s+/g, " ").trim();
      if (_0x50379e + _0x23475b.length > _0x22a7e0) {
        break;
      }
      _0x26b90f.push(_0x23475b);
      _0x50379e += _0x23475b.length;
      continue;
    }
    let _0xb24e34 = _0x3937dc?.message?.role || "unknown";
    let _0x190c3c = Ye(_0x3937dc).replace(/\s+/g, " ").trim();
    if (!_0x190c3c) {
      continue;
    }
    let _0x3c06b2 = _0x190c3c.length > _0xb07ba ? _0x190c3c.slice(0, _0xb07ba) + "…" : _0x190c3c;
    let _0x1a0a2d = "- " + _0xb24e34 + ": " + _0x3c06b2;
    if (_0x50379e + _0x1a0a2d.length > _0x22a7e0) {
      _0x26b90f.push("- …(" + (_0x3c371a.length - _0x1cdc25) + " more messages omitted from summary body)");
      break;
    }
    _0x26b90f.push(_0x1a0a2d);
    _0x50379e += _0x1a0a2d.length;
  }
  return [Qe, "Compressed " + _0x3c371a.length + " earlier messages to preserve context (extractive, not hard-deleted).", "Key points:", ..._0x26b90f].join("\n");
}
function dc(_0xb0aed6) {
  let _0x4f9e18 = _0xb0aed6.length;
  let _0x153d05 = zr();
  let _0x260f68 = Gr();
  let _0x21b8cb = sc(_0xb0aed6);
  let _0x1a4455 = [];
  for (let _0x66bcea = 0; _0x66bcea < _0x4f9e18; _0x66bcea++) {
    let _0x5abea7 = _0xb0aed6[_0x66bcea];
    let _0x28cfbc = Ye(_0x5abea7).replace(/\s+/g, " ").trim();
    if (!_0x28cfbc && !ht(_0x5abea7)) {
      continue;
    }
    let _0x39d99e = _0x21b8cb.has(_0x66bcea);
    let _0x249be5 = oc(_0x5abea7, _0x66bcea, _0x4f9e18);
    let _0x263e84;
    if (ht(_0x5abea7)) {
      _0x263e84 = "- prior_summary: " + (_0x39d99e ? _0x28cfbc : br(_0x28cfbc, _0x260f68 * 2));
    } else {
      let _0x5e579c = _0x5abea7?.message?.role || "unknown";
      let _0x3025f0 = _0x39d99e ? _0x28cfbc : br(_0x28cfbc, rc(_0x5abea7, _0x260f68));
      _0x263e84 = "- " + _0x5e579c + ": " + _0x3025f0;
    }
    _0x1a4455.push({
      index: _0x66bcea,
      score: _0x249be5,
      line: _0x263e84,
      len: _0x263e84.length,
      isAnchor: _0x39d99e
    });
  }
  let _0x305680 = new Set();
  let _0x12f639 = 0;
  for (let _0x5be871 = 0; _0x5be871 < _0x1a4455.length; _0x5be871++) {
    if (_0x1a4455[_0x5be871].isAnchor) {
      _0x305680.add(_0x5be871);
      _0x12f639 += _0x1a4455[_0x5be871].len;
    }
  }
  let _0x3bf4f8 = _0x1a4455.map((_0x4fe1d1, _0x54ac33) => _0x54ac33).filter(_0x5c5ba7 => !_0x1a4455[_0x5c5ba7].isAnchor).sort((_0x5c2ec4, _0x83a8cb) => _0x1a4455[_0x83a8cb].score !== _0x1a4455[_0x5c2ec4].score ? _0x1a4455[_0x83a8cb].score - _0x1a4455[_0x5c2ec4].score : _0x1a4455[_0x5c2ec4].index - _0x1a4455[_0x83a8cb].index);
  for (let _0x5cbe34 of _0x3bf4f8) {
    if (!(_0x12f639 + _0x1a4455[_0x5cbe34].len > _0x153d05)) {
      _0x305680.add(_0x5cbe34);
      _0x12f639 += _0x1a4455[_0x5cbe34].len;
    }
  }
  let _0x282b41 = [];
  let _0x30ba73 = 0;
  let _0x429196 = () => {
    if (_0x30ba73 > 0) {
      _0x282b41.push("- …(" + _0x30ba73 + " lower-priority messages omitted)");
      _0x30ba73 = 0;
    }
  };
  for (let _0x38ce4e = 0; _0x38ce4e < _0x1a4455.length; _0x38ce4e++) {
    if (_0x305680.has(_0x38ce4e)) {
      _0x429196();
      _0x282b41.push(_0x1a4455[_0x38ce4e].line);
    } else {
      _0x30ba73 += 1;
    }
  }
  _0x429196();
  let _0x529251 = _0x21b8cb.size;
  let _0x31fc22 = "Compressed " + _0x4f9e18 + " earlier messages (smart extractive: by-importance, " + _0x529251 + " anchors kept verbatim, original text, not hard-deleted).";
  return {
    text: [Qe, _0x31fc22, "Key points:", ..._0x282b41].join("\n"),
    anchors: _0x529251
  };
}
function fc(_0x5caaae) {
  if (nc()) {
    return dc(_0x5caaae);
  } else {
    return {
      text: uc(_0x5caaae),
      anchors: 0
    };
  }
}
function es(_0x974a72, _0x12964c = "extract") {
  let _0x4153fe = String(_0x974a72 || "").trim();
  let _0x2de21d = _0x4153fe.startsWith(Qe) ? _0x4153fe : Qe + "\n" + _0x4153fe;
  let _0x430721 = {
    messageId: "byok-summary-" + _0x12964c + "-" + Zn(_0x2de21d),
    numTokens: 0,
    source: undefined,
    message: {
      role: "user",
      content: _0x2de21d
    },
    fp: ""
  };
  return Vn(_0x430721);
}
function pc(_0x1fa76d) {
  let {
    text: _0x3a1820,
    anchors: _0x14a8b4
  } = fc(_0x1fa76d);
  return {
    entry: es(_0x3a1820, "extract"),
    anchors: _0x14a8b4 || 0
  };
}
function hc(_0x23390f, _0x30008f = 0) {
  let _0x54637b = _0x30008f > 0 ? _0x30008f : jr();
  let _0x1db45c = [];
  let _0x504b76 = 0;
  let _0x4b189c = [];
  for (let _0x58ecdb of _0x23390f || []) {
    let _0x5020ea = _0x58ecdb?.message?.role || "unknown";
    let _0x52717f = Ye(_0x58ecdb).replace(/\s+/g, " ").trim();
    if (_0x52717f) {
      if (_0x52717f.length > 2000) {
        _0x52717f = _0x52717f.slice(0, 1600) + "…" + _0x52717f.slice(-300);
      }
      _0x4b189c.push({
        role: _0x5020ea,
        plain: _0x52717f,
        tok: Je(_0x5020ea + ": " + _0x52717f)
      });
    }
  }
  let _0x55ea30 = 0;
  let _0x31d766 = _0x4b189c.reduce((_0xcb11e, _0x9b891a) => _0xcb11e + _0x9b891a.tok, 0);
  while (_0x55ea30 < _0x4b189c.length - 1 && _0x31d766 > _0x54637b) {
    _0x31d766 -= _0x4b189c[_0x55ea30].tok;
    _0x55ea30 += 1;
  }
  for (let _0x4c1679 = _0x55ea30; _0x4c1679 < _0x4b189c.length; _0x4c1679++) {
    _0x1db45c.push(_0x4b189c[_0x4c1679].role + ": " + _0x4b189c[_0x4c1679].plain);
    _0x504b76 += _0x4b189c[_0x4c1679].tok;
  }
  return {
    text: _0x1db45c.join("\n"),
    tokens: _0x504b76,
    messageCount: _0x4b189c.length - _0x55ea30,
    truncatedFrom: _0x55ea30
  };
}
function mc(_0x32e266, _0x5f1fd0, _0x300fa0, _0x5a8416, _0x4d5479, _0x21a14b) {
  let _0x42a079 = Zr(_0x32e266, _0x5f1fd0, _0x300fa0);
  let _0x459ba0 = Math.max(0, _0x42a079);
  if (_0x459ba0 < 2) {
    return 0;
  }
  let _0x84a8b = Math.max(2, Math.floor(_0x459ba0 * 0.4));
  if (_0x5a8416 > _0x21a14b) {
    _0x84a8b = _0x459ba0;
  } else if (_0x5a8416 > _0x4d5479) {
    let _0x3db1ad = _0x5a8416 - _0x4d5479;
    let _0x2f49e6 = 0;
    for (_0x84a8b = 0; _0x84a8b < _0x459ba0 && (_0x2f49e6 < _0x3db1ad || _0x84a8b < 2);) {
      _0x2f49e6 += we(_0x32e266[_0x84a8b]);
      _0x84a8b += 1;
    }
    _0x84a8b = Math.min(_0x459ba0, Math.max(_0x84a8b, 2));
  }
  return lc(_0x32e266, _0x84a8b, _0x459ba0);
}
async function gc(_0x3c5608, _0x3a0aec, _0x2b8a36 = {}) {
  let _0x15bf41 = Array.isArray(_0x3c5608) ? _0x3c5608.map(oe) : [];
  let _0x31cef9 = _0x15bf41.map(oe);
  let _0x18796e = _0x3a0aec > 0 ? _0x3a0aec : Ee();
  let _0x26f009 = _0x2b8a36.compressRatio > 0 ? _0x2b8a36.compressRatio : ic();
  let _0x555615 = Math.max(1024, Math.floor(_0x18796e * _0x26f009));
  let _0xdf9c55 = _0x2b8a36.thresholdTokens > 0 ? Math.min(_0x18796e, Math.max(1024, Math.floor(_0x2b8a36.thresholdTokens))) : _0x555615;
  let _0x362f0c = _0x2b8a36.targetTokens > 0 ? Math.min(_0xdf9c55, Math.max(1024, Math.floor(_0x2b8a36.targetTokens))) : _0xdf9c55;
  let _0xd0b12 = _0x2b8a36.keepRecent > 0 ? _0x2b8a36.keepRecent : Wr();
  let _0x17bc48 = _0x2b8a36.keepRecentTokens > 0 ? _0x2b8a36.keepRecentTokens : ac();
  let _0x217e01 = _0x2b8a36.enabled ?? ec();
  let _0xda2be4 = (_0x2b8a36.llmSummary ?? to()) && typeof _0x2b8a36.summarizeFn == "function";
  let _0x3b3f43 = Wn(_0x15bf41);
  let _0x45d4ce = 0;
  let _0xc4e907 = 0;
  let _0x4c78e4 = 0;
  let _0x10e412 = "none";
  let _0x1e712f = 0;
  let _0x399c4e = [];
  if (_0x15bf41.length === 0) {
    return {
      entries: _0x15bf41,
      cacheEntries: _0x31cef9,
      tokens: 0,
      toolCompacted: 0,
      summarized: 0,
      dropped: 0,
      threshold: _0xdf9c55,
      target: _0x362f0c,
      stages: [],
      reason: "none",
      summaryMode: "none"
    };
  }
  if (_0x217e01) {
    let _0x17402e = Zr(_0x15bf41, _0xd0b12, _0x17bc48);
    let _0x2057ed = Math.max(0, _0x15bf41.length - _0x17402e);
    let _0x409005 = cc(_0x15bf41, {
      maxChars: _0x2b8a36.toolMaxChars || Xr(),
      keepRecent: _0x2057ed
    });
    for (let _0x121f90 = 0; _0x121f90 < _0x15bf41.length; _0x121f90++) {
      _0x15bf41[_0x121f90] = _0x409005.entries[_0x121f90];
    }
    for (let _0x38130d = 0; _0x38130d < _0x31cef9.length; _0x38130d++) {
      if (_0x38130d < _0x15bf41.length) {
        _0x31cef9[_0x38130d] = oe(_0x15bf41[_0x38130d]);
      }
    }
    _0x45d4ce = _0x409005.compacted;
    _0x3b3f43 = Wn(_0x15bf41);
    if (_0x45d4ce > 0) {
      _0x399c4e.push("tool");
    }
  }
  if (!_0x217e01 || _0x3b3f43 <= _0xdf9c55) {
    if (_0x3b3f43 > _0x18796e) {
      let _0x137c0e = nn(_0x15bf41, _0x18796e);
      _0x4c78e4 = _0x137c0e.dropped;
      if (_0x4c78e4 > 0) {
        _0x399c4e.push("drop");
      }
      let _0x5c259f = nn(_0x31cef9, _0x18796e);
      return {
        entries: _0x137c0e.entries,
        cacheEntries: _0x5c259f.entries.map(oe),
        tokens: _0x137c0e.tokens,
        toolCompacted: _0x45d4ce,
        summarized: 0,
        dropped: Math.max(_0x4c78e4, _0x5c259f.dropped),
        threshold: _0xdf9c55,
        target: _0x362f0c,
        stages: _0x399c4e.length ? _0x399c4e : _0x137c0e.dropped > 0 ? ["drop"] : [],
        reason: _0x399c4e.length ? _0x399c4e.join("+") : _0x137c0e.dropped > 0 ? "drop" : "none",
        summaryMode: "none"
      };
    }
    return {
      entries: _0x15bf41,
      cacheEntries: _0x31cef9,
      tokens: _0x3b3f43,
      toolCompacted: _0x45d4ce,
      summarized: 0,
      dropped: 0,
      threshold: _0xdf9c55,
      target: _0x362f0c,
      stages: _0x399c4e,
      reason: _0x399c4e.length ? _0x399c4e.join("+") : "none",
      summaryMode: "none"
    };
  }
  if (_0x3b3f43 > _0x362f0c && _0x15bf41.length > _0xd0b12 + 1) {
    let _0x55db72 = mc(_0x15bf41, _0xd0b12, _0x17bc48, _0x3b3f43, _0x362f0c, _0x18796e);
    if (_0x55db72 >= 2) {
      let _0x3fc6a6 = _0x31cef9.slice(0, _0x55db72);
      if (_0x3fc6a6.length !== 1 || !ht(_0x3fc6a6[0])) {
        let _0x3db901 = null;
        if (_0xda2be4) {
          try {
            let _0x558f9e = hc(_0x3fc6a6, jr());
            if (_0x558f9e.text) {
              let _0x51c85c = await _0x2b8a36.summarizeFn({
                transcript: _0x558f9e.text,
                messageCount: _0x3fc6a6.length,
                inputTokens: _0x558f9e.tokens,
                sessionKey: _0x2b8a36.sessionKey || ""
              });
              let _0x962fb2 = String(_0x51c85c || "").trim();
              if (_0x962fb2.length >= 40) {
                _0x3db901 = es(_0x962fb2.startsWith(Qe) ? _0x962fb2 : Qe + "\nLLM summary of " + _0x3fc6a6.length + " earlier messages:\n" + _0x962fb2, "llm");
                _0x10e412 = "llm";
              }
            }
          } catch {
            _0x3db901 = null;
          }
        }
        if (!_0x3db901) {
          let _0x3c4bc0 = pc(_0x3fc6a6);
          _0x3db901 = _0x3c4bc0.entry;
          _0x1e712f = _0x3c4bc0.anchors;
          _0x10e412 = _0xda2be4 ? "extract_fallback" : "extract";
        }
        let _0x431a57 = _0x15bf41.slice(_0x55db72);
        let _0x590005 = _0x31cef9.slice(_0x55db72);
        _0x15bf41.length = 0;
        _0x15bf41.push(_0x3db901, ..._0x431a57);
        _0x31cef9 = [oe(_0x3db901), ..._0x590005];
        _0xc4e907 = _0x3fc6a6.length;
        _0x3b3f43 = Wn(_0x15bf41);
        _0x399c4e.push(_0x10e412 === "llm" ? "sum_llm" : _0x10e412 === "extract_fallback" ? "sum_extract_fb" : "sum_extract");
      }
    }
  }
  if (_0x3b3f43 > _0x18796e) {
    let _0x93275e = nn(_0x15bf41, _0x18796e);
    _0x15bf41.length = 0;
    for (let _0x9faaa5 of _0x93275e.entries) {
      _0x15bf41.push(_0x9faaa5);
    }
    _0x4c78e4 = _0x93275e.dropped;
    _0x3b3f43 = _0x93275e.tokens;
    if (_0x4c78e4 > 0) {
      _0x399c4e.push("drop");
    }
  }
  let _0x578081 = nn(_0x31cef9, _0x18796e);
  _0x31cef9 = _0x578081.entries.map(oe);
  if (_0x578081.dropped > _0x4c78e4) {
    _0x4c78e4 = _0x578081.dropped;
    if (!_0x399c4e.includes("drop")) {
      _0x399c4e.push("drop");
    }
  }
  return {
    entries: _0x15bf41,
    cacheEntries: _0x31cef9,
    tokens: _0x3b3f43,
    toolCompacted: _0x45d4ce,
    summarized: _0xc4e907,
    dropped: _0x4c78e4,
    anchors: _0x1e712f,
    threshold: _0xdf9c55,
    target: _0x362f0c,
    stages: _0x399c4e,
    summaryMode: _0x10e412,
    reason: _0x399c4e.length ? _0x399c4e.join("+") : "none"
  };
}
async function ts(_0x35c050, _0x55c556 = {}) {
  let _0x4a2823 = Br(_0x55c556.cascadeId);
  if (!_0x4a2823) {
    return Nr(_0x35c050, _0x55c556);
  }
  let _0x276d91 = rn.get(_0x4a2823) || Promise.resolve();
  let _0x481dab;
  let _0x1da5c0 = new Promise(_0x262818 => {
    _0x481dab = _0x262818;
  });
  rn.set(_0x4a2823, _0x1da5c0);
  await _0x276d91;
  try {
    return await Nr(_0x35c050, _0x55c556);
  } finally {
    _0x481dab();
    if (rn.get(_0x4a2823) === _0x1da5c0) {
      rn.delete(_0x4a2823);
    }
  }
}
async function Nr(_0x3d0f90, _0x5b4598 = {}) {
  ln();
  let _0x1b4fd4 = _0x5b4598.enabled ?? Jn();
  let _0x15313e = Dr(_0x3d0f90);
  let _0x5081e7 = _0x15313e.length;
  let _0x4d7f62 = _0x15313e.reduce((_0x465ba8, _0x491ca8) => _0x465ba8 + we(_0x491ca8), 0);
  let _0x561cc7 = Ga({
    systemPrompt: _0x5b4598.systemPrompt || "",
    tools: _0x5b4598.tools,
    outputReserve: _0x5b4598.outputReserve
  });
  if (!_0x1b4fd4 || _0x15313e.length === 0) {
    return {
      entries: _0x15313e,
      messages: dt(_0x15313e.map(_0x4e727f => _0x4e727f.message)),
      restored: false,
      sessionKey: "",
      inboundMsgs: _0x5081e7,
      inboundTokens: _0x4d7f62,
      restoredMsgs: _0x5081e7,
      restoredTokens: _0x4d7f62,
      totalTokens: _0x4d7f62 + _0x561cc7,
      overheadTokens: _0x561cc7,
      prepended: 0,
      skippedHead: 0,
      dropped: 0,
      reason: _0x1b4fd4 ? "empty" : "disabled"
    };
  }
  Va();
  let _0x1c7d5c = La();
  let _0x17b32f = _0x15313e.some(_0xf782d0 => Ke(_0xf782d0.fp));
  let _0x275259 = Br(_0x5b4598.cascadeId);
  let _0x34ffae = _0x275259 && ee.has(_0x275259) ? _0x275259 : za(_0x15313e);
  if (_0x275259 && _0x34ffae && _0x34ffae !== _0x275259) {
    ja(_0x34ffae, _0x275259);
    _0x34ffae = _0x275259;
  } else if (_0x275259 && !_0x34ffae) {
    _0x34ffae = _0x275259;
  }
  let _0xc9305 = _0x34ffae ? ee.get(_0x34ffae)?.entries || [] : [];
  let _0x4b4a45 = _0xc9305.length ? Hr(_0xc9305, _0x15313e, _0x17b32f ? 1 : _0x1c7d5c) : null;
  if (!_0x275259 && (!_0x34ffae || !_0x4b4a45)) {
    let _0x3d336d = Wa(_0x15313e, _0x1c7d5c);
    if (_0x3d336d.sessionKey && _0x3d336d.overlap) {
      _0x34ffae = _0x3d336d.sessionKey;
      _0xc9305 = _0x3d336d.cached;
      _0x4b4a45 = _0x3d336d.overlap;
    }
  }
  let _0x1ad324 = !!_0x34ffae && !!_0xc9305.length && !_0x4b4a45 && (!!_0x275259 || !!_0x17b32f && !!(Da(_0xc9305, _0x15313e) > 0));
  let _0x12b177;
  let _0x26e031 = 0;
  let _0x34276d = 0;
  let _0x24006e = "pass";
  let _0x3be056 = null;
  let _0x5cc826 = Ya() && qa(_0x15313e);
  if (_0x4b4a45) {
    let {
      cachedStart: _0xdaecb2,
      incomingStart: _0x336256,
      matched: _0x2e8e7e
    } = _0x4b4a45;
    _0x34276d = _0x336256;
    if (_0x275259) {
      let _0x2f969e = Sr(_0xc9305, _0x15313e.slice(_0x336256 + _0x2e8e7e));
      if (_0x5cc826) {
        _0x3be056 = _0x2f969e;
        _0x12b177 = _0x15313e.map(oe);
        _0x26e031 = 0;
        _0x34276d = 0;
      } else {
        _0x12b177 = _0x2f969e;
        _0x26e031 = Math.max(0, _0xc9305.length - _0x2e8e7e);
      }
    } else {
      let _0x2c5d18 = _0xc9305.slice(0, _0xdaecb2).map(oe);
      _0x26e031 = _0x2c5d18.length;
      let _0x3cde61 = _0x15313e.slice(_0x336256).map(oe);
      _0x12b177 = [..._0x2c5d18, ..._0x3cde61];
    }
    if (_0x3be056) {
      _0x24006e = "client-checkpoint";
    } else if (_0x26e031 > 0) {
      _0x24006e = "restored";
    } else if (_0x336256 > 0) {
      _0x24006e = "anchor";
    } else {
      if (_0x2e8e7e >= _0x15313e.length) {
        _0xdaecb2 + _0x2e8e7e >= _0xc9305.length;
      }
      _0x24006e = "extend";
    }
  } else if (_0x1ad324 && _0x275259) {
    let _0x306771 = eo(_0x15313e[0]);
    let _0x493e71 = Sr(_0xc9305, _0x15313e, _0x306771);
    if (_0x5cc826) {
      _0x3be056 = _0x493e71;
      _0x12b177 = _0x15313e.map(oe);
      _0x26e031 = 0;
      _0x34276d = 0;
      _0x24006e = "client-checkpoint";
    } else {
      _0x12b177 = _0x493e71;
      _0x26e031 = _0xc9305.length;
      _0x34276d = _0x306771 ? 1 : 0;
      _0x24006e = _0x306771 ? "checkpoint-restored" : "protect-extend";
    }
  } else if (_0x1ad324 && _0x15313e.length < _0xc9305.length) {
    let _0x1f7ad5 = yr(_0xc9305, _0x15313e);
    _0x12b177 = _0x1f7ad5.entries;
    _0x26e031 = _0x1f7ad5.prepended;
    _0x24006e = _0x1f7ad5.reason;
  } else if (_0x1ad324) {
    let _0x5d62ea = yr(_0xc9305, _0x15313e);
    _0x12b177 = _0x5d62ea.entries;
    _0x26e031 = _0x5d62ea.prepended;
    _0x24006e = _0x5d62ea.reason;
  } else {
    _0x34ffae = _0x34ffae || Ka(_0x15313e);
    _0x12b177 = _0x15313e.map(oe);
    _0x24006e = "new";
  }
  let _0x50508f = _0x5b4598.tokenLimit || Ee();
  let _0x3c39c3 = Math.max(1024, _0x50508f - _0x561cc7);
  let _0x453d2f = va(_0x3c39c3, _0x50508f);
  let _0x73a563 = _0x453d2f > 0 && _0x453d2f < _0x3c39c3;
  let _0x1e4b50 = _0x73a563 ? $a(_0x453d2f, _0x50508f) : 0;
  let _0x16568a = _0x3c39c3;
  let _0x299eb9 = async () => gc(_0x12b177, _0x16568a, {
    enabled: _0x5b4598.compressEnabled,
    compressRatio: _0x5b4598.compressRatio,
    thresholdTokens: _0x73a563 ? _0x453d2f : undefined,
    targetTokens: _0x1e4b50 || undefined,
    keepRecent: _0x5b4598.keepRecent,
    keepRecentTokens: _0x5b4598.keepRecentTokens,
    toolMaxChars: _0x5b4598.toolMaxChars,
    llmSummary: _0x5b4598.llmSummary,
    summarizeFn: _0x5b4598.summarizeFn,
    sessionKey: _0x34ffae
  });
  let _0x5dae75;
  if (_0x34ffae && typeof _0x5b4598.summarizeFn == "function") {
    let _0x136945 = on.get(_0x34ffae) || Promise.resolve();
    let _0x5f14d2;
    let _0x2845a7 = new Promise(_0xeff031 => {
      _0x5f14d2 = _0xeff031;
    });
    let _0x248d68 = _0x136945.then(() => _0x2845a7, () => _0x2845a7);
    on.set(_0x34ffae, _0x248d68);
    try {
      await _0x136945;
      _0x5dae75 = await _0x299eb9();
    } finally {
      _0x5f14d2();
      if (on.get(_0x34ffae) === _0x248d68) {
        on.delete(_0x34ffae);
      }
    }
  } else {
    _0x5dae75 = await _0x299eb9();
  }
  let _0x29d89a = _0x5dae75.entries;
  let _0x21c1c8 = (_0x3be056 || _0x5dae75.cacheEntries || _0x29d89a).map(oe);
  if (_0x5dae75.reason && _0x5dae75.reason !== "none") {
    _0x24006e = _0x24006e === "pass" || _0x24006e === "extend" || _0x24006e === "new" || _0x24006e === "restored" || _0x24006e === "anchor" ? _0x24006e + "+" + _0x5dae75.reason : _0x24006e + "+" + _0x5dae75.reason;
  }
  {
    let _0x24e9c0 = ir(_0x21c1c8.map(_0x4e382c => _0x4e382c.message));
    if (_0x24e9c0.droppedUses > 0 || _0x24e9c0.dedupedUses > 0 || _0x24e9c0.droppedResults > 0) {
      let _0x2c5066 = [];
      for (let _0xf90b1b = 0; _0xf90b1b < _0x21c1c8.length; _0xf90b1b++) {
        let _0x4f8051 = _0x24e9c0.messages[_0xf90b1b];
        if (!_0x4f8051) {
          continue;
        }
        let _0x141873 = oe(_0x21c1c8[_0xf90b1b]);
        _0x141873.message = {
          role: _0x4f8051.role,
          content: typeof _0x4f8051.content == "string" ? _0x4f8051.content : JSON.parse(JSON.stringify(_0x4f8051.content))
        };
        _0x141873.fp = un(_0x141873);
        _0x2c5066.push(_0x141873);
      }
      _0x21c1c8 = _0x2c5066;
    }
  }
  ee.set(_0x34ffae, {
    entries: _0x21c1c8.map(oe),
    updatedAt: Date.now(),
    hits: (ee.get(_0x34ffae)?.hits || 0) + 1
  });
  Xa(_0x34ffae, _0x21c1c8);
  Kr();
  cn();
  let _0x70f215 = _0x29d89a.reduce((_0x582969, _0x57066f) => _0x582969 + we(_0x57066f), 0);
  let _0x3390e8 = _0x70f215 + _0x561cc7;
  return {
    entries: _0x29d89a,
    messages: dt(_0x29d89a.map(_0x2a33fe => _0x2a33fe.message)),
    restored: _0x26e031 > 0,
    sessionKey: _0x34ffae,
    inboundMsgs: _0x5081e7,
    inboundTokens: _0x4d7f62,
    restoredMsgs: _0x29d89a.length,
    restoredTokens: _0x70f215,
    totalTokens: _0x3390e8,
    overheadTokens: _0x561cc7,
    historyBudget: _0x16568a,
    hardHistoryBudget: _0x3c39c3,
    softTokenLimit: _0x73a563 ? _0x453d2f : 0,
    compressTarget: _0x1e4b50,
    compressThreshold: _0x5dae75.threshold,
    toolCompacted: _0x5dae75.toolCompacted || 0,
    summarized: _0x5dae75.summarized || 0,
    summaryMode: _0x5dae75.summaryMode || "none",
    anchors: _0x5dae75.anchors || 0,
    prepended: _0x26e031,
    skippedHead: _0x34276d,
    dropped: _0x5dae75.dropped || 0,
    compressReason: _0x5dae75.reason || "none",
    reason: _0x24006e
  };
}
function oo() {
  while (de.size > Ma) {
    let _0x2b7627 = "";
    let _0x263063 = Infinity;
    for (let [_0x43f65e, _0x2fee31] of de) {
      if (_0x2fee31.ts < _0x263063) {
        _0x263063 = _0x2fee31.ts;
        _0x2b7627 = _0x43f65e;
      }
    }
    if (!_0x2b7627) {
      break;
    }
    de.delete(_0x2b7627);
  }
}
function mt(_0xe2ff72 = {}) {
  ln();
  let _0x3225d6 = String(_0xe2ff72.sessionKey || "").trim();
  let _0x1d22d1;
  if (Object.prototype.hasOwnProperty.call(_0xe2ff72, "tokens")) {
    _0x1d22d1 = Math.max(0, Number(_0xe2ff72.tokens) || 0);
  } else {
    let _0x575577 = _0x3225d6 ? de.get(_0x3225d6) : null;
    _0x1d22d1 = Math.max(0, Number(_0x575577?.tokens ?? fe.tokens) || 0);
  }
  let _0xac16bb = Math.max(0, Number(_0xe2ff72.limit) || Ee());
  let _0x4be5bc = {
    tokens: _0x1d22d1,
    limit: _0xac16bb,
    inboundTokens: Math.max(0, Number(_0xe2ff72.inboundTokens) || 0),
    restoredMsgs: Math.max(0, Number(_0xe2ff72.restoredMsgs) || 0),
    inboundMsgs: Math.max(0, Number(_0xe2ff72.inboundMsgs) || 0),
    reason: String(_0xe2ff72.reason || ""),
    cascadeId: String(_0xe2ff72.cascadeId || fe.cascadeId || ""),
    sessionKey: _0x3225d6 || String(fe.sessionKey || ""),
    ts: Date.now(),
    activityTs: Date.now()
  };
  fe = _0x4be5bc;
  if (_0x3225d6) {
    de.set(_0x3225d6, {
      ..._0x4be5bc,
      sessionKey: _0x3225d6
    });
    oo();
  }
  cn();
  return {
    ..._0x4be5bc
  };
}
function ro(_0x2277f3, _0x21387f = {}) {
  ln();
  let _0x1ffb18 = Math.max(0, Number(_0x2277f3) || 0);
  if (!(_0x1ffb18 > 0)) {
    return {
      ok: false,
      updated: 0
    };
  }
  let _0x24c4a0 = String(_0x21387f.cascadeId || "").trim();
  let _0x4c6191 = String(_0x21387f.reason || "config-limit");
  let _0x3cdaf2 = Date.now();
  fe = {
    ...fe,
    limit: _0x1ffb18,
    reason: _0x4c6191,
    cascadeId: _0x24c4a0 || String(fe.cascadeId || ""),
    ts: _0x3cdaf2
  };
  let _0x314069 = 0;
  for (let [_0x19e78e, _0x1989b1] of de) {
    if (_0x1989b1) {
      if (_0x24c4a0) {
        let _0x23d7dc = String(_0x1989b1.cascadeId || "").trim();
        if (_0x23d7dc && _0x23d7dc !== _0x24c4a0) {
          continue;
        }
      }
      de.set(_0x19e78e, {
        ..._0x1989b1,
        limit: _0x1ffb18,
        reason: _0x4c6191,
        ts: _0x3cdaf2,
        sessionKey: _0x19e78e
      });
      _0x314069 += 1;
    }
  }
  cn();
  return {
    ok: true,
    updated: _0x314069,
    limit: _0x1ffb18
  };
}
function ns() {
  ln();
  return {
    ...fe,
    sessionKey: String(fe.sessionKey || "")
  };
}
var me = {
  UNSPECIFIED: 0,
  INCOMPLETE: 1,
  STOP_PATTERN: 2,
  MAX_TOKENS: 3,
  FUNCTION_CALL: 10,
  ERROR: 13
};
function gt() {
  let _0x3164c5 = Date.now();
  let _0x16598b = Math.floor(_0x3164c5 / 1000);
  let _0x13e5dc = _0x3164c5 % 1000 * 1000000;
  return Buffer.concat([$e(1, _0x16598b), $e(2, _0x13e5dc)]);
}
function _c(_0x7e6206, _0x387d66) {
  let _0x3e73cd = Buffer.alloc(8);
  _0x3e73cd.writeDoubleBE(_0x387d66, 0);
  _0x3e73cd.swap64();
  return er(_0x7e6206, _0x3e73cd);
}
function Ze(_0x30d1ac, _0xe4f3f3, _0x338095) {
  let _0x476a07 = [le(1, _0x30d1ac), Ae(2, gt())];
  if (_0xe4f3f3) {
    _0x476a07.push(le(3, _0xe4f3f3));
  }
  if (_0x338095 > 0) {
    _0x476a07.push($e(4, _0x338095));
  }
  return Buffer.concat(_0x476a07);
}
function _t(_0x14d334, _0x51ed2f) {
  return Buffer.concat([le(1, _0x14d334), Ae(2, gt()), le(9, _0x51ed2f)]);
}
function Tt(_0x18d724, _0x22aae7) {
  let _0x3503b3 = [le(1, _0x18d724), Ae(2, gt())];
  for (let _0x5c2e74 of _0x22aae7) {
    let _0x413aed = Buffer.concat([le(1, _0x5c2e74.id ?? ""), le(2, _0x5c2e74.name ?? ""), le(3, _0x5c2e74.arguments_json ?? "")]);
    _0x3503b3.push(Ae(6, _0x413aed));
  }
  return Buffer.concat(_0x3503b3);
}
function St(_0x4e7bd1, _0x200992, _0x258d69, _0x210e4f) {
  let _0x3ea820 = [le(1, _0x4e7bd1), Ae(2, gt()), $e(5, _0x200992)];
  if (_0x210e4f != null) {
    _0x3ea820.push(_c(12, _0x210e4f));
  }
  if (_0x258d69) {
    _0x3ea820.push(le(20, _0x258d69));
  }
  return Buffer.concat(_0x3ea820);
}
function os(_0x370e21, _0x1ca59a) {
  return Buffer.concat([le(1, _0x370e21), Ae(2, gt()), le(10, _0x1ca59a)]);
}
function rs(_0x381aa1, _0x12d486) {
  return Buffer.concat([le(1, _0x381aa1), Ae(2, gt()), le(3, _0x12d486), $e(5, me.ERROR)]);
}
import _0x33d3be from "node:crypto";
import _0x2fce7e from "node:zlib";
var io = 160;
var ss = "Devin BYOK Bridge";
var ao = "[" + ss + "]";
var is = "[XY Devin Byok]";
function Sc(_0x4f59cf) {
  return _0x4f59cf.startsWith(ao) || _0x4f59cf.startsWith(is);
}
function yc(_0x4ccad9) {
  let _0x5265b4 = String(_0x4ccad9 || "");
  for (let _0x1f0f18 of [ao, is]) {
    if (_0x5265b4.startsWith(_0x1f0f18)) {
      return _0x5265b4.slice(_0x1f0f18.length).replace(/^\s+/, "");
    }
  }
  return _0x5265b4;
}
function Z(_0x3aae51, _0xecb2b8) {
  return ao + " " + _0x3aae51 + (_0xecb2b8 ? "：" + _0xecb2b8 : "");
}
var et = "API_KEY_QUOTA_EXHAUSTED";
function Pe(_0x3c06f6, _0x13587c) {
  if (Number(_0x13587c) === 402) {
    return true;
  }
  let _0xeea0cf = String(_0x3c06f6 || "");
  if (!_0xeea0cf) {
    return false;
  }
  let _0x5e6029 = _0xeea0cf.toLowerCase();
  return !!/api[_-]?key[_-]?quota[_-]?exhausted/i.test(_0xeea0cf) || !!/quota[_-]?exhausted/i.test(_0xeea0cf) || !!/insufficient[_-]?quota/i.test(_0xeea0cf) || !!/billing[_-]?hard[_-]?limit/i.test(_0xeea0cf) || !!_0x5e6029.includes("额度已用完") || !!_0x5e6029.includes("额度不足") || !!_0x5e6029.includes("额度用完") || !!_0x5e6029.includes("余额不足") || !!_0x5e6029.includes("余额已用完") || !!_0x5e6029.includes("没钱") || !!_0x5e6029.includes("quota") && !!/exhaust|exceed|used\s*up|deplet|insufficient|run\s*out/.test(_0x5e6029) || !!_0x5e6029.includes("credit") && !!/exhaust|exceed|deplet|insufficient|run\s*out/.test(_0x5e6029) || !!_0x5e6029.includes("insufficient") && !!/credit|balance|fund/.test(_0x5e6029);
}
function co(_0x506880 = "") {
  let _0x222f9c = "非临时限流（" + et + "）。请更换 Key 或充值后再试";
  let _0x28d4d5 = String(_0x506880 || "").trim();
  let _0x12ab7a = _0x28d4d5 && !/rate[\s_-]?limit|too many requests/i.test(_0x28d4d5) ? " · " + _0x28d4d5 : "";
  return Z("API Key 额度已用完", _0x222f9c + _0x12ab7a);
}
function lo(_0x2de273, {
  providerLabel: _0x43bf57 = "",
  providerName: _0x232e47 = "",
  model: _0x5c01aa = "",
  requestedModel: _0x2b5d27 = ""
} = {}) {
  if (!_0x2de273) {
    return {
      providerLabel: _0x43bf57,
      providerName: _0x232e47,
      endpoint: "",
      model: _0x5c01aa,
      requestedModel: _0x2b5d27
    };
  }
  let _0x2fb6a3 = _0x2de273.useHttp ? "http" : "https";
  let _0x15ff31 = _0x2de273.parsed || {};
  let _0x3c81c3 = _0x15ff31.port ?? (_0x2de273.useHttp ? 80 : 443);
  let _0x4578ec = _0x2fb6a3 === "http" && _0x3c81c3 === 80 || _0x2fb6a3 === "https" && _0x3c81c3 === 443 ? _0x15ff31.hostname : _0x15ff31.hostname + ":" + _0x3c81c3;
  let _0x3fb574 = _0x2de273.apiPath || "";
  return {
    providerLabel: _0x43bf57,
    providerName: _0x232e47 || "",
    endpoint: _0x4578ec ? _0x2fb6a3 + "://" + _0x4578ec + _0x3fb574 : _0x3fb574,
    model: _0x5c01aa || "",
    requestedModel: _0x2b5d27 || ""
  };
}
function uo(_0x249cd6, _0x4f4d0d) {
  if (Pe(_0x249cd6, _0x4f4d0d)) {
    return false;
  }
  if (Number(_0x4f4d0d) === 429) {
    return true;
  }
  let _0x44ca53 = String(_0x249cd6 || "").toLowerCase();
  if (_0x44ca53) {
    return /rate[\s_-]?limit|too many requests/.test(_0x44ca53);
  } else {
    return false;
  }
}
function fn({
  host: _0x46dc8e = "网关",
  model: _0xdca9a5,
  timeoutSec: _0x1c3354,
  providerName: _0x3ca72d = ""
}) {
  let _0x5e78ff = _0x3ca72d ? "「" + _0x3ca72d + "」" : _0x46dc8e ? "「" + _0x46dc8e + "」" : "上游";
  let _0x3c9dab = _0xdca9a5 ? "，请检查模型「" + _0xdca9a5 + "」是否可用" : "";
  return _0x1c3354 + " 秒内 " + _0x5e78ff + " 无有效回复" + _0x3c9dab;
}
function fo({
  providerLabel: _0x21e512,
  host: _0x163d58,
  timeoutSec: _0x5ac2af,
  providerName: _0x5b82cd = ""
}) {
  return (_0x5b82cd ? "「" + _0x5b82cd + "」" : _0x21e512 + "（" + _0x163d58 + "）") + " 流式连接中断，请重试";
}
function yt(_0x303ffb) {
  if (_0x303ffb == null || _0x303ffb === "") {
    return "";
  }
  if (typeof _0x303ffb == "object") {
    if (_0x303ffb.message != null && typeof _0x303ffb.message != "object") {
      return String(_0x303ffb.message);
    }
    if (_0x303ffb.error != null) {
      return yt(_0x303ffb.error);
    }
    try {
      return JSON.stringify(_0x303ffb);
    } catch {
      return String(_0x303ffb);
    }
  }
  let _0x3fafa5 = String(_0x303ffb).trim();
  if (!_0x3fafa5) {
    return "";
  }
  let _0x1a0f73 = _0x3fafa5.indexOf("data:");
  if (_0x1a0f73 > 0) {
    let _0x4b3678 = _0x3fafa5.slice(0, _0x1a0f73).trim();
    let _0x35556a = _0x3fafa5.slice(_0x1a0f73 + 5).trim();
    let _0x5a42ea = yt(_0x4b3678);
    let _0x5bafc0 = yt(_0x35556a);
    return [_0x5a42ea, _0x5bafc0].filter(_0x16d767 => _0x16d767 && !/^\s*[{[]/.test(_0x16d767)).join("；") || _0x5bafc0 || _0x5a42ea || _0x3fafa5;
  }
  if (_0x3fafa5.startsWith("{") || _0x3fafa5.startsWith("[")) {
    try {
      let _0x58d1c9 = JSON.parse(_0x3fafa5);
      let _0x5a9611 = yt(_0x58d1c9.error?.message ?? _0x58d1c9.error ?? _0x58d1c9.message ?? _0x58d1c9);
      return _0x5a9611 || "";
    } catch {
      let _0x23e7e6 = [..._0x3fafa5.matchAll(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/g)];
      for (let _0x3bbc1e = _0x23e7e6.length - 1; _0x3bbc1e >= 0; _0x3bbc1e--) {
        let _0x411ab9 = _0x23e7e6[_0x3bbc1e];
        try {
          let _0x9d75db = JSON.parse("\"" + _0x411ab9[1] + "\"");
          if (_0x9d75db) {
            return _0x9d75db;
          }
        } catch {
          let _0x4a214b = _0x411ab9[1].replace(/\\"/g, "\"").replace(/\\n/g, "\n");
          if (_0x4a214b) {
            return _0x4a214b;
          }
        }
      }
    }
    return "";
  }
  return _0x3fafa5;
}
function $t(_0x13a5f9) {
  return String(_0x13a5f9 || "").replace(/(?:sk-[a-zA-Z0-9_-]{10,}|Bearer\s+\S+)/g, "[REDACTED]").replace(/(?:key-[a-zA-Z0-9_-]{10,})/g, "[REDACTED]");
}
function dn(_0x543f25, _0x2a88e9 = {}) {
  let _0x46c725;
  if (Buffer.isBuffer(_0x543f25)) {
    _0x46c725 = _0x543f25;
  } else if (Array.isArray(_0x543f25)) {
    _0x46c725 = Buffer.concat(_0x543f25);
  } else {
    _0x46c725 = Buffer.from(String(_0x543f25 || ""), "utf8");
  }
  let _0x2653a6 = String(_0x2a88e9["content-encoding"] || "").toLowerCase();
  try {
    if (_0x2653a6.includes("br")) {
      _0x46c725 = _0x2fce7e.brotliDecompressSync(_0x46c725);
    } else if (_0x2653a6.includes("gzip")) {
      _0x46c725 = _0x2fce7e.gunzipSync(_0x46c725);
    } else if (_0x2653a6.includes("deflate")) {
      _0x46c725 = _0x2fce7e.inflateSync(_0x46c725);
    }
  } catch {}
  return _0x46c725.toString("utf8");
}
function po(_0x2a23bb, _0xf7ce19) {
  let _0x5ec225 = [];
  _0x2a23bb.on("data", _0x16bbea => _0x5ec225.push(Buffer.isBuffer(_0x16bbea) ? _0x16bbea : Buffer.from(_0x16bbea)));
  _0x2a23bb.on("end", () => {
    _0xf7ce19(dn(_0x5ec225, _0x2a23bb.headers || {}));
  });
  _0x2a23bb.on("error", () => {
    _0xf7ce19(dn(_0x5ec225, _0x2a23bb.headers || {}));
  });
}
function Ec(_0x5606da, _0xa09c27) {
  let _0x1e6679 = String(_0x5606da || "").trim();
  if (_0x1e6679) {
    return $t(_0x1e6679);
  } else if (_0xa09c27) {
    return "HTTP " + _0xa09c27;
  } else {
    return "";
  }
}
function xc(_0x12b74d, _0x59e1fa, _0x22f6ed = {}) {
  let _0x28d870 = typeof _0x12b74d == "string" ? _0x12b74d : dn(_0x12b74d, _0x22f6ed.headers || {});
  let _0x5a8596 = mo(_0x28d870);
  if (_0x5a8596 && !/^\s*[{[]/.test(_0x5a8596)) {
    if (_0x59e1fa >= 500) {
      return "HTTP " + _0x59e1fa + "：" + _0x5a8596;
    } else {
      return _0x5a8596;
    }
  } else if (_0x59e1fa >= 500) {
    if (_0x59e1fa) {
      return "HTTP " + _0x59e1fa + "，联系上游处理";
    } else {
      return "联系上游处理";
    }
  } else {
    return Ec(_0x28d870, _0x59e1fa) || (_0x59e1fa ? "HTTP " + _0x59e1fa : "");
  }
}
function ho(_0x5b1450) {
  let _0x2cdf26 = String(_0x5b1450 || "").trim();
  if (!_0x2cdf26) {
    return "";
  }
  if (_0x2cdf26.startsWith("{")) {
    try {
      if (JSON.parse(_0x2cdf26)?.error?.type === "upstream_error") {
        return "联系上游处理";
      }
    } catch {}
    let _0xf9850c = mo(_0x2cdf26);
    if (_0xf9850c) {
      return _0xf9850c;
    }
  }
  let _0xdce64e = _0x2cdf26.match(/^error code:\s*(\d+)/i);
  if (_0xdce64e) {
    let _0x33d013 = parseInt(_0xdce64e[1], 10);
    if (_0x33d013 >= 500) {
      return "HTTP " + _0x33d013 + "，联系上游处理";
    }
  }
  if (/upstream_error|upstream request failed|no available accounts/i.test(_0x2cdf26)) {
    return "联系上游处理";
  } else {
    return _0x2cdf26;
  }
}
function wt(_0x16ac63) {
  if (_0x16ac63 == null || _0x16ac63 === "") {
    return "";
  }
  if (typeof _0x16ac63 == "string") {
    return $t(_0x16ac63.trim());
  }
  try {
    return $t(JSON.stringify(_0x16ac63));
  } catch {
    return $t(String(_0x16ac63));
  }
}
function mo(_0x3d56bf) {
  let _0x3aab24 = String(_0x3d56bf || "").trim();
  if (!_0x3aab24 || /<!doctype\s+html/i.test(_0x3aab24) || /<html[\s>]/i.test(_0x3aab24)) {
    return "";
  }
  let _0x3e5e30 = yt(_0x3aab24);
  if (_0x3e5e30) {
    return _0x3e5e30;
  }
  try {
    let _0x14c14f = JSON.parse(_0x3aab24);
    return yt(_0x14c14f.error?.message ?? _0x14c14f.error ?? _0x14c14f.message ?? _0x14c14f);
  } catch {
    return "";
  }
}
function go(_0x44866b, _0x7f6f7e, _0xa0c612, _0x3fa4be = {}) {
  if (Pe(_0xa0c612, _0x7f6f7e)) {
    let _0x5908ba = typeof _0xa0c612 == "string" ? _0xa0c612 : dn(_0xa0c612, _0x3fa4be.headers || {});
    return co(mo(_0x5908ba));
  }
  return xc(_0xa0c612, _0x7f6f7e, _0x3fa4be);
}
function _o(_0xa72a59) {
  let _0x5196a9 = String(_0xa72a59 ?? "").trim();
  if (_0x5196a9) {
    if (Sc(_0x5196a9)) {
      return _0x5196a9;
    } else {
      return $t(_0x5196a9);
    }
  } else {
    return Z("未知错误", "请查看 Output → " + ss);
  }
}
function Oc(_0x5b481f) {
  let _0x263976 = [];
  for (let _0x3ad62f = 0; _0x3ad62f < _0x5b481f.length; _0x3ad62f += io) {
    _0x263976.push(_0x5b481f.slice(_0x3ad62f, _0x3ad62f + io));
  }
  if (_0x263976.length) {
    return _0x263976;
  } else {
    return [""];
  }
}
function Pt(_0x57c391, _0x1052ed) {
  let _0x137530 = yc(_o(_0x1052ed));
  if (_0x137530.length <= io) {
    return [rs(_0x57c391, _0x137530)];
  }
  let _0x5a6f5d = [];
  Oc(_0x137530).forEach((_0x5dfdfe, _0x575b04) => {
    _0x5a6f5d.push(Ze(_0x57c391, _0x5dfdfe, _0x575b04 + 1));
  });
  _0x5a6f5d.push(St(_0x57c391, me.ERROR, ""));
  return _0x5a6f5d;
}
function Ic(_0x1db8cf, _0x2023cf, _0x523063) {
  for (let _0x201eb1 of Pt(_0x2023cf, _0x523063)) {
    _0x1db8cf.write(Ce(_0x201eb1));
  }
}
function qe(_0x2c706f, _0x55c703) {
  if (!_0x2c706f || _0x2c706f.writableEnded) {
    return;
  }
  let _0x3b5982 = _0x33d3be.randomUUID();
  try {
    if (!_0x2c706f.headersSent) {
      _0x2c706f.writeHead(200, At());
    }
    Ic(_0x2c706f, _0x3b5982, _0x55c703);
    _0x2c706f.write(ct());
    _0x2c706f.end();
  } catch (_0x381f0d) {
    console.error("  ❌ endChatWithError failed: " + _0x381f0d.message);
    try {
      if (!_0x2c706f.writableEnded) {
        _0x2c706f.end();
      }
    } catch {}
  }
}
var To = new Set();
var So = [];
var as = "default";
function Ac(_0x7e2bf5) {
  let _0x2896e3 = typeof _0x7e2bf5 == "string" ? Buffer.from(_0x7e2bf5) : _0x7e2bf5;
  let _0x166d94 = _0x2896e3.length;
  let _0x321ac3;
  if (_0x166d94 < 126) {
    _0x321ac3 = Buffer.alloc(2);
    _0x321ac3[0] = 129;
    _0x321ac3[1] = _0x166d94;
  } else if (_0x166d94 < 65536) {
    _0x321ac3 = Buffer.alloc(4);
    _0x321ac3[0] = 129;
    _0x321ac3[1] = 126;
    _0x321ac3.writeUInt16BE(_0x166d94, 2);
  } else {
    _0x321ac3 = Buffer.alloc(10);
    _0x321ac3[0] = 129;
    _0x321ac3[1] = 127;
    _0x321ac3.writeBigUInt64BE(BigInt(_0x166d94), 2);
  }
  return Buffer.concat([_0x321ac3, _0x2896e3]);
}
function Lt(_0x3f6a2e) {
  if (To.size === 0) {
    return;
  }
  let _0x274d2e = Ac(JSON.stringify(_0x3f6a2e));
  for (let _0x4f7ec4 of To) {
    try {
      _0x4f7ec4.write(_0x274d2e);
    } catch {
      To.delete(_0x4f7ec4);
    }
  }
}
function Bt(_0x3e2fcc) {
  return Cc(_0x3e2fcc || as);
}
function cs() {
  return as;
}
function Dt(_0x1791c6, _0xd34f54, _0x57ea1b, _0x4a2fc6 = null) {
  Lt({
    type: "tool_call",
    ts: Date.now(),
    targetId: Bt(_0x4a2fc6),
    tool: _0x1791c6,
    args: typeof _0xd34f54 == "string" ? _0xd34f54.slice(0, 2000) : JSON.stringify(_0xd34f54).slice(0, 2000),
    callId: _0x57ea1b
  });
}
function pn(_0x564b33, _0x3159e3 = false, _0x3dc6ab = null) {
  Lt({
    type: "ai_text",
    ts: Date.now(),
    targetId: Bt(_0x3dc6ab),
    text: _0x564b33.slice(0, 3000),
    partial: _0x3159e3
  });
}
function ls(_0x12122e, _0x5cfce1, _0x3fe15c, _0x419312 = null) {
  Lt({
    type: "chat_start",
    ts: Date.now(),
    targetId: Bt(_0x419312),
    model: _0x12122e,
    messages: _0x5cfce1,
    tools: _0x3fe15c
  });
}
function Et(_0x4f35da, _0x1cdb47, _0x316c39 = null) {
  Lt({
    type: "chat_end",
    ts: Date.now(),
    targetId: Bt(_0x316c39),
    stopReason: _0x4f35da,
    toolsCalled: _0x1cdb47 || []
  });
}
function Ut(_0x44cae8, _0x312cf9, _0x3398e8 = null) {
  if (_0x44cae8 !== "timing" || process.env.XY_MONITOR_TIMING === "1") {
    Lt({
      type: "status",
      ts: Date.now(),
      targetId: Bt(_0x3398e8),
      status: _0x44cae8,
      detail: _0x312cf9
    });
  }
}
function Cc(_0xca5071) {
  return _0xca5071 || "default";
}
function us() {
  if (So.length === 0) {
    return [];
  }
  let _0x2d599d = [...So];
  So = [];
  console.log("[WS Bridge] Consuming " + _0x2d599d.length + " injected message(s)");
  return _0x2d599d;
}
var kc = 8;
var Mc = process.env.STREAM_TEXT_DEBUG === "true";
var bc = 40;
function Nc(_0x1b6372) {
  return String(_0x1b6372 || "").replace(/\s+/g, " ").slice(0, bc);
}
function hn(_0xcc3a00, _0x450768, _0x1834cc = "") {
  if (Mc) {
    E(y.DETAIL, "文本缓冲 " + _0xcc3a00 + " · len=" + String(_0x450768 || "").length + (_0x1834cc ? " · " + _0x1834cc : "") + " · \"" + Nc(_0x450768) + "\"");
  }
}
var Rc = Math.max(Ct, ...Wt.map(_0xd615c9 => _0xd615c9.length));
var vc = (() => {
  let _0x47f447 = parseInt(process.env.STREAM_MARKER_MIN_HOLD || "", 10);
  if (Number.isFinite(_0x47f447) && _0x47f447 >= 1) {
    return _0x47f447;
  } else {
    return 4;
  }
})();
function ds(_0x42b936) {
  let _0x5cacb5 = String(_0x42b936 || "");
  let _0x478b6d = Math.min(_0x5cacb5.length, Rc);
  for (let _0x36a76a = _0x478b6d; _0x36a76a > 0; _0x36a76a--) {
    let _0x1ed5f4 = _0x5cacb5.slice(_0x5cacb5.length - _0x36a76a).trimStart();
    if (_0x1ed5f4 && !(_0x1ed5f4.length < vc) && (Fe.some(_0x41f899 => _0x41f899.startsWith(_0x1ed5f4)) || Wt.some(_0x2f4417 => _0x2f4417.startsWith(_0x1ed5f4)))) {
      return _0x36a76a;
    }
  }
  return 0;
}
function fs(_0x3915d4) {
  let _0x5c6ec9 = [];
  let _0xd72fa = _0x3915d4.split("\n");
  let _0x1f1c6f = null;
  let _0x2c6a5d = [];
  for (let _0x5c993c of _0xd72fa) {
    if (_0x5c993c.startsWith("event: ")) {
      _0x1f1c6f = _0x5c993c.slice(7).trim();
    } else if (_0x5c993c.startsWith("data: ")) {
      _0x2c6a5d.push(_0x5c993c.slice(6));
    } else if (_0x5c993c.startsWith("data:")) {
      _0x2c6a5d.push(_0x5c993c.slice(5));
    } else if (_0x5c993c === "" && _0x1f1c6f !== null) {
      let _0x5446f5 = _0x2c6a5d.join("\n");
      try {
        _0x5c6ec9.push({
          event: _0x1f1c6f,
          data: JSON.parse(_0x5446f5)
        });
      } catch {
        _0x5c6ec9.push({
          event: _0x1f1c6f,
          data: _0x5446f5
        });
      }
      _0x1f1c6f = null;
      _0x2c6a5d = [];
    }
  }
  return _0x5c6ec9;
}
var mn = class {
  constructor(_0x5b0905, _0x1a61b8, _0x6040ad = null, _0x224b80 = true) {
    this._messageId = _0x5b0905;
    this._modelUid = _0x1a61b8;
    this._targetId = _0x6040ad;
    this._bufferForTextToolCalls = !!_0x224b80;
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
  _noteDeclaredModel(_0x4ff353) {
    let _0x53b80f = String(_0x4ff353 || "").trim();
    if (!!_0x53b80f && !this._declaredModel) {
      this._declaredModel = _0x53b80f;
      E(y.UPSTREAM, "上游声明 model=" + _0x53b80f);
    }
  }
  hasErrorEvent() {
    return (this._stats.byType.error || 0) > 0 || !!this._streamErrorHint;
  }
  getStreamErrorHint() {
    return this._streamErrorHint;
  }
  formatEventStats() {
    return Object.entries(this._stats.byType).map(([_0x111f9d, _0x47a9c8]) => _0x111f9d + "=" + _0x47a9c8).join(", ") || "(no events parsed)";
  }
  _trackEvent(_0x39bb4c) {
    let _0x551b6e = _0x39bb4c || "(unknown)";
    this._stats.byType[_0x551b6e] = (this._stats.byType[_0x551b6e] || 0) + 1;
  }
  _captureStreamError(_0x7f4790) {
    let _0x3c3413 = wt(_0x7f4790);
    if (_0x3c3413) {
      this._streamErrorHint = _0x3c3413;
    }
  }
  processEvent(_0x59c2c7) {
    let {
      event: _0x53d832,
      data: _0x49b19b
    } = _0x59c2c7;
    let _0x558b5b = [];
    this._trackEvent(_0x53d832);
    switch (_0x53d832) {
      case "content_block_start":
        this._onContentBlockStart(_0x49b19b, _0x558b5b);
        break;
      case "content_block_delta":
        this._onContentBlockDelta(_0x49b19b, _0x558b5b);
        break;
      case "content_block_stop":
        this._onContentBlockStop(_0x49b19b, _0x558b5b);
        break;
      case "message_delta":
        if (_0x49b19b?.delta?.stop_reason) {
          this._stopReason = _0x49b19b.delta.stop_reason;
        }
        break;
      case "message_stop":
        this._onMessageStop(_0x558b5b);
        break;
      case "error":
        this._captureStreamError(_0x49b19b);
        break;
      case "message_start":
        this._noteDeclaredModel(_0x49b19b?.message?.model ?? _0x49b19b?.model);
        break;
      default:
        break;
    }
    return _0x558b5b;
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
  _onContentBlockStart(_0x577006, _0x20196d) {
    let _0x587fe4 = _0x577006?.content_block;
    if (_0x587fe4) {
      this._currentBlockType = _0x587fe4.type;
      this._currentBlockIndex = _0x577006?.index ?? -1;
      if (_0x587fe4.type === "tool_use") {
        this._toolId = _0x587fe4.id ?? null;
        this._toolName = _0x587fe4.name ?? null;
        this._toolArgsBuffer = "";
      } else if (_0x587fe4.type === "thinking") {
        this._signatureBuffer = "";
      }
    }
  }
  _onContentBlockDelta(_0x5d20c0, _0x2a5980) {
    let _0x5f5698 = _0x5d20c0?.delta;
    if (_0x5f5698) {
      if (_0x5f5698.type === "text_delta" && _0x5f5698.text) {
        this._handleTextDelta(_0x5f5698.text, _0x2a5980);
      } else if (_0x5f5698.type === "thinking_delta" && _0x5f5698.thinking) {
        this._meaningfulOutput = true;
        _0x2a5980.push(_t(this._messageId, _0x5f5698.thinking));
      } else if (_0x5f5698.type === "input_json_delta" && _0x5f5698.partial_json != null) {
        this._toolArgsBuffer += _0x5f5698.partial_json;
      } else if (_0x5f5698.type === "signature_delta" && _0x5f5698.signature != null) {
        this._signatureBuffer += _0x5f5698.signature;
      }
    }
  }
  _onContentBlockStop(_0x2eebc0, _0x18a226) {
    if (this._currentBlockType === "text") {
      this._flushBufferedText(_0x18a226, true);
    } else if (this._currentBlockType === "tool_use") {
      let _0x18a028 = Me(this._toolName ?? "", this._toolArgsBuffer);
      let _0xb50112 = {
        id: this._toolId ?? "",
        name: _0x18a028.toolName,
        arguments_json: JSON.stringify(_0x18a028.params ?? {})
      };
      this._meaningfulOutput = true;
      _0x18a226.push(Tt(this._messageId, [_0xb50112]));
      Dt(_0xb50112.name, _0xb50112.arguments_json, _0xb50112.id, this._targetId);
      this._emittedToolCall = true;
      this._toolId = null;
      this._toolName = null;
      this._toolArgsBuffer = "";
    } else if (this._currentBlockType === "thinking" && this._signatureBuffer) {
      _0x18a226.push(os(this._messageId, this._signatureBuffer));
      this._signatureBuffer = "";
    }
    this._currentBlockType = null;
    this._currentBlockIndex = -1;
  }
  _onMessageStop(_0x3f1f8b) {
    if (this._emittedToolCall) {
      this._flushBufferedText(_0x3f1f8b, true);
    } else {
      let _0x2dbbee = "" + this._capturedToolText + this._pendingText;
      let _0x38a2b4 = Vt(_0x2dbbee);
      if (_0x38a2b4.length > 0) {
        E(y.TOOL, "文本恢复 " + _0x38a2b4.length + " 个 · " + _0x38a2b4.map(_0x1348cf => _0x1348cf.name).join(", "));
        let _0x5c095f = _0x38a2b4.map((_0x4a9162, _0x59cf1c) => ({
          id: "tc_recovered_" + _0x59cf1c,
          name: _0x4a9162.name,
          arguments_json: JSON.stringify(_0x4a9162.input ?? {})
        }));
        this._meaningfulOutput = true;
        _0x3f1f8b.push(Tt(this._messageId, _0x5c095f));
        for (let _0x184d62 of _0x5c095f) {
          Dt(_0x184d62.name, _0x184d62.arguments_json, _0x184d62.id, this._targetId);
        }
        this._stopReason = "tool_use";
      } else {
        this._restoreInterceptedText(_0x3f1f8b);
      }
    }
    let _0x33287a = this._mapStopReason(this._stopReason);
    _0x3f1f8b.push({
      __stopChunk: St(this._messageId, _0x33287a, this._modelUid),
      __chatEnd: {
        stopReason: this._stopReason,
        targetId: this._targetId
      }
    });
    this._done = true;
  }
  _handleTextDelta(_0x2255ed, _0x4c49b5) {
    if (this._turnBleedCut) {
      return;
    }
    if (this._capturingToolText) {
      this._capturedToolText += _0x2255ed;
      return;
    }
    this._pendingText += _0x2255ed;
    let _0x12dab9 = Xt(this._pendingText);
    if (_0x12dab9 !== -1) {
      let _0x777409 = this._pendingText.slice(0, _0x12dab9);
      if (_0x777409) {
        this._emitTextChunk(_0x777409, _0x4c49b5);
      }
      let _0x1f462d = this._pendingText.slice(_0x12dab9);
      let _0x214915 = this._pendingText.slice(Math.max(0, _0x12dab9 - 40), _0x12dab9);
      let _0x10ed4d = _0x5e1ab3 => String(_0x5e1ab3 || "").replace(/\s+/g, " ").replace(/(?:key|token|secret|password|credential)\s*[:=]\s*\S+/gi, "[REDACTED]");
      this._pendingText = "";
      this._turnBleedCut = true;
      E(y.TOOL, "拦截 assistant 越界正文 · 丢弃 " + _0x1f462d.length + " chars · 前文\"…" + _0x10ed4d(_0x214915) + "\" · 命中\"" + _0x10ed4d(_0x1f462d.slice(0, 80)) + "\"");
      return;
    }
    if (!this._bufferForTextToolCalls) {
      this._flushBufferedText(_0x4c49b5, false);
      return;
    }
    let _0x4c583f = be(this._pendingText);
    if (_0x4c583f !== -1) {
      let _0x4ab4e2 = this._pendingText.slice(0, _0x4c583f);
      if (_0x4ab4e2) {
        this._emitTextChunk(_0x4ab4e2, _0x4c49b5);
      }
      this._capturedToolText = this._pendingText.slice(_0x4c583f);
      this._pendingText = "";
      this._capturingToolText = true;
      E(y.TOOL, "检测到文本内 tool-call 起始，暂存后续文本");
      return;
    }
    this._flushBufferedText(_0x4c49b5, false);
  }
  _flushBufferedText(_0x11aa42, _0x3a8bf3) {
    if (!this._bufferForTextToolCalls || _0x3a8bf3) {
      if (this._pendingText) {
        this._emitTextChunk(this._pendingText, _0x11aa42);
        this._pendingText = "";
      }
      return;
    }
    if (!this._emittedText) {
      this._tryEmitInitialVisibleText(_0x11aa42);
    }
    if (this._emittedText && this._pendingText) {
      let _0x5ce8c3 = be(this._pendingText);
      let _0x312af6 = _0x5ce8c3 === -1 ? ds(this._pendingText) : this._pendingText.length - _0x5ce8c3;
      let _0x37e764 = _0x5ce8c3 === -1 ? this._pendingText.length - _0x312af6 : _0x5ce8c3;
      if (_0x37e764 > 0) {
        let _0x3e1c9b = this._pendingText.slice(0, _0x37e764);
        hn("lookbehind-fast-release", _0x3e1c9b, "keep=" + (this._pendingText.length - _0x37e764));
        this._emitTextChunk(_0x3e1c9b, _0x11aa42);
        this._pendingText = this._pendingText.slice(_0x3e1c9b.length);
      }
    }
    let _0x9a8c35 = Math.min(this._pendingText.length, ds(this._pendingText));
    let _0x530554 = this._pendingText.slice(0, this._pendingText.length - _0x9a8c35);
    if (_0x530554) {
      hn("lookbehind-release", _0x530554, "keep=" + _0x9a8c35);
      this._emitTextChunk(_0x530554, _0x11aa42);
      this._pendingText = this._pendingText.slice(_0x530554.length);
    } else if (this._pendingText) {
      hn("lookbehind-hold", this._pendingText, "keep=" + _0x9a8c35);
    }
  }
  _tryEmitInitialVisibleText(_0x5b08c9) {
    if (!this._pendingText || be(this._pendingText) === 0) {
      return false;
    }
    let _0x5b8e0a = this._pendingText.search(/\S/);
    if (_0x5b8e0a === -1) {
      return false;
    }
    let _0xcd74e1 = this._pendingText.slice(_0x5b8e0a);
    if (Fe.some(_0x89485e => _0x89485e.startsWith(_0xcd74e1) || _0xcd74e1.startsWith(_0x89485e))) {
      return false;
    }
    let _0x3f96d9 = be(this._pendingText);
    let _0x3f7c3d = _0x3f96d9 === -1 ? this._pendingText.length : _0x3f96d9;
    let _0x36dfb8 = Math.min(_0x3f7c3d, _0x5b8e0a + kc);
    if (_0x36dfb8 <= _0x5b8e0a) {
      return false;
    }
    let _0x457036 = this._pendingText.slice(0, _0x36dfb8);
    hn("initial-release", _0x457036, "pending=" + this._pendingText.length);
    this._emitTextChunk(_0x457036, _0x5b08c9);
    this._pendingText = this._pendingText.slice(_0x457036.length);
    return true;
  }
  _emitTextChunk(_0x2b678f, _0xbd2093) {
    if (_0x2b678f) {
      this._meaningfulOutput = true;
      this._emittedText = true;
      this._tokenCount++;
      this._visibleTextChars += _0x2b678f.length;
      if (this._visibleTextChars <= this._visibleTextCap) {
        this._visibleText += _0x2b678f;
      } else {
        this._visibleText &&= "";
      }
      _0xbd2093.push({
        __textDelta: _0x2b678f,
        __tokens: this._tokenCount
      });
      pn(_0x2b678f, true, this._targetId);
    }
  }
  _restoreInterceptedText(_0x50dbfb) {
    if (this._capturedToolText) {
      this._emitTextChunk(this._capturedToolText, _0x50dbfb);
      this._capturedToolText = "";
      this._capturingToolText = false;
    }
    this._flushBufferedText(_0x50dbfb, true);
  }
  _mapStopReason(_0x3cb08a) {
    switch (_0x3cb08a) {
      case "end_turn":
        return me.STOP_PATTERN;
      case "tool_use":
        return me.FUNCTION_CALL;
      case "max_tokens":
        return me.MAX_TOKENS;
      default:
        return me.STOP_PATTERN;
    }
  }
};
var $c = 8;
var wc = process.env.STREAM_TEXT_DEBUG === "true";
var Pc = 40;
function Lc(_0x198fb7) {
  return String(_0x198fb7 || "").replace(/\s+/g, " ").slice(0, Pc);
}
function gn(_0x5d5759, _0x356788, _0x11d3f3 = "") {
  if (wc) {
    E(y.DETAIL, "文本缓冲 " + _0x5d5759 + " · len=" + String(_0x356788 || "").length + (_0x11d3f3 ? " · " + _0x11d3f3 : "") + " · \"" + Lc(_0x356788) + "\"");
  }
}
function Bc(_0x18d660) {
  let _0x3d2b6d = String(_0x18d660 || "");
  let _0x15ac88 = Math.min(_0x3d2b6d.length, Ct);
  for (let _0x24d123 = _0x15ac88; _0x24d123 > 0; _0x24d123--) {
    let _0x1ec552 = _0x3d2b6d.slice(_0x3d2b6d.length - _0x24d123).trimStart();
    if (_0x1ec552 && Fe.some(_0x43ce0f => _0x43ce0f.startsWith(_0x1ec552))) {
      return _0x24d123;
    }
  }
  return 0;
}
function ps(_0x8fdc44) {
  let _0x4c73eb = [];
  let _0x416eeb = _0x8fdc44.split("\n");
  for (let _0x473094 of _0x416eeb) {
    if (!_0x473094.startsWith("data: ")) {
      continue;
    }
    let _0x1dcc95 = _0x473094.slice(6).trim();
    if (_0x1dcc95 === "[DONE]") {
      _0x4c73eb.push({
        done: true,
        type: "done",
        data: null
      });
      continue;
    }
    try {
      let _0xa479ba = JSON.parse(_0x1dcc95);
      if (_0xa479ba.error) {
        _0x4c73eb.push({
          done: false,
          type: "chat.completions.error",
          data: _0xa479ba
        });
        continue;
      }
      if (Array.isArray(_0xa479ba.choices)) {
        _0x4c73eb.push({
          done: false,
          type: "chat.completions.chunk",
          data: _0xa479ba
        });
        continue;
      }
      _0x4c73eb.push({
        done: false,
        type: _0xa479ba.type || "",
        data: _0xa479ba
      });
    } catch {}
  }
  return _0x4c73eb;
}
var _n = class {
  constructor(_0x543526, _0x8e278f, _0x167c02 = null, _0x31e523 = true) {
    this._messageId = _0x543526;
    this._modelUid = _0x8e278f;
    this._targetId = _0x167c02;
    this._bufferForTextToolCalls = !!_0x31e523;
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
  _noteDeclaredModel(_0x2a6067) {
    let _0x2b36c3 = String(_0x2a6067 || "").trim();
    if (!!_0x2b36c3 && !this._declaredModel) {
      this._declaredModel = _0x2b36c3;
      E(y.UPSTREAM, "上游声明 model=" + _0x2b36c3);
    }
  }
  hasErrorEvent() {
    return (this._stats.byType.error || 0) > 0 || (this._stats.byType["chat.completions.error"] || 0) > 0 || !!this._errorMessage;
  }
  getStreamErrorHint() {
    return this._errorMessage || "";
  }
  formatEventStats() {
    return Object.entries(this._stats.byType).map(([_0x2b31cb, _0x266f7a]) => _0x2b31cb + "=" + _0x266f7a).join(", ") || "(no events parsed)";
  }
  _trackEvent(_0x4cb805) {
    let _0x4f8c94 = _0x4cb805 || "(unknown)";
    this._stats.byType[_0x4f8c94] = (this._stats.byType[_0x4f8c94] || 0) + 1;
  }
  setAllowedTools(_0x177bb5) {
    this._allowedTools = new Set(_0x177bb5);
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
  processEvent(_0x3f70ac) {
    if (_0x3f70ac.done) {
      return this._onDone();
    }
    let {
      type: _0x3c3186,
      data: _0x4ae735
    } = _0x3f70ac;
    let _0x28ff9f = [];
    this._trackEvent(_0x3c3186);
    switch (_0x3c3186) {
      case "response.reasoning.delta":
        if (_0x4ae735.delta) {
          this._handleReasoningDelta(_0x4ae735.delta, _0x28ff9f);
        }
        break;
      case "response.reasoning_summary_text.delta":
        if (_0x4ae735.delta) {
          this._handleReasoningDelta(_0x4ae735.delta, _0x28ff9f);
        }
        break;
      case "chat.completions.error":
        this._stopReason = "error";
        this._errorMessage = wt(_0x4ae735.error ?? _0x4ae735) || "OpenAI response failed";
        return this._onDone();
      case "chat.completions.chunk":
        {
          this._noteDeclaredModel(_0x4ae735?.model);
          let _0x425daa = _0x4ae735.choices?.[0];
          let _0x513744 = _0x425daa?.finish_reason;
          if (_0x513744 === "stop") {
            this._stopReason = "stop";
          } else if (_0x513744 === "length") {
            this._stopReason = "length";
          } else if (_0x513744 === "tool_calls") {
            this._stopReason = "tool_calls";
          }
          let _0x46f0d0 = _0x425daa?.delta?.reasoning_content ?? _0x425daa?.delta?.reasoning;
          if (_0x46f0d0) {
            this._handleReasoningDelta(_0x46f0d0, _0x28ff9f);
          }
          if (_0x425daa?.delta?.tool_calls) {
            this._handleChatCompletionsToolCalls(_0x425daa.delta.tool_calls, _0x28ff9f);
          }
          let _0x2b13ad = _0x425daa?.delta?.content;
          if (_0x2b13ad) {
            this._handleOutputTextDelta(_0x2b13ad, _0x28ff9f);
          }
          let _0x126d72 = _0x425daa?.message?.content;
          if (typeof _0x126d72 == "string" && _0x126d72) {
            this._handleOutputTextDelta(_0x126d72, _0x28ff9f);
          }
          break;
        }
      case "response.output_text.delta":
        if (_0x4ae735.delta) {
          let _0x7c4100 = _0x4ae735.output_index ?? 0;
          let _0x32ba56 = this._itemTypes[_0x7c4100];
          let _0x6279aa = this._itemPhases[_0x7c4100];
          if (_0x32ba56 === "reasoning" || _0x6279aa === "thinking") {
            this._handleReasoningDelta(_0x4ae735.delta, _0x28ff9f);
          } else {
            this._handleOutputTextDelta(_0x4ae735.delta, _0x28ff9f);
          }
        }
        break;
      case "response.output_item.added":
        {
          let _0x50f156 = _0x4ae735.item;
          let _0x4391cf = _0x4ae735.output_index ?? 0;
          if (_0x50f156) {
            this._itemTypes[_0x4391cf] = _0x50f156.type;
            if (_0x50f156.phase) {
              this._itemPhases[_0x4391cf] = _0x50f156.phase;
            }
          }
          if (_0x50f156?.type === "function_call") {
            this._toolCalls[_0x4391cf] = {
              id: _0x50f156.call_id || _0x50f156.id || "",
              name: _0x50f156.name || "",
              arguments: ""
            };
          }
          break;
        }
      case "response.function_call_arguments.delta":
        {
          let _0x144ac3 = _0x4ae735.output_index ?? 0;
          if (this._toolCalls[_0x144ac3]) {
            this._toolCalls[_0x144ac3].arguments += _0x4ae735.delta || "";
          }
          break;
        }
      case "response.completed":
        {
          let _0x180303 = _0x4ae735.response;
          this._noteDeclaredModel(_0x180303?.model ?? _0x4ae735?.model);
          if (_0x180303?.status === "completed") {
            this._stopReason = "stop";
            if (_0x180303.output?.some(_0x1e1a3c => _0x1e1a3c.type === "function_call")) {
              this._stopReason = "tool_calls";
            }
          }
          return this._onDone();
        }
      case "response.incomplete":
        {
          let _0x52d4af = _0x4ae735.response;
          this._stopReason = this._mapIncompleteReason(_0x52d4af?.incomplete_details?.reason);
          return this._onDone();
        }
      case "response.failed":
        {
          let _0x17eeeb = _0x4ae735.response?.error || _0x4ae735.error;
          this._stopReason = "error";
          this._errorMessage = wt(_0x17eeeb ?? _0x4ae735) || "OpenAI response failed";
          return this._onDone();
        }
      case "response.created":
        this._noteDeclaredModel(_0x4ae735?.response?.model ?? _0x4ae735?.model);
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
        if (_0x3c3186 && !_0x3c3186.startsWith("response.")) {
          E(y.DETAIL, "未知 OpenAI 事件: " + _0x3c3186);
        }
        break;
    }
    return _0x28ff9f;
  }
  _onDone() {
    if (this._done) {
      return [];
    }
    let _0x2b4d51 = [];
    let _0x37f491 = [];
    this._flushReasoningPlaceholder(_0x2b4d51);
    let _0x22d5eb = this._filterThinkPlaceholderText("", true);
    if (_0x22d5eb) {
      this._handleOutputTextDelta(_0x22d5eb, _0x2b4d51, true);
    }
    if (this._errorMessage) {
      this._restoreInterceptedText(_0x2b4d51);
      for (let _0x5c5a6e of Pt(this._messageId, this._errorMessage)) {
        _0x2b4d51.push(_0x5c5a6e);
      }
      this._done = true;
      return _0x2b4d51;
    }
    let _0x3298c9 = Object.keys(this._toolCalls);
    if (_0x3298c9.length > 0) {
      this._flushBufferedText(_0x2b4d51, true);
      let _0x3a6ea1 = _0x3298c9.sort((_0x27d9db, _0x561b14) => Number(_0x27d9db) - Number(_0x561b14)).map(_0xa57330 => {
        let _0x299ae6 = this._toolCalls[_0xa57330];
        let _0x460865 = Me(_0x299ae6.name, _0x299ae6.arguments);
        let _0xd7b25 = _0x299ae6.arguments ? _0x299ae6.arguments.length : 0;
        E(y.TOOL, "native · idx=" + _0xa57330 + " · " + (_0x460865.toolName || _0x299ae6.name || "(empty)") + " · args=" + _0xd7b25 + "b");
        return {
          id: _0x299ae6.id,
          name: _0x460865.toolName,
          arguments_json: JSON.stringify(_0x460865.params ?? {})
        };
      });
      if (_0x3a6ea1.length > 0) {
        this._meaningfulOutput = true;
        _0x37f491.push(..._0x3a6ea1);
        _0x2b4d51.push(Tt(this._messageId, _0x3a6ea1));
        this._stopReason = "tool_calls";
      } else {
        E(y.TOOL, "工具调用均被过滤，回退为文本输出");
        this._restoreInterceptedText(_0x2b4d51);
      }
    } else {
      let _0x18dc87 = "" + this._capturedToolText + this._pendingText;
      let _0xc26fea = Vt(_0x18dc87);
      if (_0xc26fea.length > 0) {
        E(y.TOOL, "文本恢复 " + _0xc26fea.length + " 个 · " + _0xc26fea.map(_0x691c04 => _0x691c04.name).join(", "));
        let _0x88f94d = _0xc26fea.map((_0x225959, _0x35245c) => {
          let _0x3805f8 = JSON.stringify(_0x225959.input ?? {});
          E(y.TOOL, "text · idx=" + _0x35245c + " · " + (_0x225959.name || "(empty)") + " · args=" + _0x3805f8.length + "b");
          return {
            id: "tc_recovered_" + _0x35245c,
            name: _0x225959.name,
            arguments_json: _0x3805f8
          };
        });
        this._meaningfulOutput = true;
        _0x37f491.push(..._0x88f94d);
        _0x2b4d51.push(Tt(this._messageId, _0x88f94d));
        this._stopReason = "tool_calls";
      } else {
        this._restoreInterceptedText(_0x2b4d51);
      }
    }
    this._stopReason ||= "stop";
    if (this._tokenCount === 0 && _0x37f491.length === 0 && this._reasoningBuffer) {
      E(y.DETAIL, "仅 reasoning，提升为可见文本");
      this._emitTextChunk(this._reasoningBuffer, _0x2b4d51);
      this._reasoningBuffer = "";
    }
    if (this._stopReason === "tool_calls" && _0x37f491.length === 0) {
      E(y.TOOL, "stop=tool_calls 但未解析到调用，降级为 stop");
      this._stopReason = "stop";
    }
    let _0x4e0810 = _0x37f491.map(_0x5e8a50 => _0x5e8a50.name).filter(Boolean);
    if (_0x4e0810.length > 0) {
      E(y.TOOL, "已调用 · [" + _0x4e0810.join(", ") + "]");
    } else if (this._stopReason === "stop") {
      E(y.TOOL, "未调用 · stop=stop");
    }
    let _0x2c0ddc = this._mapStopReason(this._stopReason);
    _0x2b4d51.push({
      __stopChunk: St(this._messageId, _0x2c0ddc, this._modelUid)
    });
    this._done = true;
    if (_0x37f491.length > 0) {
      for (let _0x356893 of _0x37f491) {
        Dt(_0x356893.name, _0x356893.arguments_json, _0x356893.id, this._targetId);
      }
    }
    Et(this._stopReason, _0x4e0810, this._targetId);
    return _0x2b4d51;
  }
  _handleChatCompletionsToolCalls(_0x4572be, _0x37e53a) {
    for (let _0x669ac0 of _0x4572be || []) {
      let _0x82f688 = _0x669ac0.index ?? 0;
      this._toolCalls[_0x82f688] ||= {
        id: "",
        name: "",
        arguments: ""
      };
      if (_0x669ac0.id) {
        this._toolCalls[_0x82f688].id = _0x669ac0.id;
      }
      if (_0x669ac0.function?.name) {
        this._toolCalls[_0x82f688].name = _0x669ac0.function.name;
      }
      if (_0x669ac0.function?.arguments) {
        this._toolCalls[_0x82f688].arguments += _0x669ac0.function.arguments;
      }
    }
  }
  _emitReasoningChunk(_0x535e67, _0x50a587) {
    if (_0x535e67) {
      this._meaningfulOutput = true;
      this._emittedReasoning = true;
      this._reasoningBuffer += _0x535e67;
      _0x50a587.push(_t(this._messageId, _0x535e67));
    }
  }
  _handleReasoningDelta(_0x1ae7b6, _0x468233) {
    let _0xa6d05c = String(_0x1ae7b6 || "");
    if (!_0xa6d05c) {
      return;
    }
    if (this._reasoningStreamStarted) {
      this._emitReasoningChunk(_0xa6d05c, _0x468233);
      return;
    }
    let _0x2666a6 = "" + this._reasoningPlaceholderBuffer + _0xa6d05c;
    if (/^[\s.…]*$/.test(_0x2666a6)) {
      this._reasoningPlaceholderBuffer = _0x2666a6;
      return;
    }
    this._reasoningPlaceholderBuffer = "";
    this._reasoningStreamStarted = true;
    this._emitReasoningChunk(_0x2666a6, _0x468233);
  }
  _flushReasoningPlaceholder(_0x1cbce5) {
    let _0x2472ae = this._reasoningPlaceholderBuffer;
    this._reasoningPlaceholderBuffer = "";
    if (_0x2472ae) {
      if (/^\s*(?:\.{3,}|…+)\s*$/.test(_0x2472ae)) {
        E(y.DETAIL, "已过滤空 reasoning 占位");
        return;
      }
      this._reasoningStreamStarted = true;
      this._emitReasoningChunk(_0x2472ae, _0x1cbce5);
    }
  }
  _filterThinkPlaceholderText(_0xca7502, _0x28da7f = false) {
    let _0x3337f2 = "" + this._thinkPlaceholderBuffer + String(_0xca7502 || "");
    this._thinkPlaceholderBuffer = "";
    let _0x43c83c = "";
    let _0x41020b = "<think>";
    let _0x4bf1ea = "</think>";
    while (_0x3337f2) {
      let _0x322d0c = _0x3337f2.toLowerCase();
      let _0x4c377a = _0x322d0c.indexOf(_0x41020b);
      if (_0x4c377a === -1) {
        if (_0x28da7f) {
          _0x43c83c += _0x3337f2;
          break;
        }
        let _0x2fde08 = 0;
        let _0x28ca4d = Math.min(_0x3337f2.length, _0x41020b.length - 1);
        for (let _0x301766 = _0x28ca4d; _0x301766 > 0; _0x301766--) {
          if (_0x41020b.startsWith(_0x322d0c.slice(-_0x301766))) {
            _0x2fde08 = _0x301766;
            break;
          }
        }
        _0x43c83c += _0x3337f2.slice(0, _0x3337f2.length - _0x2fde08);
        this._thinkPlaceholderBuffer = _0x3337f2.slice(_0x3337f2.length - _0x2fde08);
        break;
      }
      _0x43c83c += _0x3337f2.slice(0, _0x4c377a);
      _0x3337f2 = _0x3337f2.slice(_0x4c377a);
      let _0x205fcf = _0x3337f2.toLowerCase().indexOf(_0x4bf1ea, _0x41020b.length);
      if (_0x205fcf !== -1) {
        let _0x388bc7 = _0x205fcf + _0x4bf1ea.length;
        let _0x5cd839 = _0x3337f2.slice(_0x41020b.length, _0x205fcf);
        if (!/^\s*(?:\.{3,}|…+)\s*$/.test(_0x5cd839)) {
          _0x43c83c += _0x3337f2.slice(0, _0x388bc7);
        }
        _0x3337f2 = _0x3337f2.slice(_0x388bc7);
        continue;
      }
      let _0x40fbe9 = _0x3337f2.slice(_0x41020b.length).match(/^([\s.…]*)(.*)$/s);
      let _0xc742ef = _0x40fbe9?.[2] || "";
      let _0x1872c0 = !!_0x40fbe9 && (!_0xc742ef || _0x4bf1ea.startsWith(_0xc742ef.toLowerCase()));
      if (!_0x28da7f && _0x1872c0) {
        this._thinkPlaceholderBuffer = _0x3337f2;
      } else {
        _0x43c83c += _0x3337f2;
      }
      break;
    }
    return _0x43c83c;
  }
  _handleOutputTextDelta(_0x24158d, _0x3cbef7, _0x5131f7 = false) {
    let _0x57b2ed = _0x5131f7 ? String(_0x24158d || "") : this._filterThinkPlaceholderText(_0x24158d);
    if (!_0x57b2ed) {
      return;
    }
    _0x24158d = _0x57b2ed;
    if (this._capturingToolText) {
      this._capturedToolText += _0x24158d;
      return;
    }
    this._pendingText += _0x24158d;
    if (!this._bufferForTextToolCalls) {
      this._flushBufferedText(_0x3cbef7, false);
      return;
    }
    let _0xa75c54 = be(this._pendingText);
    if (_0xa75c54 !== -1) {
      let _0x87b7b0 = this._pendingText.slice(0, _0xa75c54);
      if (_0x87b7b0) {
        this._emitTextChunk(_0x87b7b0, _0x3cbef7);
      }
      this._capturedToolText = this._pendingText.slice(_0xa75c54);
      this._pendingText = "";
      this._capturingToolText = true;
      E(y.TOOL, "检测到文本内 tool-call 起始，暂存后续文本");
      return;
    }
    this._flushBufferedText(_0x3cbef7, false);
  }
  _flushBufferedText(_0x217fb2, _0xa3e15) {
    if (!this._bufferForTextToolCalls || _0xa3e15) {
      if (this._pendingText) {
        this._emitTextChunk(this._pendingText, _0x217fb2);
        this._pendingText = "";
      }
      return;
    }
    if (!this._emittedText) {
      this._tryEmitInitialVisibleText(_0x217fb2);
    }
    if (this._emittedText && this._pendingText) {
      let _0x560f40 = be(this._pendingText);
      let _0x578926 = _0x560f40 === -1 ? Bc(this._pendingText) : this._pendingText.length - _0x560f40;
      let _0x2c4332 = _0x560f40 === -1 ? this._pendingText.length - _0x578926 : _0x560f40;
      if (_0x2c4332 > 0) {
        let _0x45c22d = this._pendingText.slice(0, _0x2c4332);
        gn("lookbehind-fast-release", _0x45c22d, "keep=" + (this._pendingText.length - _0x2c4332));
        this._emitTextChunk(_0x45c22d, _0x217fb2);
        this._pendingText = this._pendingText.slice(_0x45c22d.length);
      }
    }
    let _0x32694f = Math.min(this._pendingText.length, Ct);
    let _0x1636d7 = this._pendingText.slice(0, this._pendingText.length - _0x32694f);
    if (_0x1636d7) {
      gn("lookbehind-release", _0x1636d7, "keep=" + _0x32694f);
      this._emitTextChunk(_0x1636d7, _0x217fb2);
      this._pendingText = this._pendingText.slice(_0x1636d7.length);
    } else if (this._pendingText) {
      gn("lookbehind-hold", this._pendingText, "keep=" + _0x32694f);
    }
  }
  _tryEmitInitialVisibleText(_0x24247a) {
    if (!this._pendingText || be(this._pendingText) === 0) {
      return false;
    }
    let _0x44574f = this._pendingText.search(/\S/);
    if (_0x44574f === -1) {
      return false;
    }
    let _0x29bdae = this._pendingText.slice(_0x44574f);
    if (Fe.some(_0x4b6aae => _0x4b6aae.startsWith(_0x29bdae) || _0x29bdae.startsWith(_0x4b6aae))) {
      return false;
    }
    let _0x78cda0 = be(this._pendingText);
    let _0x1e341f = _0x78cda0 === -1 ? this._pendingText.length : _0x78cda0;
    let _0x37d2a4 = Math.min(_0x1e341f, _0x44574f + $c);
    if (_0x37d2a4 <= _0x44574f) {
      return false;
    }
    let _0xd6625a = this._pendingText.slice(0, _0x37d2a4);
    gn("initial-release", _0xd6625a, "pending=" + this._pendingText.length);
    this._emitTextChunk(_0xd6625a, _0x24247a);
    this._pendingText = this._pendingText.slice(_0xd6625a.length);
    return true;
  }
  _emitTextChunk(_0x301147, _0xd59f77) {
    if (_0x301147) {
      this._meaningfulOutput = true;
      this._emittedText = true;
      this._tokenCount++;
      _0xd59f77.push({
        __textDelta: _0x301147,
        __tokens: this._tokenCount
      });
      pn(_0x301147, true, this._targetId);
    }
  }
  _restoreInterceptedText(_0x28d383) {
    if (this._capturedToolText) {
      this._emitTextChunk(this._capturedToolText, _0x28d383);
      this._capturedToolText = "";
      this._capturingToolText = false;
    }
    this._flushBufferedText(_0x28d383, true);
  }
  _mapIncompleteReason(_0x1ea5b9) {
    switch (_0x1ea5b9) {
      case "max_output_tokens":
      case "max_tokens":
      case "output_truncated":
        return "length";
      default:
        return "stop";
    }
  }
  _mapStopReason(_0x1837be) {
    switch (_0x1837be) {
      case "stop":
        return me.STOP_PATTERN;
      case "tool_calls":
        return me.FUNCTION_CALL;
      case "length":
        return me.MAX_TOKENS;
      case "error":
        return me.ERROR;
      default:
        return me.STOP_PATTERN;
    }
  }
};
var hs = "请继续执行，不要只说明计划，直接调用工具或给出完整结果。";
var Dc = "[短停续跑]";
function Uc(_0x94bcb2) {
  let _0x4e12f0 = String(process.env[_0x94bcb2] ?? "1").trim().toLowerCase();
  return _0x4e12f0 !== "0" && _0x4e12f0 !== "false" && _0x4e12f0 !== "off" && _0x4e12f0 !== "no";
}
function ms(_0x4059fe, _0xb646cd, _0x3c7672, _0x3fcb0d) {
  let _0x47511a = parseInt(String(process.env[_0x4059fe] ?? String(_0xb646cd)), 10);
  if (Number.isFinite(_0x47511a)) {
    return Math.min(Math.max(_0x47511a, _0x3c7672), _0x3fcb0d);
  } else {
    return _0xb646cd;
  }
}
function gs() {
  return {
    enabled: Uc("BYOK_SHORT_STOP_CONTINUE"),
    maxChars: ms("BYOK_SHORT_STOP_MAX_CHARS", 80, 1, 10000),
    maxContinues: ms("BYOK_SHORT_STOP_CONTINUE_MAX", 1, 0, 5)
  };
}
function _s(_0x5dc25d) {
  let _0x385d2a = String(_0x5dc25d || "").trim().toLowerCase();
  return _0x385d2a === "end_turn" || _0x385d2a === "stop" || _0x385d2a === "end";
}
function Ts(_0x42ff09) {
  let _0x255e0e = !!_0x42ff09.enabled;
  let _0x489658 = Number(_0x42ff09.maxChars) || 80;
  let _0xdbf5d6 = Number(_0x42ff09.maxContinues) || 0;
  let _0x4b7239 = Number(_0x42ff09.continuesUsed) || 0;
  let _0x30c61d = _0x42ff09.stopReason;
  let _0x257b76 = !!_0x42ff09.hasToolUse;
  let _0x55592e = Math.max(0, Number(_0x42ff09.visibleTextChars) || 0);
  let _0x5a9776 = !!_0x42ff09.hasError;
  let _0x1f693d = "chars=" + _0x55592e + " tool=" + (_0x257b76 ? 1 : 0) + " continued=" + _0x4b7239 + "/" + _0xdbf5d6 + " stop=" + (_0x30c61d || "null") + " enabled=" + (_0x255e0e ? 1 : 0);
  if (_0x257b76) {
    return {
      action: "pass",
      phase: null,
      detail: _0x1f693d
    };
  } else if (_0x5a9776) {
    return {
      action: "pass",
      phase: "跳过",
      detail: _0x1f693d + " reason=error"
    };
  } else if (String(_0x30c61d || "").toLowerCase() === "max_tokens") {
    return {
      action: "pass",
      phase: "跳过",
      detail: _0x1f693d + " reason=max_tokens"
    };
  } else if (_s(_0x30c61d)) {
    if (_0x255e0e) {
      if (_0xdbf5d6 <= 0 || _0x4b7239 >= _0xdbf5d6) {
        return {
          action: "pass",
          phase: "跳过",
          detail: _0x1f693d + " reason=已续过"
        };
      } else if (_0x55592e >= _0x489658) {
        return {
          action: "pass",
          phase: null,
          detail: _0x1f693d + " reason=正文足够"
        };
      } else {
        return {
          action: "continue",
          phase: "触发",
          detail: _0x1f693d + " reason=短end_turn"
        };
      }
    } else {
      return {
        action: "pass",
        phase: "跳过",
        detail: _0x1f693d + " reason=disabled"
      };
    }
  } else {
    return {
      action: "pass",
      phase: null,
      detail: _0x1f693d
    };
  }
}
function Ss({
  continuesUsed: _0x3fad0f,
  stopReason: _0x975eb7,
  hasToolUse: _0x5d8a80,
  visibleTextChars: _0x414e47,
  maxChars: _0x30ffef,
  hasError: _0x449440,
  aborted: _0x34d957
}) {
  if (!_0x3fad0f || _0x3fad0f < 1) {
    return null;
  } else if (_0x34d957 || _0x449440) {
    return "放弃";
  } else if (_0x5d8a80 || !_s(_0x975eb7) || Math.max(0, Number(_0x414e47) || 0) >= (Number(_0x30ffef) || 80)) {
    return "成功";
  } else {
    return "放弃";
  }
}
function ys(_0x5d761d, _0x5ca23a) {
  return Dc + " " + _0x5d761d + " · " + _0x5ca23a;
}
function Es(_0x10910c) {
  if (!Array.isArray(_0x10910c) || _0x10910c.length === 0) {
    return {
      chunks: _0x10910c || [],
      strippedStop: false
    };
  }
  let _0x32f602 = false;
  let _0x17cc63 = [];
  for (let _0xde7db4 of _0x10910c) {
    if (_0xde7db4 && _0xde7db4.__stopChunk) {
      _0x32f602 = true;
      continue;
    }
    _0x17cc63.push(_0xde7db4);
  }
  return {
    chunks: _0x17cc63,
    strippedStop: _0x32f602
  };
}
function xs(_0x5b9ea4, _0x35b8bd, _0x57669d = hs) {
  let _0x2ad852 = Array.isArray(_0x5b9ea4) ? _0x5b9ea4.slice() : [];
  let _0x4d0729 = String(_0x35b8bd || "").trim();
  if (_0x4d0729) {
    _0x2ad852.push({
      role: "assistant",
      content: _0x4d0729
    });
  }
  _0x2ad852.push({
    role: "user",
    content: String(_0x57669d || hs)
  });
  return _0x2ad852;
}
function Tn(_0x2a2373) {
  return String(_0x2a2373 || "").replace(/^https?:\/\//i, "");
}
function je(_0x127e71) {
  let _0x67524 = Tn(String(_0x127e71 || "").trim()).replace(/\/+$/, "");
  let _0x24df08 = _0x67524.indexOf("/");
  if (_0x24df08 < 0) {
    return {
      host: _0x67524,
      pathPrefix: ""
    };
  } else {
    return {
      host: _0x67524.slice(0, _0x24df08),
      pathPrefix: _0x67524.slice(_0x24df08)
    };
  }
}
function Sn(_0x51e9fb) {
  let {
    host: _0x27b43b
  } = je(_0x51e9fb);
  let _0x52ca22 = _0x27b43b.split(":");
  if (_0x52ca22.length >= 2 && /^\d+$/.test(_0x52ca22[_0x52ca22.length - 1])) {
    return {
      hostname: _0x52ca22.slice(0, -1).join(":"),
      port: parseInt(_0x52ca22[_0x52ca22.length - 1], 10)
    };
  } else {
    return {
      hostname: _0x27b43b,
      port: 443
    };
  }
}
function Os(_0x169b3b) {
  let _0x2e9b77 = je(Tn(_0x169b3b)).host.toLowerCase();
  let _0xb49195 = _0x2e9b77.replace(/:\d+$/, "");
  if (_0xb49195 === "127.0.0.1" || _0xb49195 === "localhost" || _0xb49195 === "0.0.0.0" || _0xb49195 === "::1" || _0xb49195 === "[::1]") {
    return true;
  }
  let _0x45a636 = Sn(_0x2e9b77);
  return _0x45a636.port !== 443 && _0x45a636.port !== 80 && /:\d+$/.test(_0x2e9b77);
}
function yo(_0x4b6211, _0x1c6b53) {
  if (_0x1c6b53 === true || _0x1c6b53 === false) {
    return _0x1c6b53;
  }
  let _0x5d2178 = String(_0x4b6211 || "").trim();
  if (/^http:\/\//i.test(_0x5d2178)) {
    return true;
  } else if (/^https:\/\//i.test(_0x5d2178)) {
    return false;
  } else {
    return Os(_0x5d2178);
  }
}
var Hc = ["/messages", "/chat/completions", "/responses", "/models"];
function Is(_0x1b85f0, _0x151dae, _0x17c303) {
  let _0x48ca34 = String(_0x1b85f0 || "").replace(/\/+$/, "");
  let _0x33fb2d = _0x151dae.startsWith("/") ? _0x151dae : "/" + _0x151dae;
  if (Hc.some(_0x58f72e => _0x48ca34.includes(_0x58f72e))) {
    return _0x48ca34;
  } else if (_0x48ca34) {
    return _0x48ca34 + _0x33fb2d;
  } else {
    return String(_0x17c303 || "").trim() || _0x33fb2d;
  }
}
import _0x43f9d9 from "node:fs";
import _0x3c6071 from "node:path";
var Bs = Ki(Rs(), 1);
var {
  familyKeyFromUid: vs,
  officialUidFromLegacyByok: Xc,
  deriveVariantOptsFromUid: Ds
} = Bs.default;
var Vc = new Set(["CLAUDE_4_OPUS_BYOK", "CLAUDE_4_OPUS_THINKING_BYOK", "CLAUDE_4_SONNET_BYOK", "CLAUDE_4_SONNET_THINKING_BYOK", "MODEL_CLAUDE_4_OPUS_BYOK", "MODEL_CLAUDE_4_OPUS_THINKING_BYOK", "MODEL_CLAUDE_4_SONNET_BYOK", "MODEL_CLAUDE_4_SONNET_THINKING_BYOK"]);
var Ht = new Map();
var nt = process.env.MODEL_CAPTURE_PATH || "";
function Us(_0xceedf8) {
  if (_0xceedf8) {
    nt = _0xceedf8;
  }
}
function Jc() {
  if (!!nt && !!_0x43f9d9.existsSync(nt)) {
    try {
      let _0x2ffcaf = JSON.parse(_0x43f9d9.readFileSync(nt, "utf8"));
      if (!Array.isArray(_0x2ffcaf)) {
        return;
      }
      for (let _0x5c6b4d of _0x2ffcaf) {
        if (_0x5c6b4d && _0x5c6b4d.id) {
          Ht.set(_0x5c6b4d.id, _0x5c6b4d);
        }
      }
    } catch {}
  }
}
Jc();
function $s(_0x291e96, _0x37e224 = {}) {
  try {
    let _0x453926 = lt(_0x291e96, _0x37e224 || {});
    let _0x4c9913 = ge(_0x453926);
    let _0x46735c = W(_0x4c9913, 21, 2);
    if (_0x46735c) {
      return _0x46735c.value.toString("utf8");
    }
    let _0x1f4b60 = W(_0x4c9913, 3, 2);
    if (_0x1f4b60) {
      let _0x4b38ec = _0x1f4b60.value.toString("utf8");
      if (_0x4b38ec && _0x4b38ec.length < 120 && /[A-Z0-9_]/i.test(_0x4b38ec)) {
        return _0x4b38ec;
      }
    }
  } catch {}
  return "";
}
function Qc(_0x4a8c95, _0x9583cb = 12000) {
  let _0x39c5ee = Buffer.isBuffer(_0x4a8c95) ? _0x4a8c95 : Buffer.from(_0x4a8c95 || []);
  let _0x3bfdd9 = _0x39c5ee.toString("utf8", 0, Math.min(_0x39c5ee.length, _0x9583cb)).match(/\b(?:MODEL_[A-Z0-9_]+|CLAUDE_[A-Z0-9_]+|GPT_[A-Z0-9_]+|GEMINI_[A-Z0-9_]+|[a-z]+-[a-z0-9.-]+)\b/g) || [];
  return [...new Set(_0x3bfdd9)].filter(_0x46b773 => _0x46b773.length >= 3 && _0x46b773.length <= 80);
}
function ot(_0x7f5f10) {
  let _0x3b5c32 = String(_0x7f5f10 || "").trim();
  if (!_0x3b5c32) {
    return false;
  }
  if (Vc.has(_0x3b5c32) || /_BYOK\b/i.test(_0x3b5c32) || /\bBYOK\b/i.test(_0x3b5c32)) {
    return true;
  }
  let _0x3d1b70 = Ht.get(_0x3b5c32);
  return !!_0x3d1b70 && _0x3d1b70.byok === true;
}
function _isInternalCompactionUid(_0xuid) {
  return /^(?:compactor|memory-migration-default)$/i.test(String(_0xuid || "").trim());
}
function _resolveInternalCascadeBinding(_0xcfg) {
  let _0xconfig = _0xcfg || xe();
  let _0xgroups = [
    _0xconfig.cascadeBindings && typeof _0xconfig.cascadeBindings === "object" ? _0xconfig.cascadeBindings : {},
    _0xconfig.byokBindingsV2 && typeof _0xconfig.byokBindingsV2 === "object" ? _0xconfig.byokBindingsV2 : {}
  ];
  for (let _0xbindings of _0xgroups) {
    for (let [_0xkey, _0xbinding] of Object.entries(_0xbindings)) {
      if (_0xbinding?.providerId && _0xbinding?.modelId) {
        return Ps(_0xkey, _0xkey, _0xbinding, _0xconfig, "internal-compactor");
      }
    }
  }
  return null;
}
function _byokSubagentDisabled() {
  let _0xvalue = String(process.env.BYOK_DISABLE_SUBAGENT ?? "").trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(_0xvalue);
}
var Hs = {
  CLAUDE_4_OPUS_BYOK: "MODEL_CLAUDE_4_OPUS_BYOK",
  CLAUDE_4_OPUS_THINKING_BYOK: "MODEL_CLAUDE_4_OPUS_THINKING_BYOK",
  CLAUDE_4_SONNET_BYOK: "MODEL_CLAUDE_4_SONNET_BYOK",
  CLAUDE_4_SONNET_THINKING_BYOK: "MODEL_CLAUDE_4_SONNET_THINKING_BYOK"
};
var Zc = {
  MODEL_CLAUDE_4_OPUS_BYOK: "byokOpus",
  MODEL_CLAUDE_4_OPUS_THINKING_BYOK: "byokOpusThinking",
  MODEL_CLAUDE_4_SONNET_BYOK: "byokSonnet",
  MODEL_CLAUDE_4_SONNET_THINKING_BYOK: "byokSonnetThinking"
};
var ws = {
  MODEL_CLAUDE_4_OPUS_BYOK: "Claude Opus 4 BYOK",
  MODEL_CLAUDE_4_OPUS_THINKING_BYOK: "Claude Opus 4 Thinking BYOK",
  MODEL_CLAUDE_4_SONNET_BYOK: "Claude Sonnet 4 BYOK",
  MODEL_CLAUDE_4_SONNET_THINKING_BYOK: "Claude Sonnet 4 Thinking BYOK"
};
var el = {
  ...ws,
  ...Object.fromEntries(Object.entries(Hs).map(([_0x2d0387, _0x21b88e]) => [_0x2d0387, ws[_0x21b88e] || _0x21b88e]))
};
function xt(_0x2878bc) {
  let _0x2f29de = String(_0x2878bc || "").trim();
  return Hs[_0x2f29de] || _0x2f29de;
}
function Fs(_0x3f10fe, _0x1aa81e = null) {
  let _0x1cc8e3 = xn(_0x3f10fe, _0x1aa81e);
  if (_0x1cc8e3 && _0x1cc8e3.modelId) {
    return _0x1cc8e3.modelId;
  } else {
    return "";
  }
}
var tl = ["low", "medium", "high", "xhigh", "max"];
var Io = 1000000;
var Ao = 200000;
// BYOK providers are not limited by Devin's legacy 200K non-1M flag.  Keep
// the official 200K constant for compatibility, but use a safer 300K default
// for bound third-party models unless their binding/native catalog supplies a
// concrete contextLimit.
var _byokDefaultContextTokens = 300000;
var _byokMaxContextTokensInference = 2000000;
function En(_0x205978) {
  let _0x2e4e30 = Math.floor(Number(_0x205978?.contextLimit) || 0);
  if (Number.isFinite(_0x2e4e30) && _0x2e4e30 > 0) {
    return Math.min(_byokMaxContextTokensInference, Math.max(8192, _0x2e4e30));
  }
  return _0x205978 && _0x205978.context1m === false ? _byokDefaultContextTokens : Io;
}
function nl(_0x3fd737) {
  return !_0x3fd737 || _0x3fd737.context1m !== false;
}
function ol(_0x2010ab) {
  if (!_0x2010ab || _0x2010ab.thinking !== true) {
    return {
      thinking: false,
      thinkingBudget: 0,
      effort: ""
    };
  }
  let _0x11f228 = parseInt(_0x2010ab.thinkingBudget, 10);
  let _0x14af87 = Number.isFinite(_0x11f228) && _0x11f228 > 0 ? _0x11f228 : 0;
  let _0x292e29 = String(_0x2010ab.effort || "").trim().toLowerCase();
  let _0x169a36 = tl.includes(_0x292e29) ? _0x292e29 : "max";
  return {
    thinking: true,
    thinkingBudget: _0x14af87,
    effort: _0x169a36
  };
}
function Ps(_0x5b80ec, _0x5a3161, _0xef553b, _0x5ad1d3, _0x1b9174) {
  if (!_0xef553b?.providerId || !_0xef553b?.modelId) {
    return null;
  }
  let _0x3cb4c8 = String(_0xef553b.modelId).trim();
  let _0x4d895d = String(_0xef553b.providerId);
  let _0x336b20 = _0x5ad1d3.providerHealth?.[_0x4d895d];
  let _0x4cdd48 = _0x336b20 && (_0x336b20.status === "circuit-open" || Number(_0x336b20.circuitUntil) > Date.now());
  if (_0x4cdd48) {
    let _0x5238ec = Object.keys(_0x5ad1d3.providers || {}).find(_0x456061 => {
      if (_0x456061 === _0x4d895d) return false;
      let _0x4c722f = _0x5ad1d3.providerHealth?.[_0x456061];
      return !_0x4c722f || _0x4c722f.status !== "circuit-open" && Number(_0x4c722f.circuitUntil) <= Date.now();
    });
    if (_0x5238ec) _0x4d895d = _0x5238ec;
  }
  let _0x202df6 = _0x5ad1d3.providers?.[_0x4d895d];
  let _0x1e6821 = _0x5ad1d3.defaultProviderId && _0x5ad1d3.providers?.[_0x5ad1d3.defaultProviderId] ? _0x5ad1d3.providers[_0x5ad1d3.defaultProviderId] : null;
  let _0x5938c8 = _0x202df6 || _0x1e6821;
  let _0x29bec6 = Ds(_0x5b80ec);
  let _0x1cab91 = _0xef553b.thinking === true || _0xef553b.thinking === false ? ol(_0xef553b) : null;
  let _0x73f0ad = _0x1cab91 ? _0x1cab91.thinking : _0x29bec6.thinking;
  let _0x2426b3 = _0x1cab91 ? _0x1cab91.thinkingBudget : _0x29bec6.thinkingBudget;
  let _0x174621 = _0x1cab91 && _0x1cab91.thinking ? _0x1cab91.effort : _0x29bec6.effort || (_0x73f0ad ? "max" : "");
  let _0x42db19;
  if (_0xef553b.context1m === true || _0xef553b.context1m === false) {
    _0x42db19 = nl(_0xef553b);
  } else {
    _0x42db19 = _0x29bec6.context1m;
  }
  let _0x56772e = En(_0xef553b);
  return {
    slotId: _0x5a3161,
    matchKind: _0x1b9174 || "exact",
    providerId: _0x4d895d,
    modelId: _0x3cb4c8,
    provider: _0x5938c8,
    thinking: !!_0x73f0ad,
    thinkingBudget: _0x2426b3 || 0,
    effort: _0x174621 || "",
    context1m: _0x42db19,
    contextLimit: _0x56772e,
    providerName: _0x202df6 && (_0x202df6.name || _0x4d895d) || _0x1e6821 && (_0x1e6821.name || _0x5ad1d3.defaultProviderId) || _0x4d895d,
    failoverFrom: _0x4d895d !== String(_0xef553b.providerId) ? String(_0xef553b.providerId) : "",
    supportsVision: _0xef553b.supportsVision
  };
}
function rl(_0x15be70, _0x47699c) {
  let _0x17d02c = String(_0x15be70 || "").trim();
  if (!_0x17d02c) {
    return null;
  }
  let _0x2ef925 = _0x47699c.cascadeBindings && typeof _0x47699c.cascadeBindings == "object" ? _0x47699c.cascadeBindings : {};
  let _0x36b4dc = _0x17d02c;
  if (/_BYOK/i.test(_0x36b4dc)) {
    let _0x325f68 = Xc(_0x36b4dc);
    if (_0x325f68) {
      _0x36b4dc = _0x325f68;
    }
  }
  let _0x585eb9 = _0x2ef925[_0x36b4dc] || _0x2ef925[_0x17d02c];
  if (_0x585eb9?.providerId && _0x585eb9?.modelId) {
    return {
      key: _0x2ef925[_0x36b4dc] ? _0x36b4dc : _0x17d02c,
      binding: _0x585eb9,
      matchKind: "exact"
    };
  }
  let _0x8c1698 = vs(_0x36b4dc);
  if (_0x8c1698) {
    for (let [_0x55a0af, _0x47a4ca] of Object.entries(_0x2ef925)) {
      if (!_0x47a4ca?.providerId || !_0x47a4ca?.modelId) {
        continue;
      }
      if (vs(_0x47a4ca.familyKey || vs(_0x55a0af)) === _0x8c1698) {
        return {
          key: _0x55a0af,
          binding: _0x47a4ca,
          matchKind: "family"
        };
      }
    }
  }
  return null;
}
function xn(_0xcf616, _0x4171ab = null) {
  let _0x1f5d73 = _0x4171ab || xe();
  if (_0x1f5d73.cascadeEnabled === false || _0x1f5d73.cascadeEnabled === 0) {
    return null;
  }
  let _0x55c001 = rl(_0xcf616, _0x1f5d73);
  if (_0x55c001) {
    return Ps(_0xcf616, _0x55c001.key, _0x55c001.binding, _0x1f5d73, _0x55c001.matchKind);
  }
  let _0x50a08f = xt(_0xcf616);
  let _0x21bcef = _0x1f5d73.byokBindingsV2?.[_0x50a08f];
  if (_0x21bcef?.providerId && _0x21bcef?.modelId) {
    return Ps(_0xcf616, _0x50a08f, _0x21bcef, _0x1f5d73, "legacy-slot");
  }
  let _0x4b0736 = Zc[_0x50a08f];
  let _0x45f837 = _0x4b0736 && _0x1f5d73[_0x4b0736] ? String(_0x1f5d73[_0x4b0736]).trim() : "";
  if (_0x45f837) {
    let _0x278936 = _0x1f5d73.defaultProviderId;
    let _0x195958 = _0x278936 && _0x1f5d73.providers?.[_0x278936] ? _0x1f5d73.providers[_0x278936] : null;
    let _0x4609ea = Ds(_0xcf616);
    return {
      slotId: _0x50a08f,
      matchKind: "legacy-env",
      providerId: _0x278936 || null,
      modelId: _0x45f837,
      provider: _0x195958,
      providerName: _0x195958?.name || _0x278936 || "",
      thinking: !!_0x4609ea.thinking,
      thinkingBudget: 0,
      effort: _0x4609ea.effort || (_0x4609ea.thinking ? "max" : ""),
      context1m: _0x4609ea.context1m !== false,
      contextLimit: En(_0x4609ea)
    };
  }
  return null;
}
function Oo(_0x58508a, _0x4a96a3 = null) {
  return !!xn(_0x58508a, _0x4a96a3);
}
var Le = {
  cascadeId: "",
  label: "",
  upstream: "",
  bound: false,
  declaredModel: "",
  configuredModel: "",
  declaredTs: 0,
  ts: 0
};
function Co(_0x34693a, _0x208ffb) {
  let _0x18d9fa = xt(_0x34693a);
  Le = {
    ...Le,
    cascadeId: _0x18d9fa,
    label: el[_0x18d9fa] || _0x18d9fa,
    upstream: _0x208ffb || "",
    configuredModel: _0x208ffb || "",
    bound: !!_0x208ffb && !!String(_0x208ffb).trim(),
    ts: Date.now()
  };
}
function ko(_0x1739e3, _0xb32a79 = "") {
  let _0x22b912 = String(_0x1739e3 || "").trim();
  if (!_0x22b912) {
    return;
  }
  let _0x1d68e0 = String(_0xb32a79 || Le.configuredModel || Le.upstream || "").trim();
  let _0x552b2 = String(Le.declaredModel || "").trim();
  let _0x39d155 = _0x22b912 !== _0x552b2;
  Le = {
    ...Le,
    declaredModel: _0x22b912,
    configuredModel: _0x1d68e0 || Le.configuredModel || "",
    declaredTs: _0x39d155 ? Date.now() : Le.declaredTs || Date.now(),
    ts: Date.now()
  };
  if (_0x39d155 && _0x1d68e0 && _0x1d68e0 !== _0x22b912) {
    E(y.UPSTREAM, "model 不一致 · 配置目标=" + _0x1d68e0 + " · 上游声明=" + _0x22b912);
  }
}
function Ls(_0x4f8dc1) {
  let _0x4300c9 = _0x4f8dc1.rpc || "unknown";
  let _0x4641f6 = String(_0x4f8dc1.requestedModel || "").trim();
  let _0x59f2a5 = Array.isArray(_0x4f8dc1.hints) ? _0x4f8dc1.hints : [];
  let _0x2fee8c = _0x4f8dc1.route || "unknown";
  let _0x2f8701 = _0x2fee8c.startsWith("byok") || ot(_0x4641f6) || _0x59f2a5.some(ot);
  let _0x33be7f = _0x4641f6 || _0x4300c9 + ":" + _0x59f2a5.join("|") || _0x4300c9;
  let _0x556fc1 = {
    id: _0x33be7f,
    rpc: _0x4300c9,
    requestedModel: _0x4641f6,
    hints: _0x59f2a5,
    route: _0x2fee8c,
    byok: _0x2f8701,
    count: 1,
    firstSeen: new Date().toISOString(),
    lastSeen: new Date().toISOString()
  };
  let _0x447ea6 = Ht.get(_0x33be7f);
  if (_0x447ea6) {
    _0x556fc1.count = (_0x447ea6.count || 0) + 1;
    _0x556fc1.firstSeen = _0x447ea6.firstSeen || _0x556fc1.firstSeen;
  }
  Ht.set(_0x33be7f, _0x556fc1);
  let _0x5ba72a = _0x2f8701 ? "BYOK" : "OFFICIAL";
  let _0x52a127 = _0x4641f6 || _0x59f2a5.slice(0, 3).join(", ") || "(empty)";
  if (cr(_0x2f8701)) {
    E(y.MODEL_CAPTURE, _0x5ba72a + " · " + _0x4300c9 + " · " + _0x52a127 + " · route=" + _0x2fee8c);
  }
  sl();
  return _0x556fc1;
}
function sl() {
  if (nt) {
    try {
      _0x43f9d9.mkdirSync(_0x3c6071.dirname(nt), {
        recursive: true
      });
      let _0x41120c = [...Ht.values()].sort((_0x57f96d, _0x35be5f) => (_0x35be5f.lastSeen || "").localeCompare(_0x57f96d.lastSeen || ""));
      _0x43f9d9.writeFileSync(nt, JSON.stringify(_0x41120c, null, 2), "utf8");
    } catch (_0x3d6db1) {
      E(y.ERR, "模型捕获写入失败: " + _0x3d6db1.message, {
        err: true
      });
    }
  }
}
function Ks(_0x1a8d28, _0x1f81cd, _0x2dbd91) {
  if (_0x1a8d28 === "GetChatMessage") {
    let _0x34e41b = $s(_0x1f81cd, _0x2dbd91);
    let _0x5bb6dc = Oo(_0x34e41b);
    Ls({
      rpc: _0x1a8d28,
      requestedModel: _0x34e41b,
      route: _0x5bb6dc ? "cascade-bound" : ot(_0x34e41b) ? "byok-unbound-passthrough" : "official"
    });
    return _0x5bb6dc;
  }
  if (_0x1a8d28 === "GetStreamingExternalChatCompletions") {
    let _0x40398d = Qc(_0x1f81cd);
    let _0x399e31 = $s(_0x1f81cd, _0x2dbd91) || _0x40398d[0] || "";
    let _0x5ef36f = Oo(_0x399e31);
    if (!_0x5ef36f) {
      for (let _0x11bb22 of _0x40398d) {
        if (Oo(_0x11bb22)) {
          _0x5ef36f = true;
          break;
        }
      }
    }
    Ls({
      rpc: _0x1a8d28,
      requestedModel: _0x399e31,
      hints: _0x40398d,
      route: _0x5ef36f ? "cascade-bound-external" : "official-external"
    });
    return _0x5ef36f;
  }
  return false;
}
var Ys = "estimated_request_window";
var js = /[\u0000-\u001f\u007f-\u009f]/u;
var il = /^[1-9][0-9]{0,31}$/u;
var al = new Set(["conversationId", "sourceRequestId"]);
var cl = new Set(["conversationId", "sourceRequestId", "sourceStartedAt", "sourceOrder", "tokensUsed", "contextLimit", "slotId", "requestedModelUid", "upstreamModelId", "providerId", "providerName", "tokenKind"]);
function ie(_0xf00492, _0x597fd0) {
  return {
    ok: false,
    code: _0xf00492,
    field: _0x597fd0
  };
}
function rt(_0x42c225, _0x1570d9, _0x4ca457) {
  if (typeof _0x42c225 != "string") {
    return ie("INVALID_SNAPSHOT", _0x1570d9);
  }
  let _0x4563f1 = _0x42c225.trim();
  if (!_0x4563f1 || _0x4563f1.length > _0x4ca457 || js.test(_0x4563f1)) {
    return ie("INVALID_SNAPSHOT", _0x1570d9);
  } else {
    return {
      ok: true,
      value: _0x4563f1
    };
  }
}
function Mo(_0x2be51e, _0x19fe55, {
  min: _0x11eb98 = 0
} = {}) {
  if (!Number.isSafeInteger(_0x2be51e) || _0x2be51e < _0x11eb98) {
    return ie("INVALID_SNAPSHOT", _0x19fe55);
  } else {
    return {
      ok: true,
      value: _0x2be51e
    };
  }
}
function No(_0xf9e1f1) {
  if (typeof _0xf9e1f1 != "string" || !il.test(_0xf9e1f1)) {
    return ie("INVALID_SNAPSHOT", "sourceOrder");
  }
  try {
    BigInt(_0xf9e1f1);
  } catch {
    return ie("INVALID_SNAPSHOT", "sourceOrder");
  }
  return {
    ok: true,
    value: _0xf9e1f1
  };
}
function Ro(_0x11fd2b) {
  if (typeof _0x11fd2b != "string") {
    return ie("INVALID_CONVERSATION_ID", "conversationId");
  }
  let _0x7a9543 = _0x11fd2b.trim();
  if (_0x7a9543.length < 1 || _0x7a9543.length > 256 || js.test(_0x7a9543)) {
    return ie("INVALID_CONVERSATION_ID", "conversationId");
  } else {
    return {
      ok: true,
      value: _0x7a9543
    };
  }
}
function vo(_0x52bbe1) {
  if (!_0x52bbe1 || typeof _0x52bbe1 != "object" || Array.isArray(_0x52bbe1)) {
    return ie("INVALID_RESERVATION", "body");
  }
  for (let _0x3066e2 of Object.keys(_0x52bbe1)) {
    if (!al.has(_0x3066e2)) {
      return ie("INVALID_RESERVATION", _0x3066e2);
    }
  }
  let _0x48a48d = Ro(_0x52bbe1.conversationId);
  if (!_0x48a48d.ok) {
    return _0x48a48d;
  }
  let _0x51eacc = rt(_0x52bbe1.sourceRequestId, "sourceRequestId", 128);
  if (_0x51eacc.ok) {
    return {
      ok: true,
      value: {
        conversationId: _0x48a48d.value,
        sourceRequestId: _0x51eacc.value
      }
    };
  } else {
    return ie("INVALID_RESERVATION", _0x51eacc.field);
  }
}
function $o(_0x16862c) {
  if (!_0x16862c || typeof _0x16862c != "object" || Array.isArray(_0x16862c)) {
    return ie("INVALID_SNAPSHOT", "body");
  }
  for (let _0x581274 of Object.keys(_0x16862c)) {
    if (!cl.has(_0x581274)) {
      return ie("INVALID_SNAPSHOT", _0x581274);
    }
  }
  let _0x1f9032 = Ro(_0x16862c.conversationId);
  if (!_0x1f9032.ok) {
    return _0x1f9032;
  }
  let _0x2af0b2 = rt(_0x16862c.sourceRequestId, "sourceRequestId", 128);
  if (!_0x2af0b2.ok) {
    return _0x2af0b2;
  }
  let _0xa99778 = Mo(_0x16862c.sourceStartedAt, "sourceStartedAt", {
    min: 1
  });
  if (!_0xa99778.ok) {
    return _0xa99778;
  }
  let _0x50af31 = No(_0x16862c.sourceOrder);
  if (!_0x50af31.ok) {
    return _0x50af31;
  }
  let _0x1da9f8 = Mo(_0x16862c.tokensUsed, "tokensUsed");
  if (!_0x1da9f8.ok) {
    return _0x1da9f8;
  }
  let _0x5babd2 = Mo(_0x16862c.contextLimit, "contextLimit", {
    min: 1
  });
  if (!_0x5babd2.ok) {
    return _0x5babd2;
  }
  let _0xef8e55 = rt(_0x16862c.slotId, "slotId", 256);
  if (!_0xef8e55.ok) {
    return _0xef8e55;
  }
  let _0x1bc38d = rt(_0x16862c.requestedModelUid, "requestedModelUid", 512);
  if (!_0x1bc38d.ok) {
    return _0x1bc38d;
  }
  let _0x1b991e = rt(_0x16862c.upstreamModelId, "upstreamModelId", 512);
  if (!_0x1b991e.ok) {
    return _0x1b991e;
  }
  let _0x463cdc = rt(_0x16862c.providerId, "providerId", 256);
  if (!_0x463cdc.ok) {
    return _0x463cdc;
  }
  let _0x1444ef = rt(_0x16862c.providerName, "providerName", 512);
  if (_0x1444ef.ok) {
    if (_0x16862c.tokenKind !== Ys) {
      return ie("INVALID_SNAPSHOT", "tokenKind");
    } else {
      return {
        ok: true,
        value: {
          conversationId: _0x1f9032.value,
          sourceRequestId: _0x2af0b2.value,
          sourceStartedAt: _0xa99778.value,
          sourceOrder: _0x50af31.value,
          tokensUsed: _0x1da9f8.value,
          contextLimit: _0x5babd2.value,
          slotId: _0xef8e55.value,
          requestedModelUid: _0x1bc38d.value,
          upstreamModelId: _0x1b991e.value,
          providerId: _0x463cdc.value,
          providerName: _0x1444ef.value,
          tokenKind: Ys
        }
      };
    }
  } else {
    return _0x1444ef;
  }
}
function qs(_0x5b8674) {
  return JSON.stringify({
    conversationId: _0x5b8674.conversationId,
    sourceRequestId: _0x5b8674.sourceRequestId,
    sourceStartedAt: _0x5b8674.sourceStartedAt,
    sourceOrder: _0x5b8674.sourceOrder,
    tokensUsed: _0x5b8674.tokensUsed,
    contextLimit: _0x5b8674.contextLimit,
    slotId: _0x5b8674.slotId,
    requestedModelUid: _0x5b8674.requestedModelUid,
    upstreamModelId: _0x5b8674.upstreamModelId,
    providerId: _0x5b8674.providerId,
    providerName: _0x5b8674.providerName,
    tokenKind: _0x5b8674.tokenKind
  });
}
var bo = class {
  constructor(_0x279eaa = {}) {
    let {
      ttlMs: _0x2d241f = 86400000,
      maxConversations: _0x4db11b = 64,
      reservationTtlMs: _0x136536 = _0x279eaa.ttlMs !== undefined ? _0x2d241f : 3600000,
      maxReservations: _0x1af157 = 4096,
      now: _0x5ee475 = () => Date.now()
    } = _0x279eaa;
    this._ttlMs = _0x2d241f;
    this._maxConversations = _0x4db11b;
    this._reservationTtlMs = _0x136536;
    this._maxReservations = _0x1af157;
    this._now = _0x5ee475;
    this._snapshots = new Map();
    this._recentSources = new Map();
    this._reservationsByRequestId = new Map();
    this._latestReservationByConversation = new Map();
    this._nextRevision = 1;
    this._nextSourceOrder = 0x1n;
  }
  _clock() {
    let _0x547eb3 = Number(this._now());
    if (Number.isSafeInteger(_0x547eb3) && _0x547eb3 > 0) {
      return _0x547eb3;
    } else {
      return Date.now();
    }
  }
  _deleteSnapshot(_0xa9293e) {
    this._snapshots.delete(_0xa9293e);
  }
  _prune(_0x212a97 = this._clock()) {
    let _0x3bc593 = _0x212a97 - this._ttlMs;
    let _0x2d9229 = _0x212a97 - this._reservationTtlMs;
    for (let [_0x2211cc, _0x1cd49e] of this._snapshots) {
      if (_0x1cd49e.updatedAt <= _0x3bc593) {
        this._snapshots.delete(_0x2211cc);
      }
    }
    for (let [_0x16d9e5, _0xb6b86] of this._recentSources) {
      if (_0xb6b86.updatedAt <= _0x3bc593) {
        this._recentSources.delete(_0x16d9e5);
      }
    }
    for (let [_0x11aa0c, _0x38c59c] of this._reservationsByRequestId) {
      if (_0x38c59c.reservedAt <= _0x2d9229) {
        this._reservationsByRequestId.delete(_0x11aa0c);
      }
    }
    for (let [_0x23799e, _0x1be194] of this._latestReservationByConversation) {
      let _0x18f3eb = this._reservationsByRequestId.get(_0x1be194.sourceRequestId);
      if (_0x1be194.reservedAt <= _0x2d9229 || !_0x18f3eb || _0x18f3eb.conversationId !== _0x23799e || _0x18f3eb.sourceOrder !== _0x1be194.sourceOrder) {
        this._latestReservationByConversation.delete(_0x23799e);
      }
    }
  }
  _enforceCapacity() {
    if (this._snapshots.size <= this._maxConversations) {
      return;
    }
    let _0x48e41b = [...this._snapshots.values()].sort((_0x1c7f2d, _0x32cc6e) => _0x1c7f2d.updatedAt - _0x32cc6e.updatedAt || _0x1c7f2d.revision - _0x32cc6e.revision || _0x1c7f2d.conversationId.localeCompare(_0x32cc6e.conversationId));
    let _0x58074e = this._snapshots.size - this._maxConversations;
    for (let _0x590763 = 0; _0x590763 < _0x58074e; _0x590763++) {
      this._deleteSnapshot(_0x48e41b[_0x590763].conversationId);
    }
  }
  _enforceRecentSourceCapacity() {
    let _0x99a0f3 = Math.max(this._maxConversations * 4, this._maxConversations);
    if (this._recentSources.size <= _0x99a0f3) {
      return;
    }
    let _0x1c2dd5 = [...this._recentSources.entries()].sort((_0x386c02, _0x1388e5) => _0x386c02[1].updatedAt - _0x1388e5[1].updatedAt || _0x386c02[1].revision - _0x1388e5[1].revision || _0x386c02[0].localeCompare(_0x1388e5[0]));
    let _0x454014 = this._recentSources.size - _0x99a0f3;
    for (let _0x43b7a8 = 0; _0x43b7a8 < _0x454014; _0x43b7a8++) {
      this._recentSources.delete(_0x1c2dd5[_0x43b7a8][0]);
    }
  }
  reserve(_0x11b465, _0x2145a1) {
    let _0x155bdc = vo({
      conversationId: _0x11b465,
      sourceRequestId: _0x2145a1
    });
    if (!_0x155bdc.ok) {
      return _0x155bdc;
    }
    let _0xa5806b = _0x155bdc.value;
    let _0x591ae3 = this._clock();
    this._prune(_0x591ae3);
    let _0x5379a9 = this._reservationsByRequestId.get(_0xa5806b.sourceRequestId);
    if (_0x5379a9) {
      if (_0x5379a9.conversationId !== _0xa5806b.conversationId) {
        return ie("SOURCE_REQUEST_ID_CONFLICT", "sourceRequestId");
      } else {
        return {
          ok: true,
          accepted: true,
          duplicate: true,
          sourceOrder: _0x5379a9.sourceOrder
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
    let _0x134bbb = this._nextSourceOrder.toString();
    this._nextSourceOrder += 0x1n;
    let _0x118ed2 = Object.freeze({
      conversationId: _0xa5806b.conversationId,
      sourceRequestId: _0xa5806b.sourceRequestId,
      sourceOrder: _0x134bbb,
      reservedAt: _0x591ae3
    });
    this._reservationsByRequestId.set(_0xa5806b.sourceRequestId, _0x118ed2);
    this._latestReservationByConversation.set(_0xa5806b.conversationId, _0x118ed2);
    return {
      ok: true,
      accepted: true,
      duplicate: false,
      sourceOrder: _0x134bbb
    };
  }
  publish(_0x2663ed) {
    let _0xb2380c = $o(_0x2663ed);
    if (!_0xb2380c.ok) {
      return _0xb2380c;
    }
    let _0x3b9341 = _0xb2380c.value;
    let _0x3e0449 = this._clock();
    this._prune(_0x3e0449);
    let _0xf0e10b = this._reservationsByRequestId.get(_0x3b9341.sourceRequestId);
    if (!_0xf0e10b) {
      return ie("UNRESERVED_SOURCE_REQUEST", "sourceRequestId");
    }
    if (_0xf0e10b.conversationId !== _0x3b9341.conversationId || _0xf0e10b.sourceRequestId !== _0x3b9341.sourceRequestId || _0xf0e10b.sourceOrder !== _0x3b9341.sourceOrder) {
      return ie("RESERVATION_MISMATCH", "sourceOrder");
    }
    let _0x4c496d = this._latestReservationByConversation.get(_0x3b9341.conversationId);
    if (!_0x4c496d) {
      return ie("EXPIRED_RESERVATION", "sourceOrder");
    }
    let _0x4c27b6 = BigInt(_0x3b9341.sourceOrder);
    let _0x5147b8 = BigInt(_0x4c496d.sourceOrder);
    if (_0x4c27b6 < _0x5147b8 || _0x4c496d.sourceRequestId !== _0x3b9341.sourceRequestId || _0x4c496d.sourceOrder !== _0x3b9341.sourceOrder) {
      return ie("STALE_RESERVATION", "sourceOrder");
    }
    let _0x51664f = qs(_0x3b9341);
    let _0x4a7f1e = this._recentSources.get(_0x3b9341.sourceRequestId);
    if (_0x4a7f1e) {
      if (_0x4a7f1e.conversationId !== _0x3b9341.conversationId || _0x4a7f1e.fingerprint !== _0x51664f) {
        return ie("SOURCE_REQUEST_ID_CONFLICT", "sourceRequestId");
      } else {
        return {
          ok: true,
          accepted: false,
          reason: "duplicate",
          revision: _0x4a7f1e.revision
        };
      }
    }
    let _0x5b6797 = this._snapshots.get(_0x3b9341.conversationId);
    if (_0x5b6797 && _0x5b6797.sourceRequestId === _0x3b9341.sourceRequestId) {
      if (qs(_0x5b6797) !== _0x51664f) {
        return ie("SOURCE_REQUEST_ID_CONFLICT", "sourceRequestId");
      } else {
        return {
          ok: true,
          accepted: false,
          reason: "duplicate",
          revision: _0x5b6797.revision
        };
      }
    }
    let _0x400df6 = this._nextRevision++;
    let _0xb5b171 = Object.freeze({
      ..._0x3b9341,
      revision: _0x400df6,
      updatedAt: _0x3e0449
    });
    this._snapshots.set(_0x3b9341.conversationId, _0xb5b171);
    this._recentSources.set(_0x3b9341.sourceRequestId, {
      conversationId: _0x3b9341.conversationId,
      fingerprint: _0x51664f,
      revision: _0x400df6,
      updatedAt: _0x3e0449
    });
    this._enforceCapacity();
    this._enforceRecentSourceCapacity();
    return {
      ok: true,
      accepted: true,
      reason: "stored",
      revision: _0x400df6,
      snapshot: {
        ..._0xb5b171
      }
    };
  }
  get(_0x25cae5) {
    let _0xc5ad0c = Ro(_0x25cae5);
    if (!_0xc5ad0c.ok) {
      return _0xc5ad0c;
    }
    this._prune();
    let _0x35e28c = this._snapshots.get(_0xc5ad0c.value);
    return {
      ok: true,
      snapshot: _0x35e28c ? {
        ..._0x35e28c
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
var wo = new bo();
var Ws = je(process.env.ANTHROPIC_API_HOST || "api.anthropic.com").host;
var ll = je(process.env.OPENAI_API_HOST || Ws).host;
var q = {
  defaultModel: process.env.DEFAULT_MODEL || "",
  byokOpus: process.env.BYOK_MODEL_OPUS || "",
  byokOpusThinking: process.env.BYOK_MODEL_OPUS_THINKING || "",
  byokSonnet: process.env.BYOK_MODEL_SONNET || "",
  byokSonnetThinking: process.env.BYOK_MODEL_SONNET_THINKING || "",
  maxTokens: parseInt(process.env.MAX_TOKENS || "0", 10),
  forceDefault: false,
  anthropicHost: Ws,
  anthropicApiPath: process.env.ANTHROPIC_API_PATH || "/messages",
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
  promptCacheTtl: "5m",
  openaiHost: ll,
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
function xe() {
  return {
    ...q,
    providers: {
      ...(q.providers || {})
    },
    providerHealth: {
      ...(q.providerHealth || {})
    },
    byokBindingsV2: {
      ...(q.byokBindingsV2 || {})
    },
    cascadeBindings: {
      ...(q.cascadeBindings || {})
    },
    boundOfficialUids: Array.isArray(q.boundOfficialUids) ? q.boundOfficialUids.slice() : [],
    cascadeEnabled: !!q.cascadeEnabled
  };
}
function Po(_0x22f339) {
  let _0x3572d5 = je(_0x22f339?.anthropicHost || "api.anthropic.com");
  let _0x298426 = _0x3572d5.host || "api.anthropic.com";
  let _0x18f349 = je(_0x22f339?.openaiHost || _0x298426);
  let _0x19e784 = _0x18f349.host || _0x298426;
  let _0x6ed61e = Sn(_0x298426);
  let _0x1b5d00 = Sn(_0x19e784);
  let _0x3b7a1e = Gs(_0x22f339?.anthropicApiPath, _0x3572d5.pathPrefix, "/messages");
  let _0x48d089 = Gs(_0x22f339?.openaiApiPath, _0x18f349.pathPrefix, "/chat/completions");
  let _0x41e812 = yo(_0x298426, _0x22f339?.useHttp);
  let _byokProviderProtocol = String(_0x22f339?.protocol || _0x22f339?.apiProtocol || _0x22f339?.apiFormat || "").trim().toLowerCase();
  if (_byokProviderProtocol !== "openai" && _byokProviderProtocol !== "anthropic") _byokProviderProtocol = "";
  return {
    protocol: _byokProviderProtocol,
    anthropic: {
      host: _0x298426,
      apiPath: _0x3b7a1e,
      apiKey: _0x22f339?.anthropicApiKey || "",
      parsed: _0x6ed61e,
      useHttp: _0x41e812,
      // Keep the provider-level cache policy attached to the parsed route.
      // The request builder only receives this normalized object, so dropping
      // the value here silently reverted a configured 1h policy to 5m.
      promptCacheTtl: _byokNormalizeAnthropicCacheTtl(_0x22f339?.promptCacheTtl || _0x22f339?.cacheTtl)
    },
    openai: {
      host: _0x19e784,
      apiPath: _0x48d089,
      apiKey: _0x22f339?.openaiApiKey || _0x22f339?.anthropicApiKey || "",
      parsed: _0x1b5d00,
      useHttp: yo(_0x19e784, _0x22f339?.useHttp ?? _0x41e812)
    }
  };
}
function Be() {
  let _0x56fb37 = q.defaultProviderId;
  if (_0x56fb37 && q.providers?.[_0x56fb37]) {
    return Po(q.providers[_0x56fb37]);
  } else {
    return Po({
      anthropicHost: q.anthropicHost,
      anthropicApiPath: q.anthropicApiPath,
      anthropicApiKey: q.anthropicApiKey,
      promptCacheTtl: q.promptCacheTtl || q.cacheTtl,
      openaiHost: q.openaiHost,
      openaiApiPath: q.openaiApiPath,
      openaiApiKey: q.openaiApiKey
    });
  }
}
function Bo(_0x752a5e) {
  let _0x302550 = _0x752a5e && q.providers?.[_0x752a5e];
  if (_0x302550) {
    return Po(_0x302550);
  } else {
    return Be();
  }
}
function Gs(_0x1fc017, _0x436c09, _0x1ebdf6) {
  return Is(_0x436c09, _0x1ebdf6, _0x1fc017);
}
function zs(_0x28c4f2) {
  return je(Tn(String(_0x28c4f2 ?? "").trim())).host;
}
function Ot(_0x1250b6, _0x3b5f33, _0x468ddb, _0x261af7 = _0x439850 => _0x439850) {
  if (!Object.prototype.hasOwnProperty.call(_0x1250b6, _0x3b5f33)) {
    return false;
  }
  let _0x12a7b3 = _0x261af7(String(_0x1250b6[_0x3b5f33] ?? "").trim());
  if (q[_0x468ddb] === _0x12a7b3) {
    return false;
  } else {
    q[_0x468ddb] = _0x12a7b3;
    return true;
  }
}
function Xs(_0x32afcb) {
  if (_0x32afcb.defaultModel && typeof _0x32afcb.defaultModel == "string") {
    q.defaultModel = _0x32afcb.defaultModel;
  }
  let _0x1253ca = [["byokOpus", "byokOpus"], ["byokOpusThinking", "byokOpusThinking"], ["byokSonnet", "byokSonnet"], ["byokSonnetThinking", "byokSonnetThinking"], ["BYOK_MODEL_OPUS", "byokOpus"], ["BYOK_MODEL_OPUS_THINKING", "byokOpusThinking"], ["BYOK_MODEL_SONNET", "byokSonnet"], ["BYOK_MODEL_SONNET_THINKING", "byokSonnetThinking"]];
  for (let [_0x4c0cb8, _0x4deb53] of _0x1253ca) {
    if (Object.prototype.hasOwnProperty.call(_0x32afcb, _0x4c0cb8) && typeof _0x32afcb[_0x4c0cb8] == "string") {
      q[_0x4deb53] = _0x32afcb[_0x4c0cb8].trim();
    }
  }
  if (Number.isInteger(_0x32afcb.maxTokens) && _0x32afcb.maxTokens >= 0) {
    q.maxTokens = _0x32afcb.maxTokens;
  }
  if (typeof _0x32afcb.forceDefault == "boolean") {
    q.forceDefault = _0x32afcb.forceDefault;
  }
  if (_0x32afcb.promptCacheTtl != null || _0x32afcb.cacheTtl != null) {
    q.promptCacheTtl = String(_0x32afcb.promptCacheTtl ?? _0x32afcb.cacheTtl ?? "5m").trim().toLowerCase() === "1h" ? "1h" : "5m";
  }
  let _0x47cdd0 = false;
  if (typeof _0x32afcb.defaultProviderId == "string") {
    q.defaultProviderId = _0x32afcb.defaultProviderId.trim();
  }
  if (_0x32afcb.providers && typeof _0x32afcb.providers == "object") {
    q.providers = {
      ..._0x32afcb.providers
    };
    _0x47cdd0 = true;
  }
  if (_0x32afcb.providerHealth && typeof _0x32afcb.providerHealth == "object") {
    q.providerHealth = { ..._0x32afcb.providerHealth };
  }
  if (typeof _0x32afcb.cascadeEnabled == "boolean") {
    q.cascadeEnabled = _0x32afcb.cascadeEnabled;
  }
  if (_0x32afcb.cascadeBindings && typeof _0x32afcb.cascadeBindings == "object") {
    q.cascadeBindings = {
      ..._0x32afcb.cascadeBindings
    };
  }
  if (Array.isArray(_0x32afcb.boundOfficialUids)) {
    q.boundOfficialUids = _0x32afcb.boundOfficialUids.map(_0x19f573 => String(_0x19f573 || "").trim()).filter(Boolean);
  }
  if (_0x32afcb.byokBindingsV2 && typeof _0x32afcb.byokBindingsV2 == "object") {
    q.byokBindingsV2 = {
      ..._0x32afcb.byokBindingsV2
    };
  }
  if (_0x32afcb.byokBindingsV2 && typeof _0x32afcb.byokBindingsV2 == "object" || _0x32afcb.cascadeBindings && typeof _0x32afcb.cascadeBindings == "object" || typeof _0x32afcb.cascadeEnabled == "boolean") {
    try {
      let _0x51b6e3 = ns();
      let _0x49cc78 = q.cascadeBindings || {};
      let _0x2e8fee = q.byokBindingsV2 || {};
      for (let [_0x4eb874, _0x3865ca] of Object.entries(_0x49cc78)) {
        if (!!_0x3865ca && !!_0x4eb874) {
          ro(En(_0x3865ca), {
            cascadeId: _0x4eb874,
            reason: "config-limit"
          });
        }
      }
      for (let [_0x2d7057, _0x5e3d63] of Object.entries(_0x2e8fee)) {
        if (!!_0x5e3d63 && !!_0x2d7057) {
          ro(En(_0x5e3d63), {
            cascadeId: _0x2d7057,
            reason: "config-limit"
          });
        }
      }
      let _0x478213 = String(_0x51b6e3.cascadeId || "").trim();
      let _0x46afd5 = _0x478213 ? _0x49cc78[_0x478213] || _0x2e8fee[_0x478213] : null;
      let _0xebba99 = _0x478213;
      if (!_0x46afd5) {
        let _0x436972 = Object.entries(_0x49cc78).find(([, _0x5351c5]) => _0x5351c5 && _0x5351c5.modelId) || Object.entries(_0x2e8fee).find(([, _0x51431b]) => _0x51431b && _0x51431b.modelId);
        if (_0x436972) {
          _0xebba99 = _0x436972[0];
          _0x46afd5 = _0x436972[1];
        }
      }
      if (_0x46afd5) {
        let _0x27c86f = En(_0x46afd5);
        mt({
          tokens: _0x51b6e3.tokens || 0,
          limit: _0x27c86f,
          inboundTokens: _0x51b6e3.inboundTokens || 0,
          restoredMsgs: _0x51b6e3.restoredMsgs || 0,
          inboundMsgs: _0x51b6e3.inboundMsgs || 0,
          reason: "config",
          cascadeId: _0xebba99 || "",
          sessionKey: String(_0x51b6e3.sessionKey || "").trim()
        });
      }
    } catch {}
  }
  _0x47cdd0 = Ot(_0x32afcb, "ANTHROPIC_API_HOST", "anthropicHost", zs) || _0x47cdd0;
  _0x47cdd0 = Ot(_0x32afcb, "ANTHROPIC_API_PATH", "anthropicApiPath") || _0x47cdd0;
  _0x47cdd0 = Ot(_0x32afcb, "ANTHROPIC_API_KEY", "anthropicApiKey") || _0x47cdd0;
  _0x47cdd0 = Ot(_0x32afcb, "OPENAI_API_HOST", "openaiHost", zs) || _0x47cdd0;
  _0x47cdd0 = Ot(_0x32afcb, "OPENAI_API_PATH", "openaiApiPath") || _0x47cdd0;
  _0x47cdd0 = Ot(_0x32afcb, "OPENAI_API_KEY", "openaiApiKey") || _0x47cdd0;
  if (_0x47cdd0) {
    ul = {
      anthropic: null,
      openai: null,
      ts: 0
    };
  }
  return {
    ...q
  };
}
var zd = 300000;
var ul = {
  anthropic: null,
  openai: null,
  ts: 0
};
var Wd = process.env.ADMIN_TOKEN || "";
var Xd = process.env.ALLOW_UNAUTH_CONFIG_POST === "true";
import _0x5c0fee from "node:http";
var Qs = "/_internal/context-snapshots";
var fl = Qs + "/reserve";
var pl = "context-snapshot-v2";
var Do = 8192;
var Vs = 1000;
var Js = 1;
var Zs = 64;
var Ge = "disabled";
var Uo = "127.0.0.1";
var Kt = 0;
var st = false;
var Ft = null;
var Ue = new Set();
var Ho = new Set();
function hl(_0x28cb62) {
  let _0x53a6c4 = Number.parseInt(String(_0x28cb62 ?? ""), 10);
  if (Number.isInteger(_0x53a6c4) && _0x53a6c4 > 0 && _0x53a6c4 <= 65535) {
    return _0x53a6c4;
  } else {
    return 0;
  }
}
function ei({
  role: _0x275e5c,
  host: _0x52d227 = "127.0.0.1",
  port: _0x135260 = process.env.HYBRID_PORT
} = {}) {
  if (_0x275e5c !== "owner" && _0x275e5c !== "publisher") {
    Ge = "disabled";
    return {
      ok: false,
      role: Ge
    };
  } else {
    Ge = _0x275e5c;
    Uo = _0x52d227 === "::1" ? "::1" : "127.0.0.1";
    Kt = hl(_0x135260);
    st = false;
    Ft = null;
    return {
      ok: _0x275e5c === "owner" || Kt > 0,
      role: Ge,
      host: Uo,
      port: Kt
    };
  }
}
function De(_0x595bc8) {
  let _0x33f375 = new Error(_0x595bc8);
  _0x33f375.retryable = true;
  return _0x33f375;
}
function On(_0x3661cd) {
  let _0x534cc3 = new Error(_0x3661cd);
  _0x534cc3.retryable = false;
  return _0x534cc3;
}
function ti(_0x3b0ca5, _0x45178f, _0x47f598, _0x12a01f) {
  let _0x31c1df = JSON.stringify(_0x45178f);
  let _0x28535d = Buffer.byteLength(_0x31c1df);
  if (_0x28535d > Do) {
    return Promise.reject(On(_0x47f598 + " body exceeds " + Do + " bytes"));
  } else if (Kt) {
    return new Promise((_0x331071, _0x5f1cbd) => {
      let _0x2e4e3d = new AbortController();
      Ho.add(_0x2e4e3d);
      let _0x37d739 = false;
      let _0x1ba462 = (_0x33dc84, _0x23c378) => {
        if (!_0x37d739) {
          _0x37d739 = true;
          clearTimeout(_0x486cc2);
          Ho.delete(_0x2e4e3d);
          if (_0x33dc84) {
            _0x5f1cbd(_0x33dc84);
          } else {
            _0x331071(_0x23c378);
          }
        }
      };
      let _0x486cc2 = setTimeout(() => {
        _0x2e4e3d.abort();
      }, Vs);
      let _0xd06b01;
      try {
        _0xd06b01 = _0x5c0fee.request({
          hostname: Uo,
          port: Kt,
          path: _0x3b0ca5,
          method: "POST",
          agent: false,
          signal: _0x2e4e3d.signal,
          headers: {
            "content-type": "application/json",
            "content-length": _0x28535d,
            "x-byok-internal": pl
          }
        }, _0x3c5496 => {
          let _0x177b74 = [];
          let _0x25b8ff = 0;
          _0x3c5496.on("data", _0x479df5 => {
            _0x25b8ff += _0x479df5.length;
            if (_0x25b8ff > Do) {
              _0x3c5496.destroy();
              _0x1ba462(De("context snapshot " + _0x47f598 + " response is too large"));
              return;
            }
            _0x177b74.push(_0x479df5);
          });
          _0x3c5496.on("end", () => {
            let _0x2b3582 = Buffer.concat(_0x177b74).toString("utf8");
            if (_0x3c5496.statusCode !== 202) {
              let _0x101c40 = Number(_0x3c5496.statusCode) || 0;
              let _0x4d85dd = _0x101c40 === 0 || _0x101c40 >= 500 || _0x101c40 === 408 || _0x101c40 === 429 ? De("context snapshot " + _0x47f598 + " returned HTTP " + _0x101c40) : On("context snapshot " + _0x47f598 + " returned HTTP " + _0x101c40);
              _0x1ba462(_0x4d85dd);
              return;
            }
            try {
              let _0x36e5ea = JSON.parse(_0x2b3582 || "{}");
              if (!_0x12a01f(_0x36e5ea)) {
                _0x1ba462(De("context snapshot " + _0x47f598 + " returned an invalid response"));
                return;
              }
              _0x1ba462(null, _0x36e5ea);
            } catch {
              _0x1ba462(De("context snapshot " + _0x47f598 + " returned invalid JSON"));
            }
          });
          _0x3c5496.on("error", _0x25ca85 => _0x1ba462(De(_0x25ca85.message)));
        });
      } catch (_0x3ade70) {
        _0x1ba462(De(_0x3ade70?.message || String(_0x3ade70)));
        return;
      }
      _0xd06b01.on("error", _0x489a7d => {
        let _0x6417b5 = _0x489a7d?.name === "AbortError" ? "context snapshot " + _0x47f598 + " timed out after " + Vs + "ms" : _0x489a7d?.message || String(_0x489a7d);
        _0x1ba462(De(_0x6417b5));
      });
      try {
        _0xd06b01.end(_0x31c1df);
      } catch (_0x2cabe1) {
        _0x1ba462(De(_0x2cabe1?.message || String(_0x2cabe1)));
      }
    });
  } else {
    return Promise.reject(On("context snapshot owner port is unavailable"));
  }
}
function ml(_0x79e34) {
  return ti(Qs, _0x79e34, "publish", _0x3ef837 => Number.isSafeInteger(_0x3ef837?.revision) && _0x3ef837.revision >= 1);
}
function gl(_0x272367) {
  return ti(fl, _0x272367, "reserve", _0x3554c5 => _0x3554c5?.accepted === true && No(_0x3554c5.sourceOrder).ok);
}
async function ni(_0x443c7e, _0x59c638) {
  let _0x8355ab = null;
  for (let _0x8fe3d0 = 0; _0x8fe3d0 <= Js; _0x8fe3d0++) {
    if (st) {
      throw On("context snapshot publisher is shutting down");
    }
    try {
      return await _0x443c7e();
    } catch (_0x5cb52e) {
      _0x8355ab = _0x5cb52e;
      if (_0x5cb52e?.retryable === false || _0x8fe3d0 >= Js) {
        throw _0x5cb52e;
      }
    }
  }
  throw _0x8355ab || De("context snapshot " + _0x59c638 + " failed");
}
function oi(_0x5123e8) {
  let _0x4e676a = _0x5123e8.finally(() => Ue.delete(_0x4e676a));
  Ue.add(_0x4e676a);
  return _0x4e676a;
}
function ri(_0x304591) {
  try {
    let _0x23a380 = vo(_0x304591);
    if (!_0x23a380.ok) {
      E(y.ERR, "context snapshot reserve skipped · " + _0x23a380.code + ":" + _0x23a380.field, {
        err: true
      });
      return Promise.resolve(null);
    }
    if (st) {
      return Promise.resolve(null);
    }
    if (Ge === "owner") {
      let _0xcaaa92 = wo.reserve(_0x23a380.value.conversationId, _0x23a380.value.sourceRequestId);
      if (_0xcaaa92.ok) {
        if (_0xcaaa92.accepted !== true) {
          E(y.ERR, "context snapshot reserve degraded · " + (_0xcaaa92.reason || "rejected"), {
            err: true
          });
          return Promise.resolve(null);
        } else {
          return Promise.resolve({
            accepted: true,
            sourceOrder: _0xcaaa92.sourceOrder
          });
        }
      } else {
        E(y.ERR, "context snapshot reserve rejected · " + _0xcaaa92.code + ":" + _0xcaaa92.field, {
          err: true
        });
        return Promise.resolve(null);
      }
    }
    if (Ge !== "publisher") {
      return Promise.resolve(null);
    }
    if (Ue.size >= Zs) {
      E(y.ERR, "context snapshot reserve degraded · pending queue is full", {
        err: true
      });
      return Promise.resolve(null);
    }
    let _0x479cda = ni(() => gl(_0x23a380.value), "reserve").then(_0x290bac => ({
      accepted: true,
      sourceOrder: _0x290bac.sourceOrder
    })).catch(_0x18846c => {
      if (!st) {
        E(y.ERR, "context snapshot reserve degraded · " + (_0x18846c?.message || _0x18846c), {
          err: true
        });
      }
      return null;
    });
    return oi(_0x479cda);
  } catch (_0x2f9153) {
    E(y.ERR, "context snapshot reserve isolated · " + (_0x2f9153?.message || _0x2f9153), {
      err: true
    });
    return Promise.resolve(null);
  }
}
function Fo(_0x4804d3) {
  try {
    let _0x3ea62 = $o(_0x4804d3);
    if (!_0x3ea62.ok) {
      E(y.ERR, "context snapshot skipped · " + _0x3ea62.code + ":" + _0x3ea62.field, {
        err: true
      });
      return {
        queued: false,
        reason: _0x3ea62.code
      };
    }
    if (st) {
      return {
        queued: false,
        reason: "shutting-down"
      };
    }
    if (Ge === "owner") {
      let _0x43f42d = wo.publish(_0x3ea62.value);
      if (!_0x43f42d.ok) {
        E(y.ERR, "context snapshot owner rejected · " + _0x43f42d.code + ":" + _0x43f42d.field, {
          err: true
        });
      }
      return {
        queued: false,
        accepted: _0x43f42d.ok && _0x43f42d.accepted === true,
        revision: _0x43f42d.ok ? _0x43f42d.revision : undefined,
        reason: _0x43f42d.ok ? _0x43f42d.reason : _0x43f42d.code
      };
    }
    if (Ge !== "publisher") {
      return {
        queued: false,
        reason: "disabled"
      };
    }
    if (Ue.size >= Zs) {
      E(y.ERR, "context snapshot publish degraded · pending queue is full", {
        err: true
      });
      return {
        queued: false,
        reason: "queue-full"
      };
    }
    let _0x8fa0f5 = ni(() => ml(_0x3ea62.value), "publish").catch(_0x18bf6f => {
      if (!st) {
        E(y.ERR, "context snapshot publish degraded · " + (_0x18bf6f?.message || _0x18bf6f), {
          err: true
        });
      }
      return null;
    });
    oi(_0x8fa0f5);
    return {
      queued: true
    };
  } catch (_0x77031) {
    E(y.ERR, "context snapshot publish isolated · " + (_0x77031?.message || _0x77031), {
      err: true
    });
    return {
      queued: false,
      reason: "isolated-error"
    };
  }
}
function si({
  graceMs: _0x422136 = 300
} = {}) {
  if (Ft) {
    return Ft;
  }
  st = true;
  let _0x296ef6 = Math.max(0, Math.min(Number(_0x422136) || 0, 1000));
  Ft = (async () => {
    if (Ue.size > 0 && _0x296ef6 > 0) {
      await Promise.race([Promise.allSettled([...Ue]), new Promise(_0x214f36 => setTimeout(_0x214f36, _0x296ef6))]);
    }
    for (let _0x45a827 of Ho) {
      _0x45a827.abort();
    }
    if (Ue.size > 0) {
      await Promise.race([Promise.allSettled([...Ue]), new Promise(_0x103ea8 => setTimeout(_0x103ea8, 50))]);
    }
    return {
      pending: Ue.size
    };
  })();
  return Ft;
}
var di = new _0x412940.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000,
  maxSockets: 10,
  maxFreeSockets: 5
});
var Tl = process.env.XY_DEVICE_ID || "";
var Sl = process.env.XY_CLIENT_VERSION || "0.0.0";
function An(_0x59f037, _0x2bfee0) {
  let _0x15407f = Date.now().toString();
  let _0x5529b4 = _0x20cdd6.randomBytes(16).toString("hex");
  return {
    "x-xy-device-id": Tl,
    "x-xy-client-version": Sl,
    "x-xy-timestamp": _0x15407f,
    "x-xy-nonce": _0x5529b4,
    "x-xy-requested-model": _0x59f037 || ""
  };
}
var yl = process.env.DEFAULT_MODEL || "";
var El = parseInt(process.env.MAX_TOKENS || "0", 10);
var fi = 64000;
function xl() {
  return xe().defaultModel || yl;
}
function zo() {
  return xe().maxTokens || El;
}
function Ol(_0x2ef0ac) {
  let _0xbe79b0 = xe();
  if (ot(_0x2ef0ac)) {
    return Fs(_0x2ef0ac, _0xbe79b0);
  }
  let _0x3aa05d = xl();
  let _0x44a643 = Yl[_0x2ef0ac];
  if (_0x44a643 === "__DEFAULT__") {
    return _0x3aa05d;
  } else {
    return _0x44a643 || _0x3aa05d || (_0x2ef0ac && !_0x2ef0ac.startsWith("MODEL_") ? _0x2ef0ac : "");
  }
}
var Il = parseInt(process.env.OPENAI_REQUEST_TIMEOUT_MS || "600000", 10);
var In = parseInt(process.env.OPENAI_SSE_IDLE_TIMEOUT_MS || "180000", 10);
var Al = parseInt(process.env.ANTHROPIC_REQUEST_TIMEOUT_MS || "600000", 10);
var Ko = parseInt(process.env.ANTHROPIC_SSE_IDLE_TIMEOUT_MS || "180000", 10);
var He = parseInt(process.env.CHAT_WALL_TIMEOUT_MS || "180000", 10);
var ii = parseInt(process.env.UPSTREAM_CONNECT_TIMEOUT_MS || "30000", 10);
var Cl = process.env.OPENAI_REASONING_EFFORT || "high";
var kl = process.env.OPENAI_REASONING_SUMMARY || "auto";
var Ml = process.env.OPENAI_ENABLE_REASONING !== "false";
var Wo = (_0x11aa81, _0x3a4934, _0x38c818, _0x424c48) => {
  let _0x10c3bf = parseInt(process.env[_0x11aa81] ?? String(_0x3a4934), 10);
  if (Number.isFinite(_0x10c3bf)) {
    return Math.min(Math.max(_0x10c3bf, _0x38c818), _0x424c48);
  } else {
    return _0x3a4934;
  }
};
var it = (() => {
  let _0x2df3e = parseInt(process.env.STREAM_PACING_TICK_MS ?? "12", 10);
  if (!Number.isFinite(_0x2df3e) || _0x2df3e <= 0) {
    return 0;
  } else {
    return Math.min(_0x2df3e, 200);
  }
})();
var ai = Wo("STREAM_PACING_MIN_CPS", 90, 1, 100000);
var ci = Wo("STREAM_PACING_DRAIN_CPS", 600, 1, 100000);
var bl = Wo("STREAM_PACING_CONTROL_FLUSH_CHARS", 12, 1, 200);
var Nl = process.env.STREAM_PACING_DEBUG === "true";
var Rl = 10;
var vl = 1000;
var $l = 50;
function li(_0x2da253) {
  let _0x526e2c = String(_0x2da253 || "").match(/bytes=(\d+)/);
  if (!_0x526e2c) {
    return "";
  }
  let _0x5978f5 = parseInt(_0x526e2c[1], 10);
  if (!Number.isFinite(_0x5978f5) || _0x5978f5 <= 0) {
    return "";
  } else if (_0x5978f5 >= 1024) {
    return (_0x5978f5 / 1024).toFixed(1) + "KB";
  } else {
    return _0x5978f5 + "B";
  }
}
function pi({
  apiPayload: _0x1612d1,
  systemPrompt: _0x449c28 = "",
  messageField: _0x66d538 = "messages",
  systemInMessages: _0x55ecf6 = false,
  outputReserve: _0xa6ff96 = 0,
  contextLimit: _0x474639 = 0
}) {
  let _0x1438f4 = {
    ..._0x1612d1
  };
  delete _0x1438f4.max_tokens;
  delete _0x1438f4.max_output_tokens;
  let _0x395e96 = vt(_0x1438f4);
  let _0x1fcb95 = Je(_0x449c28);
  let _0x137ab9 = vt(_0x1612d1?.tools);
  let _0xe6754 = Array.isArray(_0x1612d1?.[_0x66d538]) ? _0x1612d1[_0x66d538] : [];
  let _0x524e4d = _0x55ecf6 && _0x449c28 && _0xe6754.length > 0 ? 1 : 0;
  let _0x59b6a7 = vt(_0xe6754.slice(_0x524e4d));
  let _0x409d57 = Math.max(0, _0x395e96 - _0x1fcb95 - _0x137ab9 - _0x59b6a7);
  let _0x8e5f29 = Math.max(0, Number(_0xa6ff96) || 0);
  let _0x3c654e = _0x395e96 + _0x8e5f29;
  let _0x189b3c = Math.max(0, Number(_0x474639) || Ee());
  E(y.ROUTE, "[上下文] final · messages~" + _0x59b6a7 + " · system~" + _0x1fcb95 + " · tools~" + _0x137ab9 + " · meta~" + _0x409d57 + " · input~" + _0x395e96 + " · outputReserve=" + _0x8e5f29 + " · window~" + _0x3c654e + " · ctx=" + _0x189b3c);
  return {
    inputTokens: _0x395e96,
    outputTokens: _0x8e5f29,
    tokensUsed: _0x3c654e,
    contextLimit: _0x189b3c
  };
}
function wl() {
  let _0x1dbcc5 = false;
  let _0x1795a4 = 0;
  let _0x46af36 = "";
  let _0x3f2177 = true;
  let _0x39a844 = _0x46b667 => {
    let _0x25be9d = 0;
    while (_0x25be9d < _0x46b667.length && _0x46b667[_0x25be9d] === " ") {
      _0x25be9d++;
    }
    if (_0x25be9d > 3) {
      return false;
    }
    if (_0x25be9d === _0x46b667.length) {
      return true;
    }
    if (_0x46b667[_0x25be9d] !== "`") {
      return false;
    }
    let _0x3f77ca = _0x25be9d;
    while (_0x3f77ca < _0x46b667.length && _0x46b667[_0x3f77ca] === "`") {
      _0x3f77ca++;
    }
    let _0x723d56 = _0x3f77ca - _0x25be9d;
    let _0x11c7d6 = _0x46b667.slice(_0x3f77ca);
    if (_0x723d56 >= 3) {
      return !_0x11c7d6.includes("`");
    } else {
      return /^[ \t\r]*$/.test(_0x11c7d6);
    }
  };
  let _0x335aa8 = _0x2513a5 => {
    let _0x2ed122 = _0x2513a5.endsWith("\r") ? "\r" : "";
    let _0x1e41dc = _0x2ed122 ? _0x2513a5.slice(0, -1) : _0x2513a5;
    let _0x4a0230 = _0x1e41dc.match(/^( {0,3})(`{3,})([^`]*)$/);
    if (!_0x1dbcc5) {
      if (_0x4a0230) {
        _0x1dbcc5 = true;
        _0x1795a4 = _0x4a0230[2].length;
      }
      return _0x1e41dc + _0x2ed122;
    }
    let _0x540e3a = _0x1e41dc.match(/^( {0,3})(`{3,})[ \t]*$/);
    if (_0x540e3a && _0x540e3a[2].length >= _0x1795a4) {
      _0x1dbcc5 = false;
      _0x1795a4 = 0;
      return _0x1e41dc + _0x2ed122;
    }
    let _0x5f3329 = _0x1e41dc.match(/^( {0,3})(`{1,2})([ \t]*)$/);
    if (_0x5f3329) {
      let _0x5896af = _0x5f3329[1] + "`".repeat(_0x1795a4) + _0x5f3329[3];
      _0x1dbcc5 = false;
      _0x1795a4 = 0;
      return _0x5896af + _0x2ed122;
    }
    return _0x1e41dc + _0x2ed122;
  };
  return {
    push: _0x4669f0 => {
      let _0x21ab6f = String(_0x4669f0 || "");
      let _0x1b58b9 = "";
      for (let _0x3fdda7 of _0x21ab6f) {
        if (_0x3fdda7 === "\n") {
          if (_0x3f2177) {
            _0x1b58b9 += _0x335aa8(_0x46af36);
          }
          _0x1b58b9 += "\n";
          _0x46af36 = "";
          _0x3f2177 = true;
          continue;
        }
        if (!_0x3f2177) {
          _0x1b58b9 += _0x3fdda7;
          continue;
        }
        _0x46af36 += _0x3fdda7;
        if (!_0x39a844(_0x46af36)) {
          _0x1b58b9 += _0x46af36;
          _0x46af36 = "";
          _0x3f2177 = false;
        }
      }
      return _0x1b58b9;
    },
    flush: () => {
      let _0x4c1387 = _0x3f2177 ? _0x335aa8(_0x46af36) : "";
      _0x46af36 = "";
      _0x3f2177 = true;
      return _0x4c1387;
    }
  };
}
function Pl(_0xe65741, _0x1b95f5 = {}, _0x3d9f46 = null) {
  let _0x509bdc = Date.now();
  let _0x4393aa = new Map();
  let _0x45cf28 = 0;
  return {
    mark: (_0xb89462, _0x350e6f = "") => {
      if (_0x4393aa.has(_0xb89462)) {
        return;
      }
      let _0x241bc0 = Date.now() - _0x509bdc;
      _0x4393aa.set(_0xb89462, _0x241bc0);
      if (_0xb89462 === "upstream_request_start") {
        let _0x12030d = String(_0x350e6f || "").match(/bytes=(\d+)/);
        if (_0x12030d) {
          _0x45cf28 = parseInt(_0x12030d[1], 10) || 0;
        }
        let _0x553d1d = li(_0x350e6f);
        E(y.UPSTREAM, "请求体 " + (_0x553d1d || "—") + (_0x350e6f ? " · " + _0x350e6f : ""));
      } else if (_0xb89462 === "first_upstream_chunk") {
        E(y.CHAT, "首上游包 " + _0x241bc0 + "ms" + (_0x350e6f ? " · " + _0x350e6f : ""));
      } else if (_0xb89462 === "first_reasoning_delta") {
        E(y.CHAT, "首推理 " + _0x241bc0 + "ms" + (_0x350e6f ? " · " + _0x350e6f : ""));
      } else if (_0xb89462 === "first_visible_text") {
        E(y.CHAT, "首正文 " + _0x241bc0 + "ms" + (_0x350e6f ? " · " + _0x350e6f : ""));
      } else if (_0xb89462 === "first_visible_write") {
        E(y.CHAT, "首正文写出 " + _0x241bc0 + "ms" + (_0x350e6f ? " · " + _0x350e6f : ""));
      } else if (_0xb89462 === "upstream_completed") {
        E(y.CHAT, "上游结束 " + _0x241bc0 + "ms" + (_0x350e6f ? " · " + _0x350e6f : ""));
      } else if (_0xb89462 === "upstream_eof") {
        E(y.CHAT, "上游 EOF " + _0x241bc0 + "ms" + (_0x350e6f ? " · " + _0x350e6f : ""));
      } else if (_0xb89462 === "pacing_drained") {
        E(y.CHAT, "排空完成 " + _0x241bc0 + "ms" + (_0x350e6f ? " · " + _0x350e6f : ""));
      } else if (ft) {
        E(y.DETAIL, _0xb89462 + " " + _0x241bc0 + "ms" + (_0x350e6f ? " · " + _0x350e6f : ""));
      }
      Ut("timing", _0xe65741 + " " + _0xb89462 + ": " + _0x241bc0 + "ms" + (_0x350e6f ? " " + _0x350e6f : ""), _0x3d9f46);
    },
    summary: (_0x72d481, _0x22bf87 = "") => {
      let _0x1ef8b5 = Date.now() - _0x509bdc;
      if (_0x72d481 === "finalized") {
        let _0x3fecb1 = Object.entries(_0x1b95f5).filter(([, _0x26c100]) => _0x26c100 != null && _0x26c100 !== "").map(([_0x4051c9, _0x3c9f73]) => _0x4051c9 + "=" + _0x3c9f73);
        let _0x4ce18c = [["first_upstream_chunk", "首上游包"], ["first_reasoning_delta", "首推理"], ["first_visible_text", "首正文"], ["first_visible_write", "首正文写出"], ["upstream_completed", "上游结束"], ["upstream_eof", "上游EOF"], ["pacing_drained", "排空完成"]];
        if (_0x45cf28 > 0) {
          _0x3fecb1.push("body=" + li("bytes=" + _0x45cf28));
        }
        for (let [_0x41326b, _0x128ec3] of _0x4ce18c) {
          let _0x99a53e = _0x4393aa.get(_0x41326b);
          if (_0x99a53e != null) {
            _0x3fecb1.push(_0x128ec3 + "=" + _0x99a53e + "ms");
          }
        }
        E(y.CHAT, "总耗时 " + _0x1ef8b5 + "ms · " + _0x3fecb1.join(" · ") + (_0x22bf87 ? " · " + _0x22bf87 : ""));
      } else if (ft) {
        E(y.DETAIL, _0x72d481 + " " + _0x1ef8b5 + "ms" + (_0x22bf87 ? " · " + _0x22bf87 : ""));
      }
      Ut("timing", _0xe65741 + " " + _0x72d481 + ": total=" + _0x1ef8b5 + "ms" + (_0x22bf87 ? " " + _0x22bf87 : ""), _0x3d9f46);
    },
    elapsed: () => Date.now() - _0x509bdc
  };
}
function Ll(_0x54a341, _0x2010f8, _0x3dce90) {
  let _0x51a05f = Array.isArray(_0x3dce90) ? _0x3dce90.map(_0xdd607d => _0xdd607d && _0xdd607d.name).filter(Boolean) : [];
  let _0x19321d = _0x51a05f.length ? "; enabled=" + _0x51a05f.length + " [" + _0x51a05f.join(", ") + "]" : "";
  E(y.TOOL, "未调用 · " + _0x54a341 + " · " + _0x2010f8 + _0x19321d);
  Ut("error", _0x54a341 + " " + _0x2010f8 + "; no tool calls emitted");
  Et("error", []);
}
function hi(_0x4ea567, {
  model: _0x1e1cb1
} = {}) {
  let _0x39115a = _0x4ea567?.getStreamErrorHint?.() || "";
  if (_0x39115a) {
    if (Pe(_0x39115a)) {
      return co(ho(_0x39115a));
    }
    let _0x28e9ca = ho(_0x39115a);
    if (_0x28e9ca) {
      return Z("上游错误", _0x28e9ca);
    }
  }
  let _0x533881 = "建议排查上游模型 " + (_0x1e1cb1 ? String(_0x1e1cb1).trim() : "当前绑定") + " 是否正常！";
  return Z("空回复", "未收到有效回复。" + _0x533881);
}
function Bl(_0x4ef777) {
  if (!Array.isArray(_0x4ef777)) {
    return "";
  }
  for (let _0x565f7e = _0x4ef777.length - 1; _0x565f7e >= 0; _0x565f7e--) {
    let _0x47e55c = _0x4ef777[_0x565f7e];
    if (!_0x47e55c || _0x47e55c.role !== "user") {
      continue;
    }
    let _0x55ac02 = _0x47e55c.content;
    if (typeof _0x55ac02 == "string") {
      return _0x55ac02;
    } else if (Array.isArray(_0x55ac02)) {
      return _0x55ac02.map(_0x56e10a => typeof _0x56e10a == "string" ? _0x56e10a : _0x56e10a && typeof _0x56e10a.text == "string" ? _0x56e10a.text : "").join("\n");
    } else {
      return "";
    }
  }
  return "";
}
function Dl(_0x3b07a2) {
  let _0x550a88 = Bl(_0x3b07a2);
  if (_0x550a88) {
    return /(?:你是谁|你是什么模型|什么模型|哪个模型|哪款模型|底层模型|真实模型|用的什么模型|当前模型|模型[是叫]|what\s+model|which\s+model|what\s+llm|underlying\s+model|who\s+are\s+you|what\s+are\s+you)/i.test(_0x550a88);
  } else {
    return false;
  }
}
function Ul() {
  let _0x2ed8d2 = new Date();
  try {
    let _0xc294c0 = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).formatToParts(_0x2ed8d2);
    let _0x1f5588 = _0x5c8660 => _0xc294c0.find(_0x5eae4e => _0x5eae4e.type === _0x5c8660)?.value || "";
    return _0x1f5588("year") + "-" + _0x1f5588("month") + "-" + _0x1f5588("day") + " " + _0x1f5588("hour") + ":" + _0x1f5588("minute");
  } catch {
    let _0x363b7b = _0x4633f3 => String(_0x4633f3).padStart(2, "0");
    return _0x2ed8d2.getFullYear() + "-" + _0x363b7b(_0x2ed8d2.getMonth() + 1) + "-" + _0x363b7b(_0x2ed8d2.getDate()) + " " + _0x363b7b(_0x2ed8d2.getHours()) + ":" + _0x363b7b(_0x2ed8d2.getMinutes());
  }
}
function Hl(_0x3ea777, _0x4a5077) {
  let _0x2504ce = String(_0x3ea777 || "").trim();
  if (!_0x2504ce || !_0x4a5077) {
    return "";
  }
  let _0x19209a = Ul();
  return "我是 Cascade，运行在 Devin 里，当前模型是 " + _0x2504ce + "，现在是 " + _0x19209a + "（本地时间）。\n";
}
function Yt(_0x37d36a, _0x280ffe, _0x50fccd) {
  let _0x42a445 = !!_0x37d36a.userAskedAboutModel;
  for (let _0x10d781 of _0x50fccd) {
    if (_0x10d781 && _0x10d781.__textDelta !== undefined) {
      if (!_0x42a445) {
        _0x37d36a.enqueueText(_0x10d781.__textDelta, _0x10d781.__tokens);
        if (_0x10d781.__flushText) {
          _0x37d36a.flushPendingText();
        }
      }
    } else if (_0x10d781 && _0x10d781.__stopChunk) {
      let _0x52e3a5 = Ce(_0x10d781.__stopChunk);
      if (_0x42a445) {
        _0x37d36a.safeWrite(_0x52e3a5);
      } else {
        _0x37d36a.scheduleStopFrame(_0x52e3a5);
      }
      if (_0x10d781.__chatEnd) {
        Et(_0x10d781.__chatEnd.stopReason, [], _0x10d781.__chatEnd.targetId ?? null);
      }
    } else {
      if (!_0x42a445) {
        _0x37d36a.flushPendingTextForControlFrame();
      }
      _0x37d36a.safeWrite(Ce(_0x10d781));
    }
  }
  if (_0x280ffe?.hasMeaningfulOutput) {
    _0x37d36a.markMeaningful();
  }
  let _0x302bad = _0x280ffe?.declaredModel ? String(_0x280ffe.declaredModel).trim() : "";
  if (_0x302bad) {
    let _0x407714 = _0x37d36a?.configuredModel || "";
    ko(_0x302bad, _0x407714);
    if (_0x37d36a.injectDeclaredModelHint && !_0x37d36a._declaredModelLineInjected) {
      _0x37d36a._declaredModelLineInjected = true;
      let _0x50730a = Hl(_0x302bad, !!_0x37d36a.userAskedAboutModel);
      if (_0x50730a) {
        _0x37d36a.enqueueText(_0x50730a, 0);
        _0x37d36a.flushPendingText();
      }
    }
  }
}
function qo(_0x223260, _0x1659a6, _0x53a1bb, _0x13c44a, _0x572857 = {}) {
  if (_0x223260.wasFinalized()) {
    return;
  }
  let _0x520a18 = _0x572857.stopReason || _0x1659a6?.stopReason;
  let _0x3e2012 = _0x1659a6?.getStreamErrorHint?.() || "";
  let _0x67cc89 = _0x223260.userAskedAboutModel && _0x223260._declaredModelLineInjected && _0x520a18 && _0x520a18 !== "error" && !_0x3e2012;
  if (!_0x1659a6?.hasMeaningfulOutput && !_0x67cc89) {
    if (Pe(_0x3e2012)) {
      E(y.QUOTA, et + " · " + _0x53a1bb + " 流错误 · " + String(_0x3e2012).slice(0, 200), {
        err: true
      });
    } else if (ft) {
      E(y.DETAIL, _0x53a1bb + " SSE · " + _0x1659a6.formatEventStats() + (_0x3e2012 ? " · upstream=\"" + _0x3e2012 + "\"" : ""));
    }
    let _0x130889 = hi(_0x1659a6, _0x572857);
    return _0x223260.fail(_0x130889, _0x53a1bb + " stream error" + (_0x3e2012 ? ": " + _0x3e2012 : " (empty stream)"));
  }
  if (_0x67cc89) {
    _0x223260.markMeaningful();
  }
  let _0x366c68 = _0x572857.model ? String(_0x572857.model).trim() : "";
  let _0x47b317 = _0x1659a6?.declaredModel ? String(_0x1659a6.declaredModel).trim() : "";
  if (_0x47b317) {
    ko(_0x47b317, _0x366c68);
  }
  let _0x2ce403 = _0x47b317 ? " · 上游声明=" + _0x47b317 + (_0x366c68 && _0x366c68 !== _0x47b317 ? " · 配置目标=" + _0x366c68 : "") : _0x366c68 ? " · 配置目标=" + _0x366c68 : "";
  if (_0x520a18) {
    E(y.DONE, _0x53a1bb + " · stop=" + _0x520a18 + _0x2ce403);
  } else if (_0x13c44a) {
    E(y.DONE, String(_0x13c44a).replace(/^\s*\[ok\]\s*/i, "").trim());
  }
  return _0x223260.finalizeSuccess(null);
}
function Cn(_0x2b0e26) {
  return _0x2b0e26.slice(0, 500).replace(/(?:sk-[a-zA-Z0-9_-]{10,}|Bearer\s+\S+)/g, "[REDACTED]").replace(/(?:key-[a-zA-Z0-9_-]{10,})/g, "[REDACTED]").replace(/(?:"(?:api[_-]?key|token|secret|password|authorization)":\s*"[^"]{6,}")/gi, "\"$1\":\"[REDACTED]\"");
}
var Fl = ["gpt-", "MODEL_GPT", "o1-", "o1", "o3-", "o3", "o4-", "o4"];
var Kl = ["glm-", "deepseek-", "qwen", "moonshot-", "yi-", "abab", "hunyuan-", "mistral-", "llama-", "minimax", "spark", "ernie", "baichuan", "chatglm", "gemini", "gemma", "google/", "grok", "doubao", "step-", "kimi"];
var Yl = {
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
function ql(_0x79a0f5) {
  if (_0x79a0f5 && _0x79a0f5.endsWith("-priority")) {
    return "fast";
  }
}
function jl(_0x5e69fd) {
  if (!_0x5e69fd) {
    return false;
  }
  let _0x2531e5 = _0x5e69fd.toLowerCase();
  if (Fl.some(_0x246d19 => _0x5e69fd.startsWith(_0x246d19))) {
    return true;
  } else {
    return Kl.some(_0x544d81 => _0x2531e5.startsWith(_0x544d81));
  }
}
function mi(_0x3ba30b) {
  return String(_0x3ba30b || "").includes("chat/completions");
}
var Gl = parseInt(String(process.env.BYOK_HISTORY_LLM_SUMMARY_TIMEOUT_MS || "45000"), 10) || 45000;
var zl = parseInt(String(process.env.BYOK_HISTORY_LLM_SUMMARY_MAX_TOKENS || "2500"), 10) || 2500;
var Yo = "You compress older chat history for a coding agent. Write a dense factual summary that preserves: user goals, decisions, file paths, errors, tool outcomes, and open TODOs. Do not invent facts. Prefer bullet points. No preamble. Output plain text only.";
function ui({
  useHttp: _0xfe6316,
  parsed: _0x305ac3,
  path: _0x5e7bb6,
  headers: _0x56fb67,
  body: _0x2c57e9,
  timeoutMs: _0xa68d1a
}) {
  return new Promise((_0x2281d2, _0x624e9e) => {
    let _0x1e76df = _0xfe6316 ? _0x4712c4 : _0x412940;
    let _0x377516 = _0x305ac3.port !== 443 && _0x305ac3.port !== 80 ? _0x305ac3.port : _0xfe6316 ? 80 : 443;
    let _0x3d5516 = _0x1e76df.request({
      hostname: _0x305ac3.hostname,
      port: _0x377516,
      path: _0x5e7bb6,
      method: "POST",
      rejectUnauthorized: !_0xfe6316 && _0x305ac3.port === 443,
      headers: _0x56fb67
    }, _0xfb7718 => {
      let _0x11e97c = "";
      _0xfb7718.setEncoding("utf8");
      _0xfb7718.on("data", _0x3d9ab6 => {
        _0x11e97c += _0x3d9ab6;
      });
      _0xfb7718.on("end", () => {
        _0x2281d2({
          status: _0xfb7718.statusCode || 0,
          body: _0x11e97c
        });
      });
      _0xfb7718.on("error", _0x624e9e);
    });
    _0x3d5516.setTimeout(_0xa68d1a, () => {
      _0x3d5516.destroy(new Error("timeout " + _0xa68d1a + "ms"));
    });
    _0x3d5516.on("error", _0x624e9e);
    _0x3d5516.end(_0x2c57e9);
  });
}
function Wl(_0x15dd4b) {
  if (_0x15dd4b) {
    if (typeof _0x15dd4b.content == "string") {
      return _0x15dd4b.content;
    } else if (Array.isArray(_0x15dd4b.content)) {
      return _0x15dd4b.content.map(_0x9f783d => _0x9f783d && _0x9f783d.type === "text" ? _0x9f783d.text : "").filter(Boolean).join("\n");
    } else {
      return "";
    }
  } else {
    return "";
  }
}
function Xl(_0x3d4500) {
  if (!_0x3d4500) {
    return "";
  }
  let _0x30219d = _0x3d4500.choices?.[0];
  if (_0x30219d?.message?.content) {
    if (typeof _0x30219d.message.content == "string") {
      return _0x30219d.message.content;
    }
    if (Array.isArray(_0x30219d.message.content)) {
      return _0x30219d.message.content.map(_0x12ddc0 => _0x12ddc0?.text || _0x12ddc0?.content || "").join("");
    }
  }
  if (typeof _0x3d4500.output_text == "string") {
    return _0x3d4500.output_text;
  }
  if (Array.isArray(_0x3d4500.output)) {
    let _0x2a20f1 = [];
    for (let _0x413f36 of _0x3d4500.output) {
      if (_0x413f36?.type === "message" && Array.isArray(_0x413f36.content)) {
        for (let _0x480fc0 of _0x413f36.content) {
          if (_0x480fc0?.type === "output_text" || _0x480fc0?.type === "text") {
            _0x2a20f1.push(_0x480fc0.text || "");
          }
        }
      }
    }
    if (_0x2a20f1.length) {
      return _0x2a20f1.join("\n");
    }
  }
  return "";
}
function Vl({
  useOpenAI: _0x223981,
  providerConfig: _0xc10e20,
  model: _0xc98706
}) {
  return async function ({
    transcript: _0x250aac,
    messageCount: _0x3a1708,
    inputTokens: _0x31df06
  }) {
    let _0xe39467 = Math.max(3000, Gl);
    let _0x36925f = Math.min(8000, Math.max(400, zl));
    let _0x8a4e04 = "Summarize the following " + (_0x3a1708 || "?") + " earlier messages (~" + (_0x31df06 || "?") + " tokens). Keep critical technical detail.\n\n" + String(_0x250aac || "").slice(0, 400000);
    try {
      if (_0x223981) {
        let _0x25fb81 = _0xc10e20.openai;
        if (!_0x25fb81?.apiKey) {
          return "";
        }
        let _0x4010bf = mi(_0x25fb81.apiPath) ? {
          model: _0xc98706,
          stream: false,
          max_tokens: _0x36925f,
          temperature: 0.2,
          messages: [{
            role: "system",
            content: Yo
          }, {
            role: "user",
            content: _0x8a4e04
          }]
        } : {
          model: _0xc98706,
          stream: false,
          max_output_tokens: _0x36925f,
          temperature: 0.2,
          input: [{
            role: "developer",
            content: Yo
          }, {
            role: "user",
            content: _0x8a4e04
          }]
        };
        let _0x2e1e97 = JSON.stringify(_0x4010bf);
        let _0x162843 = {
          "content-type": "application/json",
          authorization: "Bearer " + _0x25fb81.apiKey,
          "content-length": Buffer.byteLength(_0x2e1e97),
          ...An(_0xc98706, Buffer.byteLength(_0x2e1e97))
        };
        let {
          status: _0x333752,
          body: _0x49a720
        } = await ui({
          useHttp: _0x25fb81.useHttp,
          parsed: _0x25fb81.parsed,
          path: _0x25fb81.apiPath,
          headers: _0x162843,
          body: _0x2e1e97,
          timeoutMs: _0xe39467
        });
        if (_0x333752 !== 200) {
          E(y.ROUTE, "hist-llm summary fail status=" + _0x333752 + " body=" + String(_0x49a720).slice(0, 160));
          return "";
        }
        let _0x49f28c = JSON.parse(_0x49a720);
        return String(Xl(_0x49f28c) || "").trim();
      }
      let _0x28a79a = _0xc10e20.anthropic;
      if (!_0x28a79a?.apiKey) {
        return "";
      }
      let _0x18c11b = JSON.stringify({
        model: _0xc98706,
        stream: false,
        max_tokens: _0x36925f,
        system: Yo,
        messages: [{
          role: "user",
          content: _0x8a4e04
        }]
      });
      let _0x4b3329 = {
        "content-type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": _0x28a79a.apiKey,
        "content-length": Buffer.byteLength(_0x18c11b),
        ...An(_0xc98706, Buffer.byteLength(_0x18c11b))
      };
      let {
        status: _0x3df503,
        body: _0x49ad03
      } = await ui({
        useHttp: _0x28a79a.useHttp,
        parsed: _0x28a79a.parsed,
        path: _0x28a79a.apiPath,
        headers: _0x4b3329,
        body: _0x18c11b,
        timeoutMs: _0xe39467
      });
      if (_0x3df503 !== 200) {
        E(y.ROUTE, "hist-llm summary fail status=" + _0x3df503 + " body=" + String(_0x49ad03).slice(0, 160));
        return "";
      }
      let _0x297c91 = JSON.parse(_0x49ad03);
      return String(Wl(_0x297c91) || "").trim();
    } catch (_0x2617f5) {
      E(y.ROUTE, "hist-llm summary error: " + (_0x2617f5?.message || _0x2617f5));
      return "";
    }
  };
}
function gi(_0x3a1f90, _0x3b551b, _0x4b8e14) {
  let _0x419f0f = Date.now();
  let _0x4c44df = {
    sourceRequestId: _0x20cdd6.randomUUID(),
    sourceStartedAt: _0x419f0f
  };
  Promise.resolve().then(() => Zl(_0x3a1f90, _0x3b551b, _0x4b8e14, _0x4c44df)).catch(_0x5e036c => {
    ce("handleGetChatMessage: " + (_0x5e036c?.stack || _0x5e036c?.message || _0x5e036c));
    qe(_0x3b551b, Z("请求处理失败", _0x5e036c?.message || String(_0x5e036c)));
  });
}
function Jl(_0x283083 = null) {
  if (_0x283083?.provider) {
    return Bo(_0x283083.providerId);
  }
  let _0x3e83ad = xe();
  if (_0x3e83ad.defaultProviderId) {
    return Bo(_0x3e83ad.defaultProviderId);
  } else {
    return Be();
  }
}
function Ql(_0x34fd61 = null) {
  let _0x51be7b = xe();
  let _0x4b035a = String(_0x34fd61?.providerId || "").trim();
  let _0x192781 = String(_0x51be7b.defaultProviderId || "").trim();
  let _0x4aa5f8 = "default";
  if (_0x4b035a && _0x51be7b.providers?.[_0x4b035a]) {
    _0x4aa5f8 = _0x4b035a;
  } else if (_0x192781 && _0x51be7b.providers?.[_0x192781]) {
    _0x4aa5f8 = _0x192781;
  }
  let _0x1a2895 = _0x51be7b.providers?.[_0x4aa5f8];
  let _0x7ca746 = !!_0x4b035a && _0x4aa5f8 === _0x4b035a;
  let _0x537625 = String(_0x1a2895?.name || (_0x7ca746 ? _0x34fd61?.providerName : "") || _0x4aa5f8).trim() || _0x4aa5f8;
  return {
    providerId: _0x4aa5f8,
    providerName: _0x537625
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

async function Zl(_0x2b4107, _0x3c7ee1, _0x4567f6, _0x3f84ad) {
  let {
    systemPrompt: _0x197695,
    messages: _0x2c5d5f,
    promptEntries: _0x2017d6,
    tools: _0x45cdca,
    toolChoice: _0x1265f9,
    requestedModel: _0x3638a8,
    cascadeId: _0x5ae60b,
    initiator: _0x3e3bac,
    contextStats: _0x6d3aa1
  } = dr(_0x4567f6, _0x2b4107.headers);
  let _0x4d3e51 = _isInternalCompactionUid(_0x3638a8);
  let _0x2972ee = ot(_0x3638a8) || _0x4d3e51;
  let _0x36689f = _0x2972ee && !_0x4d3e51 && _0x5ae60b ? ri({
    conversationId: _0x5ae60b,
    sourceRequestId: _0x3f84ad.sourceRequestId
  }) : Promise.resolve(null);
  let _0x285354 = xn(_0x3638a8);
  if (!_0x285354 && _0x4d3e51) {
    _0x285354 = _resolveInternalCascadeBinding();
  }
  let _0x25fb62 = _0x285354?.modelId || Ol(_0x3638a8);
  if (_0x285354) {
    Co(_0x3638a8, _0x25fb62);
  } else if (_0x2972ee) {
    Co(_0x3638a8, "");
  }
  if (!_0x25fb62) {
    qe(_0x3c7ee1, Z("未解析到上游模型", "Cascade 模型「" + (_0x3638a8 || "(空)") + "」已绑定但未配置上游模型/默认模型"));
    return;
  }
  if (_byokSubagentDisabled() && Array.isArray(_0x45cdca) && _0x45cdca.length > 0) {
    let _0x269252 = _0x45cdca.length;
    _0x45cdca = _0x45cdca.filter(_0x435d90 => _0x435d90?.name !== "run_subagent");
    if (_0x45cdca.length !== _0x269252) {
      E(y.TOOL, "剔除 run_subagent 工具定义 ×" + (_0x269252 - _0x45cdca.length) + "（本地子 Agent 已移除）");
    }
  }
  let _0x53c1ce = Jl(_0x285354);
  let _byokProviderProtocol = String(_0x53c1ce.protocol || "").trim().toLowerCase();
  // An explicit provider protocol wins. Legacy providers without the field keep
  // the historical upstream-model-name inference for backward compatibility.
  let _0xd7fe92 = _byokProviderProtocol === "openai" ? true : _byokProviderProtocol === "anthropic" ? false : jl(_0x25fb62);
  let {
    providerId: _0x23f0c2,
    providerName: _0x1d2039
  } = Ql(_0x285354);
  if (!(_0xd7fe92 ? _0x53c1ce.openai.apiKey : _0x53c1ce.anthropic.apiKey)) {
    ce("未配置 " + (_0xd7fe92 ? "OpenAI" : "Anthropic") + " API Key，无法转发 " + _0x3638a8);
    qe(_0x3c7ee1, Z("未配置 API Key", (_0x1d2039 ? "「" + _0x1d2039 + "」" : "当前供应商") + "未填写 API Key，请在面板配置"));
    return;
  }
  let _0x2a273a = ql(_0x3638a8);
  let _0x5ed5cb = _0x20cdd6.randomUUID();
  let _0x286b2b = _0xd7fe92 ? "OpenAI" : "Anthropic";
  let _0x34612d = null;
  let _0x3bfc1c = _0x285354?.contextLimit > 0 ? _0x285354.contextLimit : Ee();
  let _0x515e18 = _0x2972ee && !_0x4d3e51 && _0x5ae60b ? {
    conversationId: _0x5ae60b,
    sourceRequestId: _0x3f84ad.sourceRequestId,
    sourceStartedAt: _0x3f84ad.sourceStartedAt,
    contextLimit: _0x3bfc1c,
    slotId: _0x285354?.slotId || xt(_0x3638a8),
    requestedModelUid: _0x3638a8,
    upstreamModelId: _0x25fb62,
    providerId: _0x23f0c2,
    providerName: _0x1d2039,
    tokenKind: "estimated_request_window"
  } : null;
  if (_0x2972ee && Jn()) {
    let _0xad707b = Math.min(zo() || fi, 64000);
    let _0x2dfa81 = to();
    let _0x50babf = _0x2dfa81 ? Vl({
      useOpenAI: _0xd7fe92,
      providerConfig: _0x53c1ce,
      model: _0x25fb62
    }) : undefined;
    _0x34612d = await ts(_0x2017d6 || [], {
      tokenLimit: _0x3bfc1c,
      cascadeId: _0x5ae60b,
      systemPrompt: _0x197695,
      tools: _0x45cdca,
      outputReserve: _0xad707b,
      summarizeFn: _0x50babf,
      llmSummary: _0x2dfa81
    });
    _0x2c5d5f = _0x34612d.messages;
    mt({
      limit: _0x3bfc1c,
      inboundTokens: _0x34612d.inboundTokens,
      restoredMsgs: _0x34612d.restoredMsgs,
      inboundMsgs: _0x34612d.inboundMsgs,
      reason: _0x34612d.reason,
      cascadeId: _0x285354?.slotId || xt(_0x3638a8),
      sessionKey: _0x34612d.sessionKey || ""
    });
  }
  let _0x17c6e6 = us();
  if (_0x17c6e6.length > 0) {
    for (let _0x10d821 of _0x17c6e6) {
      _0x2c5d5f.push({
        role: _0x10d821.role,
        content: _0x10d821.content
      });
    }
    E(y.INJECT, "App 注入 " + _0x17c6e6.length + " 条消息");
  }
  {
    let _0x3b0d08 = sr(_0x2c5d5f);
    _0x2c5d5f = _0x3b0d08.messages;
    let {
      filledOrphans: _0x190afa,
      droppedResults: _0x5c8e12,
      assignedIds: _0x23260a,
      reorderedResults: _0x24ed42 = 0,
      dedupedResults: _0xff72f3 = 0
    } = _0x3b0d08;
    if (_0x190afa > 0 || _0x5c8e12 > 0 || _0x23260a > 0 || _0x24ed42 > 0 || _0xff72f3 > 0) {
      let _0x120f9b = [];
      if (_0x190afa > 0) {
        _0x120f9b.push("补孤儿tool_use×" + _0x190afa);
      }
      if (_0x5c8e12 > 0) {
        _0x120f9b.push("丢孤儿tool_result×" + _0x5c8e12);
      }
      if (_0x23260a > 0) {
        _0x120f9b.push("重写调用id×" + _0x23260a);
      }
      if (_0x24ed42 > 0) {
        _0x120f9b.push("重排结果×" + _0x24ed42);
      }
      if (_0xff72f3 > 0) {
        _0x120f9b.push("去重幽灵tool_use×" + _0xff72f3);
      }
      E(y.TOOL, "工具配对对账 · " + _0x120f9b.join(" · "));
    }
  }
  {
    let {
      messages: _0xac028c,
      stripped: _0x5dbc20
    } = ar(_0x2c5d5f);
    if (_0x5dbc20 > 0) {
      _0x2c5d5f = _0xac028c;
      E(y.ROUTE, "剥离末尾 assistant-prefill ×" + _0x5dbc20 + "（上游要求末条为 user）");
    }
  }
  if (!_byokGuessVision(_0x25fb62, _0x285354 && _0x285354.supportsVision)) {
    let _0xvisMsgs = _byokStripVisionMessages(_0x2c5d5f);
    if (_0xvisMsgs !== _0x2c5d5f) {
      _0x2c5d5f = _0xvisMsgs;
      E(y.ROUTE, "非视觉模型，已剥离图片内容");
    }
  }
  let _0x1cc397 = cs();
  let _0x53a8f3 = _0x45cdca?.length ? " · tools=" + _0x45cdca.length : "";
  let _0x355575 = _0x6d3aa1 ? " · clientTokens=" + (_0x6d3aa1.tokenTotal || "?") + (_0x6d3aa1.tokenFields ? "/" + _0x6d3aa1.tokenFields + "fields" : "") + " · clientChars=" + (_0x6d3aa1.totalChars || 0) : "";
  let _0x9ba09c = _0x34612d ? " · hist=" + _0x34612d.reason + ":" + _0x34612d.inboundMsgs + "→" + _0x34612d.restoredMsgs + (_0x34612d.prepended ? "+" + _0x34612d.prepended : "") + (_0x34612d.skippedHead ? " skip=" + _0x34612d.skippedHead : "") + (_0x34612d.toolCompacted ? " tool~" + _0x34612d.toolCompacted : "") + (_0x34612d.summarized ? " sum=" + _0x34612d.summarized : "") + (_0x34612d.anchors ? " anchors=" + _0x34612d.anchors : "") + (_0x34612d.summaryMode && _0x34612d.summaryMode !== "none" ? " mode=" + _0x34612d.summaryMode : "") + (_0x34612d.dropped ? " drop=" + _0x34612d.dropped : "") + (_0x34612d.softTokenLimit ? " soft=" + Math.round(_0x34612d.softTokenLimit / 1000) + "k" : "") + (_0x34612d.compressTarget ? " target=" + Math.round(_0x34612d.compressTarget / 1000) + "k" : "") + (" ctx=" + (_0x3bfc1c >= 1000000 ? "1M" : Math.round(_0x3bfc1c / 1000) + "k")) + (_0x34612d.sessionKey ? " sk=" + String(_0x34612d.sessionKey).replace(/^c:(id:)?/, "").slice(0, 12) : "") : "";
  E(y.ROUTE, _0x3638a8 + " → " + _0x25fb62 + " · " + _0x286b2b + " · msgs=" + _0x2c5d5f.length + _0x53a8f3 + _0x355575 + _0x9ba09c);
  if (ft) {
    E(y.DETAIL, "system=" + _0x197695.length + " chars");
    if (_0x2c5d5f.length > 0) {
      E(y.DETAIL, "roles=" + _0x2c5d5f.map(_0xdfbfa0 => _0xdfbfa0.role).join(","));
    }
    if (_0x1265f9) {
      E(y.TOOL, "tool_choice=" + JSON.stringify(_0x1265f9));
    }
  }
  ls(_0x25fb62, _0x2c5d5f.length, _0x45cdca ? _0x45cdca.length : 0, _0x1cc397);
  if (ft && _0x2c5d5f.length > 0) {
    for (let _0x4e6079 = 1; _0x4e6079 < _0x2c5d5f.length; _0x4e6079++) {
      if (_0x2c5d5f[_0x4e6079].role === _0x2c5d5f[_0x4e6079 - 1].role) {
        console.warn("  Consecutive " + _0x2c5d5f[_0x4e6079].role + " at index " + (_0x4e6079 - 1) + "," + _0x4e6079 + " — merge failed?");
      }
    }
  }
  let _0x425e26 = Pl("chat", {
    provider: _0x286b2b,
    model: _0x25fb62,
    requested: _0x3638a8
  }, _0x1cc397);
  _0x425e26.mark("parsed", "messages=" + _0x2c5d5f.length + " tools=" + (_0x45cdca ? _0x45cdca.length : 0) + " clientTokens=" + (_0x6d3aa1?.tokenTotal || "?") + " clientChars=" + (_0x6d3aa1?.totalChars || 0) + (_0x34612d ? " hist=" + _0x34612d.reason + ":" + _0x34612d.inboundMsgs + "→" + _0x34612d.restoredMsgs : ""));
  let _0x74ea00 = ot(_0x3638a8);
  let _0x8d6606 = _0x74ea00 && Dl(_0x2c5d5f);
  if (_0x74ea00) {
    let _0x4d3b4f = "[BYOK model disclosure rules]\n- Product surface remains Cascade; all other Cascade instructions still apply.\n- When asked which model / underlying model / what LLM you are: the proxy injects one short Chinese identity line for the user. Prefer outputting nothing else this turn (no status markers, no repeated Cascade, no elaboration).\n- The proxy may disclose identity in the visible reply (e.g. 「我是 Cascade，运行在 Devin 里，当前模型是 <id>，现在是 <本地时间>（本地时间）。」). That line is injected for the user and is NOT in your context.\n- Do NOT search for, quote, invent, or deny any 「当前模型」/declared-model field. Do NOT say you cannot see that field. Do NOT contradict the proxy disclosure.\n- Do NOT treat any panel-configured target model id as verified proof of the serving model." + (_byokSubagentDisabled() ? "\n- The run_subagent tool is disabled by BYOK_DISABLE_SUBAGENT=1. Do not call it." : "");
    _0x197695 = _0x197695 ? _0x197695 + "\n\n" + _0x4d3b4f : _0x4d3b4f;
  }
  let _0x1840d3 = "";
  let _0x319633 = _0x8d6606;
  let _0x237ac3 = _0x515e18 ? await _0x36689f : null;
  let _0x3dcaa9 = _0x515e18 && _0x237ac3?.sourceOrder ? {
    ..._0x515e18,
    sourceOrder: _0x237ac3.sourceOrder
  } : null;
  let _0x274b53 = _0x34612d ? {
    inboundTokens: _0x34612d.inboundTokens,
    restoredMsgs: _0x34612d.restoredMsgs,
    inboundMsgs: _0x34612d.inboundMsgs,
    reason: _0x34612d.reason,
    cascadeId: _0x285354?.slotId || xt(_0x3638a8),
    sessionKey: _0x34612d.sessionKey || "",
    slotTokenLimit: _0x3bfc1c
  } : null;
  if (_0xd7fe92) {
    su(_0x2b4107, _0x3c7ee1, {
      systemPrompt: _0x197695,
      messages: _0x2c5d5f,
      tools: _0x45cdca,
      toolChoice: _0x1265f9,
      resolvedModel: _0x25fb62,
      requestedModel: _0x3638a8,
      providerName: _0x1d2039,
      serviceTier: _0x2a273a,
      messageId: _0x5ed5cb,
      initiator: _0x3e3bac,
      timing: _0x425e26,
      monitorTargetId: _0x1cc397,
      providerConfig: _0x53c1ce,
      byokIdentityLine: _0x1840d3,
      injectDeclaredModelHint: _0x319633,
      userAskedAboutModel: _0x8d6606,
      contextSnapshot: _0x3dcaa9,
      uiContextHint: _0x274b53
    });
  } else {
    ru(_0x2b4107, _0x3c7ee1, {
      systemPrompt: _0x197695,
      messages: _0x2c5d5f,
      tools: _0x45cdca,
      toolChoice: _0x1265f9,
      resolvedModel: _0x25fb62,
      requestedModel: _0x3638a8,
      providerName: _0x1d2039,
      messageId: _0x5ed5cb,
      timing: _0x425e26,
      monitorTargetId: _0x1cc397,
      providerConfig: _0x53c1ce,
      byokIdentityLine: _0x1840d3,
      injectDeclaredModelHint: _0x319633,
      userAskedAboutModel: _0x8d6606,
      thinking: !!_0x285354?.thinking,
      effort: _0x285354?.effort || "",
      contextSnapshot: _0x3dcaa9,
      uiContextHint: _0x274b53
    });
  }
}
var Re = 5;
var eu = 800;
var tu = 8000;
function kn(_0x1c64be) {
  let _0x4b4b7f = Math.max(1, _0x1c64be);
  let _0x2beb9a = eu * Math.pow(2, _0x4b4b7f - 1);
  return Math.min(_0x2beb9a, tu);
}
function _i(_0x35d6f5, _0x1b4a7e, _0x4edbb3) {
  let _0x3fc0bf = _0x35d6f5?.code || "";
  let _0x560c87 = _0x35d6f5?.message || String(_0x35d6f5 || "unknown error");
  let _0x2531c0 = /^198\.(18|19)\./.test(_0x1b4a7e || "");
  if (_0x3fc0bf === "ETIMEDOUT") {
    return _0x560c87 + " (" + (_0x2531c0 ? "可能是 VPN/TUN/代理分流生成的假 IP 未正确回连，请检查分流规则或将目标域名设为直连。" : "请检查当前网络、系统代理或上游出口是否可达。") + ")";
  } else if (_0x3fc0bf === "ECONNRESET") {
    return _0x560c87 + " (上游连接被重置，常见于网络抖动、代理中途断链等)";
  } else {
    return "" + _0x560c87 + (_0x1b4a7e ? " (" + _0x1b4a7e + ":" + _0x4edbb3 + ")" : "");
  }
}
function Ti(_0x35d967, _0x2e2a29, _0x3c4251, _0x387de5, _0x19f36f, _0x346c16 = {}) {
  let _0x2e7aa9 = false;
  let _0x519b2f = false;
  let _0x5e9813 = false;
  let _0x300160 = null;
  let _0x4c397b = null;
  let _0xd8928c = false;
  let _0x5c099a = false;
  let _0x3c468c = Date.now();
  let _0x48fbf9 = 3000;
  let _0x15f1bc = "";
  let _0x3caa9b = 0;
  let _0x471f41 = null;
  let _0x59ceb9 = false;
  let _0xfef940 = 0;
  let _0x462cfc = false;
  let _0x27bc86 = [];
  let _0x120453 = Promise.resolve();
  let _0x1dbfd5 = wl();
  let _0xa1676d = Nl ? {
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
  let _0x526b1a = _0x5cd3ff => {
    if (_0xa1676d) {
      try {
        E(y.DETAIL, "pacing-debug " + _0x5cd3ff);
      } catch {}
    }
  };
  let _0x23a411 = (_0xc3797e, _0xf2482f) => (_0xf2482f > 0 ? _0xc3797e * 1000 / _0xf2482f : 0).toFixed(1);
  let _0x5631a7 = () => {
    if (_0xa1676d && _0x15f1bc.length > _0xa1676d.peakPending) {
      _0xa1676d.peakPending = _0x15f1bc.length;
    }
  };
  let _0x2ab071 = () => {
    if (_0x4c397b) {
      clearTimeout(_0x4c397b);
      _0x4c397b = null;
    }
  };
  let _0x23b103 = () => {
    _0x4c397b ||= setTimeout(() => {
      if (_0x519b2f || _0x2e7aa9 || _0x5c099a) {
        return;
      }
      let _0x379d0e = Math.round(He / 1000);
      _0x6909c0(Z(fn({
        host: _0x346c16.host || "网关",
        model: _0x346c16.model,
        providerName: _0x346c16.providerName,
        timeoutSec: _0x379d0e
      })));
    }, He);
  };
  let _0x213d9d = () => {
    if (!_0x300160) {
      _0x23b103();
      _0x300160 = setInterval(() => {
        if (_0x519b2f || _0x35d967.writableEnded || _0x2e7aa9) {
          clearInterval(_0x300160);
          _0x300160 = null;
          return;
        }
        if (Date.now() - _0x3c468c >= _0x48fbf9) {
          _0x1136bc(_0x59ceb9 ? Ce(Ze(_0x387de5, "", 0)) : Ce(_t(_0x387de5, " ")), false);
        }
      }, _0x48fbf9);
    }
  };
  let _0x182a66 = () => {
    if (_0x300160) {
      clearInterval(_0x300160);
      _0x300160 = null;
    }
    if (_0x471f41) {
      clearInterval(_0x471f41);
      _0x471f41 = null;
    }
    _0x2ab071();
  };
  let _0x216619 = () => {
    _0x5c099a = true;
    _0xd8928c = true;
  };
  let _0x1136bc = (_0x780f2e, _0x2a9ef0 = true) => {
    if (!_0x35d967.writableEnded && !_0x2e7aa9) {
      if (_0x2a9ef0) {
        _0xd8928c = true;
      }
      if (_0x19f36f) {
        _0x19f36f.mark("first_devin_write");
      }
      _0x35d967.write(_0x780f2e);
      _0x3c468c = Date.now();
    }
  };
  let _0x548244 = () => {
    if (_0x471f41) {
      clearInterval(_0x471f41);
      _0x471f41 = null;
    }
  };
  let _0x5f16a0 = () => {
    if (_0x15f1bc) {
      return;
    }
    if (_0xa1676d && _0xa1676d.drainStartAt) {
      let _0x41c154 = Date.now();
      let _0x34f789 = _0x41c154 - _0xa1676d.drainStartAt;
      let _0x4cdd3d = _0xa1676d.lastEnqAt && _0xa1676d.firstEnqAt ? _0xa1676d.lastEnqAt - _0xa1676d.firstEnqAt : 0;
      let _0x56270d = _0xa1676d.firstWriteAt ? _0x41c154 - _0xa1676d.firstWriteAt : 0;
      _0x526b1a("drain完成 · drain耗时=" + _0x34f789 + "ms · drain开始pending=" + _0xa1676d.drainPendingAtStart + " · 总上游时长=" + _0x4cdd3d + "ms(首入→末入) · 总展示时长=" + _0x56270d + "ms(首写→排空) · 累计入队=" + _0xa1676d.enqueued + " 写出=" + _0xa1676d.written + " · 峰=" + _0xa1676d.peakPending + (_0xa1676d.drainPendingAtStart > 80 && _0x34f789 > 500 ? " · 判读=收尾仍在吐积压→偏pacing" : _0x4cdd3d > _0x56270d * 0.8 && _0xa1676d.peakPending < 50 ? " · 判读=展示≈上游节奏→偏上游慢" : _0x56270d > _0x4cdd3d + 800 ? " · 判读=展示明显长于上游→偏pacing拖尾" : ""));
      _0xa1676d.drainStartAt = 0;
    }
    _0x462cfc = false;
    let _0x4397ad = _0x27bc86;
    _0x27bc86 = [];
    for (let _0x30d313 of _0x4397ad) {
      _0x30d313();
    }
  };
  let _0x59e0d0 = _0x142e4a => _0x142e4a >= 500 ? 4 : _0x142e4a >= 250 ? 2.5 : _0x142e4a >= 180 ? 1.8 : _0x142e4a >= 120 ? 1.4 : _0x142e4a >= 80 ? 1.15 : _0x142e4a >= 50 || _0x142e4a >= 30 ? 1 : _0x142e4a >= 20 ? 0.6 : 0.5;
  let _0x2aa405 = (_0xfd10cf = false) => {
    if (!_0xa1676d || !_0xa1676d.firstEnqAt) {
      return;
    }
    let _0x4f40e9 = Date.now();
    let _0x3cd063 = _0x4f40e9 - (_0xa1676d.lastSumAt || _0xa1676d.firstEnqAt) >= vl;
    let _0x5d623a = _0xa1676d.enqueueN - _0xa1676d.sumEnqN >= $l;
    if (!_0xfd10cf && !_0x3cd063 && !_0x5d623a) {
      return;
    }
    let _0x16dd34 = Math.max(1, _0x4f40e9 - (_0xa1676d.lastSumAt || _0xa1676d.firstEnqAt));
    let _0x132849 = _0xa1676d.enqueued - _0xa1676d.lastSumEnq;
    let _0x300abe = _0xa1676d.written - _0xa1676d.lastSumWri;
    let _0xe5599b = _0x59e0d0(_0x15f1bc.length);
    let _0x5b9392 = _0x53a62d();
    let _0x470e31 = _0x4f40e9 - _0xa1676d.firstEnqAt;
    let _0x283783 = "";
    if (_0x15f1bc.length > 80 && _0x132849 === 0) {
      _0x283783 = " · 判读=上游已停/慢但pending仍大→偏pacing";
    } else if (_0x132849 > 0 && _0x300abe < _0x132849 * 0.5 && _0x15f1bc.length > 50) {
      _0x283783 = " · 判读=入队快于写出→偏pacing积压";
    } else if (_0x132849 > 0 && _0x15f1bc.length < 30) {
      _0x283783 = " · 判读=池浅/跟得上→偏上游节奏";
    }
    _0x526b1a("摘要 · 窗=" + _0x16dd34 + "ms · 上游Δ=" + _0x132849 + "字(" + _0x23a411(_0x132849, _0x16dd34) + "字/s) · 写出Δ=" + _0x300abe + "字(" + _0x23a411(_0x300abe, _0x16dd34) + "字/s) · 累计入队=" + _0xa1676d.enqueued + " 写出=" + _0xa1676d.written + " · pending=" + _0x15f1bc.length + " 峰=" + _0xa1676d.peakPending + " · level=" + _0xe5599b + " cps≈" + _0x5b9392.toFixed(1) + " · 距首包=" + _0x470e31 + "ms" + _0x283783);
    _0xa1676d.lastSumAt = _0x4f40e9;
    _0xa1676d.lastSumEnq = _0xa1676d.enqueued;
    _0xa1676d.lastSumWri = _0xa1676d.written;
    _0xa1676d.sumEnqN = _0xa1676d.enqueueN;
  };
  let _0x53a62d = () => {
    let _0x2d3905 = ai * _0x59e0d0(_0x15f1bc.length);
    if (_0x462cfc) {
      return Math.max(_0x2d3905, ci);
    } else {
      return _0x2d3905;
    }
  };
  let _0x3a74d2 = () => {
    let _0x188ded = _0x53a62d();
    _0xfef940 += _0x188ded * it / 1000;
    let _0x1e12b2 = Math.floor(_0xfef940);
    _0xfef940 -= _0x1e12b2;
    return Math.min(_0x1e12b2, _0x15f1bc.length);
  };
  let _0x5a7c22 = _0x44bc8b => {
    if (_0x44bc8b) {
      _0x59ceb9 = true;
      if (_0x19f36f && !_0x35d967.writableEnded && !_0x2e7aa9) {
        _0x19f36f.mark("first_visible_write", "chars=" + _0x44bc8b.length);
      }
      if (_0xa1676d) {
        let _0xbb0467 = Date.now();
        _0xa1676d.firstWriteAt ||= _0xbb0467;
        _0xa1676d.written += _0x44bc8b.length;
        _0x5631a7();
      }
      _0x1136bc(Ce(Ze(_0x387de5, _0x44bc8b, _0x3caa9b)));
    }
  };
  let _0x30a973 = () => {
    _0x548244();
    if (!_0x15f1bc) {
      _0x5f16a0();
      return;
    }
    let _0x25e3ee = _0x15f1bc;
    _0x15f1bc = "";
    _0x5a7c22(_0x25e3ee);
    _0x5f16a0();
  };
  let _0xc3b45b = () => {
    _0x3ab604();
    _0x548244();
    while (_0x15f1bc) {
      let _0xfaf553 = _0x15f1bc.slice(0, bl);
      _0x15f1bc = _0x15f1bc.slice(_0xfaf553.length);
      _0x5a7c22(_0xfaf553);
    }
    _0x5f16a0();
  };
  let _0x63b1f6 = () => {
    if (it <= 0) {
      _0x30a973();
      if (_0x19f36f) {
        _0x19f36f.mark("pacing_drained", "pacing=off");
      }
      return Promise.resolve();
    }
    if (!_0x15f1bc) {
      if (_0xa1676d && _0xa1676d.firstEnqAt) {
        let _0xde9c81 = Date.now();
        let _0x394f4a = _0xa1676d.lastEnqAt && _0xa1676d.firstEnqAt ? _0xa1676d.lastEnqAt - _0xa1676d.firstEnqAt : 0;
        let _0x5ec1b5 = _0xa1676d.firstWriteAt ? _0xde9c81 - _0xa1676d.firstWriteAt : 0;
        _0x526b1a("drain跳过(已空) · 累计入队=" + _0xa1676d.enqueued + " 写出=" + _0xa1676d.written + " · 峰=" + _0xa1676d.peakPending + " · 总上游时长=" + _0x394f4a + "ms · 总展示时长=" + _0x5ec1b5 + "ms");
        _0x2aa405(true);
      }
      if (_0x19f36f) {
        _0x19f36f.mark("pacing_drained", "pending=0");
      }
      return Promise.resolve();
    }
    let _0x3ad2b1 = _0x15f1bc.length;
    _0x462cfc = true;
    return new Promise(_0x2e46d0 => {
      if (_0xa1676d && !_0xa1676d.drainStartAt) {
        _0xa1676d.drainStartAt = Date.now();
        _0xa1676d.drainPendingAtStart = _0x15f1bc.length;
        let _0x443efb = _0x59e0d0(_0x15f1bc.length);
        _0x526b1a("drain开始 · pending=" + _0xa1676d.drainPendingAtStart + " · 累计入队=" + _0xa1676d.enqueued + " 写出=" + _0xa1676d.written + " · 峰=" + _0xa1676d.peakPending + " · level=" + _0x443efb + " cps≈" + _0x53a62d().toFixed(1) + (_0xa1676d.drainPendingAtStart > 80 ? " · 判读=上游已到齐但pending仍大→偏pacing" : ""));
      }
      _0x27bc86.push(_0x2e46d0);
      _0x471f41 ||= setInterval(_0x1504e2, it);
    }).then(() => {
      if (_0x19f36f) {
        _0x19f36f.mark("pacing_drained", "pending_start=" + _0x3ad2b1 + " drain_cps=" + ci);
      }
    });
  };
  let _0x526333 = _0x31c76d => {
    _0x120453 = _0x120453.then(_0x31c76d, _0x31c76d).catch(() => {});
    return _0x120453;
  };
  let _0x1504e2 = () => {
    if (!_0x15f1bc) {
      _0x548244();
      _0x5f16a0();
      return;
    }
    let _0x1d182f = _0x3a74d2();
    if (_0x1d182f > 0) {
      let _0x39ca9f = _0x15f1bc.slice(0, _0x1d182f);
      _0x15f1bc = _0x15f1bc.slice(_0x39ca9f.length);
      _0x5a7c22(_0x39ca9f);
      if (_0xa1676d) {
        _0x2aa405(false);
      }
    }
    if (!_0x15f1bc) {
      _0x548244();
      _0x5f16a0();
    }
  };
  let _0x3a82b8 = (_0x4cf851, _0x24b3e8) => {
    if (_0x4cf851) {
      if (typeof _0x24b3e8 == "number") {
        _0x3caa9b = _0x24b3e8;
      }
      _0x15f1bc += _0x4cf851;
      if (_0xa1676d) {
        let _0x4bd963 = Date.now();
        if (!_0xa1676d.firstEnqAt) {
          _0xa1676d.firstEnqAt = _0x4bd963;
          _0xa1676d.lastSumAt = _0x4bd963;
        }
        _0xa1676d.lastEnqAt = _0x4bd963;
        _0xa1676d.enqueued += _0x4cf851.length;
        _0xa1676d.enqueueN += 1;
        _0x5631a7();
        let _0x52d632 = _0x4bd963 - _0xa1676d.firstEnqAt;
        if (_0xa1676d.enqueueN === 1 || _0xa1676d.enqueueN % Rl === 0 || _0x4cf851.length >= 80) {
          let _0x636fa2 = _0x59e0d0(_0x15f1bc.length);
          _0x526b1a("入队 · n=" + _0xa1676d.enqueueN + " chars=" + _0x4cf851.length + " · 累计入队=" + _0xa1676d.enqueued + " · pending=" + _0x15f1bc.length + " · 距首包=" + _0x52d632 + "ms · level=" + _0x636fa2 + " cps≈" + (ai * _0x636fa2).toFixed(1));
        }
        _0x2aa405(false);
      }
      if (it <= 0) {
        _0x30a973();
        return;
      }
      if (!_0x59ceb9) {
        let _0x27eb84 = Math.min(_0x15f1bc.length, Math.max(4, _0x3a74d2()));
        let _0x43d7a8 = _0x15f1bc.slice(0, _0x27eb84);
        _0x15f1bc = _0x15f1bc.slice(_0x43d7a8.length);
        _0x5a7c22(_0x43d7a8);
      }
      if (_0x15f1bc && !_0x471f41) {
        _0x471f41 = setInterval(_0x1504e2, it);
      }
    }
  };
  let _0x33e594 = (_0xa1fc76, _0x111a01) => {
    let _0x1ee70f = _0x1dbfd5.push(_0xa1fc76);
    if (_0x1ee70f) {
      _0x3a82b8(_0x1ee70f, _0x111a01);
    }
  };
  let _0x3ab604 = () => {
    let _0x16dc03 = _0x1dbfd5.flush();
    if (_0x16dc03) {
      _0x3a82b8(_0x16dc03, _0x3caa9b);
    }
  };
  let _0x534ff1 = () => {
    _0x3ab604();
    _0x30a973();
  };
  let _0x3106ad = _0x530f6f => {
    _0x3ab604();
    if (it <= 0) {
      _0x30a973();
      if (_0x19f36f) {
        _0x19f36f.mark("pacing_drained", "pacing=off");
      }
      _0x1136bc(_0x530f6f);
      return;
    }
    _0x526333(async () => {
      if (!_0x519b2f && !_0x2e7aa9 && !_0x35d967.writableEnded) {
        await _0x63b1f6();
        if (!_0x519b2f && !_0x2e7aa9 && !_0x35d967.writableEnded) {
          _0x1136bc(_0x530f6f);
        }
      }
    });
  };
  let _0x2476ac = _0xe7be2d => _0x519b2f || _0x5e9813 || _0x35d967.writableEnded || _0x2e7aa9 ? false : (_0x5e9813 = true, _0x3ab604(), it <= 0 ? (_0x519b2f = true, _0x30a973(), _0x19f36f && _0x19f36f.mark("pacing_drained", "pacing=off"), _0x182a66(), _0x1136bc(ct(), false), _0x35d967.end(), _0x19f36f && _0x19f36f.summary("finalized"), true) : (_0x526333(async () => {
    if (!_0x519b2f && !_0x2e7aa9 && !_0x35d967.writableEnded) {
      await _0x63b1f6();
      if (!_0x519b2f && !_0x2e7aa9 && !_0x35d967.writableEnded) {
        _0x519b2f = true;
        _0x182a66();
        _0x1136bc(ct(), false);
        _0x35d967.end();
        if (_0x19f36f) {
          _0x19f36f.summary("finalized");
        }
      }
    }
  }), true));
  let _0x6909c0 = (_0x1a9a4, _0x5b77b7) => {
    if (_0x2e7aa9 || _0x35d967.writableEnded || _0x519b2f || _0x5e9813) {
      return false;
    }
    _0x5e9813 = true;
    _0x3ab604();
    _0x30a973();
    let _0x1fcc1d = _o(_0x1a9a4);
    for (let _0x55370c of Pt(_0x387de5, _0x1fcc1d)) {
      _0x1136bc(Ce(_0x55370c));
    }
    ce(_0x5b77b7 || _0x1fcc1d);
    Ut("error", _0x1fcc1d);
    Et("error", []);
    _0x519b2f = true;
    _0x182a66();
    _0x1136bc(ct(), false);
    _0x35d967.end();
    if (_0x19f36f) {
      _0x19f36f.summary("finalized");
    }
    _0x120453 = Promise.resolve();
    return true;
  };
  let _0x9965b1 = _0x3e6b90 => {
    if (!_0x5c099a) {
      let _0x1c136e = hi(null, {
        model: _0x346c16.model
      });
      return _0x6909c0(_0x1c136e);
    }
    return _0x2476ac(_0x3e6b90);
  };
  _0x35d967.on("close", () => {
    if (_0x35d967.writableEnded || _0x2e7aa9) {
      return;
    }
    _0x2e7aa9 = true;
    _0x519b2f = true;
    _0x5e9813 = true;
    _0x15f1bc = "";
    _0x182a66();
    _0x5f16a0();
    _0x120453 = Promise.resolve();
    let _0x4aa3a8 = _0x2e2a29();
    if (_0x4aa3a8 && !_0x4aa3a8.destroyed) {
      E(y.DETAIL, "客户端断开，停止 " + _0x3c4251 + " 上游流");
      if (_0x19f36f) {
        _0x19f36f.summary("client_disconnected");
      }
      _0x4aa3a8.destroy();
    }
  });
  return {
    safeWrite: _0x1136bc,
    enqueueText: _0x33e594,
    flushPendingText: _0x534ff1,
    flushPendingTextForControlFrame: _0xc3b45b,
    scheduleStopFrame: _0x3106ad,
    markMeaningful: _0x216619,
    finalize: _0x2476ac,
    finalizeSuccess: _0x9965b1,
    fail: _0x6909c0,
    startHeartbeat: _0x213d9d,
    wasClosedByClient: () => _0x2e7aa9,
    wasFinalized: () => _0x519b2f || _0x5e9813,
    hasMeaningfulContent: () => _0x5c099a,
    configuredModel: _0x346c16.model ? String(_0x346c16.model).trim() : "",
    injectDeclaredModelHint: !!_0x346c16.injectDeclaredModelHint,
    userAskedAboutModel: !!_0x346c16.userAskedAboutModel,
    _declaredModelLineInjected: false
  };
}
function Si(_0x54ed72, _0x3103ae, _0xc0c0da, _0x2155e5, _0x52bb99) {
  _0x54ed72.on("socket", _0x4e1012 => {
    let _0x431aa5 = () => {
      try {
        _0x4e1012.setTimeout(0);
      } catch {}
      _0x4e1012.removeListener("timeout", _0x530885);
    };
    let _0x530885 = () => {
      if (_0x3103ae.wasClosedByClient()) {
        return;
      }
      _0x431aa5();
      _0x4e1012.destroy();
      let _0x40e4a1 = _0x52bb99 ? "http" : "https";
      _0x3103ae.fail(Z("连接超时", "无法在 " + Math.round(ii / 1000) + " 秒内连接 " + _0x40e4a1 + "://" + _0xc0c0da + (_0x2155e5 ? ":" + _0x2155e5 : "") + "，请检查 Base URL 协议（http/https）与端口"));
      _0x54ed72.destroy();
    };
    if (!_0x4e1012.connecting) {
      _0x431aa5();
      return;
    }
    _0x4e1012.setTimeout(ii);
    _0x4e1012.once(_0x52bb99 ? "connect" : "secureConnect", _0x431aa5);
    _0x4e1012.on("timeout", _0x530885);
  });
}
function yi(_0xa59734) {
  try {
    _0xa59734.socket?.setTimeout(0);
  } catch {}
}
function Ei(_0x582809, _0x1cd5eb, _0x899c8f, _0x152cf9) {
  return setTimeout(() => {
    if (!_0x1cd5eb.wasClosedByClient()) {
      ce(_0x152cf9 + " " + _0x899c8f + "ms 内未返回响应头");
      _0x1cd5eb.fail(Z("请求超时", _0x152cf9 + " 网关 " + Math.round(_0x899c8f / 1000) + " 秒内未返回响应头，请检查 Base URL 与模型是否可用"));
      _0x582809.destroy();
    }
  }, _0x899c8f);
}
function nu(_0x3704b0, _0xdc9171) {
  // Tool definitions are valid on both user and agent turns.  Gating them on
  // initiator caused the initial user turn to lose all tools.
  return Array.isArray(_0xdc9171) && _0xdc9171.length !== 0;
}
function xi(_0x8b83ef, _0x5efe88, _0x4f4d2c) {
  if (!!_0x5efe88 && !!_0x8b83ef && _0x8b83ef.length !== 0) {
    if (_0x5efe88.type !== "tool" || _0x8b83ef.some(_0x3b44ec => _0x3b44ec?.name === _0x5efe88.name)) {
      return _0x5efe88;
    }
    E(y.TOOL, "忽略 tool_choice「" + _0x5efe88.name + "」（无对应工具定义）");
  }
}
function ou(_0x49d334, _0x6ecfc2) {
  if (_0x49d334 !== "xhigh") {
    return _0x49d334;
  }
  let _0x792b66 = String(_0x6ecfc2 || "").toLowerCase();
  if (/sonnet|haiku/.test(_0x792b66)) {
    return "high";
  }
  let _0x5f160b = _0x792b66.match(/opus[-_. ]*(\d+)[-_. ]*(\d+)?/);
  if (_0x5f160b) {
    let _0x4e3be2 = parseInt(_0x5f160b[1], 10);
    let _0x2e9276 = parseInt(_0x5f160b[2] || "0", 10);
    if (_0x4e3be2 > 4 || _0x4e3be2 === 4 && _0x2e9276 >= 7) {
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
  if (Array.isArray(_byokBody.messages) && _byokCount < 4) {
    let _byokUsersSeen = 0;
    for (let _byokIndex = _byokBody.messages.length - 1; _byokIndex >= 0; _byokIndex -= 1) {
      let _byokMessage = _byokBody.messages[_byokIndex];
      if (String(_byokMessage && _byokMessage.role || "") !== "user") continue;
      if (!_byokMessageHasAnthropicCacheableContent(_byokMessage)) continue;
      _byokUsersSeen += 1;
      if (_byokUsersSeen !== 2) continue;
      let _byokResult = _byokMarkAnthropicMessageCache(_byokMessage, _byokEffectiveCacheControl, _byokOwnedCacheControls);
      if (_byokResult === 2) {
        _byokCount += 1;
        _byokInjected.push("prior-user");
      }
      break;
    }
  }
  return _byokInjected;
}
function ru(_0x5a2654, _0x554598, {
  systemPrompt: _0x52093c,
  messages: _0x2342c6,
  tools: _0xb401ca,
  toolChoice: _0x34426e,
  resolvedModel: _0x528841,
  requestedModel: _0x4068f,
  providerName: _0x1137b8,
  messageId: _0x5da3e9,
  timing: _0x28acbf,
  monitorTargetId: _0x199151,
  providerConfig: _0x126344,
  byokIdentityLine: _0x544c7e = "",
  injectDeclaredModelHint: _0x4eb661 = false,
  userAskedAboutModel: _0x2d739a = false,
  thinking: _0x492140 = false,
  effort: _0x3f970a = "",
  contextSnapshot: _0x2bd1f2 = null,
  uiContextHint: _0x4a6a59 = null
}) {
  let _0x4aa9dd = (_0x126344 || Be()).anthropic;
  let _0x4053c6 = lo(_0x4aa9dd, {
    providerLabel: "Anthropic",
    providerName: _0x1137b8,
    model: _0x528841,
    requestedModel: _0x4068f
  });
  let _0x2b9b4b = xi(_0xb401ca, _0x34426e, "Anthropic");
  let _0x29ad85 = zo() || fi;
  let _byokCacheControl = _byokAnthropicCacheControl(_0x4aa9dd.promptCacheTtl || _0x4aa9dd.cacheTtl);
  let _byokOwnedCacheControls = new WeakMap();
  let _0x1f5913 = {
    model: _0x528841,
    system: _0x52093c || undefined,
    messages: _0x2342c6,
    stream: true,
    max_tokens: _0x29ad85
  };
  if (_0x492140) {
    let _0x8e63c7 = ["low", "medium", "high", "xhigh", "max"].includes(_0x3f970a) ? _0x3f970a : "max";
    let _0x5c2c04 = ou(_0x8e63c7, _0x528841);
    if (_0x5c2c04 !== _0x8e63c7) {
      E(y.UPSTREAM, "effort「" + _0x8e63c7 + "」不被 " + _0x528841 + " 支持，降级为「" + _0x5c2c04 + "」");
    }
    E(y.ROUTE, "思考=开启 · effort=" + _0x5c2c04 + " · adaptive");
    _0x1f5913.thinking = {
      type: "adaptive"
    };
    _0x1f5913.output_config = {
      effort: _0x5c2c04
    };
    let _0x4eecf0 = 1024;
    let _0x23f3a7 = 8192;
    let _0x39e486 = 32000;
    let _0x235b6e = _0x29ad85 - 1;
    let _0xe6a811 = Math.floor(_0x29ad85 / 2);
    _0xe6a811 = Math.min(Math.max(_0xe6a811, _0x23f3a7), _0x39e486);
    _0xe6a811 = Math.min(_0xe6a811, _0x235b6e);
    _0xe6a811 = Math.max(_0xe6a811, _0x4eecf0);
    _0x1f5913._thinkingBudgetFallback = _0xe6a811;
  } else {
    E(y.ROUTE, "思考=关闭");
  }
  if (_0xb401ca && _0xb401ca.length > 0) {
    _0x1f5913.tools = _0xb401ca;
    if (_0x2b9b4b) {
      _0x1f5913.tool_choice = _0x2b9b4b;
    }
  }
  _byokApplyAnthropicCacheBreakpoints(_0x1f5913, _byokCacheControl, _byokOwnedCacheControls);
  let _0x237eb0 = _0x1f5913._thinkingBudgetFallback;
  delete _0x1f5913._thinkingBudgetFallback;
  let _0x2f4be5 = pi({
    apiPayload: _0x1f5913,
    systemPrompt: _0x52093c,
    messageField: "messages",
    outputReserve: _0x29ad85,
    contextLimit: _0x2bd1f2?.contextLimit
  });
  if (_0x2bd1f2) {
    Fo({
      ..._0x2bd1f2,
      tokensUsed: _0x2f4be5.tokensUsed
    });
  }
  if (_0x4a6a59) {
    mt({
      tokens: _0x2f4be5.tokensUsed,
      limit: _0x2f4be5.contextLimit || _0x4a6a59.slotTokenLimit,
      inboundTokens: _0x4a6a59.inboundTokens,
      restoredMsgs: _0x4a6a59.restoredMsgs,
      inboundMsgs: _0x4a6a59.inboundMsgs,
      reason: _0x4a6a59.reason,
      cascadeId: _0x4a6a59.cascadeId,
      sessionKey: _0x4a6a59.sessionKey
    });
  }
  let _0x927799 = Array.isArray(_0x2342c6) ? _0x2342c6 : [];
  _0x1f5913.messages = _0x927799;
  let _0x124724 = JSON.stringify(_0x1f5913);
  if (!_0x554598.headersSent) {
    _0x554598.writeHead(200, At());
  }
  let _0xc2003e = !!_0xb401ca && !!(_0xb401ca.length > 0);
  let _0x58219c;
  let _0x3eecf8 = Ti(_0x554598, () => _0x58219c, "Anthropic", _0x5da3e9, _0x28acbf, {
    host: _0x4aa9dd.host,
    model: _0x528841,
    providerName: _0x1137b8,
    injectDeclaredModelHint: _0x4eb661,
    userAskedAboutModel: _0x2d739a
  });
  let _0x529fbf = _0x4aa9dd.useHttp ? _0x4712c4 : _0x412940;
  let _0x375a2c = _0x4aa9dd.parsed.port !== 443 ? _0x4aa9dd.parsed.port : _0x4aa9dd.useHttp ? 80 : 443;
  E(y.UPSTREAM, "Anthropic " + _0x4aa9dd.host + _0x4aa9dd.apiPath + " · " + _0x528841 + " · key=" + (_0x4aa9dd.apiKey ? "set" : "empty"));
  if (_0x28acbf) {
    let _0x296b70 = _0xb401ca?.length || 0;
    _0x28acbf.mark("upstream_request_start", "bytes=" + Buffer.byteLength(_0x124724) + " · tools=" + _0x296b70 + " · msgs=" + _0x927799.length);
  }
  let _0x3dd0c7 = 0;
  let _0x2b3f62 = 0;
  let _0x236495 = gs();
  let _0x4358b4 = _0x56acf2 => {
    _0x927799 = _0x56acf2;
    _0x1f5913.messages = _0x927799;
    _byokApplyAnthropicCacheBreakpoints(_0x1f5913, _byokCacheControl, _byokOwnedCacheControls);
    _0x124724 = JSON.stringify(_0x1f5913);
  };
  let _0x221bca = (_0x4a2cbb, _0x292c6e) => {
    E(y.UPSTREAM, ys(_0x4a2cbb, _0x292c6e));
  };
  let _0x39959c = (_0x4195f9, _0x416828) => {
    let _0x9fa12a = Ts({
      enabled: _0x236495.enabled,
      maxChars: _0x236495.maxChars,
      maxContinues: _0x236495.maxContinues,
      continuesUsed: _0x2b3f62,
      stopReason: _0x4195f9.stopReason,
      hasToolUse: _0x4195f9.hasEmittedToolCall,
      visibleTextChars: _0x4195f9.visibleTextChars,
      hasError: _0x4195f9.hasErrorEvent()
    });
    if (_0x9fa12a.action !== "continue") {
      if (_0x9fa12a.phase) {
        _0x221bca(_0x9fa12a.phase, _0x9fa12a.detail);
      }
      return {
        continue: false,
        chunks: _0x416828
      };
    } else if (_0x3eecf8.wasClosedByClient() || _0x3eecf8.wasFinalized()) {
      _0x221bca("放弃", _0x9fa12a.detail + " reason=客户端已断开");
      return {
        continue: false,
        chunks: _0x416828
      };
    } else {
      return {
        continue: true,
        chunks: Es(_0x416828).chunks,
        decision: _0x9fa12a
      };
    }
  };
  let _0x34438e = _0x3f7f6b => {
    _0x2b3f62 += 1;
    let _0x2198da = xs(_0x927799, _0x3f7f6b.visibleText || "");
    _0x4358b4(_0x2198da);
    _0x221bca("触发", "chars=" + _0x3f7f6b.visibleTextChars + " tool=0 continued=" + _0x2b3f62 + "/" + _0x236495.maxContinues + " stop=" + (_0x3f7f6b.stopReason || "null") + " msgs=" + _0x2198da.length);
    setImmediate(() => {
      if (_0x3eecf8.wasClosedByClient() || _0x3eecf8.wasFinalized()) {
        _0x221bca("放弃", "chars=" + _0x3f7f6b.visibleTextChars + " tool=0 continued=" + _0x2b3f62 + " reason=客户端已断开");
        return;
      }
      _0x24e204();
    });
  };
  let _0x1bd279 = (_0xd22785, _0x1a3b54) => {
    if (_0x2b3f62 > 0) {
      let _0x8f7e3d = Ss({
        continuesUsed: _0x2b3f62,
        stopReason: _0x1a3b54 || _0xd22785.stopReason,
        hasToolUse: _0xd22785.hasEmittedToolCall,
        visibleTextChars: _0xd22785.visibleTextChars,
        maxChars: _0x236495.maxChars,
        hasError: _0xd22785.hasErrorEvent(),
        aborted: _0x3eecf8.wasClosedByClient()
      });
      if (_0x8f7e3d) {
        _0x221bca(_0x8f7e3d, "chars=" + _0xd22785.visibleTextChars + " tool=" + (_0xd22785.hasEmittedToolCall ? 1 : 0) + " continued=" + _0x2b3f62 + "/" + _0x236495.maxContinues + " stop=" + (_0x1a3b54 || _0xd22785.stopReason || "null"));
      }
    }
    qo(_0x3eecf8, _0xd22785, "Anthropic", null, {
      model: _0x528841,
      stopReason: _0x1a3b54 || _0xd22785.stopReason
    });
  };
  if (_0x544c7e) {
    _0x3eecf8.enqueueText(_0x544c7e + "\n\n", 1);
    _0x3eecf8.flushPendingText();
  }
  _0x3eecf8.startHeartbeat();
  let _0x2faea7 = (_0x15cdc8, _0x36455a) => {
    if (_0x3eecf8.wasClosedByClient() || _0x3eecf8.wasFinalized() || _0x3eecf8.hasMeaningfulContent() || _0x3dd0c7 >= Re) {
      return false;
    }
    if (Pe(_0x15cdc8, _0x36455a)) {
      E(y.QUOTA, "Anthropic " + et + "，跳过重试", {
        err: true
      });
      return false;
    }
    if (!uo(_0x15cdc8, _0x36455a)) {
      return false;
    }
    let _0xf39b5b = kn(_0x3dd0c7);
    E(y.UPSTREAM, "Anthropic 限流第 " + _0x3dd0c7 + "/" + Re + " 次，" + _0xf39b5b + "ms 后自动重试");
    setTimeout(() => {
      if (!_0x3eecf8.wasClosedByClient() && !_0x3eecf8.wasFinalized()) {
        _0x24e204();
      }
    }, _0xf39b5b);
    return true;
  };
  let _0x24e204 = () => {
    _0x3dd0c7 += 1;
    let _0x720278 = new mn(_0x5da3e9, _0x528841, _0x199151, _0xc2003e);
    let _0x45f413;
    _0x58219c = _0x529fbf.request({
      hostname: _0x4aa9dd.parsed.hostname,
      port: _0x375a2c,
      path: _0x4aa9dd.apiPath,
      method: "POST",
      agent: _0x4aa9dd.useHttp ? undefined : _0x3dd0c7 > 1 ? false : di,
      rejectUnauthorized: !_0x4aa9dd.useHttp && _0x4aa9dd.parsed.port === 443,
      headers: {
        "content-type": "application/json",
        accept: "text/event-stream",
        "anthropic-version": "2023-06-01",
        "x-api-key": _0x4aa9dd.apiKey,
        "content-length": Buffer.byteLength(_0x124724),
        ...An(_0x528841, Buffer.byteLength(_0x124724))
      }
    }, _0x535642 => {
      clearTimeout(_0x45f413);
      yi(_0x58219c);
      if (_0x28acbf) {
        _0x28acbf.mark("upstream_headers", "status=" + _0x535642.statusCode);
      }
      let _0x3c33f2 = "";
      if (_0x535642.statusCode !== 200) {
        ce("Anthropic HTTP " + _0x535642.statusCode);
        po(_0x535642, _0x326aa3 => {
          if (Pe(_0x326aa3, _0x535642.statusCode)) {
            E(y.QUOTA, et + " · Anthropic HTTP " + _0x535642.statusCode + " · " + Cn(_0x326aa3), {
              err: true
            });
          } else {
            ce("Body: " + Cn(_0x326aa3));
          }
          if (_0x2faea7(_0x326aa3, _0x535642.statusCode)) {
            return;
          }
          let _0x1d01fd = go("Anthropic", _0x535642.statusCode, _0x326aa3, {
            ..._0x4053c6,
            headers: _0x535642.headers || {}
          });
          _0x3eecf8.fail(_0x1d01fd);
        });
        return;
      }
      _0x535642.setEncoding("utf8");
      let _0x1d84d6 = null;
      let _0x4b55f5 = null;
      let _0xe94b85 = false;
      let _0x23f8ee = () => {
        if (_0x4b55f5) {
          clearTimeout(_0x4b55f5);
          _0x4b55f5 = null;
        }
      };
      _0x4b55f5 = setTimeout(() => {
        if (!_0xe94b85 && !_0x3eecf8.wasClosedByClient() && !_0x3eecf8.hasMeaningfulContent()) {
          ce("Anthropic 流 " + He + "ms 内无有效内容");
          _0x3eecf8.fail(Z(fn({
            host: _0x4aa9dd.host,
            model: _0x528841,
            providerName: _0x1137b8,
            timeoutSec: Math.round(He / 1000)
          })));
          _0x535642.destroy();
        }
      }, He);
      let _0x2c07ba = () => {
        if (_0x1d84d6) {
          clearTimeout(_0x1d84d6);
          _0x1d84d6 = null;
        }
      };
      let _0x418da1 = () => {
        _0x2c07ba();
        _0x1d84d6 = setTimeout(() => {
          if (!_0xe94b85 && !_0x3eecf8.wasClosedByClient()) {
            ce("Anthropic 流 " + Ko + "ms 无新数据");
            _0x3eecf8.fail(Z("上游流式超时", fo({
              providerLabel: "Anthropic 网关",
              host: _0x4aa9dd.host,
              providerName: _0x1137b8,
              timeoutSec: Math.round(Ko / 1000)
            })));
            _0x535642.destroy();
          }
        }, Ko);
      };
      let _0x372198 = false;
      function _0x5bacc6(_0x81ad05) {
        let _0x265554 = fs(_0x81ad05 + "\n\n");
        for (let _0x2ed77f of _0x265554) {
          let _0x4f1ba2 = _0x720278.processEvent(_0x2ed77f);
          if (_0x720278.isDone) {
            let _0x195256 = _0x39959c(_0x720278, _0x4f1ba2);
            _0x4f1ba2 = _0x195256.chunks;
            Yt(_0x3eecf8, _0x720278, _0x4f1ba2);
            if (_0x195256.continue) {
              _0x372198 = true;
              _0xe94b85 = true;
              _0x2c07ba();
              _0x23f8ee();
              _0x34438e(_0x720278);
              return;
            }
          } else {
            Yt(_0x3eecf8, _0x720278, _0x4f1ba2);
          }
        }
        if (_0x720278.hasMeaningfulOutput) {
          _0x23f8ee();
        }
        if (_0x720278.isDone && !_0x372198) {
          _0xe94b85 = true;
          _0x2c07ba();
          _0x23f8ee();
          _0x1bd279(_0x720278, _0x720278.stopReason);
        }
      }
      _0x418da1();
      _0x535642.on("data", _0x3be05f => {
        if (_0x28acbf) {
          _0x28acbf.mark("first_upstream_chunk", "bytes=" + Buffer.byteLength(_0x3be05f));
        }
        _0x418da1();
        _0x3c33f2 += _0x3be05f;
        let _0x46730e = _0x3c33f2.split("\n\n");
        _0x3c33f2 = _0x46730e.pop();
        for (let _0x2070ac of _0x46730e) {
          _0x5bacc6(_0x2070ac);
          if (_0x372198) {
            return;
          }
        }
      });
      _0x535642.on("end", () => {
        _0xe94b85 = true;
        _0x2c07ba();
        _0x23f8ee();
        if (!_0x372198 && (_0x3c33f2.trim() && _0x5bacc6(_0x3c33f2), !_0x372198 && (!!_0x720278.isDone || !_0x720278.hasErrorEvent() || !_0x2faea7(_0x720278.getStreamErrorHint())))) {
          if (!_0x720278.isDone && !_0x554598.writableEnded) {
            if (_0x720278.hasMeaningfulOutput && !_0x720278.stopReason) {
              E(y.UPSTREAM, "Anthropic 流被上游提前关闭（疑似截断），追加不完整提示");
              _0x3eecf8.flushPendingText();
              _0x3eecf8.safeWrite(Ce(Ze(_0x5da3e9, STREAM_TRUNCATED_NOTICE, 0)));
              _0x720278.markIncomplete();
            } else {
              E(y.DETAIL, "Anthropic 流未收到 message_stop，强制结束");
            }
            let _0x3a6f9e = _0x720278.processEvent({
              event: "message_stop",
              data: {}
            });
            let _0x4e38b0 = _0x39959c(_0x720278, _0x3a6f9e);
            _0x3a6f9e = _0x4e38b0.chunks;
            Yt(_0x3eecf8, _0x720278, _0x3a6f9e);
            if (_0x4e38b0.continue) {
              _0x34438e(_0x720278);
              return;
            }
          }
          _0x1bd279(_0x720278, _0x720278.stopReason || "end");
        }
      });
      _0x535642.on("aborted", () => {
        _0xe94b85 = true;
        _0x2c07ba();
        _0x23f8ee();
        if (!_0x3eecf8.wasClosedByClient()) {
          ce("Anthropic 流被中止");
          _0x3eecf8.fail(Z("上游流中断", "Anthropic 连接被意外终止"));
        }
      });
      _0x535642.on("error", _0x3c2eb4 => {
        _0xe94b85 = true;
        _0x2c07ba();
        _0x23f8ee();
        if (!_0x3eecf8.wasClosedByClient()) {
          ce("Anthropic 流错误: " + _0x3c2eb4.message);
          _0x3eecf8.fail(Z("上游流错误", _0x3c2eb4.message));
        }
      });
    });
    _0x45f413 = Ei(_0x58219c, _0x3eecf8, Al, "Anthropic");
    _0x58219c.on("error", _0x389143 => {
      clearTimeout(_0x45f413);
      if (_0x3eecf8.wasClosedByClient() && (_0x389143.code === "ECONNRESET" || _0x389143.code === "ECONNABORTED") || _0x3eecf8.wasFinalized()) {
        return;
      }
      if (_0x389143.code === "ECONNRESET" && !_0x3eecf8.hasMeaningfulContent() && _0x3dd0c7 < Re) {
        let _0xb75998 = kn(_0x3dd0c7);
        E(y.UPSTREAM, "Anthropic ECONNRESET 第 " + _0x3dd0c7 + "/" + Re + " 次，" + _0xb75998 + "ms 后自动重连");
        setTimeout(() => {
          if (!_0x3eecf8.wasClosedByClient() && !_0x3eecf8.wasFinalized()) {
            _0x24e204();
          }
        }, _0xb75998);
        return;
      }
      let _0x4bd2d3 = _i(_0x389143, _0x4aa9dd.host, _0x4aa9dd.parsed.port);
      ce("Anthropic 请求失败（第 " + _0x3dd0c7 + "/" + Re + " 次）: " + _0x4bd2d3);
      _0x3eecf8.fail(Z("连接失败", _0x4bd2d3));
    });
    Si(_0x58219c, _0x3eecf8, _0x4aa9dd.parsed.hostname, _0x375a2c, _0x4aa9dd.useHttp);
    _0x58219c.end(_0x124724);
    if (_0x28acbf) {
      _0x28acbf.mark("upstream_request_sent");
    }
  };
  _0x24e204();
}
function su(_0x2a5c98, _0x4c931c, {
  systemPrompt: _0x3b3fce,
  messages: _0xe8b53f,
  tools: _0x31c667,
  toolChoice: _0x14bd0f,
  resolvedModel: _0x5582bf,
  requestedModel: _0xca3d94,
  providerName: _0x43dc9f,
  serviceTier: _0xdb8a,
  messageId: _0x133106,
  initiator: _0x1830d2,
  timing: _0x2ed973,
  monitorTargetId: _0x86b8f7,
  providerConfig: _0xb4a3d7,
  byokIdentityLine: _0x10332a = "",
  injectDeclaredModelHint: _0xcd1bb8 = false,
  userAskedAboutModel: _0x552fa5 = false,
  contextSnapshot: _0x363177 = null,
  uiContextHint: _0x1ca167 = null
}) {
  let _0x5f1204 = (_0xb4a3d7 || Be()).openai;
  let _0x52c825 = lo(_0x5f1204, {
    providerLabel: "OpenAI",
    providerName: _0x43dc9f,
    model: _0x5582bf,
    requestedModel: _0xca3d94
  });
  let _0x1cb04e = mi(_0x5f1204.apiPath);
  let _0xce9d48 = _0x1cb04e ? au(_0x3b3fce, _0xe8b53f) : iu(_0x3b3fce, _0xe8b53f);
  let _0x103697 = nu(_0x1830d2, _0x31c667);
  let _0x5c472d = _0x103697 ? xi(_0x31c667, _0x14bd0f, "OpenAI") : undefined;
  let _0x5160a0 = _0x1cb04e ? {
    model: _0x5582bf,
    messages: _0xce9d48,
    stream: true
  } : {
    model: _0x5582bf,
    input: _0xce9d48,
    stream: true
  };
  let _0x56f734 = zo();
  if (_0x56f734 > 0) {
    if (_0x1cb04e) {
      _0x5160a0.max_tokens = _0x56f734;
    } else {
      _0x5160a0.max_output_tokens = _0x56f734;
    }
  }
  if (!_0x1cb04e && Ml) {
    _0x5160a0.reasoning = {
      effort: Cl,
      summary: kl
    };
  }
  if (_0xdb8a) {
    _0x5160a0.service_tier = _0xdb8a;
  }
  if (_0x103697) {
    _0x5160a0.tools = _0x31c667.map(_0x10bb75 => ({
      type: "function",
      ...(_0x1cb04e ? {
        function: {
          name: _0x10bb75.name,
          description: _0x10bb75.description || "",
          parameters: typeof _0x10bb75.input_schema == "string" ? JSON.parse(_0x10bb75.input_schema) : _0x10bb75.input_schema
        }
      } : {
        name: _0x10bb75.name,
        description: _0x10bb75.description || "",
        parameters: typeof _0x10bb75.input_schema == "string" ? JSON.parse(_0x10bb75.input_schema) : _0x10bb75.input_schema
      })
    }));
    if (_0x5c472d) {
      if (_0x5c472d.type === "auto") {
        _0x5160a0.tool_choice = "auto";
      } else if (_0x5c472d.type === "any") {
        _0x5160a0.tool_choice = "required";
      } else if (_0x5c472d.type === "tool") {
        _0x5160a0.tool_choice = _0x1cb04e ? {
          type: "function",
          function: {
            name: _0x5c472d.name
          }
        } : {
          type: "function",
          name: _0x5c472d.name
        };
      }
    }
    E(y.TOOL, "启用 " + _0x31c667.length + " 个 · initiator=" + (_0x1830d2 || "unknown"));
  } else if (_0x31c667 && _0x31c667.length > 0) {
    E(y.TOOL, "用户轮次未启用 · 可用 " + _0x31c667.length + " 个");
  }
  let _0xb3fb8a = pi({
    apiPayload: _0x5160a0,
    systemPrompt: _0x3b3fce,
    messageField: _0x1cb04e ? "messages" : "input",
    systemInMessages: true,
    outputReserve: _0x56f734,
    contextLimit: _0x363177?.contextLimit
  });
  if (_0x363177) {
    Fo({
      ..._0x363177,
      tokensUsed: _0xb3fb8a.tokensUsed
    });
  }
  if (_0x1ca167) {
    mt({
      tokens: _0xb3fb8a.tokensUsed,
      limit: _0xb3fb8a.contextLimit || _0x1ca167.slotTokenLimit,
      inboundTokens: _0x1ca167.inboundTokens,
      restoredMsgs: _0x1ca167.restoredMsgs,
      inboundMsgs: _0x1ca167.inboundMsgs,
      reason: _0x1ca167.reason,
      cascadeId: _0x1ca167.cascadeId,
      sessionKey: _0x1ca167.sessionKey
    });
  }
  let _0x33052b = JSON.stringify(_0x5160a0);
  if (!_0x4c931c.headersSent) {
    _0x4c931c.writeHead(200, At());
  }
  let _0x46d8d1;
  let _0x789155 = Ti(_0x4c931c, () => _0x46d8d1, "OpenAI", _0x133106, _0x2ed973, {
    host: _0x5f1204.host,
    model: _0x5582bf,
    providerName: _0x43dc9f,
    injectDeclaredModelHint: _0xcd1bb8,
    userAskedAboutModel: _0x552fa5
  });
  let _0x3971f1 = false;
  let _0x1415e6 = _0x15dd8a => {
    if (!_0x3971f1) {
      _0x3971f1 = true;
      Ll("OpenAI", _0x15dd8a, _0x103697 ? _0x31c667 : []);
    }
  };
  let _0x2af45e = _0x5f1204.useHttp ? _0x4712c4 : _0x412940;
  let _0x5d9b16 = _0x5f1204.parsed.port !== 443 ? _0x5f1204.parsed.port : _0x5f1204.useHttp ? 80 : 443;
  let _0x2aee7e = _0x5f1204.apiKey ? _0x5f1204.apiKey.slice(0, 6) + "..." + _0x5f1204.apiKey.slice(-4) : "empty";
  E(y.UPSTREAM, "OpenAI " + (_0x5f1204.useHttp ? "http" : "https") + "://" + _0x5f1204.parsed.hostname + ":" + _0x5d9b16 + _0x5f1204.apiPath + " · " + _0x5582bf + " · key=" + _0x2aee7e);
  if (_0x2ed973) {
    let _0x561d63 = _0x103697 && _0x31c667 ? _0x31c667.length : 0;
    _0x2ed973.mark("upstream_request_start", "bytes=" + Buffer.byteLength(_0x33052b) + " · tools=" + _0x561d63 + " · msgs=" + _0xe8b53f.length);
  }
  let _0x32cf3c = 0;
  if (_0x10332a) {
    _0x789155.enqueueText(_0x10332a + "\n\n", 1);
    _0x789155.flushPendingText();
  }
  _0x789155.startHeartbeat();
  let _0x412cbb = (_0x93ecc, _0xabbac5) => {
    if (_0x789155.wasClosedByClient() || _0x789155.wasFinalized() || _0x789155.hasMeaningfulContent() || _0x32cf3c >= Re) {
      return false;
    }
    if (Pe(_0x93ecc, _0xabbac5)) {
      E(y.QUOTA, "OpenAI " + et + "，跳过重试", {
        err: true
      });
      return false;
    }
    if (!uo(_0x93ecc, _0xabbac5)) {
      return false;
    }
    let _0x1aa1a1 = kn(_0x32cf3c);
    E(y.UPSTREAM, "OpenAI 限流第 " + _0x32cf3c + "/" + Re + " 次，" + _0x1aa1a1 + "ms 后自动重试");
    setTimeout(() => {
      if (!_0x789155.wasClosedByClient() && !_0x789155.wasFinalized()) {
        _0x29ce81();
      }
    }, _0x1aa1a1);
    return true;
  };
  let _0x29ce81 = () => {
    _0x32cf3c += 1;
    let _0x3e4d00 = new _n(_0x133106, _0x5582bf, _0x86b8f7, _0x103697);
    if (_0x103697 && _0x31c667) {
      _0x3e4d00.setAllowedTools(_0x31c667.map(_0x38e725 => _0x38e725.name));
    }
    let _0x5edef7;
    _0x46d8d1 = _0x2af45e.request({
      hostname: _0x5f1204.parsed.hostname,
      port: _0x5d9b16,
      path: _0x5f1204.apiPath,
      method: "POST",
      agent: _0x5f1204.useHttp ? undefined : _0x32cf3c > 1 ? false : di,
      rejectUnauthorized: !_0x5f1204.useHttp && _0x5f1204.parsed.port === 443,
      headers: {
        "content-type": "application/json",
        accept: "text/event-stream",
        authorization: "Bearer " + _0x5f1204.apiKey,
        "content-length": Buffer.byteLength(_0x33052b),
        ...An(_0x5582bf, Buffer.byteLength(_0x33052b))
      }
    }, _0x204399 => {
      clearTimeout(_0x5edef7);
      yi(_0x46d8d1);
      if (_0x2ed973) {
        _0x2ed973.mark("upstream_headers", "status=" + _0x204399.statusCode);
      }
      let _0x3ba006 = "";
      if (_0x204399.statusCode !== 200) {
        _0x1415e6("HTTP " + _0x204399.statusCode + " before stream");
        ce("OpenAI HTTP " + _0x204399.statusCode);
        po(_0x204399, _0x5f532a => {
          if (Pe(_0x5f532a, _0x204399.statusCode)) {
            E(y.QUOTA, et + " · OpenAI HTTP " + _0x204399.statusCode + " · " + Cn(_0x5f532a), {
              err: true
            });
          } else {
            ce("Body: " + Cn(_0x5f532a));
          }
          if (_0x412cbb(_0x5f532a, _0x204399.statusCode)) {
            return;
          }
          let _0x57aabe = go("OpenAI", _0x204399.statusCode, _0x5f532a, {
            ..._0x52c825,
            headers: _0x204399.headers || {}
          });
          _0x789155.fail(_0x57aabe);
        });
        return;
      }
      let _0x3b90f0 = new _0x26edd0("utf8");
      let _0x570de7 = false;
      let _0x31906d = null;
      let _0x2b1fec = null;
      let _0x1053b9 = () => {
        if (_0x2b1fec) {
          clearTimeout(_0x2b1fec);
          _0x2b1fec = null;
        }
      };
      _0x2b1fec = setTimeout(() => {
        if (!_0x570de7 && !_0x789155.wasClosedByClient() && !_0x789155.hasMeaningfulContent()) {
          ce("OpenAI 流 " + He + "ms 内无有效内容");
          _0x1415e6("no meaningful content after " + He + "ms");
          _0x789155.fail(Z(fn({
            host: _0x5f1204.host,
            model: _0x5582bf,
            providerName: _0x43dc9f,
            timeoutSec: Math.round(He / 1000)
          })));
          _0x204399.destroy();
        }
      }, He);
      let _0x2dade2 = () => {
        if (_0x31906d) {
          clearTimeout(_0x31906d);
          _0x31906d = null;
        }
      };
      let _0x27d4aa = () => {
        _0x2dade2();
        _0x31906d = setTimeout(() => {
          if (!_0x570de7 && !_0x789155.wasClosedByClient()) {
            ce("OpenAI 流 " + In + "ms 无新数据");
            _0x1415e6("stream idle timeout " + In + "ms");
            _0x789155.fail(Z("上游流式超时", fo({
              providerLabel: "OpenAI 网关",
              host: _0x5f1204.host,
              providerName: _0x43dc9f,
              timeoutSec: Math.round(In / 1000)
            })));
            _0x204399.destroy();
          }
        }, In);
      };
      function _0x239181(_0x496653) {
        let _0x1cde73 = ps(_0x496653 + "\n");
        for (let _0x289938 of _0x1cde73) {
          let _0x388874 = _0x3e4d00.processEvent(_0x289938);
          if (_0x2ed973 && _0x3e4d00.hasReasoningOutput) {
            _0x2ed973.mark("first_reasoning_delta", "event=" + (_0x289938.type || "done"));
          }
          if (_0x2ed973 && _0x3e4d00.hasVisibleTextOutput) {
            _0x2ed973.mark("first_visible_text", "event=" + (_0x289938.type || "done"));
          }
          if (_0x2ed973 && _0x3e4d00.isDone) {
            _0x2ed973.mark("upstream_completed", "event=" + (_0x289938.type || "done"));
          }
          Yt(_0x789155, _0x3e4d00, _0x388874);
        }
        if (_0x3e4d00.hasMeaningfulOutput) {
          _0x1053b9();
        }
        if (_0x3e4d00.isDone) {
          _0x570de7 = true;
          _0x2dade2();
          _0x1053b9();
          qo(_0x789155, _0x3e4d00, "OpenAI", null, {
            model: _0x5582bf,
            stopReason: _0x3e4d00.stopReason
          });
        }
      }
      _0x27d4aa();
      _0x204399.on("data", _0x31e0f8 => {
        if (_0x2ed973) {
          _0x2ed973.mark("first_upstream_chunk", "bytes=" + Buffer.byteLength(_0x31e0f8));
        }
        _0x27d4aa();
        _0x3ba006 += _0x3b90f0.write(_0x31e0f8);
        let _0x500f30 = _0x3ba006.split("\n\n");
        _0x3ba006 = _0x500f30.pop();
        for (let _0x347e5b of _0x500f30) {
          _0x239181(_0x347e5b);
        }
      });
      _0x204399.on("end", () => {
        _0x570de7 = true;
        _0x2dade2();
        _0x1053b9();
        _0x3ba006 += _0x3b90f0.end();
        if (_0x3ba006.trim()) {
          _0x239181(_0x3ba006);
        }
        if (!!_0x3e4d00.isDone || !_0x3e4d00.hasErrorEvent() || !_0x412cbb(_0x3e4d00.getStreamErrorHint())) {
          if (_0x2ed973) {
            _0x2ed973.mark("upstream_eof", "attempt=" + _0x32cf3c);
          }
          if (!_0x3e4d00.isDone && !_0x4c931c.writableEnded) {
            if (_0x3e4d00.hasMeaningfulOutput && !_0x3e4d00.stopReason) {
              E(y.UPSTREAM, "OpenAI 流被上游提前关闭（疑似截断），追加不完整提示");
              _0x789155.flushPendingText();
              _0x789155.safeWrite(Ce(Ze(_0x133106, STREAM_TRUNCATED_NOTICE, 0)));
              _0x3e4d00.markIncomplete();
            } else if (_0x3e4d00.stopReason) {
              E(y.DETAIL, "OpenAI 流 EOF，已补结束帧 · stop=" + _0x3e4d00.stopReason);
            } else {
              E(y.DETAIL, _0x1cb04e ? "OpenAI ChatCompletions 流 EOF，未收到 [DONE]，已补结束帧" : "OpenAI Responses 流 EOF，未收到 response.completed，已补结束帧");
            }
            Yt(_0x789155, _0x3e4d00, _0x3e4d00.processEvent({
              done: true,
              type: "done",
              data: null
            }));
          }
          qo(_0x789155, _0x3e4d00, "OpenAI", null, {
            model: _0x5582bf,
            stopReason: _0x3e4d00.stopReason || "end"
          });
        }
      });
      _0x204399.on("aborted", () => {
        _0x570de7 = true;
        _0x2dade2();
        _0x1053b9();
        if (!_0x789155.wasClosedByClient()) {
          ce("OpenAI 流被中止");
          _0x1415e6("stream aborted before completion");
          _0x789155.fail(Z("上游流中断", "OpenAI 连接被意外终止"));
        }
      });
      _0x204399.on("error", _0x5d7972 => {
        _0x570de7 = true;
        _0x2dade2();
        _0x1053b9();
        if (!_0x789155.wasClosedByClient()) {
          ce("OpenAI 流错误: " + _0x5d7972.message);
          _0x1415e6("stream error: " + _0x5d7972.message);
          _0x789155.fail(Z("上游流错误", _0x5d7972.message));
        }
      });
    });
    _0x5edef7 = Ei(_0x46d8d1, _0x789155, Il, "OpenAI");
    _0x46d8d1.on("error", _0x52d5c3 => {
      clearTimeout(_0x5edef7);
      if (_0x789155.wasClosedByClient() && (_0x52d5c3.code === "ECONNRESET" || _0x52d5c3.code === "ECONNABORTED") || _0x789155.wasFinalized()) {
        return;
      }
      if (_0x52d5c3.code === "ECONNRESET" && !_0x789155.hasMeaningfulContent() && _0x32cf3c < Re) {
        let _0x195058 = kn(_0x32cf3c);
        E(y.UPSTREAM, "OpenAI ECONNRESET 第 " + _0x32cf3c + "/" + Re + " 次，" + _0x195058 + "ms 后自动重连");
        setTimeout(() => {
          if (!_0x789155.wasClosedByClient() && !_0x789155.wasFinalized()) {
            _0x29ce81();
          }
        }, _0x195058);
        return;
      }
      let _0xd25077 = _i(_0x52d5c3, _0x5f1204.host, _0x5f1204.parsed.port);
      ce("OpenAI 请求失败（第 " + _0x32cf3c + "/" + Re + " 次）: " + _0xd25077);
      _0x1415e6("request error: " + (_0x52d5c3.message || _0x52d5c3.code || "unknown"));
      _0x789155.fail(Z("连接失败", _0xd25077));
    });
    Si(_0x46d8d1, _0x789155, _0x5f1204.parsed.hostname, _0x5d9b16, _0x5f1204.useHttp);
    _0x46d8d1.end(_0x33052b);
    if (_0x2ed973) {
      _0x2ed973.mark("upstream_request_sent");
    }
  };
  _0x29ce81();
}
function iu(_0x4172a1, _0x2d3610) {
  let _0x153785 = [];
  if (_0x4172a1) {
    _0x153785.push({
      role: "developer",
      content: _0x4172a1
    });
  }
  for (let _0x2846f4 of _0x2d3610) {
    if (typeof _0x2846f4.content == "string") {
      _0x153785.push({
        role: _0x2846f4.role,
        content: _0x2846f4.content
      });
      continue;
    }
    if (!Array.isArray(_0x2846f4.content)) {
      _0x153785.push({
        role: _0x2846f4.role,
        content: String(_0x2846f4.content)
      });
      continue;
    }
    if (_0x2846f4.role === "assistant") {
      let _0x239931 = "";
      for (let _0x5dbd31 of _0x2846f4.content) {
        if (_0x5dbd31.type === "text") {
          _0x239931 += _0x5dbd31.text;
        }
      }
      if (_0x239931) {
        _0x153785.push({
          role: "assistant",
          content: _0x239931
        });
      }
      for (let _0x1cf575 of _0x2846f4.content) {
        if (_0x1cf575.type === "tool_use") {
          _0x153785.push({
            type: "function_call",
            call_id: _0x1cf575.id,
            name: _0x1cf575.name,
            arguments: typeof _0x1cf575.input == "string" ? _0x1cf575.input : JSON.stringify(_0x1cf575.input)
          });
        }
      }
    } else if (_0x2846f4.role === "user") {
      let _0x199ef3 = [];
      for (let _0x2a5f7b of _0x2846f4.content) {
        if (_0x2a5f7b.type === "text") {
          _0x199ef3.push(_0x2a5f7b.text);
        } else if (_0x2a5f7b.type === "image") {
          _0x199ef3.push({
            type: "input_image",
            image_url: "data:" + (_0x2a5f7b.source?.media_type || "image/png") + ";base64," + (_0x2a5f7b.source?.data || "")
          });
        } else if (_0x2a5f7b.type === "tool_result") {
          _0x153785.push({
            type: "function_call_output",
            call_id: _0x2a5f7b.tool_use_id,
            output: typeof _0x2a5f7b.content == "string" ? _0x2a5f7b.content : JSON.stringify(_0x2a5f7b.content)
          });
        }
      }
      if (_0x199ef3.length > 0) {
        if (_0x199ef3.some(_0x571e0a => typeof _0x571e0a != "string")) {
          _0x153785.push({
            role: "user",
            content: _0x199ef3.map(_0x2a2ca9 => typeof _0x2a2ca9 == "string" ? {
              type: "input_text",
              text: _0x2a2ca9
            } : _0x2a2ca9)
          });
        } else {
          _0x153785.push({
            role: "user",
            content: _0x199ef3.join("\n")
          });
        }
      }
    }
  }
  return _0x153785;
}
function au(_0xad4273, _0x61fe88) {
  let _0x3da30f = [];
  if (_0xad4273) {
    _0x3da30f.push({
      role: "system",
      content: _0xad4273
    });
  }
  for (let _0x5d2acb of _0x61fe88) {
    if (typeof _0x5d2acb.content == "string") {
      _0x3da30f.push({
        role: _0x5d2acb.role,
        content: _0x5d2acb.content
      });
      continue;
    }
    if (!Array.isArray(_0x5d2acb.content)) {
      _0x3da30f.push({
        role: _0x5d2acb.role,
        content: String(_0x5d2acb.content)
      });
      continue;
    }
    if (_0x5d2acb.role === "assistant") {
      let _0x4c3dcc = "";
      let _0x5a97f8 = [];
      for (let _0x1aa9ba of _0x5d2acb.content) {
        if (_0x1aa9ba.type === "text") {
          _0x4c3dcc += _0x1aa9ba.text;
        } else if (_0x1aa9ba.type === "tool_use") {
          _0x5a97f8.push({
            id: _0x1aa9ba.id,
            type: "function",
            function: {
              name: _0x1aa9ba.name,
              arguments: typeof _0x1aa9ba.input == "string" ? _0x1aa9ba.input : JSON.stringify(_0x1aa9ba.input ?? {})
            }
          });
        }
      }
      let _0x35e767 = {
        role: "assistant",
        content: _0x4c3dcc || null
      };
      if (_0x5a97f8.length > 0) {
        _0x35e767.tool_calls = _0x5a97f8;
      }
      _0x3da30f.push(_0x35e767);
      continue;
    }
    if (_0x5d2acb.role === "user") {
      let _0x19dd4b = [];
      for (let _0x13f1b0 of _0x5d2acb.content) {
        if (_0x13f1b0.type === "text") {
          _0x19dd4b.push(_0x13f1b0.text);
        } else if (_0x13f1b0.type === "image") {
          _0x19dd4b.push({
            type: "image_url",
            image_url: {
              url: "data:" + (_0x13f1b0.source?.media_type || "image/png") + ";base64," + (_0x13f1b0.source?.data || "")
            }
          });
        } else if (_0x13f1b0.type === "tool_result") {
          _0x3da30f.push({
            role: "tool",
            tool_call_id: _0x13f1b0.tool_use_id,
            content: typeof _0x13f1b0.content == "string" ? _0x13f1b0.content : JSON.stringify(_0x13f1b0.content)
          });
        }
      }
      if (_0x19dd4b.length > 0) {
        let _0x37cbff = _0x19dd4b.some(_0x58a0a3 => typeof _0x58a0a3 != "string");
        _0x3da30f.push({
          role: "user",
          content: _0x37cbff ? _0x19dd4b.map(_0x4fe3ea => typeof _0x4fe3ea == "string" ? {
            type: "text",
            text: _0x4fe3ea
          } : _0x4fe3ea) : _0x19dd4b.join("\n")
        });
      }
    }
  }
  return _0x3da30f;
}
import _0x9fa618 from "node:http";
import _0x4b95d5 from "node:https";
import _0x4325f1 from "node:crypto";
var uu = process.env.XY_DEVICE_ID || "";
var du = process.env.XY_CLIENT_VERSION || "0.0.0";
var fu = process.env.COMPLETION_MODEL || "";
function Xo() {
  return fu || xe().defaultModel || "claude-sonnet-4-20250514";
}
var pu = 256;
var Oi = 5000;
var hu = 2000;
var mu = 500;
var gu = "You are a precise code completion engine. Return only the code that should be inserted at the cursor position. Do not include explanations, Markdown, backticks, headings, comments about what you changed, or any surrounding prose. Preserve the local coding style and continue the existing code naturally.";
function Ai(_0x22e392, _0x5b6ecc = 0, _0x25c177 = 0) {
  if (_0x5b6ecc > 6 || !_0x22e392 || _0x22e392.length === 0) {
    return [];
  }
  let _0x2b0099;
  try {
    _0x2b0099 = ge(_0x22e392);
  } catch {
    return [];
  }
  let _0x126e85 = [];
  for (let _0x5c6872 of _0x2b0099) {
    if (_0x5c6872.wireType !== 2) {
      continue;
    }
    let _0x2a6a8c = _0x5c6872.value;
    if (!_0x2a6a8c || _0x2a6a8c.length === 0) {
      continue;
    }
    let _0x4a5aa8 = _0x2a6a8c.toString("utf8");
    let _0x4f4680 = (_0x4a5aa8.match(/[\x09\x0a\x0d\x20-\x7e]/g) || []).length / (_0x4a5aa8.length || 1);
    if (_0x4a5aa8.length > 5 && _0x4f4680 >= 0.8) {
      _0x126e85.push({
        text: _0x4a5aa8,
        field: _0x5c6872.field,
        parentField: _0x25c177,
        depth: _0x5b6ecc
      });
    }
    let _0x79aab9 = Ai(_0x2a6a8c, _0x5b6ecc + 1, _0x5c6872.field);
    _0x126e85.push(..._0x79aab9);
  }
  return _0x126e85;
}
function _u(_0x491be1) {
  let _0x4dbf0f = Ai(_0x491be1);
  let _0x5dbb71 = new Set();
  let _0xfbb43c = [];
  for (let _0x427127 of _0x4dbf0f) {
    if (!_0x5dbb71.has(_0x427127.text)) {
      _0x5dbb71.add(_0x427127.text);
      _0xfbb43c.push(_0x427127);
    }
  }
  _0xfbb43c.sort((_0x3e985d, _0x240ebf) => _0x240ebf.text.length - _0x3e985d.text.length);
  let _0x3f4786 = _0x3d5127 => !(_0x3d5127.length < 10) && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(_0x3d5127) && (!/^[0-9a-f]+$/i.test(_0x3d5127) || !(_0x3d5127.length < 80)) && !/^\d+$/.test(_0x3d5127);
  let _0x178c5c = _0xfbb43c.filter(_0x6295c5 => _0x3f4786(_0x6295c5.text));
  let _0x23ebfa = _0x178c5c[0]?.text ?? "";
  let _0x328214 = _0x178c5c[1]?.text ?? "";
  return {
    prefix: _0x23ebfa,
    suffix: _0x328214,
    allCandidates: _0xfbb43c,
    codeCandidates: _0x178c5c
  };
}
function Tu(_0x260c7d) {
  if (!_0x260c7d) {
    return Buffer.alloc(0);
  }
  let _0x5cafde = _0x4325f1.randomUUID();
  let _0x8d238d = Buffer.concat([le(1, _0x5cafde), le(2, _0x260c7d), $e(12, 2)]);
  let _0x3e025e = Ae(1, _0x8d238d);
  return Ae(1, _0x3e025e);
}
function Su(_0x2df96b, _0x5b292c) {
  return new Promise(_0x421e9d => {
    let _0x21584b = Be().anthropic;
    if (!_0x21584b.apiKey) {
      console.error("  [completions] No Anthropic API key set");
      _0x421e9d("");
      return;
    }
    let _0x2b70e5 = _0x2df96b.slice(-hu);
    let _0x3a523f = _0x5b292c.slice(0, mu);
    let _0x4e722d;
    if (_0x3a523f.length > 0) {
      _0x4e722d = "Complete the code at the cursor position.\n\n<code_before_cursor>\n" + _0x2b70e5 + "\n</code_before_cursor>\n\n<code_after_cursor>\n" + _0x3a523f + "\n</code_after_cursor>\n\nOutput only the text to insert between the two blocks.";
    } else {
      _0x4e722d = "Continue the following code:\n\n" + _0x2b70e5;
    }
    let _0x23145e = {
      model: Xo(),
      system: gu,
      messages: [{
        role: "user",
        content: _0x4e722d
      }],
      stream: false,
      max_tokens: pu
    };
    let _0x4d7d9b = JSON.stringify(_0x23145e);
    console.log("  [completions] API call: model=" + Xo() + " prefix=" + _0x2b70e5.length + "b suffix=" + _0x3a523f.length + "b");
    let _0x345bab = _0x21584b.useHttp ? _0x9fa618 : _0x4b95d5;
    let _0x5f0615 = _0x21584b.parsed.port !== 443 ? _0x21584b.parsed.port : _0x21584b.useHttp ? 80 : 443;
    let _0x2e3f1d = _0x345bab.request({
      hostname: _0x21584b.parsed.hostname,
      port: _0x5f0615,
      path: _0x21584b.apiPath,
      method: "POST",
      rejectUnauthorized: !_0x21584b.useHttp && _0x21584b.parsed.port === 443,
      headers: {
        "content-type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": _0x21584b.apiKey,
        "content-length": Buffer.byteLength(_0x4d7d9b),
        "x-xy-device-id": uu,
        "x-xy-client-version": du,
        "x-xy-timestamp": Date.now().toString(),
        "x-xy-nonce": _0x4325f1.randomBytes(16).toString("hex"),
        "x-xy-requested-model": Xo()
      }
    }, _0x12a73e => {
      let _0x9458ec = "";
      _0x12a73e.setEncoding("utf8");
      _0x12a73e.on("data", _0x590d17 => {
        _0x9458ec += _0x590d17;
      });
      _0x12a73e.on("end", () => {
        console.log("  [completions] API status=" + _0x12a73e.statusCode + " body=" + _0x9458ec.slice(0, 400));
        if (_0x12a73e.statusCode !== 200) {
          console.error("  [completions] API error " + _0x12a73e.statusCode + ": " + _0x9458ec.slice(0, 200));
          _0x421e9d("");
          return;
        }
        try {
          let _0x336365 = JSON.parse(_0x9458ec)?.content?.[0]?.text ?? "";
          console.log("  [completions] Completion text: " + JSON.stringify(_0x336365.slice(0, 120)));
          _0x421e9d(_0x336365.trim());
        } catch (_0x1d9af0) {
          console.error("  [completions] JSON parse error: " + _0x1d9af0.message);
          _0x421e9d("");
        }
      });
      _0x12a73e.on("error", _0x52cbe1 => {
        console.error("  [completions] API response error: " + _0x52cbe1.message);
        _0x421e9d("");
      });
    });
    _0x2e3f1d.setTimeout(Oi, () => {
      console.warn("  [completions] API timeout after " + Oi + "ms — returning empty");
      _0x2e3f1d.destroy();
      _0x421e9d("");
    });
    _0x2e3f1d.on("error", _0x5d7cdf => {
      if (!_0x5d7cdf.message.includes("socket hang up") && !_0x5d7cdf.message.includes("ECONNRESET")) {
        console.error("  [completions] API request error: " + _0x5d7cdf.message);
        _0x421e9d("");
      }
    });
    _0x2e3f1d.end(_0x4d7d9b);
  });
}
async function Ci(_0xc68d64, _0x3f4c88, _0x51c893) {
  console.log("[completions] GetCompletions (" + (_0x51c893?.length ?? 0) + "b)");
  let _0x3cd142;
  try {
    _0x3cd142 = lt(_0x51c893, _0xc68d64.headers);
  } catch (_0x2ed824) {
    console.error("  [completions] unwrapRequest failed: " + _0x2ed824.message);
    let _0x26bede = Bn(Buffer.alloc(0));
    _0x3f4c88.writeHead(200, {
      ...Dn(),
      "content-length": _0x26bede.length
    });
    _0x3f4c88.end(_0x26bede);
    return;
  }
  let _0x25097d = [];
  try {
    _0x25097d = ge(_0x3cd142);
  } catch (_0x38cce3) {
    console.error("  [completions] parseFields failed: " + _0x38cce3.message);
  }
  console.log("  [completions] Top-level fields (" + _0x25097d.length + "):");
  for (let _0x2c4a59 of _0x25097d) {
    if (_0x2c4a59.wireType === 0) {
      console.log("    field " + _0x2c4a59.field + " (varint): " + _0x2c4a59.value);
    } else if (_0x2c4a59.wireType === 1) {
      let _0x589e80 = Buffer.isBuffer(_0x2c4a59.value) ? _0x2c4a59.value.toString("hex") : String(_0x2c4a59.value);
      console.log("    field " + _0x2c4a59.field + " (fixed64): " + _0x589e80);
    } else if (_0x2c4a59.wireType === 2) {
      let _0x50c6bc = _0x2c4a59.value;
      let _0x1d10c1 = _0x50c6bc.toString("utf8");
      if ((_0x1d10c1.match(/[\x09\x0a\x0d\x20-\x7e]/g) || []).length / (_0x50c6bc.length || 1) >= 0.85) {
        console.log("    field " + _0x2c4a59.field + " (string/" + _0x50c6bc.length + "b): " + JSON.stringify(_0x1d10c1.slice(0, 120)));
      } else {
        console.log("    field " + _0x2c4a59.field + " (bytes/" + _0x50c6bc.length + "b): [binary] " + _0x50c6bc.toString("hex").slice(0, 48));
      }
    } else if (_0x2c4a59.wireType === 5) {
      let _0x10cd94 = Buffer.isBuffer(_0x2c4a59.value) ? _0x2c4a59.value.toString("hex") : String(_0x2c4a59.value);
      console.log("    field " + _0x2c4a59.field + " (fixed32): " + _0x10cd94);
    }
  }
  let {
    prefix: _0x43f845,
    suffix: _0x248637,
    allCandidates: _0x1976c6,
    codeCandidates: _0x43535c
  } = _u(_0x3cd142);
  console.log("  [completions] String candidates: " + _0x1976c6.length + " total, " + _0x43535c.length + " code-like");
  for (let _0x20be69 of _0x43535c.slice(0, 6)) {
    console.log("    [field=" + _0x20be69.field + " parent=" + _0x20be69.parentField + " depth=" + _0x20be69.depth + " len=" + _0x20be69.text.length + "]: " + JSON.stringify(_0x20be69.text.slice(0, 100)));
  }
  console.log("  [completions] prefix=" + _0x43f845.length + "b suffix=" + _0x248637.length + "b");
  if (_0x43f845.length > 0) {
    console.log("  [completions] prefix tail: " + JSON.stringify(_0x43f845.slice(-100)));
  }
  if (_0x248637.length > 0) {
    console.log("  [completions] suffix head: " + JSON.stringify(_0x248637.slice(0, 100)));
  }
  let _0xad9121 = "";
  if (_0x43f845.length > 0) {
    _0xad9121 = await Su(_0x43f845, _0x248637);
  } else {
    console.log("  [completions] No code context found — skipping API call, returning empty");
  }
  let _0x45e71f = Tu(_0xad9121);
  let _0xab20c5 = Bn(_0x45e71f);
  console.log("  [completions] Response: proto=" + _0x45e71f.length + "b gzip=" + _0xab20c5.length + "b completion=" + _0xad9121.length + "b");
  _0x3f4c88.writeHead(200, {
    ...Dn(),
    "content-length": _0xab20c5.length
  });
  _0x3f4c88.end(_0xab20c5);
}
function Ni(_0x2855ca, _0x5c6798) {
  let _0x3f9287 = process.env[_0x2855ca];
  let _0x5ab24c = parseInt(String(_0x3f9287 ?? ""), 10);
  if (Number.isInteger(_0x5ab24c) && _0x5ab24c > 0 && _0x5ab24c <= 65535) {
    return _0x5ab24c;
  } else {
    return _0x5c6798;
  }
}
var Vo = Ni("INFERENCE_PORT", 6688);
var ki = process.env.BIND_HOST || "::";
var qt = "inference.codeium.com";
ei({
  role: "publisher",
  host: "127.0.0.1",
  port: Ni("HYBRID_PORT", 6678)
});
var xu = 0;
var Ou = 1048576;
var Iu = 16777216;
var Au = 67108864;
function Cu(_0x2bdf02) {
  if (_0x2bdf02 === "GetChatMessage" || _0x2bdf02 === "GetStreamingExternalChatCompletions") {
    return Au;
  } else {
    return Iu;
  }
}
var Ri = new Set(["connection", "keep-alive", "proxy-authenticate", "proxy-authorization", "te", "trailer", "transfer-encoding", "upgrade"]);
function ve() {
  return new Date().toISOString().slice(11, 23);
}
function ku(_0x298385, _0x44663f = {}) {
  let _0x2876e8 = {
    ":status": _0x298385
  };
  for (let [_0x3c9a2f, _0xbd309a] of Object.entries(_0x44663f)) {
    let _0x4ec0d5 = _0x3c9a2f.toLowerCase();
    if (!Ri.has(_0x4ec0d5) && !_0x4ec0d5.startsWith(":")) {
      _0x2876e8[_0x4ec0d5] = _0xbd309a;
    }
  }
  return _0x2876e8;
}
function Nn(_0x5c1a5a, _0x509b0a, _0x1df875) {
  if (_0x5c1a5a.destroyed) {
    return;
  }
  let _0x4268c7 = JSON.stringify(_0x1df875, null, 2);
  try {
    _0x5c1a5a.respond({
      ":status": _0x509b0a,
      "content-type": "application/json",
      "content-length": Buffer.byteLength(_0x4268c7)
    });
    _0x5c1a5a.end(_0x4268c7);
  } catch {}
}
function Mu(_0x4b6979, _0x114276, _0x3cc5a2 = 0) {
  let _0x3ac5e1 = _0x114276[":method"] || "GET";
  lr(_0x3cc5a2, _0x3ac5e1, ve);
  let _0x231c56 = (_0x41a1a1, _0x2ef716) => {
    Qt(_0x3cc5a2, _0x3ac5e1, _0x41a1a1, ve);
    Nn(_0x4b6979, _0x41a1a1, _0x2ef716);
  };
  if (_0x3ac5e1 === "GET") {
    let _0x1800a2 = Be();
    Nn(_0x4b6979, 200, {
      ...xe(),
      providers: {
        anthropic: {
          host: _0x1800a2.anthropic.host,
          hasKey: !!_0x1800a2.anthropic.apiKey
        },
        openai: {
          host: _0x1800a2.openai.host,
          hasKey: !!_0x1800a2.openai.apiKey
        }
      },
      contextSnapshotSchemaVersion: 2
    });
    return;
  }
  if (_0x3ac5e1 !== "POST") {
    _0x231c56(405, {
      error: "Method not allowed"
    });
    return;
  }
  let _0x11db2e = [];
  let _0x4bc3f5 = 0;
  let _0x13fa43 = false;
  let _0x932884 = Ou;
  _0x4b6979.on("data", _0x29dc02 => {
    if (!_0x13fa43) {
      _0x4bc3f5 += _0x29dc02.length;
      if (_0x4bc3f5 > _0x932884) {
        _0x13fa43 = true;
        _0x231c56(413, {
          error: "Body too large (max " + _0x932884 + " bytes)"
        });
        _0x4b6979.close();
        return;
      }
      _0x11db2e.push(_0x29dc02);
    }
  });
  _0x4b6979.on("end", () => {
    if (!_0x13fa43) {
      try {
        let _0x59399f = JSON.parse(Buffer.concat(_0x11db2e).toString("utf8") || "{}");
        let _0x24602e = Xs(_0x59399f);
        console.log("[" + ve() + "] inference config updated: " + Hn(_0x24602e));
        Nn(_0x4b6979, 200, {
          ..._0x24602e,
          contextSnapshotSchemaVersion: 2
        });
      } catch (_0x12150e) {
        _0x231c56(400, {
          error: "Invalid JSON: " + _0x12150e.message
        });
      }
    }
  });
  _0x4b6979.on("error", _0x1b9296 => {
    if (_0x1b9296.code !== "ERR_HTTP2_STREAM_ERROR") {
      Qt(_0x3cc5a2, _0x3ac5e1, _0x1b9296.message, ve);
      console.error("[" + ve() + "] config stream error: " + _0x1b9296.message);
    }
  });
}
function Mi(_0x5444ec, _0x80c7c2, _0x205a6c, _0x21dbc8, _0x2f22f8) {
  let _0x156843 = {};
  for (let [_0x5bd5d2, _0x3eaaec] of Object.entries(_0x205a6c)) {
    if (!_0x5bd5d2.startsWith(":") && _0x5bd5d2 !== "host") {
      _0x156843[_0x5bd5d2] = _0x3eaaec;
    }
  }
  _0x156843.host = qt;
  _0x156843["content-length"] = _0x5444ec.length;
  let _0x2d9001 = false;
  let _0xcf550c = _0x3e1fad.request({
    hostname: qt,
    port: 443,
    path: _0x21dbc8,
    method: "POST",
    headers: _0x156843
  }, _0x5abcfc => {
    let _0x336921 = {
      ":status": _0x5abcfc.statusCode
    };
    for (let [_0x590f5d, _0x15e783] of Object.entries(_0x5abcfc.headers)) {
      let _0x48bbca = _0x590f5d.toLowerCase();
      if (!Ri.has(_0x48bbca) && !_0x48bbca.startsWith(":")) {
        _0x336921[_0x48bbca] = _0x15e783;
      }
    }
    if (!_0x80c7c2.destroyed) {
      try {
        _0x80c7c2.respond(_0x336921);
        _0x2d9001 = true;
      } catch {}
    }
    _0x5abcfc.on("data", _0x3925c1 => {
      if (!_0x80c7c2.destroyed) {
        _0x80c7c2.write(_0x3925c1);
      }
    });
    _0x5abcfc.on("end", () => {
      if (!_0x80c7c2.destroyed) {
        _0x80c7c2.end();
      }
      console.log("  [#" + _0x2f22f8 + "] ✓ forwarded");
    });
    _0x5abcfc.on("error", _0x167f3a => {
      console.error("  [#" + _0x2f22f8 + "] ❌ fwd error: " + _0x167f3a.message);
      if (!_0x80c7c2.destroyed) {
        _0x80c7c2.end();
      }
    });
  });
  _0xcf550c.on("error", _0x2ffde9 => {
    console.error("  [#" + _0x2f22f8 + "] ❌ upstream error: " + _0x2ffde9.message);
    if (!_0x80c7c2.destroyed) {
      if (!_0x2d9001) {
        try {
          _0x80c7c2.respond({
            ":status": 502
          });
        } catch {}
      }
      _0x80c7c2.end();
    }
  });
  _0xcf550c.end(_0x5444ec);
}
function Jo(_0x214061, _0x2a4667) {
  let _0x4de715 = {
    headers: {
      ..._0x2a4667
    },
    url: _0x2a4667[":path"] || "/",
    method: _0x2a4667[":method"] || "POST"
  };
  let _0x3ad1b7 = false;
  return {
    fakeReq: _0x4de715,
    fakeRes: {
      headersSent: false,
      writableEnded: false,
      writeHead(_0xf0450b, _0x5397ac = {}) {
        if (_0x3ad1b7) {
          return;
        }
        _0x3ad1b7 = true;
        this.headersSent = true;
        let _0x4b3459 = ku(_0xf0450b, _0x5397ac);
        try {
          _0x214061.respond(_0x4b3459);
        } catch {}
      },
      write(_0x239e67) {
        if (!_0x3ad1b7) {
          this.writeHead(200);
        }
        if (!_0x214061.destroyed) {
          try {
            _0x214061.write(_0x239e67);
          } catch {}
        }
      },
      end(_0x261d96) {
        if (!_0x3ad1b7) {
          this.writeHead(200);
        }
        this.writableEnded = true;
        if (!_0x214061.destroyed) {
          try {
            _0x214061.end(_0x261d96);
          } catch {}
        }
      },
      on(_0x15d413, _0x237c51) {
        if (_0x15d413 === "close") {
          _0x214061.on("close", _0x237c51);
        }
      }
    }
  };
}
function bi(_0x111c08, _0x130ab4, _0x5f2367, _0x329a1c) {
  let {
    fakeReq: _0x414690,
    fakeRes: _0x2bfc75
  } = Jo(_0x130ab4, _0x5f2367);
  try {
    if (_0x329a1c === "completions") {
      Ci(_0x414690, _0x2bfc75, _0x111c08);
    } else {
      gi(_0x414690, _0x2bfc75, _0x111c08);
    }
  } catch (_0x5b523d) {
    console.error("  ❌ Handler error: " + _0x5b523d.message);
    qe(_0x2bfc75, Z("处理失败", _0x5b523d.message));
  }
}
var Rn = _0x5d4ade.createServer();
var bn = null;
function vi() {
  return bn || (bn = (async () => {
    await si({
      graceMs: 250
    });
    try {
      Rn.close();
    } catch {}
  })(), bn);
}
Rn.on("stream", (_0x2a4d10, _0x42bf7e) => {
  let _0x36a8a0 = ++xu;
  let _0x1ed317 = _0x42bf7e[":method"] || "GET";
  let _0x191cf3 = _0x42bf7e[":path"] || "/";
  let _0x2ba3b = _0x42bf7e["content-type"] || "";
  let _0x3ffe73 = _0x191cf3.split("/").pop();
  if (_0x191cf3 === "/api/shutdown" && _0x1ed317 === "POST") {
    console.log("[" + ve() + "] #" + _0x36a8a0 + " /api/shutdown — exiting");
    vi().catch(_0x20fa79 => {
      console.error("[context-snapshot] shutdown failed: " + (_0x20fa79?.message || _0x20fa79));
    }).finally(() => {
      try {
        _0x2a4d10.respond({
          ":status": 200
        });
        _0x2a4d10.end();
      } catch {}
      setTimeout(() => process.exit(0), 100);
    });
    return;
  }
  if (_0x191cf3 === "/api/config") {
    Mu(_0x2a4d10, _0x42bf7e, _0x36a8a0);
    return;
  }
  if (_0x1ed317 !== "POST" || !_0x2ba3b.includes("connect+proto")) {
    _0x2a4d10.respond({
      ":status": 404
    });
    _0x2a4d10.end();
    return;
  }
  let _0x1b5096 = [];
  let _0x1f8f4d = Cu(_0x3ffe73);
  let _0x5346ba = 0;
  let _0x586463 = false;
  _0x2a4d10.on("data", _0x523a7f => {
    if (!_0x586463) {
      _0x5346ba += _0x523a7f.length;
      if (_0x5346ba > _0x1f8f4d) {
        _0x586463 = true;
        _0x1b5096.length = 0;
        console.warn("[" + ve() + "] #" + _0x36a8a0 + " 413 " + (_0x3ffe73 || _0x191cf3) + " body too large (max " + _0x1f8f4d + "b)");
        Nn(_0x2a4d10, 413, {
          error: "Body too large (max " + _0x1f8f4d + " bytes)"
        });
        _0x2a4d10.close();
        return;
      }
      _0x1b5096.push(_0x523a7f);
    }
  });
  _0x2a4d10.on("end", () => {
    if (_0x586463) {
      return;
    }
    let _0x20a563 = Buffer.concat(_0x1b5096);
    if (!Fn(_0x3ffe73)) {
      console.log("[" + ve() + "] #" + _0x36a8a0 + " " + _0x3ffe73 + " (" + _0x20a563.length + "b)");
    }
    if (_0x191cf3 === "/exa.api_server_pb.ApiServerService/GetCompletions" || _0x3ffe73 === "GetCompletions") {
      console.log("  -> API (completions)");
      try {
        bi(_0x20a563, _0x2a4d10, _0x42bf7e, "completions");
      } catch (_0x5bd945) {
        console.error("  ❌ Handler error: " + _0x5bd945.message);
        let {
          fakeRes: _0x45d8ea
        } = Jo(_0x2a4d10, _0x42bf7e);
        qe(_0x45d8ea, Z("补全处理失败", _0x5bd945.message));
      }
      return;
    }
    if (_0x3ffe73 === "GetChatMessage" || _0x3ffe73 === "GetStreamingExternalChatCompletions") {
      if (Ks(_0x3ffe73, _0x20a563, _0x42bf7e)) {
        console.log("  -> BYOK gateway (" + _0x3ffe73 + ")");
        try {
          bi(_0x20a563, _0x2a4d10, _0x42bf7e, "chat");
        } catch (_0x823b2b) {
          console.error("  ❌ Handler error: " + _0x823b2b.message);
          let {
            fakeRes: _0x399594
          } = Jo(_0x2a4d10, _0x42bf7e);
          qe(_0x399594, Z("对话处理失败", _0x823b2b.message));
        }
      } else {
        console.log("  -> official (" + _0x3ffe73 + ")");
        Mi(_0x20a563, _0x2a4d10, _0x42bf7e, _0x191cf3, _0x36a8a0);
      }
      return;
    }
    if (!Fn(_0x3ffe73)) {
      console.log("  → " + qt + _0x191cf3);
    }
    Mi(_0x20a563, _0x2a4d10, _0x42bf7e, _0x191cf3, _0x36a8a0);
  });
  _0x2a4d10.on("error", _0x3cac51 => {
    if (_0x3cac51.code !== "ERR_HTTP2_STREAM_ERROR") {
      console.error("[" + ve() + "] #" + _0x36a8a0 + " stream error: " + _0x3cac51.message);
    }
  });
});
Rn.on("error", _0x2c582b => {
  if (_0x2c582b.code === "EADDRINUSE") {
    console.error("EADDRINUSE: Port " + Vo + " already in use");
  } else {
    console.error("Server error:", _0x2c582b);
  }
  process.exit(1);
});
if (process.env.MODEL_CAPTURE_PATH) {
  Us(process.env.MODEL_CAPTURE_PATH);
}
Rn.listen(Vo, ki, () => {
  console.log("\nDevin INFERENCE PROXY on http://localhost:" + Vo);
  console.log("   Bind host: " + ki);
  console.log("   GetChatMessage (BYOK) -> your gateway");
  console.log("   GetChatMessage (other) -> " + qt);
  console.log("   GetCompletions -> Anthropic API");
  console.log("   Everything else -> " + qt + "\n");
});
for (let e of ["SIGTERM", "SIGINT"]) {
  process.once(e, () => {
    console.log("[" + ve() + "] " + e + " — exiting");
    vi().catch(_0x3c92dc => {
      console.error("[context-snapshot] signal shutdown failed: " + (_0x3c92dc?.message || _0x3c92dc));
    }).finally(() => setTimeout(() => process.exit(0), 100));
  });
}
