app.put('/api/users/premium/:uid', async(req, res) => {
    const user = await UserActivation.findById(req.params.uid);

    const requiredDocs = ['identificacion', 'comprobante de domicilio', 'comprobante de estado de cuenta'];
    const uploadedDocs = user.documents.map(doc => doc.name);

    const missingDocs = requiredDocs.filter(doc => !uploadedDocs.includes(doc));

    if (missingDocs.length > 0) {
        return res.status(400).json({
            error: 'faltan documentos',
            missing: missingDocs
        });
    }


    user.isPremium = true;
    await user.save();
    res.json({ message: 'Usuario actualizado a premium' });
});