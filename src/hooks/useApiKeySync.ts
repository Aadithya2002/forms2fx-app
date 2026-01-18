import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAnalysisStore } from '../store/analysisStore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { decryptApiKey } from '../services/cryptoService';

export function useApiKeySync() {
    const { user } = useAuth();
    const { apiKey, setApiKey } = useAnalysisStore();

    useEffect(() => {
        // Clear key if no user
        if (!user) {
            if (apiKey) setApiKey(null);
            return;
        }

        // Hydrate key if missing
        if (user && !apiKey) {
            const syncKey = async () => {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists() && userDoc.data().settings?.encryptedApiKey) {
                        const decrypted = await decryptApiKey(
                            userDoc.data().settings.encryptedApiKey,
                            user.uid
                        );
                        if (decrypted) {
                            setApiKey(decrypted);
                        }
                    }
                } catch (error) {
                    console.error('Failed to sync API key:', error);
                }
            };
            syncKey();
        }
    }, [user, apiKey, setApiKey]);
}
