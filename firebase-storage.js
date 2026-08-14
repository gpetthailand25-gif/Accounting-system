// ==== แทนที่ window.storage (ที่ใช้ได้เฉพาะใน Claude artifact) ด้วย Firestore จริง ====
// ตัวแอปเดิมเรียก window.storage.get/set/delete/list เหมือนเดิมทุกจุด ไม่ต้องแก้โค้ดแอป
(function () {
  const db = firebase.firestore();
  const COLLECTION = "kv_store"; // เก็บทุกคีย์ไว้ใน collection เดียว หนึ่งเอกสารต่อหนึ่งคีย์

  window.storage = {
    async get(key, shared) {
      const doc = await db.collection(COLLECTION).doc(key).get();
      if (!doc.exists) {
        // เลียนแบบพฤติกรรมเดิม: คีย์ที่ไม่มีอยู่จะ throw ไม่ใช่ return null
        throw new Error(`Key not found: ${key}`);
      }
      const data = doc.data();
      return { key, value: data.value, shared: !!shared };
    },

    async set(key, value, shared) {
      await db.collection(COLLECTION).doc(key).set({
        value,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      return { key, value, shared: !!shared };
    },

    async delete(key, shared) {
      await db.collection(COLLECTION).doc(key).delete();
      return { key, deleted: true, shared: !!shared };
    },

    async list(prefix, shared) {
      const snapshot = await db.collection(COLLECTION).get();
      let keys = snapshot.docs.map((d) => d.id);
      if (prefix) keys = keys.filter((k) => k.startsWith(prefix));
      return { keys, prefix, shared: !!shared };
    },
  };
})();
